import { Context } from "@nuxt/types"
import { cloneDeep, pull } from "lodash"
import { IVec2, Nullable } from "~/types/deep-notes"
import { INoteCollab, INoteSize, Note } from "../notes/notes"
import { AppPage } from "../page"




export interface INoteClipboard {
  [key: string]: unknown

  linkedPageId: Nullable<string>

  anchor: IVec2

  pos: IVec2

  hasTitle: boolean
  hasBody: boolean
  
  title: object
  body: object

  collapsible: boolean
  collapsed: boolean

  expandedSize: INoteSize
  collapsedSize: INoteSize

  movable: boolean
  resizable: boolean

  wrapTitle: boolean
  wrapBody: boolean
  
  readOnly: boolean

  container: boolean

  children: INoteClipboard[]
}




export class AppClipboard {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  private _copyAux(notes: Note[]): INoteClipboard[] {
    const clipboardNotes = []




    for (const note of notes) {
      const clipboardNote = {
        title: note.collab.title.toDelta(),
        body: note.collab.body.toDelta(),
        
        children: this._copyAux(note.children),
      } as Partial<INoteClipboard>




      // Copy collab values

      const collabKeys = Object.keys(note.collab)
      pull(collabKeys, 'title', 'body', 'childIds', 'zIndex', 'dragging')
      for (const collabKey of collabKeys)
        clipboardNote[collabKey] = cloneDeep(note.collab[collabKey])




      clipboardNotes.push(clipboardNote)
    }




    return clipboardNotes as INoteClipboard[]
  }
  copy() {
    const clipboardNotes = this._copyAux(this.page.selection.notes)




    // Calculate center position

    const centerPos = { x: 0, y: 0 }

    for (const clipboardNote of clipboardNotes) {
      centerPos.x += clipboardNote.pos.x
      centerPos.y += clipboardNote.pos.y
    }

    centerPos.x /= clipboardNotes.length
    centerPos.y /= clipboardNotes.length




    // Subtract center from note positions
    
    for (const clipboardNote of clipboardNotes) {
      clipboardNote.pos.x -= centerPos.x
      clipboardNote.pos.y -= centerPos.y
    }



    
    $static.clipboard.set(JSON.stringify(clipboardNotes))
  }
  
  
  
  
  private _pasteAux(clipboardNotes: INoteClipboard[]): string[] {
    const noteIds = []



    
    for (const clipboardNote of clipboardNotes) {
      const collabOverrides = {} as Partial<INoteCollab>

      collabOverrides.title = $static.syncedStore.createText(clipboardNote.title)
      collabOverrides.body = $static.syncedStore.createText(clipboardNote.body)

      const collabKeys = Object.keys(clipboardNote)
      pull(collabKeys, 'title', 'body', 'children')
      for (const collabKey of collabKeys)
        collabOverrides[collabKey] = cloneDeep(clipboardNote[collabKey])

      collabOverrides.childIds = this._pasteAux(clipboardNote.children)
      



      const noteId = this.page.notes.create(collabOverrides)
      
      noteIds.push(noteId)
    }




    return noteIds
  }
  async paste(text?: string) {
    // Get clipboard notes from clipboard

    const clipboardText = text ?? await $static.clipboard.get()
    const clipboardNotes = JSON.parse(clipboardText) as INoteClipboard[]




    // Center notes around destination

    if (this.page.activeRegion.id == null) {
      let destCenter: IVec2

      if (this.page.activeElem.exists) {
        const auxPos = (this.page.activeElem.get as Note).collab.pos

        destCenter = {
          x: auxPos.x + 8,
          y: auxPos.y + 8,
        }
      } else
        destCenter = this.page.camera.pos



        
      for (const clipboardNote of clipboardNotes) {
        clipboardNote.pos.x += destCenter.x
        clipboardNote.pos.y += destCenter.y
      }
    }




    // Determine destination index

    let destIndex
    
    if (this.page.selection.notes.length > 0)
      destIndex = this.page.selection.notes.at(-1)!.index + 1
    else
      destIndex = this.page.activeRegion.notes.length




    // Insert notes into structure

    const noteIds = this._pasteAux(clipboardNotes)

    this.page.activeRegion.noteIds.splice(destIndex, 0, ...noteIds)




    // Select notes
    
    const notes = this.page.notes.fromIds(noteIds)

    this.page.selection.set(...notes)




    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()
  }
  
  
  
  
  cut() {
    this.copy()
    this.page.deleting.perform()
  }
}