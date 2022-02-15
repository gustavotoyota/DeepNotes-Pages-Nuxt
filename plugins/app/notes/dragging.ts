import { Context } from '@nuxt/types'
import { Exact, IVec2 } from "~/types/deep-notes"




export type {
  IAppDragging,
}




interface IAppDragging {
  minDistance: number;

  down: boolean
  active: boolean

  startPos: IVec2
  currentPos: IVec2

  reset(): void;
  start(event: MouseEvent): void;
  update(event: MouseEvent): void;
  finish(event: MouseEvent): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppDragging {
  minDistance: number = 5;

  down: boolean = false;
  active: boolean = false;

  startPos: IVec2 = { x: 0, y: 0 };
  currentPos: IVec2 = { x: 0, y: 0 };




  constructor() {
    $static.vue.ref(this, 'dragging.down')
    $static.vue.ref(this, 'dragging.active')
  }




  reset() {
    $app.dragging.down = false
    $app.dragging.active = false
  }
  
  


  start(event: MouseEvent) {
    if (event.button !== 0)
      return
    
    $app.dragging.down = true
    $app.dragging.active = false

    $app.dragging.startPos = $app.pos.getClientPos(event)
    $app.dragging.currentPos = $app.pos.getClientPos(event)
  }
  update(event: MouseEvent) {
    if (!$app.dragging.down)
      return




    const clientMousePos = $app.pos.getClientPos(event)

    if (!$app.dragging.active) {
      const dist = Math.sqrt(
        Math.pow(clientMousePos.x - $app.dragging.startPos.x, 2) +
        Math.pow(clientMousePos.y - $app.dragging.startPos.y, 2)
      )
  
      $app.dragging.active = dist >= $app.dragging.minDistance
      if (!$app.dragging.active)
        return
        

      for (const note of $app.selection.notes)
        note.collab.dragging = note.collab.movable
    }




    // Calculate delta

    const delta: IVec2 = {
      x: (clientMousePos.x - $app.dragging.currentPos.x) / $app.camera.zoom,
      y: (clientMousePos.y - $app.dragging.currentPos.y) / $app.camera.zoom,
    };




    // Move selected notes

    $app.collab.doc.transact(() => {
      for (const note of $app.selection.notes) {
        if (!note.collab.dragging)
          continue
  
        note.collab.pos.x += delta.x
        note.collab.pos.y += delta.y
      }
    })




    $app.dragging.currentPos = clientMousePos
  }
  finish(event: MouseEvent) {
    if (!$app.dragging.down || event.button !== 0)
      return

    for (const note of $app.selection.notes)
      note.collab.dragging = false
  
    $app.dragging.down = false
    $app.dragging.active = false
  }
} as Exact<IAppDragging, T>