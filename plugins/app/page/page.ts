import { Context } from '@nuxt/types'
import { v4 as uuidv4 } from 'uuid'
import { Base64 } from 'js-base64'




import { AppCamera } from './camera/camera'
import { AppPanning } from './camera/panning'
import { AppZooming } from './camera/zooming'
import { AppPinching } from './camera/pinching'

import { AppPos } from './space/pos'
import { AppSizes } from './space/sizes'
import { AppRects } from './space/rects'

import { AppSelection } from './selection/selection'
import { AppActiveRegion } from './selection/active-region'
import { AppActiveElem } from './selection/active-elem'
import { AppClickSelection } from './selection/click-selection'
import { AppBoxSelection } from './selection/box-selection'

import { AppCollab } from './collab'
import { AppUndoRedo } from './undo-redo'

import { AppRegions } from './regions'

import { AppElems } from './elems/elems'
import { AppClipboard } from './elems/clipboard'
import { AppDeleting } from './elems/deleting'

import { AppNotes } from './notes/notes'
import { AppDragging } from './notes/dragging'
import { AppCloning } from './notes/cloning'
import { AppEditing } from './notes/editing'
import { AppCollapsing } from './notes/collapsing'
import { AppResizing } from './notes/resizing'
import { AppDropping } from './notes/dropping'

import { AppArrows } from './arrows/arrows'
import { AppPageData } from './data'
import { AppProject } from '../project'




export class AppPage {
  [key: string]: unknown




  ctx: Context

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




  constructor(project: AppProject, id?: string) {
    this.ctx = project.ctx

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
  }




  async init() {
    // Update page path

    const pageRef = this.project.pathPages.find(
      item => item.id == this.id)

    if (pageRef == null) {
      const index = this.project.pathPages.findIndex(
        item => item.id == this.ctx.$app.project.parentPageId)

      this.project.pathPages.splice(index + 1)

      this.project.pathPages.push({
        id: this.id,
        name: this.data.name,
      })  
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

export interface IPageCollab {
  name: string,

  noteIds: string[],
  arrowIds: string[],

  nextZIndex: number
}

export interface IPageRef {
  id: string
  name: string
}