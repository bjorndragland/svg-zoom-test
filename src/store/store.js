import Vue from "vue";

export const store = Vue.observable({
  state: {
    zoomNum: "2",
    zoomTime: "0",
    origDX: "500",
    origDY: "300",
    viewBox_x: "0",
    viewBox_y: "0",
    viewBox_dx: "500",
    viewBox_dy: "300",
    zoomPX: "0",
    zoomPY: "0",
    newZoomPX: "0",
    newZoomPY: "0",
    mouseX: "",
    mouseY: "",
    collOfPoints: [

    ]
  },
  zoomInStore(x, y, dx) {

    if (store.state.zoomPX == "0") {
      store.state.zoomPX = x
      store.state.zoomPY = y
    }

    store.state.newZoomPX = x
    store.state.newZoomPY = y

    //store.state.zoomPX = x
    //store.state.zoomPY = y

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
      let thePX =
        store.state.newZoomPX - dxfaktor -
        (1 / (store.state.zoomNum * zoomAA)) * store.state.newZoomPX;
      store.state.viewBox_x = thePX;
      // ny y-pos
      let thePY =
        store.state.newZoomPY -
        (1 / (store.state.zoomNum * zoomAA)) * store.state.newZoomPY;
      store.state.viewBox_y = thePY;

      store.state.zoomPX = store.state.newZoomPX
      store.state.zoomPY = store.state.newZoomPY

    } else {
      // scrolling ned, utzooming


    }





  }
});