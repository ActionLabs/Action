define(function(require, exports, module) {
  var Engine  = require('famous/core/Engine');
  var CanvasView = require('views/CanvasView');

  var canvasView;

  function FamousContext(){
    var mainContext = Engine.createContext(window.actionElement);

    mainContext.setPerspective(1000);

    canvasView = new CanvasView();

    mainContext.add(canvasView);    
  }

  FamousContext.prototype = Object.create(Object.prototype);
  FamousContext.prototype.constructor = FamousContext;

  FamousContext.prototype.getCanvasContext = function() {
    return canvasView.getContext();
  }


  
  module.exports = FamousContext;
});