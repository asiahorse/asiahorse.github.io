/*
 * @Author: Administrator
 * @Date:   2016-01-22 18:48:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-01-23 23:24:49
 */

'use strict';

function Schedule(option) {
  this._init(option);
}

Schedule.prototype = {
  _init: function(option) {
    this.stage = option.stage;
    this.x = option.x || 0,
      this.y = option.y || 0,
      this.outerWidth = option.outerWidth || 0,
      this.height = option.height || 0,
      this.outerStroke = option.outerStroke || "red",
      this.innerWidth = option.innerWidth || 0,
      this.innerFill = option.innerFill || "blue",
      this.outerCornerRadius = option.outerCornerRadius,
      this.innerCornerRadius = option.innerCornerRadius,
      this.text = option.text,
      this.fontSize = option.fontSize,
      this.group = new Konva.Group({
        x: this.x,
        y: this.y
      });
    // 绘制矩形
    this.outerRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.outerWidth,
      height: this.height,
      stroke: this.outerStroke,
      cornerRadius: this.outerCornerRadius
    });
    this.group.add(this.outerRect);
    this.innerRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.innerWidth,
      height: this.height,
      fill: this.innerFill,
      cornerRadius: this.innerCornerRadius
    });
    this.group.add(this.innerRect);

    // 添加文本
    this.text = new Konva.Text({
      x: 0,
      y: -this.fontSize - 4,
      width: this.outerWidth,
      fontSize: this.fontSize,
      fontFamily: "Calibri",
      text: this.text,
      fill: "#555",
      align: "center"
    });
    this.group.add(this.text);
  },

  addToLayerOrGroup: function(layerOrGroup) {
    layerOrGroup.add(this.group);
  },
  moveTo: function() {
    var _this = this;
    this.innerRect.to({
      width: this.outerWidth,
      duration: 2
    });
    setInterval(function() {
      var textWidth = _this.innerRect.width();
      var num = Math.ceil(textWidth / _this.outerWidth * 100) + "%";
      _this.text.text("努力加载 " + num);
    }, 10);
  }


}
