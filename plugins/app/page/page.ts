import { Context } from '@nuxt/types'
import { Base64 } from 'js-base64'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { App } from '../app'
import { AppProject } from '../project'
import { AppArrowCreation } from './arrows/arrow-creation'
import { AppArrows } from './arrows/arrows'
import { AppCamera } from './camera/camera'
import { AppPanning } from './camera/panning'
import { AppPinching } from './camera/pinching'
import { AppZooming } from './camera/zooming'
import { AppCollab } from './collab'
import { IContainerCollab } from './container'
import { AppPageData } from './data'
import { AppClipboard } from './elems/clipboard'
import { AppDeleting } from './elems/deleting'
import { AppElems } from './elems/elems'
import { AppCloning } from './notes/cloning'
import { AppCollapsing } from './notes/collapsing'
import { AppDragging } from './notes/dragging'
import { AppDropping } from './notes/dropping'
import { AppEditing } from './notes/editing'
import { AppNotes } from './notes/notes'
import { AppResizing } from './notes/resizing'
import { AppRegions } from './regions'
import { AppActiveElem } from './selection/active-elem'
import { AppActiveRegion } from './selection/active-region'
import { AppBoxSelection } from './selection/box-selection'
import { AppClickSelection } from './selection/click-selection'
import { AppSelection } from './selection/selection'
import { AppPos } from './space/pos'
import { AppRects } from './space/rects'
import { AppSizes } from './space/sizes'
import { AppUndoRedo } from './undo-redo'




export class AppPage {
  ctx: Context
  app: App
  project: AppProject


  

  id!: string

  loaded!: boolean




  data: AppPageData

  camera: AppCamera
  panning: AppPanning
  zooming: AppZooming
  pinching: AppPinching

  pos: AppPos
  sizes: AppSizes
  rects: AppRects

  selection: AppSelection
  activeRegion: AppActiveRegion
  activeElem: AppActiveElem
  clickSelection: AppClickSelection
  boxSelection: AppBoxSelection
  
  collab: AppCollab
  undoRedo: AppUndoRedo

  regions: AppRegions

  elems: AppElems
  clipboard: AppClipboard
  deleting: AppDeleting

  notes: AppNotes
  dragging: AppDragging
  cloning: AppCloning
  editing: AppEditing
  collapsing: AppCollapsing
  resizing: AppResizing
  dropping: AppDropping
  
  arrows: AppArrows
  arrowCreation: AppArrowCreation




  constructor(project: AppProject, id?: string) {
    this.ctx = project.ctx
    
    this.app = project.ctx.$app
    this.project = project




    $static.vue.ssrRef(this, '$app.page.id', () => id ?? uuidv4())

    $static.vue.ssrRef(this, '$app.page.loaded', () => false)


  

    this.data = new AppPageData(this)
  
    this.camera = new AppCamera(this)
    this.panning = new AppPanning(this)
    this.zooming = new AppZooming(this)
    this.pinching = new AppPinching(this)
  
    this.pos = new AppPos(this)
    this.sizes = new AppSizes(this)
    this.rects = new AppRects(this)
  
    this.selection = new AppSelection(this)
    this.activeRegion = new AppActiveRegion(this)
    this.activeElem = new AppActiveElem(this)
    this.clickSelection = new AppClickSelection(this)
    this.boxSelection = new AppBoxSelection(this)

    this.collab = new AppCollab(this)
    this.undoRedo = new AppUndoRedo(this)
  
    this.regions = new AppRegions(this)
    
    this.elems = new AppElems(this)
    this.clipboard = new AppClipboard(this)
    this.deleting = new AppDeleting(this)
  
    this.notes = new AppNotes(this)
    this.dragging = new AppDragging(this)
    this.cloning = new AppCloning(this)
    this.editing = new AppEditing(this)
    this.collapsing = new AppCollapsing(this)
    this.resizing = new AppResizing(this)
    this.dropping = new AppDropping(this)
    
    this.arrows = new AppArrows(this)
    this.arrowCreation = new AppArrowCreation(this)
  }




  async init() {
    // Update page path

    const pageRef = this.project.pathPages.find(
      item => item.id == this.id)

    if (pageRef == null) {
      const index = this.project.pathPages.findIndex(
        item => item.id == this.ctx.$app.project.parentPageId)

      if (index >= 0) {
        this.project.pathPages.splice(index + 1)

        this.project.pathPages.push({
          id: this.id,
          name: this.data.name,
        })
      } else {
        this.project.loadData()
      }
    }




    // Bump recent page

    this.project.bumpRecentPage({
      id: this.id,
      name: this.data.name,
    })




    // Update page data

    const pageData = (await this.ctx.$axios.post('/api/page/data', {
      pageId: this.id,
      parentPageId: this.ctx.$app.project.parentPageId,
    })).data

    this.ctx.$app.project.parentPageId = null

    this.data.auxName = pageData.name

    if (pageData.stateUpdate)
      pageData.stateUpdate = Base64.toUint8Array(pageData.stateUpdate)




    return pageData
  }




  resetCollab(pageName: string) {
    this.collab.doc.transact(() => {
      $static.vue.merge(this.data.collab, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],

        nextZIndex: 0,
      } as IPageCollab)
    })
  }




  async create(name: string) {
    const id = (await this.ctx.$axios.post('/api/page/create', { name })).data

    this.project.navigateTo(id, true)

    return id
  }
}




export const IPageCollab = IContainerCollab.extend({
  name: z.string(),

  nextZIndex: z.number(),
})
export type IPageCollab = z.infer<typeof IPageCollab>




export const IPageRef = z.object({
  id: z.string(),
  name: z.string(),
})
export type IPageRef = z.infer<typeof IPageRef>