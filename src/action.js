(function (){
  function actionMaker(domNode, options){
    
    //FIXME: Quick and dirty run through

    require.config({
      baseUrl: '../src/'
    });
    require(['views/FamousContext',
             'tools/DomTools'], 
             function(FamousContext, DomTools){
              
      // Get size information from the domNode
      var size = DomTools.getElementSize(domNode);

      // Create an element to hold the canvas that famous will show
      var actionElement = document.createElement('div');
      actionElement.id = 'famousHook';
      document.body.appendChild(actionElement);

      var famousContext = new FamousContext(actionElement, size);

      // Create an rendered version on the node for later use.
      html2canvas(domNode, {
        background: undefined,
        onrendered: function(canvas) {
          var image = new Image();
          image.id = 'pic';
          image.src = canvas.toDataURL();
          image.onload = function() {
            var canvasContext = famousContext.getCanvasContext();
            canvasContext.drawImage(image, 0, 0);
          }
        }
      });
    });
  }

  // publish library for use
  window.action = actionMaker;
})();