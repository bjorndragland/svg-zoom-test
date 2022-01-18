import Vue from "vue";

export const store = Vue.observable({
  state: {
    scaleNum: 1,
    zoomNum: 1.2,
    origDX: 500,
    origDY: 300,
    viewBox_x: 0,
    viewBox_y: 0,
    viewBox_dx: 500,
    viewBox_dy: 300,
    zoomPX: 50,
    zoomPY: 50,
    mouseX: "",
    mouseY: "",
    collOfPoints: [

    ]
  },

  resetView() {
    store.state.viewBox_x = 0
    store.state.viewBox_y = 0
    store.state.viewBox_dx = store.state.origDX
    store.state.viewBox_dy = store.state.origDY
  },

  zoomInStore(x, y, dx) {
    let thePX, thePY
    if (dx > 0) {
      store.state.scaleNum = Number(store.state.zoomNum)
    }
    else {
      store.state.scaleNum = 1 / Number(store.state.zoomNum)
    }
    store.state.viewBox_dx = Number(store.state.viewBox_dx) * Number(store.state.scaleNum)
    store.state.viewBox_dy = Number(store.state.viewBox_dy) * Number(store.state.scaleNum)
    thePX = Number(store.state.viewBox_x) - ((x - Number(store.state.viewBox_x)) * (Number(store.state.scaleNum) - 1))
    store.state.viewBox_x = thePX

    thePY = Number(store.state.viewBox_y) - ((y - Number(store.state.viewBox_y)) * (Number(store.state.scaleNum) - 1))
    store.state.viewBox_y = thePY
  },
  panInStore(initx, inity, x, y) {
    store.state.viewBox_x = Number(store.state.viewBox_x) + (initx - x)
    store.state.viewBox_y = Number(store.state.viewBox_y) + (inity - y)
    // console.log(x + " " + y + " - - " + initx + " " + inity)
  }
}
);