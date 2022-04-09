import { getYjsValue, Y } from '@syncedstore/core'
import { Nullable } from '~/types/deep-notes'
import { IArrowCollab } from './arrows/arrows'
import { INoteCollab } from './notes/notes'
import { AppPage, IPageCollab } from './page'




export class AppUndoRedo {
  page: AppPage

  undoManager: Nullable<Y.UndoManager> = null

  private _key!: number

  canUndo!: boolean
  canRedo!: boolean
  
  


  constructor(page: AppPage) {
    this.page = page



    $static.vue.ssrRef(this, '$app.page._key', () => 0)

    $static.vue.computed(this, '$app.page.canUndo', () => {
      this._key
      return this.undoManager?.canUndo() ?? false
    })
    $static.vue.computed(this, '$app.page.canRedo', () => {
      this._key
      return this.undoManager?.canRedo() ?? false
    })
  }




  setup() {
    this.undoManager = new Y.UndoManager([
        getYjsValue(this.page.collab.store.page) as Y.AbstractType<IPageCollab>,
        getYjsValue(this.page.collab.store.notes) as Y.AbstractType<INoteCollab>,
        getYjsValue(this.page.collab.store.arrows) as Y.AbstractType<IArrowCollab>,
      ],
      { captureTimeout: 1000000000 },
    )
  }




  resetCapturing() {
    this.undoManager?.stopCapturing()
    this._key++
  }




  undo() {
    this.page.selection.clear()

    this.undoManager?.undo()
    this._key++
  }
  redo() {
    this.page.selection.clear()

    this.undoManager?.redo()
    this._key++
  }
}