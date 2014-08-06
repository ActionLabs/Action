/*** CanvasView ***/

// define this module in Require.JS
define(function(require, exports, module) {
  // Import additional modules to be used in this view 
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var CanvasSurface = require('famous/surfaces/CanvasSurface');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  // Constructor function for our CanvasView class
  function CanvasView() {

      // Applies View's constructor function to CanvasView class
      View.apply(this, arguments);

      _createCanvas.call(this);
  }

  // Establishes prototype chain for CanvasView class to inherit from View
  CanvasView.prototype = Object.create(View.prototype);
  CanvasView.prototype.constructor = CanvasView;

  CanvasView.prototype.getContext = function() {
    return this.canvasSurface.getContext('2d');
  }

  // Default options for CanvasView class
  CanvasView.DEFAULT_OPTIONS = {
    size: [500, 500]
  };


  // Define your helper functions and prototype methods here
  function _createCanvas() {
    this.canvasSurface = new CanvasSurface({size: [500, 500]});
    var ctx = this.canvasSurface.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, 500, 500);

    this.add(this.canvasSurface);
  }

  module.exports = CanvasView;
});