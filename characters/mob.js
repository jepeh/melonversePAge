class Mob {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.w = w;
        this.h = h;

        this.vx = 0;
        this.vy = 0;

        this.color = color;
        this.detourID = -1;

        this.text = null;
        this.totalTextWidth = 0;
        this.hp = 1;
        this.level = 1;
    }

    initText(ctx, w, h, sx, sy) {
        this.text = new Text(ctx, w, h);
        this.text.setScale(sx, sy);
    }

    textFollow() {
        this.text.follow('text', this.x + this.w / 2 - this.text.texts['text'].w / 2, this.y + this.h / 2, 0, 0);
        // console.log(this.x + this.w / 2 - this.totalTextWidth / 2)
    }

    setText(fontH, fontWeight, w, h, color) {
        this.totalTextWidth = w * this.hp.toString().length;
        this.text.addText('text', this.hp, fontWeight, fontH, 'Montserrat', 0, 0, this.totalTextWidth, h, color, true);
        this.textFollow();
    }

    displayText() {
        this.textFollow();
        this.text.draw('text');
        // console.log(this.text.texts['text']);
    }

    drawOuter(ctx) {
        ctx.save();
        // Untransformed draw position
        const position = {x: this.x, y: this.y};
        // In degrees
        const rotation = { x: 0, y: 0, z: this.zRotate};
        // Rotation relative to here (this is the center of the image)
        // const rotPt = { x: this.w / 2, y: this.h / 2 };
        const rotPt = { x: this.rotAnchor.x, y: this.rotAnchor.y };

        ctx.setTransform(new DOMMatrix()
            .translateSelf(position.x + rotPt.x, position.y + rotPt.y)
            .rotateSelf(rotation.x, rotation.y, rotation.z)
        );

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.roundRect(-rotPt.x, -rotPt.y, this.w, this.h, [20]);
        ctx.stroke();
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(-rotPt.x, -rotPt.y, this.w, this.h, [20]);
        ctx.fill();


        // ctx.font = 'bold 24px Montserrat';
        // ctx.textAlign = 'left';
        // ctx.textBaseline = 'top';
        // ctx.fillStyle = '#000';
        // ctx.fillText(this.txt, -rotPt.x + this.mid.x, -rotPt.y + this.mid.y);
        this.txt.drawRot('text', -rotPt.x, -rotPt.y, this.w, this.h);

        // ctx.beginPath();
        // ctx.rect(this.txt.texts['text'].x, this.txt.texts['text'].y, this.txt.texts['text'].w, this.txt.texts['text'].h);
        // ctx.stroke();

        ctx.restore();
    }

    update(delta) {
        this.x += delta * this.vx;
        this.y += delta * this.vy;
    }

    draw(ctx) {
        const { x, y, w, h, color } = this;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.stroke();
        ctx.restore();

        this.displayText();
    }
}