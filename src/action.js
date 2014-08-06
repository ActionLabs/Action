(function (){
  var actionElement;
  var originalNode;
  var originalNextSibling;

  function actionMaker(domNode, options){
    originalNode = domNode;
    
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
      actionElement = document.createElement('div');
      actionElement.id = 'famousHook';
      actionElement.style.width = size[0] + 'px';
      actionElement.style.height = size[1] + 'px';
      actionElement.style.display = 'block';


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

  window.addActionElement = function(){
    var nodeParent = originalNode.parentNode;
    originalNextSibling = originalNode.nextSibling
    nodeParent.removeChild(originalNode);
    if (originalNextSibling) {
      nodeParent.insertBefore(actionElement, originalNextSibling);
    } else {
      nodeParent.appendChild(actionElement);
    }
  }

  window.removeActionElement = function(){
    var nodeParent = actionElement.parentNode;
    nodeParent.removeChild(actionElement);
    if (originalNextSibling) {
      nodeParent.insertBefore(originalNode, originalNextSibling);
    } else {
      nodeParent.appendChild(originalNode);
    }
  }
})();