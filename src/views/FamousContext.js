define(function(require, exports, module) {
  var Engine  = require('famous/core/Engine');
  var CanvasView = require('views/CanvasView');

  var mainContext = Engine.createContext(window.actionElement);

  mainContext.setPerspective(1000);

  var canvasView = new CanvasView();

  mainContext.add(canvasView);
  
});