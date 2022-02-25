import { Context } from "@nuxt/types"
import { cloneDeep, pull } from "lodash"
import { IVec2, Nullable } from "~/types/deep-notes"
import { INoteCollab, INoteSize, Note } from "../notes/notes"
import { AppPage } from "../page"




export {
  AppClipboard,
}




interface INoteClipboard {
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




class AppClipboard {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  copy(notes?: Note[]) {
    const clipboardNotes = []




    const isRoot = notes == null

    notes = notes ?? this.page.selection.notes

    for (const note of notes) {
      const clipboardNote = {
        title: note.collab.title.toDelta(),
        body: note.collab.body.toDelta(),
        
        children: this.copy(note.children),
      } as Partial<INoteClipboard>




      // Copy collab values

      const collabKeys = Object.keys(note.collab)
      pull(collabKeys, 'title', 'body', 'childIds', 'zIndex', 'dragging')
      for (const collabKey of collabKeys)
        clipboardNote[collabKey] = cloneDeep(note.collab[collabKey])




      clipboardNotes.push(clipboardNote)
    }




    if (isRoot)
      $static.clipboard.set(JSON.stringify(clipboardNotes))




    return clipboardNotes
  }
  
  
  
  
  _pasteAux(clipboardNotes: INoteClipboard[], parent?: Nullable<Note>): Note[] {
    const notes = []



    
    for (const clipboardNote of clipboardNotes) {
      const collabOverrides = {} as Partial<INoteCollab>

      collabOverrides.title = $static.syncedStore.createText(clipboardNote.title)
      collabOverrides.body = $static.syncedStore.createText(clipboardNote.body)

      const collabKeys = Object.keys(clipboardNote)
      pull(collabKeys, 'title', 'body', 'children')
      for (const collabKey of collabKeys)
        collabOverrides[collabKey] = cloneDeep(clipboardNote[collabKey])
      



      const note = this.page.notes.create(parent ?? null, null, collabOverrides)

      this._pasteAux(clipboardNote.children, note)
      
      notes.push(note)
    }




    return notes
  }
  async paste(text?: string) {
    const clipboardText = text ?? await $static.clipboard.get()

    const clipboardNotes = JSON.parse(clipboardText) as INoteClipboard[]

    const notes = this._pasteAux(clipboardNotes)

    this.page.selection.set(...notes)
  }
  
  
  
  
  cut() {
    this.copy()
    this.page.deleting.perform()
  }
}