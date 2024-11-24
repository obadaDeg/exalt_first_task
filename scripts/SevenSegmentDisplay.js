// export default class SevenSegmentDisplay {
//   constructor(canvasId, x, y, width, height, pointDepth) {
//     this.canvas = document.getElementById(canvasId);
//     this.ctx = this.canvas.getContext("2d");
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.pointDepth = pointDepth;
//     this.encodings = [
//       0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f,
//     ];
//     this.segments = this.createSegments();
//   }

//   createSegments() {
//     const { x, y, width, height, pointDepth } = this;
//     return [
//       this.createSegment(x + 35, y + 16, width, 12, pointDepth, true),
//       this.createSegment(x + 78, y + 30, 12, height, pointDepth),
//       this.createSegment(x + 78, y + 88, 12, height, pointDepth),
//       this.createSegment(x + 35, y + 130, width, 12, pointDepth, true),
//       this.createSegment(x + 20, y + 88, 12, height, pointDepth),
//       this.createSegment(x + 20, y + 30, 12, height, pointDepth),
//       this.createSegment(x + 35, y + 73, width, 12, pointDepth, true),
//     ];
//   }

//   createSegment(x, y, width, height, pointDepth, horizontal = false) {
//     const segment = new Path2D();
//     segment.rect(x, y, width, height);
//     if (horizontal) {
//       segment.moveTo(x, y);
//       segment.lineTo(x - pointDepth, y + height / 2);
//       segment.lineTo(x, y + height);
//       segment.moveTo(x + width, y);
//       segment.lineTo(x + width + pointDepth, y + height / 2);
//       segment.lineTo(x + width, y + height);
//     } else {
//       segment.moveTo(x, y);
//       segment.lineTo(x + width / 2, y - pointDepth);
//       segment.lineTo(x + width, y);
//       segment.moveTo(x, y + height);
//       segment.lineTo(x + width / 2, y + height + pointDepth);
//       segment.lineTo(x + width, y + height);
//     }
//     segment.closePath();
//     return segment;
//   }

//   setSegment(segment, isOn) {
//     const offColor = "#1E1E1E";
//     const onColor = "red";
//     this.ctx.strokeStyle = offColor;
//     this.ctx.stroke(segment);
//     this.ctx.fillStyle = isOn ? onColor : offColor;
//     this.ctx.fill(segment);
//   }

//   setAllSegments(isOn) {
//     this.segments.forEach((segment) => this.setSegment(segment, isOn));
//   }

//   applyNumber(number) {
//     for (let i = 0; i < 7; i++) {
//       this.setSegment(this.segments[i], this.encodings[number] & (1 << i));
//     }
//   }

//   async startCounter(interval = 1000) {
//     this.setAllSegments(false);
//     let count = 0;
//     while (true) {
//       this.applyNumber(count);
//       await this.wait(interval);
//       count = (count + 1) % 10;
//     }
//   }

//   wait(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
// }


