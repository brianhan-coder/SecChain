let JTopo = window.JTopo;
const nodeWidth = 92;
const nodeHeight = 135;
export default function Wtopo(canvas) {
  this.stage = new JTopo.Stage(canvas);
  this.scene = new JTopo.Scene(this.stage);
  this.stage.mode = "select";
}

Wtopo.prototype = {
  drawNode(option) {
    let node = new JTopo.Node();
    node.dragable = option.dragable ? true : false;
    node.setCenterLocation(...option.position);
    Object.assign(node, option);
    node.textOffsetY = -50;
    Object.assign(node, option);
    node.setSize(nodeWidth, nodeHeight);
    node.setImage(getNodeImage(node));
    node.shadow = "true";
    node.Wtopo = this;
    node.setText(option.deviceInfo.ip);
    this.scene.add(node);
    return node;
  },
  drawStackNode(text, color = "56,94,106") {
    let node = new JTopo.Node(text || "");
    node.setSize(180, 40);
    node.fillColor = color;
    node.textPosition = "Middle_Center";
    node.borderRadius = 5;
    this.scene.add(node);
    return node;
  },
  drawTextNode(text, position = [0, 0]) {
    var textNode = new JTopo.TextNode(text);
    this.scene.add(textNode);
    textNode.setLocation(...position); // 位置
    return textNode;
  },
  drawBlock(option) {
    var node = new JTopo.Node(option.text || "");
    node.dragable = false;
    node.nodeId = option.nodeId || "";
    node.blockType = option.blockType || "normal";
    node.setSize(option.size, option.size);
    node.fillColor = option.color || "112,150,64";
    node.textPosition = "Middle_Center";
    node.setLocation(...option.position);
    this.scene.add(node);
    return node;
  },
  drawImageNode(option) {
    let node = new JTopo.Node(option.text);
    node.setImage(option.image);
    node.setSize(90, 90);
    node.setLocation(...option.position);
    node.dragable = false;
    this.scene.add(node);
    return node;
  },
  drawArrowLink(from, to, option = { color: "178,178,178" }) {
    var link = new JTopo.Link(from, to);
    link.showSelected = false;
    link.lineWidth = 3; // 线宽
    link.strokeColor = option.color;
    link.arrowsRadius = 6;
    this.scene.add(link);
    return link;
  },
  drawProgressBar({
    barHeight = 12,
    value,
    position = [0, 0],
    color = "34,144,191",
  }) {
    var barWidth = getBarWidth(value);
    var node = new JTopo.Node("算力值");
    node.dragable = false;
    node.setLocation(...position);
    node.setSize(barWidth, barHeight);
    node.fillColor = color;
    node.textPosition = "Middle_Left";
    node.textOffsetY = -8;
    node.textOffsetX = -5;
    var oldPaint = node.paint;
    node.paint = function (g) {
      oldPaint.apply(this, arguments);
      g.fillStyle = "178,178,178";
      g.fillText(value, this.getBound().width - 45, this.getBound().height - 8);
    };
    node.setData = function (data) {
      value = data;
      node.setSize(getBarWidth(data), barHeight);
    };
    node.getData = function () {
      return value;
    };
    function getBarWidth(data) {
      var maxWidth = 200; //限制最大宽度
      var maxValue = 2000; //设置最大值
      return data > maxValue ? maxWidth : (data / maxValue) * maxWidth;
    }
    this.scene.add(node);
    return node;
  },
  drawDynamicLink(nodeA, nodeZ, color = "178,178,178") {
    let lastSpeed;
    let speed = 0;
    var animationId;
    var imgnode;
    let that = this;
    var xs = nodeA.cx - nodeZ.cx;
    var xy = nodeA.cy - nodeZ.cy;
    var l = Math.floor(Math.sqrt(xs * xs + xy * xy));
    let xl = xs / l;
    let yl = xy / l;
    return new Promise((resolve) => {
      imgnode = new JTopo.Node();
      imgnode.setSize(1, 1);
      imgnode.zIndex = 2.5;
      let link = new JTopo.Link(nodeA, imgnode);
      link.strokeColor = color;
      link.lineWidth = 2;
      link.alpha = 1;
      link.dashedPattern = 5;
      link.arrowsRadius = 10;
      this.scene.add(link);
      window.requestAnimationFrame(move);
      this.scene.add(imgnode);
      function stop(next) {
        that.scene.remove(imgnode);
        imgnode = null;
        next();
      }
      function move() {
        if (imgnode) {
          var animespeed = new Date() / 10;
          var colorpoint = parseInt(animespeed % l);
          imgnode.rotate = Math.atan(xy / xs) + (xs > 0 ? Math.PI : 0);
          imgnode.cx = nodeA.cx - colorpoint * xl;
          imgnode.cy = nodeA.cy - colorpoint * yl;
          lastSpeed = speed;
          speed = colorpoint;
          if (speed < lastSpeed) {
            stop(resolve);
          }
          animationId = window.requestAnimationFrame(move);
        } else {
          window.cancelAnimationFrame(animationId);
        }
      }
    });
  },
  drawContainer(text) {
    var container = new JTopo.Container(text);
    container.fillColor = "255, 255, 255";
    container.fontColor = "255,255,255";
    container.font = "18pt 微软雅黑";
    container.alpha = 0.1;
    container.paintSelected = function (a) {
      a.shadowBlur = 10;
      a.shadowColor = "rgba(76,13,25,1)";
      a.shadowOffsetX = 0;
      a.shadowOffsetY = 0;
    };
    container.dragable = false;
    container.childDragble = false;
    this.scene.add(container);
    return container;
  },
  drawLink(from, to, option = { color: "178,178,178" }) {
    var link = new JTopo.CurveLink(from, to);
    const oldPaintPath = link.paintPath;
    link.showSelected = false;
    link.paintPath = function (a) {
      a.setLineDash([5, 5]);
      oldPaintPath.apply(this, arguments);
    };
    link.lineWidth = 3; // 线宽
    link.strokeColor = option.color;
    this.scene.add(link);
    return link;
  },
  attack: function (nodeA, nodeZ) {
    var animationId;
    var imgnode;
    var xs = nodeA.cx - nodeZ.cx;
    var xy = nodeA.cy - nodeZ.cy;
    var l = Math.floor(Math.sqrt(xs * xs + xy * xy));
    let xl = xs / l;
    let yl = xy / l;
    return new Promise((resolve) => {
      imgnode = new JTopo.Node();
      imgnode.setSize(1, 1);
      imgnode.zIndex = 2.5;
      imgnode.rotate = Math.atan(xy / xs) + (xs > 0 ? Math.PI : 0);
      imgnode.cx = nodeA.cx;
      imgnode.cy = nodeA.cy;
      this.scene.add(imgnode);
      let link = new JTopo.Link(nodeA, imgnode);
      link.strokeColor = "230, 7, 7";
      link.lineWidth = 4;
      link.alpha = 1;
      link.dashedPattern = 5;
      link.arrowsRadius = 10;
      this.scene.add(link);
      window.requestAnimationFrame(move);
      resolve(stop.bind(this));
    });
    function stop() {
      this.scene.remove(imgnode);
      imgnode = null;
    }
    function move() {
      if (imgnode) {
        var animespeed = new Date() / 5;
        var colorpoint = parseInt(animespeed % l);
        imgnode.cx = nodeA.cx - colorpoint * xl;
        imgnode.cy = nodeA.cy - colorpoint * yl;
        animationId = window.requestAnimationFrame(move);
      } else {
        window.cancelAnimationFrame(animationId);
      }
    }
  },
  JSONtoTopo(nodeJson, link = true, callback) {
    nodeJson.forEach((element) => {
      let node = this.drawNode(element);
      if (link) {
        this.connect(node);
      }
      if (callback && typeof callback === "function") {
        callback(node);
      }
    });
  },
  topoToJson() {
    let nodeList = this.scene.getDisplayedNodes().filter((node) => node.nodeId);
    let nodeJson = nodeList.map((node) => {
      let json = {
        nodeId: node.nodeId,
        position: node.position,
        deviceInfo: node.deviceInfo,
      };
      if (node.link_id) {
        json.link_id = node.link_id;
      }
      return json;
    });
    return nodeJson;
  },
  connect(fromNode) {
    let nodeList = this.scene.getDisplayedNodes();
    if (fromNode.link_id && fromNode.link_id.length) {
      fromNode.link_id.forEach((v) => {
        let toNode = nodeList.find((item) => {
          return v === item.nodeId;
        });
        if (toNode) {
          this.drawLink(fromNode, toNode);
        }
      });
    }
  },
  connectTopo(nodeList) {
    nodeList.forEach((fromNode) => {
      if (fromNode.link_id && fromNode.link_id.length) {
        this.connect(fromNode);
      }
    });
  },
  getNodeById(id) {
    let elements = this.scene.findElements((node) => {
      return node.nodeId === id;
    });
    if (elements && elements.length) {
      return elements[0];
    }
    return null;
  },
  add(node, time = 1000) {
    node.alpha = 0;
    this.scene.add(node);
    JTopo.Animate.stepByStep(node, { alpha: 1 }, time, false).start();
  },
  remove(node, time = 1000) {
    JTopo.Animate.stepByStep(node, { alpha: 0 }, time, false).start();
    setTimeout(() => {
      this.scene.remove(node);
    }, time - 1);
  },
};

