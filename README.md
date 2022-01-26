# svg-zoom-test

### A test-project mainly for zooming and panning on a SVG


* Zoom; mouse-wheel-scroll to and from the cursor location
* Pan with mouse; hold down middle mouse-button and drag the SVG around
* Pan with laptop touchpad; hold down the ALT-key and left-button and drag the SVG around
* Left-click to add a point to the SVG 
* Drag the point by grabbing it and moving it around
* Simplified store pattern (not vuex) with direct mutations for quick development...
* Visible and, to an extent, editable Viewbox and zoom-variables
* CSS Grid for layout

### Credits and inspiration
* Zoom, Pan: https://codepen.io/osublake/pen/oGoyYb
* Dragging SVG-elements: https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/

![screenshot](/src/assets/svg_zoom_test.png)

### Link
https://kraftanlegget.no/svg-zoom-test/dist/#/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
