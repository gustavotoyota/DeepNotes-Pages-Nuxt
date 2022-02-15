import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"




export type {
  IAppPos,
}




interface IAppPos {
  getClientPos(event: MouseEvent): IVec2;
  getDisplayPos(event: MouseEvent): IVec2;
  getWorldPos(event: MouseEvent): IVec2;

  clientToDisplay(clientPos: IVec2): IVec2;
  displayToClient(displayPos: IVec2): IVec2;

  displayToWorld(displayPos: IVec2): IVec2;
  worldToDisplay(worldPos: IVec2): IVec2;

  clientToWorld(clientPos: IVec2): IVec2;
  worldToClient(worldPos: IVec2): IVec2;
}




export const init = ({ $app }: Context): IAppPos => {
  return new class implements IAppPos {
    getClientPos(event: MouseEvent): IVec2 {
      return {
        x: event.clientX,
        y: event.clientY,
      }
    }
    getDisplayPos(event: MouseEvent): IVec2 {
      return $app.pos.clientToDisplay($app.pos.getClientPos(event))
    }
    getWorldPos(event: MouseEvent): IVec2 {
      return $app.pos.clientToWorld($app.pos.getClientPos(event))
    }
  
  
  
  
    clientToDisplay(clientPos: IVec2): IVec2 {
      const displayRect = $app.rects.fromDisplay()
  
      return {
        x: clientPos.x - displayRect.start.x,
        y: clientPos.y - displayRect.start.y,
      }
    }
    displayToClient(displayPos: IVec2): IVec2 {
      const displayRect = $app.rects.fromDisplay()
  
      return {
        x: displayPos.x + displayRect.start.x,
        y: displayPos.y + displayRect.start.y,
      }
    }
  
  
  
  
    displayToWorld(displayPos: IVec2): IVec2 {
      const displayRect = $app.rects.fromDisplay()
  
      return {
        x: $app.camera.pos.x + (displayPos.x - displayRect.size.x / 2) / $app.camera.zoom,
        y: $app.camera.pos.y + (displayPos.y - displayRect.size.y / 2) / $app.camera.zoom,
      }
    }
    worldToDisplay(worldPos: IVec2): IVec2 {
      const displayRect = $app.rects.fromDisplay()
  
      return {
        x: displayRect.size.x / 2 + (worldPos.x - $app.camera.pos.x) * $app.camera.zoom,
        y: displayRect.size.y / 2 + (worldPos.y - $app.camera.pos.y) * $app.camera.zoom,
      }
    }
  
  
  
  
    clientToWorld(clientPos: IVec2): IVec2 {
      return $app.pos.displayToWorld($app.pos.clientToDisplay(clientPos))
    }
    worldToClient(worldPos: IVec2): IVec2 {
      return $app.pos.displayToClient($app.pos.worldToDisplay(worldPos))
    }
  }
}