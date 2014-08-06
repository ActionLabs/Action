(function (){
  function actionMaker(domNode, options){
    
    //FIXME: Quick and dirty run through

    // Create an element to hold the canvas that famous will show
    window.actionElement = document.createElement('div');
    window.actionElement.id = 'famousHook';
    document.body.appendChild(window.actionElement);

    // Create the famous container for adding a canvas (used the previously created actionElement)
    require.config({
      baseUrl: '../src/'
    });
    require(['views/FamousContext'], function(FamousContext){
      var famousContext = new FamousContext();

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