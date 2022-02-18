import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'




import * as collab from './collab'

import * as project from './project'
import * as page from './page'

import * as elems from './elems/elems'
import * as clipboard from './elems/clipboard'
import * as deleting from './elems/deleting'

import * as notes from './notes/notes'
import * as dragging from './notes/dragging'
import * as cloning from './notes/cloning'
import * as editing from './notes/editing'
import * as collapsing from './notes/collapsing'
import * as resizing from './notes/resizing'
import * as dropping from './notes/dropping'

import * as pos from './space/pos'
import * as sizes from './space/sizes'
import * as rects from './space/rects'

import * as camera from './camera/camera'
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
  collab: collab.IAppCollab

  project: project.IAppProject
  page: page.IAppPage

  elems: elems.IAppElems
  clipboard: clipboard.IAppClipboard
  deleting: deleting.IAppDeleting

  notes: notes.IAppNotes
  dragging: dragging.IAppDragging
  cloning: cloning.IAppCloning
  editing: editing.IAppEditing
  collapsing: collapsing.IAppCollapsing
  resizing: resizing.IAppResizing
  dropping: dropping.IAppDropping

  pos: pos.IAppPos
  sizes: sizes.IAppSizes
  rects: rects.IAppRects

  camera: camera.IAppCamera
  panning: panning.IAppPanning
  zooming: zooming.IAppZooming

  selection: selection.IAppSelection
  activeRegion: activeRegion.IAppActiveRegion
  activeElem: activeElem.IAppActiveElem
  clickSelection: clickSelection.IAppClickSelection
  boxSelection: boxSelection.IAppBoxSelection




  constructor(ctx: Context, inject: Inject) {
    inject('app', this)


  

    this.collab = collab.init(ctx)
  
    this.project = project.init(ctx)
    this.page = page.init(ctx)
    
    this.elems = elems.init(ctx)
    this.clipboard = clipboard.init(ctx)
    this.deleting = deleting.init(ctx)
  
    this.notes = notes.init(ctx)
    this.dragging = dragging.init(ctx)
    this.cloning = cloning.init(ctx)
    this.editing = editing.init(ctx)
    this.collapsing = collapsing.init(ctx)
    this.resizing = resizing.init(ctx)
    this.dropping = dropping.init(ctx)
  
    this.pos = pos.init(ctx)
    this.sizes = sizes.init(ctx)
    this.rects = rects.init(ctx)
  
    this.camera = camera.init(ctx)
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