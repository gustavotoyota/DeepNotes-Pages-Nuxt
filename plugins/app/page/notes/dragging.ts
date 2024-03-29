import { nextTick } from '@nuxtjs/composition-api';
import { Vec2 } from '~/plugins/static/vec2';
import { Nullable } from "~/types/deep-notes";
import { AppPage } from '../page';
import { Note } from './notes';




const MIN_DISTANCE: number = 5;




export class AppDragging {
  page: AppPage

  active!: boolean;

  startPos!: Vec2;
  currentPos!: Vec2;

  dropRegionId!: Nullable<string>;
  dropIndex!: Nullable<number>;




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.dragging.active', () => false)
    
    $static.vue.ssrRef(this, '$app.page.dragging.dropRegionId', () => null)
    $static.vue.ssrRef(this, '$app.page.dragging.dropIndex', () => null)
  }
  
  


  start(event: PointerEvent) {
    // Prevent dragging unmovable notes

    if (this.page.activeElem.get instanceof Note
    && !this.page.activeElem.get.collab.movable)
      return




    this.active = false

    this.startPos = this.page.pos.getClientPos(event)
    this.currentPos = this.page.pos.getClientPos(event)

    this.dropRegionId = null
    this.dropIndex = null




    $static.utils.listenPointerEvents(event, {
      move: this._update,
      up: this._finish,
    })
  }



  
  private _update = function (this: AppDragging, event: PointerEvent) {
    const clientMousePos = this.page.pos.getClientPos(event)
    const worldMousePos = this.page.pos.clientToWorld(clientMousePos)




    if (!this.active) {
      const dist = clientMousePos.sub(this.startPos).length()
  
      this.active = dist >= MIN_DISTANCE
      if (!this.active)
        return




      // Update dragging states

      for (const selectedNote of this.page.selection.notes)
        selectedNote.dragging = true



      
      if (this.page.activeRegion.id != null) {
        // Store note positions

        this.page.collab.doc.transact(() => {
          for (const selectedNote of this.page.selection.notes) {
            const worldRect = selectedNote.getWorldRect('note-frame')

            selectedNote.collab.pos.x = worldRect.topLeft.x +
              worldRect.size.x * selectedNote.collab.anchor.x
            selectedNote.collab.pos.y = worldRect.topLeft.y +
              worldRect.size.y * selectedNote.collab.anchor.y
          }
        })




        // Move notes to page region

        const selectedNotes = this.page.selection.notes.slice()

        selectedNotes.sort((a: Note, b: Note) => b.index - a.index)
        
        this.page.collab.doc.transact(() => {
          for (const selectedNote of selectedNotes) {
            selectedNote.removeFromRegion()
            this.page.data.collab.noteIds.push(selectedNote.id)
            selectedNote.parentId = null
          }
        })

        this.page.activeRegion.id = null




        // Adjust note positions and sizes
        // With mouse in the center of the active element

        nextTick(() => {
          const activeWorldRect = (this.page.activeElem.get as Note).getWorldRect('note-frame')

          const mouseOffset = worldMousePos.sub(activeWorldRect.center)
            
          this.page.collab.doc.transact(() => {
            for (const selectedNote of this.page.selection.notes) {
              selectedNote.collab.pos.x += mouseOffset.x
              selectedNote.collab.pos.y += mouseOffset.y
            }
          })
        })
      }
    }




    // Calculate delta

    const delta = clientMousePos.sub(this.currentPos).divScalar(this.page.camera.zoom)




    // Move selected notes

    this.page.collab.doc.transact(() => {
      for (const note of this.page.selection.notes) {
        if (!note.collab.movable)
          continue

        note.collab.pos.x += delta.x
        note.collab.pos.y += delta.y
      }
    })




    this.currentPos = clientMousePos
  }.bind(this)




  private _finish = function (this: AppDragging) {
    this.active = false

    for (const selectedNote of this.page.selection.notes)
      selectedNote.dragging = false

    this.page.undoRedo.resetCapturing()
  }.bind(this)




  cancel = () => {
    this._finish()

    document.removeEventListener('pointermove', this._update)
    document.removeEventListener('pointerup', this._finish)
  }
}