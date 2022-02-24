import { Context } from '@nuxt/types';
import { IVec2, Nullable } from "~/types/deep-notes";
import { AppPage } from '../page';




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
    this.page.dragging.down = true
    this.page.dragging.active = false

    this.page.dragging.startPos = this.page.pos.getClientPos(event)
    this.page.dragging.currentPos = this.page.pos.getClientPos(event)

    this.page.dragging.dropRegionId = null
    this.page.dragging.dropIndex = null
  }
  update(event: PointerEvent) {
    if (!this.page.dragging.down)
      return


    
    
    const clientMousePos = this.page.pos.getClientPos(event)

    if (!this.page.dragging.active) {
      const dist = Math.sqrt(
        Math.pow(clientMousePos.x - this.page.dragging.startPos.x, 2) +
        Math.pow(clientMousePos.y - this.page.dragging.startPos.y, 2)
      )
  
      this.page.dragging.active = dist >= MIN_DISTANCE
      if (!this.page.dragging.active)
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
      x: (clientMousePos.x - this.page.dragging.currentPos.x) / this.page.camera.zoom,
      y: (clientMousePos.y - this.page.dragging.currentPos.y) / this.page.camera.zoom,
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




    this.page.dragging.currentPos = clientMousePos
  }
  finish(event: PointerEvent) {
    if (!this.page.dragging.down)
      return

    this.page.collab.doc.transact(() => {
      for (const note of this.page.selection.notes)
        note.collab.dragging = false
    })

    this.page.dragging.down = false
    this.page.dragging.active = false
  }
}