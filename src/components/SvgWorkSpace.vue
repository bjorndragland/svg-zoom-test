<template>
  <svg
    id="svgmain"
    class="noDrag"
    :viewBox="this.viewBoxString"
    preserveAspectRatio="xMidYMid meet"
    @mousedown="startDrag($event)"
    @mousemove="drag($event)"
    @mouseup="endDrag($event)"
    @mouseleave="endDrag($event)"
  >
    <rect
      class="noDrag"
      x="0"
      y="0"
      width="500"
      height="300"
      fill="#DDE8F0"
      stroke="black"
    />
    <rect
      class="noDrag"
      @mouseup="newItem($event)"
      x="0"
      y="0"
      width="500"
      height="300"
      fill="#ADC3D8"
      pointer-events="visible"
    />

    <rect
      class="noDrag"
      x="50"
      y="50"
      width="100"
      height="100"
      fill="#3BB878"
    />
    <line x1="60" x2="60" y1="50" y2="150" stroke="teal" />
    <line x1="70" x2="70" y1="50" y2="150" stroke="teal" />
    <line x1="80" x2="80" y1="50" y2="150" stroke="teal" />
    <line x1="90" x2="90" y1="50" y2="150" stroke="teal" />
    <line x1="100" x2="100" y1="50" y2="150" stroke="black" />
    <line x1="110" x2="110" y1="50" y2="150" stroke="teal" />
    <line x1="120" x2="120" y1="50" y2="150" stroke="teal" />
    <line x1="130" x2="130" y1="50" y2="150" stroke="teal" />
    <line x1="140" x2="140" y1="50" y2="150" stroke="teal" />

    <line x1="50" x2="150" y1="60" y2="60" stroke="teal" />
    <line x1="50" x2="150" y1="70" y2="70" stroke="teal" />
    <line x1="50" x2="150" y1="80" y2="80" stroke="teal" />
    <line x1="50" x2="150" y1="90" y2="90" stroke="teal" />
    <line x1="50" x2="150" y1="100" y2="100" stroke="black" />
    <line x1="50" x2="150" y1="110" y2="110" stroke="teal" />
    <line x1="50" x2="150" y1="120" y2="120" stroke="teal" />
    <line x1="50" x2="150" y1="130" y2="130" stroke="teal" />
    <line x1="50" x2="150" y1="140" y2="140" stroke="teal" />

    <rect
      class="noDrag"
      x="200"
      y="50"
      width="100"
      height="100"
      fill="#8882BE"
    />
    <rect
      class="noDrag"
      x="350"
      y="50"
      width="100"
      height="100"
      fill="#FFBF9C"
    />

    <g v-for="points in this.objsFromStore" :key="points.id">
      <circle :id="points.id" :cx="points.cx" :cy="points.cy" r="5" />
    </g>
  </svg>
</template>

<script>
import { store } from "../store/store.js";

export default {
  created() {
    document.addEventListener("wheel", this.zooming);
  },

  data() {
    return {
      dragging: false,
      panning: false,
      offsetx: 0,
      offsety: 0,
      selectedId: "",
      zoomFactor: 2,
      initX: 0,
      initY: 0,
    };
  },
  computed: {
    viewBoxString() {
      return (
        store.state.viewBox_x +
        " " +
        store.state.viewBox_y +
        " " +
        store.state.viewBox_dx +
        " " +
        store.state.viewBox_dy
      );
    },
    objsFromStore() {
      return store.state.collOfPoints;
    },
  },
  methods: {
    zooming(e) {
      let curMousePos = this.getMouseScrollSvgPosition(e);
      store.zoomInStore(curMousePos.x, curMousePos.y, e.deltaY);
    },
    mouseCoords(evt) {
      store.state.mouseX = evt.clientX;
      store.state.mouseY = evt.clientY;
    },

    newItem(evt) {
      if (
        evt.button === 0 &&
        this.panning == false &&
        store.state.collOfPoints.length == 0
      ) {
        let topsvg = evt.target.parentNode;
        let pt = topsvg.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        let svgP = pt.matrixTransform(topsvg.getScreenCTM().inverse());
        let newId = Math.floor(Math.random() * 100000000);
        let thePoint = {
          id: newId,
          cx: Math.round(svgP.x),
          cy: Math.round(svgP.y),
        };
        this.$set(this.objsFromStore, this.objsFromStore.length, thePoint);
      }
    },

    startDrag(evt) {
      var selectedElement;
      var offset;
      if (evt.target.classList.contains("noDrag") == false) {
        this.selectedId = evt.target.getAttributeNS(null, "id");
        selectedElement = evt.target;
        offset = this.getMousePosition(evt, selectedElement);
        offset.x -= parseFloat(selectedElement.getAttributeNS(null, "cx"));
        offset.y -= parseFloat(selectedElement.getAttributeNS(null, "cy"));
        this.offsetx = offset.x;
        this.offsety = offset.y;
        this.dragging = true;
      } else if (
        evt.target.classList.contains("noDrag") == true &&
        (evt.button === 1 || (evt.altKey && evt.button === 0))
      ) {
        // pan mode
        this.panning = true;
        let curMousePos = this.getMouseScrollSvgPosition(evt);
        this.initX = curMousePos.x;
        this.initY = curMousePos.y;
      }
    },

    drag(evt) {
      if (this.dragging == true) {
        evt.preventDefault();
        var theOne = document.getElementById(this.selectedId);
        var coord = this.getMousePosition(evt, theOne);

        this.objsFromStore[0].cx = coord.x - this.offsetx;
        this.objsFromStore[0].cy = coord.y - this.offsety;
      } else if (this.panning == true) {
        let curMousePos = this.getMouseScrollSvgPosition(evt);
        store.panInStore(this.initX, this.initY, curMousePos.x, curMousePos.y);
      }
    },

    endDrag() {
      this.offsetx = null;
      this.offsety = null;
      this.dragging = false;
      this.panning = false;
      this.selectedId = "";
    },

    getMousePosition(evt, svg) {
      var CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d,
      };
    },
    getMouseScrollSvgPosition(evt) {
      let themain = document.getElementById("svgmain");
      var point = themain.createSVGPoint();
      point.x = evt.clientX;
      point.y = evt.clientY;
      var startPoint = point.matrixTransform(themain.getScreenCTM().inverse());
      return {
        x: startPoint.x,
        y: startPoint.y,
      };
    },
  },
};
</script>

<style>
</style>