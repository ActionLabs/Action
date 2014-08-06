(function (){
  function actionMaker(domNode, options){
    
    //FIXME: Quick and dirty run through

    // Get size information from the domNode
    var size = getElementSize(domNode);
    console.log('Width: ', domNode.clientWidth, ' Height: ', domNode.clientHeight);

    // Create an element to hold the canvas that famous will show
    var actionElement = document.createElement('div');
    actionElement.id = 'famousHook';
    document.body.appendChild(actionElement);

    // Create the famous container for adding a canvas (used the previously created actionElement)
    require.config({
      baseUrl: '../src/'
    });
    require(['views/FamousContext'], function(FamousContext){
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

  function getElementSize(domNode) {
    return [domNode.clientWidth + getBorderWidth(domNode), domNode.clientHeight + getBorderHeight(domNode)];
  }

  function getBorderWidth(domNode) {
    var leftBorderWidth = getComputedStyle(domNode, null).getPropertyValue('border-left-width');
    var rightBorderWidth = getComputedStyle(domNode, null).getPropertyValue('border-right-width');
    leftBorderWidth = parseInt(leftBorderWidth.slice(0, leftBorderWidth.length - 2));
    rightBorderWidth = parseInt(rightBorderWidth.slice(0, rightBorderWidth.length - 2));
    return 0 + leftBorderWidth + rightBorderWidth;
  }

  function getBorderHeight(domNode) {
    var topBorderHeight = getComputedStyle(domNode, null).getPropertyValue('border-top-width');
    var bottomBorderHeight = getComputedStyle(domNode, null).getPropertyValue('border-bottom-width');
    topBorderHeight = parseInt(topBorderHeight.slice(0, topBorderHeight.length - 2));
    bottomBorderHeight = parseInt(bottomBorderHeight.slice(0, bottomBorderHeight.length - 2));
    return 0 + topBorderHeight + bottomBorderHeight;
  }

  // publish library for use
  window.action = actionMaker;
})();