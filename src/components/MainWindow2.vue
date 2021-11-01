<template>
  <div class="wrapper">
    <header class="main-head">Test for zooming om punkt</header>

    <div class="content">
      <SvgWorkSpace></SvgWorkSpace>
    </div>
    <aside class="side">
      <div class="spaceMe">
        <label for="viewBox_x"> viewBox x</label>
        <input id="viewBox_x" type="number" v-model="viewBox_x" />
      </div>
      <div class="spaceMe">
        <label for="viewBox_y"> viewBox y</label>
        <input id="viewBox_y" type="number" v-model="viewBox_y" />
      </div>
      <div class="spaceMe">
        <label for="viewBox_dx"> viewBox dx</label>
        <input id="viewBox_dx" type="number" v-model="viewBox_dx" />
      </div>
      <div class="spaceMe">
        <label for="viewBox_dy"> viewBox dy</label>
        <input id="viewBox_dy" type="number" v-model="viewBox_dy" />
      </div>
      <div class="spaceMe">
        <label for="zoomValue"> zoom factor</label>
        <input id="zoomValue" type="number" v-model="zoomValue" />
      </div>
      <div class="spaceMe">
        <label for="zoomPX">zoom point X</label>
        <input id="zoomPX" type="number" v-model="zoomPX" />
      </div>
      <div class="spaceMe">
        <label for="zoomPY">zoom point Y</label>
        <input id="zoomPY" type="number" v-model="zoomPY" />
      </div>
      <div class="spaceMe">
        <button @click="zoomIn">Zoom In</button>
        <button @click="zoomOut">Zoom Out</button>
      </div>
    </aside>
  </div>
</template>

<script>
import { store } from "../store/store.js";

import SvgWorkSpace from "./SvgWorkSpace.vue";
export default {
  components: {
    SvgWorkSpace,
  },
  methods: {
    zoomInnie() {
      store.zoomInStore();
    },
    zoomIn() {
      let zoomAA = store.state.origDX / store.state.viewBox_dx;

      // ny bredde
      store.state.viewBox_dx = store.state.viewBox_dx / store.state.zoomNum;

      // ny høyde
      store.state.viewBox_dy = store.state.viewBox_dy / store.state.zoomNum;

      // ny x-pos
      let thePX =
        store.state.zoomPX -
        (1 / (store.state.zoomNum * zoomAA)) * store.state.zoomPX;
      store.state.viewBox_x = thePX;

      // ny y-pos
      let thePY =
        store.state.zoomPY -
        (1 / (store.state.zoomNum * zoomAA)) * store.state.zoomPY;
      store.state.viewBox_y = thePY;
    },

    zoomOut() {
      // bredde
      store.state.viewBox_dx = store.state.viewBox_dx * store.state.zoomNum;
      // høyde
      store.state.viewBox_dy = store.state.viewBox_dy * store.state.zoomNum;
      // x

      // y
    },
  },
  computed: {
    origDX() {
      return store.state.origDX;
    },
    origDY() {
      return store.state.origDY;
    },

    zoomValue: {
      get() {
        return store.state.zoomNum;
      },
      set(val) {
        store.state.zoomNum = val;
      },
    },
    viewBox_x: {
      get() {
        return store.state.viewBox_x;
      },
      set(val) {
        store.state.viewBox_x = val;
      },
    },
    viewBox_y: {
      get() {
        return store.state.viewBox_y;
      },
      set(val) {
        store.state.viewBox_y = val;
      },
    },
    viewBox_dx: {
      get() {
        return store.state.viewBox_dx;
      },
      set(val) {
        store.state.viewBox_dx = val;
      },
    },
    viewBox_dy: {
      get() {
        return store.state.viewBox_dy;
      },
      set(val) {
        store.state.viewBox_dy = val;
      },
    },
    zoomPX: {
      get() {
        return store.state.zoomPX;
      },
      set(val) {
        store.state.zoomPX = val;
      },
    },
    zoomPY: {
      get() {
        return store.state.zoomPY;
      },
      set(val) {
        store.state.zoomPY = val;
      },
    },
    getMouseX() {
      return store.state.mouseX;
    },
    getMouseY() {
      return store.state.mouseY;
    },
  },
};
</script>

<style scoped>
.main-head {
  grid-area: header;
  background-color: rgb(158, 255, 171);
}
.content {
  grid-area: content;
  background-color: rgb(213, 235, 215);
  max-height: 600px;
  overflow: hidden;
}

.side {
  grid-area: sidebar;
  background-color: rgb(181, 226, 247);
  display: block;
}

.wrapper {
  display: grid;
  gap: 20px;
  grid-template-areas:
    "header"
    "content"
    "sidebar";
}
@media (min-width: 500px) {
  .wrapper {
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "header  header"
      "sidebar content";
  }
  nav ul {
    display: flex;
    justify-content: space-between;
  }
}
.spaceMe {
  margin: 10px;
}
</style>