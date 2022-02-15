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
  IApp,
}




class IApp {
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




  constructor(context: Context, inject: Inject) {
    inject('app', this)


  

    this.collab = collab.init(context)
  
    this.project = project.init(context)
    this.page = page.init(context)
    
    this.elems = elems.init(context)
    this.clipboard = clipboard.init(context)
    this.deleting = deleting.init(context)
  
    this.notes = notes.init(context)
    this.dragging = dragging.init(context)
    this.cloning = cloning.init(context)
    this.editing = editing.init(context)
    this.collapsing = collapsing.init(context)
    this.resizing = resizing.init(context)
    this.dropping = dropping.init(context)
  
    this.pos = pos.init(context)
    this.sizes = sizes.init(context)
    this.rects = rects.init(context)
  
    this.camera = camera.init(context)
    this.panning = panning.init(context)
    this.zooming = zooming.init(context)
  
    this.selection = selection.init(context)
    this.activeRegion = activeRegion.init(context)
    this.activeElem = activeElem.init(context)
    this.clickSelection = clickSelection.init(context)
    this.boxSelection = boxSelection.init(context)
  }
}




export default defineNuxtPlugin((context, inject) => {
  new IApp(context, inject)
})