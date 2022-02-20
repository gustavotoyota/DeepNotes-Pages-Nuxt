import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'




import { AppCollab } from './collab'

import { AppProject } from './project'
import { AppPage } from './page'

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

import { AppPos } from './space/pos'
import { AppSizes } from './space/sizes'
import { AppRects } from './space/rects'

import { AppCamera } from './camera/camera'
import { AppPanning } from './camera/panning'
import { AppZooming } from './camera/zooming'

import { AppSelection } from './selection/selection'
import { AppActiveRegion } from './selection/active-region'
import { AppActiveElem } from './selection/active-elem'
import { AppClickSelection } from './selection/click-selection'
import { AppBoxSelection } from './selection/box-selection'




export type {
  App,
}




class App {
  collab: AppCollab

  project: AppProject
  page: AppPage

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

  pos: AppPos
  sizes: AppSizes
  rects: AppRects

  camera: AppCamera
  panning: AppPanning
  zooming: AppZooming

  selection: AppSelection
  activeRegion: AppActiveRegion
  activeElem: AppActiveElem
  clickSelection: AppClickSelection
  boxSelection: AppBoxSelection




  constructor(ctx: Context, inject: Inject) {
    inject('app', this)


  

    this.collab = new AppCollab(ctx)
  
    this.project = new AppProject(ctx)
    this.page = new AppPage(ctx)
    
    this.elems = new AppElems(ctx)
    this.clipboard = new AppClipboard(ctx)
    this.deleting = new AppDeleting(ctx)
  
    this.notes = new AppNotes(ctx)
    this.dragging = new AppDragging(ctx)
    this.cloning = new AppCloning(ctx)
    this.editing = new AppEditing(ctx)
    this.collapsing = new AppCollapsing(ctx)
    this.resizing = new AppResizing(ctx)
    this.dropping = new AppDropping(ctx)
  
    this.pos = new AppPos(ctx)
    this.sizes = new AppSizes(ctx)
    this.rects = new AppRects(ctx)
  
    this.camera = new AppCamera(ctx)
    this.panning = new AppPanning(ctx)
    this.zooming = new AppZooming(ctx)
  
    this.selection = new AppSelection(ctx)
    this.activeRegion = new AppActiveRegion(ctx)
    this.activeElem = new AppActiveElem(ctx)
    this.clickSelection = new AppClickSelection(ctx)
    this.boxSelection = new AppBoxSelection(ctx)
  }
}




export default defineNuxtPlugin((ctx, inject) => {
  new App(ctx, inject)
})