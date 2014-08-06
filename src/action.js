(function (){
  function actionMaker(domNode, options){
    
    //FIXME: Quick and dirty run through

    // Create an element to hold the canvas that famous will show
    var actionElement = document.createElement('div');
    actionElement.id = 'famousHook';
    document.body.appendChild(actionElement);

    // Create an rendered version on the node for later use.
    html2canvas(domNode, {
      background: undefined,
      onrendered: function(canvas) {
        var image = new Image();
        image.id = 'pic';
        image.src = canvas.toDataURL();
        image.onload = function() {
          document.body.appendChild(image);
        }
      }
    });
  }

  // publish library for use
  window.action = actionMaker;
})();