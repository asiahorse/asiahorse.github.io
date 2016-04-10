/*
 * @Author: Administrator
 * @Date:   2016-01-22 15:28:23
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-01-23 22:46:06
 */

'use strict';

function Cake(option) {
  this._init(option);
}

Cake.prototype = {
  _init: function(option) {
    this.x = option.x;
    this.y = option.y;
    this.outerColor = option.outerColor;
    this.data = option.data;
    this.innerRadius = option.innerRadius;
    this.outerRadius = option.outerRadius;
    this.outerStroke = option.outerStroke;
    this.group = new Konva.Group({
      x: this.x,
      y: this.y
    });
    // 画一个外圆
    //
    //
    var outerCircle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: this.outerRadius,
      stroke: this.outerStroke,

    });
    this.group.add(outerCircle);
    //console.log(outerCircle);
    var beginAngle = -90;
    var endAngle = -90;
    var _this = this;
    // 绘制扇形
    this.data.forEach(function(item, index) {
      var beginAngle = item.value * 360
      var arc = new Konva.Arc({
        x: 0,
        y: 0,
        outerRadius: _this.innerRadius,
        angle: beginAngle,
        fill: item.color,
        rotation: endAngle,
        name: "arc"
      });

      //console.log(arc);
      // 绘制文字
      var textAngle = endAngle + item.value * 360 / 2;
      var text = new Konva.Text({
        x: (_this.outerRadius + 20) * Math.cos(textAngle * Math.PI / 180),
        y: (_this.outerRadius + 20) * Math.sin(textAngle * Math.PI / 180),
        fontSize: 20,
        fill: item.color,
        text: item.name,
        align: "center",
      });
      if (textAngle > 90 && textAngle < 270) {
        text.x(text.x() - text.width());
      }
      endAngle += beginAngle;
      _this.group.add(arc);
      _this.group.add(text);
    });

  },
  addToGroupOrLayer: function(groupOrLayer) {
    groupOrLayer.add(this.group);
  },
  moveTo: function() {
    var arcArr = this.group.find(".arc");
    arcArr.forEach(function(item, index) {
      var oldAngle = item.angle();
      item.angle(0);
      item.to({
        angle: oldAngle,
        duration: 2
      });
    });
  }
}
