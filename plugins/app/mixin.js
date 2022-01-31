const mixin = {
  setup() {
    $app.reset()


    

    
    // Release pointer down for touchscreen

    onMounted(() => {
      document.addEventListener('pointerdown', onPointerDownCapture, true)
    })

    function onPointerDownCapture(event) {
      event.target.releasePointerCapture(event.pointerId)
    }

    onUnmounted(() => {
      document.removeEventListener('pointerdown', onPointerDownCapture, true)
    })





    // Pointer move

    onMounted(() => {
      document.addEventListener('pointermove', onPointerMove)
    })

    function onPointerMove(event) {
      $app.panning.update(event)
      
      $app.boxSelection.update(event)
    }

    onUnmounted(() => {
      document.removeEventListener('pointermove', onPointerMove)
    })





    // Pointer up

    onMounted(() => {
      document.addEventListener('pointerup', onPointerUp)
    })

    function onPointerUp(event) {
      $app.panning.finish(event)
      
      $app.boxSelection.finish(event)
    }

    onUnmounted(() => {
      document.removeEventListener('pointerup', onPointerUp)
    })
  }
}




export default async function ({ app }) {
	app.mixins = app.mixins ?? []
  app.mixins.push(mixin)
}