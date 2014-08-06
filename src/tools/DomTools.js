define(function(require, exports, module) {
  var DomTools = {};

  DomTools.getElementSize = function(domNode) {
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
  
  module.exports = DomTools;
});