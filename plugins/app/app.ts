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
import * as dragging from './notes/dragging'
import * as cloning from './notes/cloning'
import * as editing from './notes/editing'
import * as collapsing from './notes/collapsing'
import * as resizing from './notes/resizing'
import * as dropping from './notes/dropping'

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
  dragging: dragging.IAppDragging
  cloning: cloning.IAppCloning
  editing: editing.IAppEditing
  collapsing: collapsing.IAppCollapsing
  resizing: resizing.IAppResizing
  dropping: dropping.IAppDropping

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
    this.dragging = dragging.init(ctx)
    this.cloning = cloning.init(ctx)
    this.editing = editing.init(ctx)
    this.collapsing = collapsing.init(ctx)
    this.resizing = resizing.init(ctx)
    this.dropping = dropping.init(ctx)
  
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