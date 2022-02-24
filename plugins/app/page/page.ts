import { Context } from '@nuxt/types'




import { AppCamera } from './camera/camera'
import { AppPanning } from './camera/panning'
import { AppZooming } from './camera/zooming'

import { AppPos } from './space/pos'
import { AppSizes } from './space/sizes'
import { AppRects } from './space/rects'

import { AppSelection } from './selection/selection'
import { AppActiveRegion } from './selection/active-region'
import { AppActiveElem } from './selection/active-elem'
import { AppClickSelection } from './selection/click-selection'
import { AppBoxSelection } from './selection/box-selection'

import { AppCollab } from './collab'

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




export {
  AppPage,
}




class AppPage {
  ctx: Context

  project: AppProject




  data: AppPageData

  camera: AppCamera
  panning: AppPanning
  zooming: AppZooming

  pos: AppPos
  sizes: AppSizes
  rects: AppRects

  selection: AppSelection
  activeRegion: AppActiveRegion
  activeElem: AppActiveElem
  clickSelection: AppClickSelection
  boxSelection: AppBoxSelection
  
  collab: AppCollab

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


  

    this.data = new AppPageData(this, id)
  
    this.camera = new AppCamera(this)
    this.panning = new AppPanning(this)
    this.zooming = new AppZooming(this)
  
    this.pos = new AppPos(this)
    this.sizes = new AppSizes(this)
    this.rects = new AppRects(this)
  
    this.selection = new AppSelection(this)
    this.activeRegion = new AppActiveRegion(this)
    this.activeElem = new AppActiveElem(this)
    this.clickSelection = new AppClickSelection(this)
    this.boxSelection = new AppBoxSelection(this)

    this.collab = new AppCollab(this)
  
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




    this.init()
  }




  async init() {
    if (!process.client)
      return




    // Update page path

    if (this.project.path.find(item => item.id == this.data.id) == null) {
      const index = this.project.path.findIndex(
        item => item.id == this.ctx.$app.parentPageId)

      this.project.path.splice(index + 1)

      this.project.path.push({
        id: this.data.id,
        name: '',
      })  
    }



    // Bump recent page

    this.project.bumpRecentPage({
      id: this.data.id,
      name: '',
    })




    // Update project

    const pageName = (await this.ctx.$axios.post('/api/project/update', {
      pageId: this.data.id,
      parentPageId: this.ctx.$app.parentPageId,
    })).data




    // Initialize page collab

    this.data.resetCollab(pageName)




    this.collab.startSync()
  }
}