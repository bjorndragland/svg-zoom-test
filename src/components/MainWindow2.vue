<template>
  <div class="wrapper">
    <header class="main-head">
      <h1>Test for zooming om punkt og panning</h1>
    </header>

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
        <button @click="resetZoom">Reset View</button>
      </div>
      <div class="spaceMe">
        <button @click="resetPoint">Delete the Point</button>
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
    resetZoom() {
      store.resetView();
    },
    resetPoint() {
      store.resetPoint();
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

h1{
font-size: 1.2em
}

.main-head {
  grid-area: header;
  background-color: rgb(234, 244, 248);
  min-height: 50px;
}
.content {
  grid-area: content;
  background-color: rgb(224, 226, 226);
  max-height: 600px;
  overflow: hidden;
}

.side {
  grid-area: sidebar;
  background-color: rgb(234, 244, 248);
  display: block;
}

.wrapper {
  display: grid;
  gap: 10px;
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
  margin: 12px;
}
</style>