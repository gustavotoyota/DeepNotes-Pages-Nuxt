import { Context } from '@nuxt/types';
import { IVec2, Nullable } from "~/types/deep-notes";




export {
  AppDragging,
};




const MIN_DISTANCE: number = 5;




class AppDragging {
  ctx: Context

  down!: boolean;
  active!: boolean;

  startPos!: IVec2;
  currentPos!: IVec2;

  dropRegionId!: Nullable<string>;
  dropIndex!: Nullable<number>;




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'dragging.down')
    $static.vue.ref(this, 'dragging.active')
    
    $static.vue.ref(this, 'dragging.startPos')
    $static.vue.ref(this, 'dragging.currentPos')
    
    $static.vue.ref(this, 'dragging.dropRegionId')
    $static.vue.ref(this, 'dragging.dropIndex')
  }




  reset() {
    this.ctx.$app.dragging.down = false
    this.ctx.$app.dragging.active = false
  }
  
  


  start(event: PointerEvent) {
    if (event.button !== 0)
      return
    
    this.ctx.$app.dragging.down = true
    this.ctx.$app.dragging.active = false

    this.ctx.$app.dragging.startPos = this.ctx.$app.pos.getClientPos(event)
    this.ctx.$app.dragging.currentPos = this.ctx.$app.pos.getClientPos(event)

    this.ctx.$app.dragging.dropRegionId = null
    this.ctx.$app.dragging.dropIndex = null
  }
  update(event: PointerEvent) {
    if (!this.ctx.$app.dragging.down)
      return


    
    
    this.ctx.$app.collab.doc.transact(() => {
      const clientMousePos = this.ctx.$app.pos.getClientPos(event)

      if (!this.ctx.$app.dragging.active) {
        const dist = Math.sqrt(
          Math.pow(clientMousePos.x - this.ctx.$app.dragging.startPos.x, 2) +
          Math.pow(clientMousePos.y - this.ctx.$app.dragging.startPos.y, 2)
        )
    
        this.ctx.$app.dragging.active = dist >= MIN_DISTANCE
        if (!this.ctx.$app.dragging.active)
          return
          


        
        // Remove dragging styles

        for (const selectedNote of this.ctx.$app.selection.notes)
          selectedNote.collab.dragging = selectedNote.collab.movable



        
        if (this.ctx.$app.activeRegion.id != null) {
          // Adjust note positions and sizes

          for (const selectedNote of this.ctx.$app.selection.notes) {
            const clientRect = selectedNote.getClientRect('frame')
            const worldRect = this.ctx.$app.rects.clientToWorld(clientRect)
    
            selectedNote.collab.pos.x = worldRect.start.x + worldRect.size.x * selectedNote.collab.anchor.x
            selectedNote.collab.pos.y = worldRect.start.y + worldRect.size.y * selectedNote.collab.anchor.y

            selectedNote.width = `${worldRect.size.x}px`
          }




          // Move notes to page region

          for (const selectedNote of this.ctx.$app.selection.notes) {
            selectedNote.removeFromRegion()
            
            this.ctx.$app.page.collab.noteIds.push(selectedNote.id)
            selectedNote.parentId = null
          }

          this.ctx.$app.activeRegion.id = null
        }
      }




      // Calculate delta

      const delta: IVec2 = {
        x: (clientMousePos.x - this.ctx.$app.dragging.currentPos.x) / this.ctx.$app.camera.zoom,
        y: (clientMousePos.y - this.ctx.$app.dragging.currentPos.y) / this.ctx.$app.camera.zoom,
      };




      // Move selected notes

      for (const note of this.ctx.$app.selection.notes) {
        if (!note.collab.dragging)
          continue

        note.collab.pos.x += delta.x
        note.collab.pos.y += delta.y
      }




      this.ctx.$app.dragging.currentPos = clientMousePos
    })
  }
  finish(event: PointerEvent) {
    if (!this.ctx.$app.dragging.down || event.button !== 0)
      return

    this.ctx.$app.collab.doc.transact(() => {
      for (const note of this.ctx.$app.selection.notes)
        note.collab.dragging = false
    
      this.ctx.$app.dragging.down = false
      this.ctx.$app.dragging.active = false
    })
  }
}