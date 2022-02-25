import { Context } from '@nuxt/types';
import { IVec2, Nullable } from "~/types/deep-notes";
import { AppPage } from '../page';
import { Note } from './notes';




export {
  AppDragging,
};




const MIN_DISTANCE: number = 5;




class AppDragging {
  page: AppPage

  down!: boolean;
  active!: boolean;

  startPos!: IVec2;
  currentPos!: IVec2;

  dropRegionId!: Nullable<string>;
  dropIndex!: Nullable<number>;




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'dragging.down', () => false)
    $static.vue.ref(this, 'dragging.active', () => false)
    
    $static.vue.ref(this, 'dragging.startPos', () => null)
    $static.vue.ref(this, 'dragging.currentPos', () => null)
    
    $static.vue.ref(this, 'dragging.dropRegionId', () => null)
    $static.vue.ref(this, 'dragging.dropIndex', () => null)
  }
  
  


  start(event: PointerEvent) {
    // Prevent dragging unmovable notes

    if (this.page.activeElem.get instanceof Note
    && !this.page.activeElem.get.collab.movable)
      return





    this.down = true
    this.active = false

    this.startPos = this.page.pos.getClientPos(event)
    this.currentPos = this.page.pos.getClientPos(event)

    this.dropRegionId = null
    this.dropIndex = null
  }
  update(event: PointerEvent) {
    if (!this.down)
      return


    
    
    const clientMousePos = this.page.pos.getClientPos(event)

    if (!this.active) {
      const dist = Math.sqrt(
        Math.pow(clientMousePos.x - this.startPos.x, 2) +
        Math.pow(clientMousePos.y - this.startPos.y, 2)
      )
  
      this.active = dist >= MIN_DISTANCE
      if (!this.active)
        return
        


      
      // Remove dragging styles

      this.page.collab.doc.transact(() => {
        for (const selectedNote of this.page.selection.notes)
          selectedNote.collab.dragging = selectedNote.collab.movable
      })



      
      if (this.page.activeRegion.id != null) {
        // Adjust note positions and sizes

        this.page.collab.doc.transact(() => {
          for (const selectedNote of this.page.selection.notes) {
            const clientRect = selectedNote.getClientRect('frame')
            const worldRect = this.page.rects.clientToWorld(clientRect)
    
            selectedNote.collab.pos.x = worldRect.start.x + worldRect.size.x * selectedNote.collab.anchor.x
            selectedNote.collab.pos.y = worldRect.start.y + worldRect.size.y * selectedNote.collab.anchor.y

            selectedNote.width = `${worldRect.size.x}px`
          }
        })




        // Move notes to page region

        for (const selectedNote of this.page.selection.notes) {
          selectedNote.removeFromRegion()
          
          this.page.data.collab.noteIds.push(selectedNote.id)
          selectedNote.parentId = null
        }

        this.page.activeRegion.id = null
      }
    }




    // Calculate delta

    const delta: IVec2 = {
      x: (clientMousePos.x - this.currentPos.x) / this.page.camera.zoom,
      y: (clientMousePos.y - this.currentPos.y) / this.page.camera.zoom,
    };




    // Move selected notes

    this.page.collab.doc.transact(() => {
      for (const note of this.page.selection.notes) {
        if (!note.collab.dragging)
          continue

        note.collab.pos.x += delta.x
        note.collab.pos.y += delta.y
      }
    })




    this.currentPos = clientMousePos
  }
  finish(event: PointerEvent) {
    if (!this.down)
      return

    this.page.collab.doc.transact(() => {
      for (const note of this.page.selection.notes)
        note.collab.dragging = false
    })

    this.down = false
    this.active = false
  }
}