JTopo.Node.prototype.attackNode = function (node, percent) {
  this.deviceInfo.attackStatus = "P";
  return this.Wtopo.attack(this, node).then((stop) => {
    return node.paintProgress(percent, 1).then(() => {
      if (percent === 100) {
        stop();
        node.deviceInfo.attackStatus = "Y";
        node.resetImage();
      }
    });
  });
};
JTopo.Node.prototype.moveTo = function ({ x, y }, time = 1000) {
  if (!x || x === 0) {
    x = this.x;
  }
  if (!y || y === 0) {
    y = this.y;
  }
  return new Promise((resolve) => {
    JTopo.Animate.stepByStep(this, { x, y }, time, false).start();
    setTimeout(() => {
      this.setLocation(x, y);
      resolve();
    }, time - 1);
  });
};

JTopo.Node.prototype.paintProgress = function (percent, speed = 100) {
  let width = nodeWidth;
  let height = nodeHeight;
  const oldPaint = this.paint;
  let startX = 5 - width / 2; // 10 - width / 2 - 5  进度条起始x坐标
  let endX = width / 2 - 2; // 10 + width / 2 - 12;  进度条结束x坐标
  let toY = height / 2; // 10 + height / 2 - 10
  let color = ["#994420", "#2B6A85", "#85AD42"];
  let strokeColor = color[parseInt(this.deviceInfo.childNet) - 1];
  let pStartX = startX; // 进度条已经移动到的x坐标
  return new Promise((resolve) => {
    let excuted = false; //paint会被不停调用  确保resolve只执行一次
    this.paint = function (g) {
      oldPaint.apply(this, arguments);
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(startX, toY);
      let pWidth = (percent / 100) * width - 11;
      g.strokeStyle = strokeColor;
      let distance = pStartX - startX;
      if (distance < pWidth) {
        pStartX = pStartX + speed;
      } else {
        if (!excuted) {
          excuted = true;
          resolve(this);
        }
      }
      if (pStartX < endX) {
        g.lineTo(pStartX, toY);
      } else {
        g.lineTo(endX, toY);
      }
      g.stroke();
    };
  });
};

