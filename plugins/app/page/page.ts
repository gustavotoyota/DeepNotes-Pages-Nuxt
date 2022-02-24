import { Context } from '@nuxt/types'
import { v4 as uuidv4 } from 'uuid'




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
import { watch, watchEffect } from '@nuxtjs/composition-api'




export {
  AppPage,
  IPageCollab,
  IPageRef,
}




class AppPage {
  ctx: Context

  project: AppProject


  

  id!: string




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




    $static.vue.ref(this, 'page.id', () => id ?? uuidv4())


  

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

    if (this.project.pathPages.find(item => item.id == this.id) == null) {
      const index = this.project.pathPages.findIndex(
        item => item.id == this.ctx.$app.parentPageId)

      this.project.pathPages.splice(index + 1)

      this.project.pathPages.push({
        id: this.id,
        name: '',
      })  
    }




    // Bump recent page

    this.project.bumpRecentPage({
      id: this.id,
      name: '',
    })




    // Watch for page name changes

    watch(() => this.data.collab.name, () => {
      const pathRef = this.project.pathPages.find(pageRef => pageRef.id == this.id)
      if (pathRef != null)
        pathRef.name = this.data.collab.name

      const recentRef = this.project.recentPages.find(pageRef => pageRef.id == this.id)
      if (recentRef != null)
        recentRef.name = this.data.collab.name
    }, { immediate: true })




    this.collab.startSync()
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

    this.navigateTo(id, true)

    return id
  }




  navigateTo(id: string, fromParent?: boolean) {
    this.ctx.$app.parentPageId = fromParent ? this.id : null

    $nuxt.$router.push({ path: `/${id}` })
  }
}

interface IPageCollab {
  name: string,

  noteIds: string[],
  arrowIds: string[],

  nextZIndex: number
}

interface IPageRef {
  id: string
  name: string
}