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

import * as pos from './space/pos'
import * as sizes from './space/sizes'
import * as rects from './space/rects'

import { AppCamera } from './camera/camera'
import * as panning from './camera/panning'
import * as zooming from './camera/zooming'

import * as selection from './selection/selection'
import * as activeRegion from './selection/active-region'
import * as activeElem from './selection/active-elem'
import * as clickSelection from './selection/click-selection'
import * as boxSelection from './selection/box-selection'




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

  pos: pos.IAppPos
  sizes: sizes.IAppSizes
  rects: rects.IAppRects

  camera: AppCamera
  panning: panning.IAppPanning
  zooming: zooming.IAppZooming

  selection: selection.IAppSelection
  activeRegion: activeRegion.IAppActiveRegion
  activeElem: activeElem.IAppActiveElem
  clickSelection: clickSelection.IAppClickSelection
  boxSelection: boxSelection.IAppBoxSelection




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
  
    this.pos = pos.init(ctx)
    this.sizes = sizes.init(ctx)
    this.rects = rects.init(ctx)
  
    this.camera = new AppCamera(ctx)
    this.panning = panning.init(ctx)
    this.zooming = zooming.init(ctx)
  
    this.selection = selection.init(ctx)
    this.activeRegion = activeRegion.init(ctx)
    this.activeElem = activeElem.init(ctx)
    this.clickSelection = clickSelection.init(ctx)
    this.boxSelection = boxSelection.init(ctx)
  }
}




export default defineNuxtPlugin((ctx, inject) => {
  new App(ctx, inject)
})