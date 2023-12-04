class Tower {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.w = w;
        this.h = h;

        this.row = 0;
        this.col = 0;

        this.mid = {
            x: x + w / 2,
            y: y + h / 2,
        }

        
        this.level = 1;
        this.levelUpT = 0;

        this.bullets = [];
        
        this.bulletSpeed = 3;
        this.element = Math.floor(Math.random() * 4);
        let colors = ['#DAEEC9', '#71c2f8', '#D0312D', '#80471C']; // air, water, fire, earth
        this.color = colors[this.element];
        this.bulletColor = 'orange';
        this.addBullets();

    }

    levelUp() {
        this.level++;
        this.setText(30, 'bold', this.w * 0.4, this.h * 0.4, '#000');
        this.textFollow();

        this.levelUpT = 2;
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
        this.totalTextWidth = w * this.level.toString().length;
        this.text.addText('text', this.level, fontWeight, fontH, 'Montserrat', 0, 0, this.totalTextWidth, h, color, true);
        this.textFollow();
    }

    displayText() {
        // this.textFollow();
        this.text.draw('text');
        // console.log(this.text.texts['text']);
    }

    addBullets() {
        this.bullets.push({
            x: this.mid.x,
            y: this.mid.y,
            r: this.w * 0.10,
            t: 0
        });
    }

    attack(ctx, mob, mobInfo, delta, callback) {
        for (let i = 0; i < this.bullets.length; ++i) {
            const { x, y, r } = this.bullets[i];
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fillStyle =  this.bulletColor;
            ctx.fill();
            this.bullets[i].t += this.bulletSpeed * delta;

            if (this.bullets[i].t >= 1) {
                this.bullets[i].t = 1;
                this.bullets[i].x = this.mid.x;
                this.bullets[i].y = this.mid.y;
                this.bullets[i].t = 0;
                mob.hp -= this.level;

                if (mob.hp < 1) {
                    mob.x = mobInfo.startPos.x;
                    mob.y = mobInfo.startPos.y;
                    
                    mob.vy = 0;
                    mob.detourID = -1;
                    mob.hp = Math.min(999, ++mob.level);

                    mob.vx = mobInfo.speed + Math.min(200, mob.hp);
                    let idx = Math.floor(mob.hp / 10) % mobInfo.colors.length;
                    mob.color = mobInfo.colors[idx];
                    // console.log(idx)
                    
                    if (callback) {
                        callback();
                    }
                }

                mob.setText(30, 'bold', mob.w * 0.4, mob.h * 0.4, '#fff');

                
            } else {
                this.bullets[i].x = lerp(this.mid.x, mob.x + mob.w / 2, this.bullets[i].t);
                this.bullets[i].y = lerp(this.mid.y, mob.y + mob.h / 2, this.bullets[i].t);
            }
        }
    }
    
    update(delta) {
        
    }

    displayLevelUp() {
        if (this.levelUpT > 0) {
            const { x, y, w, h } = this;

            let a = Math.sin(this.levelUpT) * this.w;
            this.levelUpT -= 5 * delta;
            

            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = '10';
            ctx.beginPath();
            ctx.rect(x - a / 2, y - a / 2, w + a, h + a);
            ctx.stroke();
            ctx.restore();

            if (this.levelUpT <= 0) {
                this.levelUpT = 0;
            }
        }
    }

    draw(ctx) {
        const { x, y, w, h, color } = this;

        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.restore();

        this.displayLevelUp();

        this.displayText();
    }
}