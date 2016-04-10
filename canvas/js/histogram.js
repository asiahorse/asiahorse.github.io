function Histogram(option) {
  this._init(option);
}

Histogram.prototype = {
  _init: function(option) {
    this.data = option.data;
    this.x = option.x;
    this.y = option.y;
    this.width = option.width;
    this.height = option.height
    this.stroke = option.stroke;
    this.cornerRadius = option.cornerRadius;
    this.group = new Konva.Group({
      x: this.x,
      y: this.y
    });
    // 绘制直线
    this.redLine = new Konva.Line({
      points: [0, 0, this.width, 0],
      stroke: 'red',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    this.group.add(this.redLine);
    // 绘制矩形
    //
    var dataWidth = this.width / this.data.length;
    for (var i = 0; i < this.data.length; i++) {
      var rect = new Konva.Rect({
        x: dataWidth * (1 / 4 + i),
        y: -this.data[i].value * this.height,
        width: dataWidth / 2,
        height: this.data[i].value * this.height,
        fill: this.data[i].color,
        name: "rect"
      });
      this.group.add(rect);


      var upText = new Konva.Text({
        X: dataWidth * i,
        y: -this.data[i].value * this.height - 20,
        width: dataWidth,
        fontSize: 20,
        fill: this.data[i].color,
        text: this.data[i].value * 100 + "%",
        align: "center",
        name: "upText"
      });
      this.group.add(upText);

      var downText = new Konva.Text({
        X: dataWidth * (1 / 2 + i),
        y: 5,
        fontSize: 20,
        text: this.data[i].name,
        fill: this.data[i].color,
        rotation: 45,
        name: "downText"
      });
      this.group.add(downText);
    }

  },
  addToGroupOrLayer: function(groupOrLayer) {
    groupOrLayer.add(this.group);
  },
  moveTo: function() {
    // 得到group中所有的矩形
    var rectArr = this.group.find(".rect");
    rectArr.forEach(function(item, index) {
      var oldHeight = item.height();
      item.height(0);
      var oldY = item.y();
      item.y(0);
      item.to({
        y: oldY,
        height: oldHeight,
        duration: 1
      });
    });
    // 文字的动态效果
    var upTextArr = this.group.find(".upText"); //
    //得到柱状图的原始高
    upTextArr.forEach(function(item, index) {
      var oldY = item.y();
      item.y(-item.fontSize());
      item.to({
        y: oldY,
        duration: 1
      });
    });
  }
}
