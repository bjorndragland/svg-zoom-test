import Vue from "vue";

export const store = Vue.observable({
  state: {
    scaleNum: 1,
    zoomNum: 1.1,
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
  zoomInStore(x, y, dx) {

    store.state.zoomPX = x
    store.state.zoomPY = y
    if (dx < 0) {
      // scrolling opp, innzooming
      let zoomAA = store.state.origDX / store.state.viewBox_dx
      // ny bredde
      store.state.viewBox_dx = store.state.viewBox_dx / store.state.zoomNum;
      // ny høyde
      store.state.viewBox_dy = store.state.viewBox_dy / store.state.zoomNum;

      let dx1 = store.state.newZoomPX - store.state.zoomPX
      console.log(dx1);
      let dxfaktor = dx1 * (store.state.viewBox_dx / store.state.origDX)
      console.log(dxfaktor);

      // ny x-pos
      // let thePX =
      //   store.state.newZoomPX -
      //   (1 / (store.state.zoomNum * zoomAA)) * store.state.newZoomPX;
      // store.state.viewBox_x = thePX;

      let thePX = store.state.viewBox_x + ((store.state.zoomPX - store.state.viewBox_x) * store.state.zoomNum)
      store.state.viewBox_x = thePX

      // ny y-pos
      let thePY =
        store.state.zoomPY -
        (1 / (store.state.zoomNum * zoomAA)) * store.state.zoomPY;
      store.state.viewBox_y = thePY;


    } else {
      // scrolling ned, utzooming
    }
  },
  zoomInStore2(x, y, dx) {

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


    // console.log(thePX);
    //store.state.zoomPX
  }
}
);