JTopo.Node.prototype.alert = function (text) {
  this.alarm = text;
};
JTopo.Node.prototype.resetImage = function () {
  this.setImage(getNodeImage(this));
};

JTopo.Node.prototype.setText = function (data) {
  let text = "#" + this.nodeId + " " + data;
  this.text = text;
};

function getNodeImage(node) {
  let base = "/static/images/wdBlockChain/topo/";
  let attacked = base + "attacked.png";
  let crucial = base + "crucial.png";
  let normal = base + "normal.png";
  let img = normal;
  if (node.deviceInfo.type === "attack") {
    img = attacked;
  }
  if (node.deviceInfo.isCrucial) {
    img = crucial;
  }
  if (node.deviceInfo.attackStatus === "Y") {
    img = attacked;
  }
  return img;
}

//判断两节点间是否有连线
// function isExistThisLink(nodeA, nodeZ) {
//   var aid = nodeA._id,
//     zid = nodeZ._id,
//     flag = false;
//   //从nodeA引出的连接线
//   if (!nodeA.outLinks) {
//     return flag;
//   } else {
//     var links = nodeA.outLinks;
//     for (var i = 0, len = links.length; i < len; i++) {
//       var lk = links[i];
//       if (lk.nodeA._id == aid && lk.nodeZ._id == zid) {
//         flag = true;
//         break;
//       }
//     }
//     return flag;
//   }
// }
