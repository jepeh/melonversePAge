/*

const canvas = document.getElementById('game-surface');
const ctx = canvas.getContext('2d');

var instrucions = document.getElementById("game-instructions");
var seedsDisplay = document.getElementById("seeds");


// delta time
var last = 0;
var delta = 0;

// game start
var startGame = false; // orientation prep
var gameStart = true; // start game
var gameover = false;

// mouse 
var mDown = false;
var rDown = false;
var lDown = false;

// timer
var timer = null;

// scale
var scaleX = 1;
var scaleY = 1;

var colors = ['#0f0', '#FEE1D4', '#D0E8F2', '#DAEEC9', '#FFF7D3', '#FFE9E7', 
    '#fbf3d0', '#f4e477', '#bc9640', '#fed4d7', '#fe9ba3', '#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'];

var scoreTxt = null;

const gridInfo = {
    rows: 15,
    cols: 10,
    w: 105.077,
    h: 105.077,
    data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
    ]
}

const mobInfo = {
    startPos: null,
    w: 0,
    h: 0,
    speed: 50,
    colors: colors
}

var mobs = [];
var detours = [];

const towerInfo = {
    w: 0,
    h: 0
}

var towers = [];
var grid = [];
var maxHeight = 0;

var spawnRate = 5;
var spawnT = 0;

var dragX = 0;
var dragY = 0;
var dragID = -1;
var highlightCoord = {
    row: -1,
    col: -1
}

var seeds = 4;
var mobLimit = 20;

// #9feafe
// #f8d780
// #f99e81
// #71c2f8
// #6886e8
// #a25de0
// #8b3a88
// #190d28

// 1792 922 - full screen
// 430 932 mobile
// 1024 1366 ipad

// #fb2121 - red
// #C7FC12 - lime
/*
 * GAME INITIATLIZATIONS AND CONTROLS
 */

/*
function main(w, h) {
   
    seedsDisplay.innerHTML = 'Seeds: ' + seeds;

    scaleX = 430 / w;
    scaleY = 932 / h;

    // gridInfo.h = h / gridInfo.rows;
    
    if (h > w) {
        gridInfo.w = w / gridInfo.cols;
        gridInfo.h = gridInfo.w;
    } else {
        gridInfo.h = h / gridInfo.rows;
        gridInfo.w = gridInfo.h;
    }
    
    maxHeight = gridInfo.h * gridInfo.rows;

    // if (gridInfo.h > h) {

    // }
    
    canvas.width = gridInfo.w * gridInfo.cols;
    canvas.height = h;

    // gridInfo.h = h / gridInfo.rows;
    

    mobInfo.w = mobInfo.h = gridInfo.h * .75;
    towerInfo.w = towerInfo.h = gridInfo.h * .76;

    
    
    // console.log(w, h)

    mobInfo.startPos = getGridPos(2, 0, mobInfo);
    mobInfo.startPos.x = mobInfo.w * -2;

    canvas.style.display = 'block';
    instrucions.style.display = 'none';

    addMob();

    addDetour(2, 8, { x: 0, y: mobInfo.speed });
    addDetour(5, 8, { x: -mobInfo.speed, y: 0 });
    addDetour(5, 1, { x: 0, y: mobInfo.speed });
    addDetour(7, 1, { x: mobInfo.speed, y: 0 });
    addDetour(7, 8, { x: 0, y: mobInfo.speed });
    addDetour(10, 8, { x: -mobInfo.speed, y: 0 });
    addDetour(10, 1, { x: 0, y: mobInfo.speed });
    addDetour(12, 1, { x: mobInfo.speed, y: 0 });
    addDetour(12, 8, { x: 0, y: mobInfo.speed });
    addDetour(14, 8, { x: 0, y: mobInfo.speed });

    // init grid
    for (let i = 0; i < gridInfo.rows; ++i) {
        grid[i] = [];
        for (let j = 0; j < gridInfo.cols; ++j) {
            grid[i][j] = -1;
        }
    }

    controls();
    
    gameCycle();
}

function placeTower(row, col) {
    if (seeds > 0) {
        if (grid[row][col] == -1 && gridInfo.data[row][col]) {
            let pos = getGridPos(row, col, towerInfo);
            let tower = new Tower(pos.x, pos.y, towerInfo.w, towerInfo.h);
            tower.initText(ctx, canvas.width, canvas.height, scaleX, scaleY);
            tower.setText(30, 'bold', tower.w * 0.4, tower.h * 0.4, '#000');
            tower.row = row;
            tower.col = col;
            towers.push(tower);
    
            grid[row][col] = towers.length - 1;
    
            seedsDisplay.innerHTML = 'Seeds: ' + (--seeds);
    
            return true;
        }
    }

    return false;
}

function displayTower() {
    for (let i = 0; i < towers.length; ++i) {
        if (towers[i]) {
            towers[i].draw(ctx);
            let mob = getClosestMob(towers[i]);
            if (mob) {
                towers[i].attack(ctx, mob, mobInfo, delta, () => {
                    seeds++;
                    seedsDisplay.innerHTML = 'Seeds: ' + seeds;
                });
            }
        }
    }
}

function getClosestMob(tower) {
    let minDist = Infinity;
    let closestMob = null;

    for (let i = 0; i < mobs.length; ++i) {
        let midX = mobs[i].x + mobs[i].w / 2;
        let midY = mobs[i].y + mobs[i].h / 2;
        let row = Math.floor(midY / gridInfo.h);
        let col = Math.floor(midX / gridInfo.w);

        // let dist = Math.sqrt(dx * dx + dy * dy);
        let dx = Math.abs(col - tower.col);
        let dy = Math.abs(row - tower.row);
        let dist = dx + dy;

        if (tower.level >= dx && tower.level >= dy) {
            if (dist < minDist) {
                minDist = dist;
                closestMob = mobs[i];
            }
        }   
    }

    return closestMob;
}

function getGridPos(row, col, info) {
    let x = col * gridInfo.w + gridInfo.w / 2 - info.w / 2;
    let y = row * gridInfo.h + gridInfo.h / 2 - info.h / 2;

    return {
        x,
        y
    }
}

function addDetour(row, col, direction) {
    let pos = getGridPos(row, col, mobInfo);
    let detour = {
        x: pos.x,
        y: pos.y,
        w: mobInfo.w,
        h: mobInfo.h,
        direction: direction,
        isVisited: false
    }

    detours.push(detour);
}

function drawDetours() {
    ctx.save();
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 2;

    for (let i = 0; i < detours.length; ++i) {
        ctx.beginPath();
        ctx.rect(detours[i].x, detours[i].y, detours[i].w, detours[i].h);
        ctx.stroke();
    }

    ctx.restore();
}

function checkDetour(mob) {
    const { x, y, w, h } = mob;

    for (let i = 0; i < detours.length; ++i) {
        if (mob.detourID < i) {
            // let detourEdgeX = detours[i].x + detours[i].w;
            // let detourEdgeY = detours[i].y + detours[i].h;
            // let dx = x - detours[i].x;
            // let dy = y - detours[i].y;
            // let dist = Math.sqrt(dx * dx + dy & dy);
            
            // if ((x + w >= detourEdgeX) && (y + h >= detourEdgeY)) {
            if (mob.vx < 0) {
                if (x <= detours[i].x && y >= detours[i].y) {
                    setMobDirection(mob, detours[i]);
                    break;
                }
            } else {
                if (x >= detours[i].x && y >= detours[i].y) {
                    setMobDirection(mob, detours[i]);
                    break;
                }
            }
            
        }
    }
}

function setMobDirection(mob, detour) {
    mob.x = detour.x;
    mob.y = detour.y;
    // console.log(dist);
    mob.vx = detour.direction.x;
    mob.vy = detour.direction.y;
    mob.detourID = (mob.detourID + 1) % detours.length;
    detour.isVisited = true;
}

function addMob() {
  
    // let mob = new Mob(-mobInfo.w * 1.5, 0, mobInfo.w, mobInfo.h, '#0f0');
    if (mobs.length < mobLimit) {
        let mob = new Mob(mobInfo.startPos.x, mobInfo.startPos.y, mobInfo.w, mobInfo.h, '#0f0');
        mob.vx = mobInfo.speed;
        mob.initText(ctx, canvas.width, canvas.height, scaleX, scaleY);
        mob.setText(30, 'bold', mob.w * 0.40, mob.h * 0.40, '#fff');
        mobs.push(mob);
    }
    
}

function drawMobs() {
    for (let i = 0; i < mobs.length; ++i) {
        mobs[i].draw(ctx);
        mobs[i].update(delta);
        checkDetour(mobs[i]);

        if (mobs[i].y > maxHeight) {
            mobs[i].x = mobInfo.startPos.x;
            mobs[i].y = mobInfo.startPos.y;
            mobs[i].vx = mobInfo.speed;
            mobs[i].vy = 0;
            mobs[i].detourID = -1;
        }
    }
}

function drawMap() {
    const { rows, cols, w, h, data } = gridInfo;

    ctx.save();
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (data[i][j]) {
                ctx.beginPath();
                ctx.rect(j * w, i * h, w, h);
                ctx.stroke();
            }
        }
    }
    ctx.restore();
}

function drawDraggedTower(x, y) {
    if (dragID > -1) {
        const { w, h } = gridInfo;
        // console.log('www', x, y, w, h)
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#DAEEC9';
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.restore();
    }
    
}

function showHighlightedCell() {
    const { row, col } = highlightCoord;
    if (row > -1) {
        if (gridInfo.data[row][col] > 0) {
            let x = col * gridInfo.w;
            let y = row * gridInfo.h;

            ctx.save();
            ctx.strokeStyle = '#f00';
            ctx.lineWidth = '3';
            ctx.beginPath();
            ctx.rect(x, y, gridInfo.w, gridInfo.h);
            ctx.stroke();
            ctx.restore();
        }
    }
}

function controls() {
    let mid = canvas.width / 2;
    let prevPos = 0;
    let prevPosY = 0;

    window.addEventListener('blur', () => {
        // muteAllAudio(true);
    });

    window.addEventListener('focus', () => {
        // muteAllAudio(false);
    });

    document.addEventListener('blur', () => {
        // muteAllAudio(true);
    });

    document.addEventListener('focus', () => {
        // muteAllAudio(false);
    });

    document.addEventListener('touchstart', (e) => {
        e.preventDefault();

        if (gameover) {
            // reset();
        } else {
            if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
                var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
                var touch = evt.touches[0] || evt.changedTouches[0];
                prevPos = touch.pageX;
                prevPosY = touch.pageY;
                
                if (!mDown) {
                    mDown = true;

                    var rect = canvas.getBoundingClientRect();
                    let x = touch.pageX - rect.left;
                    let y = touch.pageY - rect.top;
                    
                    let row = Math.floor(y / gridInfo.h);
                    let col = Math.floor(x / gridInfo.w);

                    if (!placeTower(row, col)) {
                        let idx = grid[row][col];
                        // console.log(row, col, idx);
                        if (idx > -1) {
                            dragID = idx;
                            dragX = x;
                            dragY = y;
                        }
                    }


                }
            }
        }
    });

    document.addEventListener('touchend', (e) => {
        e.preventDefault();
        
        if (!gameover) {
            var touch = e.touches[0] || e.changedTouches[0];
        
            var rect = canvas.getBoundingClientRect();
            let x = touch.pageX - rect.left;
            let y = touch.pageY - rect.top;
            
            let row = Math.floor(y / gridInfo.h);
            let col = Math.floor(x / gridInfo.w);
            // var y = e.changedTouches[event.changedTouches.length-1].pageY;
            
            if (mDown) {
                if (dragID > -1) {
                    // console.log(grid[row][col])
                    if (grid[row][col] > -1 && towers[grid[row][col]] != null && 
                        (towers[dragID].row != row || towers[dragID].col != col) && 
                        towers[dragID].element == towers[grid[row][col]].element && 
                        towers[dragID].level == towers[grid[row][col]].level) {
                        towers[grid[row][col]].levelUp();
                        grid[towers[dragID].row][towers[dragID].col] = -1;
                        towers[dragID] = null;
                    }
                }
                
                mDown = false;
                dragID = -1;
                dragX = -1;
                dragY = -1;
                highlightCoord.row = -1;
                highlightCoord.col = -1;
            }
        }
    });

    document.addEventListener('touchmove', e => {
        // mousemoveE(e.touches[0].clientX, e.touches[0].clientY);
        if (!gameover) {
            if (e.type == 'touchmove') {
                var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
                var touch = evt.touches[0] || evt.changedTouches[0];
                // let x = touch.pageX;
                // let y = touch.pageY;

                var rect = canvas.getBoundingClientRect();
                let x = touch.pageX - rect.left;
                let y = touch.pageY - rect.top;

                if (gameover) mDown = false;

                if (mDown) {
                    if (dragID > -1) {
                        // drawDraggedTower(x, y);
                        dragX = x;
                        dragY = y;

                        highlightCoord.row = Math.floor(y / gridInfo.h);
                        highlightCoord.col = Math.floor(x / gridInfo.w);
                    }
                }

                prevPos = x;
                prevPosY = y;
            }
        }
    });

    canvas.addEventListener('touchend', e => {
        var touch = e.touches[0] || e.changedTouches[0];
        let x = touch.pageX;
        let y = touch.pageY;

        if (!gameStart) {
            
            gameStart = true;
        } 

        if (mDown) {
            
        }

        if (gameover) {
            // reset();
        }
        
    });

    canvas.addEventListener('mousedown', e => {
        let mx = e.offsetX;
        let my = e.offsetY;

        if (!mDown) {
            if (gameStart) {
                mDown = true;

                // var rect = canvas.getBoundingClientRect();
                // let x = mx - rect.left;
                // let y = my - rect.top;
                
                let row = Math.floor(my / gridInfo.h);
                let col = Math.floor(mx / gridInfo.w);

                // placeTower(row, col);
                if (!placeTower(row, col)) {
                    let idx = grid[row][col];
                    // console.log(row, col, idx);
                    if (idx > -1) {
                        dragID = idx;
                        dragX = mx;
                        dragY = my;
                    }
                }

                // if (grid[row][col] == 1 && gridInfo.data[row][col]) {

                // }
            }
        }

        
    });


    canvas.addEventListener('mousemove', e => {
        let mx = e.offsetX;
        let my = e.offsetY;

        if (gameover) mDown = false;

        if (mDown) {

            if (dragID > -1) {
                // drawDraggedTower(x, y);
                dragX = mx;
                dragY = my;

                highlightCoord.row = Math.floor(my / gridInfo.h);
                highlightCoord.col = Math.floor(mx / gridInfo.w);
            }

            prevPos = mx;
            prevPosY = my;
        }
    });
    
    canvas.addEventListener('mouseup', e => {
        let mx = e.offsetX;
        let my = e.offsetY;

        if (mDown) {
            if (dragID > -1) {
                let row = Math.floor(my / gridInfo.h);
                let col = Math.floor(mx / gridInfo.w);

                // console.log(grid[row][col])
                if (grid[row][col] > -1 && towers[grid[row][col]] != null && 
                    (towers[dragID].row != row || towers[dragID].col != col) && 
                    towers[dragID].element == towers[grid[row][col]].element && 
                    towers[dragID].level == towers[grid[row][col]].level
                ) {
                    towers[grid[row][col]].levelUp();
                    grid[towers[dragID].row][towers[dragID].col] = -1;
                    towers[dragID] = null;
                }
            }
            
            dragID = -1;
            dragX = -1;
            dragY = -1;
            highlightCoord.row = -1;
            highlightCoord.col = -1;

            if (!gameStart) {
                gameStart = true;
            }

            mDown = false;

            if (gameover) {
                // reset();
            }
        }
    });

    document.addEventListener('keydown', e => {
        if (!gameover) {

            if (e.key == 'ArrowRight') {
                if (!rDown) {
                    rDown = true;
                    
                }
            } else if (e.key == 'ArrowLeft') {
                if (!lDown) {
                    lDown = true;
                }
            }
        }
        
    });

    document.addEventListener('keyup', e => {
        if (!gameover) {
            if (e.key == 'ArrowRight') {
                rDown = false;
            } else if (e.key == 'ArrowLeft') {
                lDown = false;
            }
        }
    });
}

// *********************************** GAME INITIATLIZATIONS AND CONTROLS END ******************************************************** //


/*
 * PHYSICS
 */
/*
function checkAngledCollisions(obj1, obj2) {
    return doPolygonsIntersect(
        [{ x: obj1.x, y: obj1.y }, { x: obj1.x + obj1.w, y: obj1.y }, { x: obj1.x + obj1.w, y: obj1.y + obj1.h }, { x: obj1.x, y: obj1.y + obj1.h }],
        [{ x: obj2.x, y: obj2.y }, { x: obj2.x + obj2.w, y: obj2.y }, { x: obj2.x + obj2.w, y: obj2.y + obj2.h }, { x: obj2.x, y: obj2.y + obj2.h }]
    );
}

// *********************************** PHYSICS END ******************************************************** //
function doPolygonsIntersect (a, b) {
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = null;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (minA == null || projected < minA) {
                    minA = projected;
                }
                if (maxA == null || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = null;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (minB == null || projected < minB) {
                    minB = projected;
                }
                if (maxB == null || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                // CONSOLE("polygons don't intersect!");
                return false;
            }
        }
    }
    return true;
}
/*
 * TEXT DISPLAYS
 */
// function showPoints(pointType) {
//     // HUD.draw(ctx, AM.images.timecircle.img);
//     // jumpPointsT += 1 * delta;
//     if (jump > 0) {
//         let y = eelHead.y + jump - eelHead.h;
//         TXT.follow('points', eelHead.x, y, eelHead.w, eelHead.h);
//         TXT.draw('points');
//         jump -= G * jumpSpeed * delta;
//     }
// }

// function setPoints(points, color) {
//     jump = jumpHeight;
//     TXT.texts['points'].color = color;
//     TXT.texts['points'].str = points;
// }

// *********************************** TEXT DISPLAYS END ******************************************************** //


/*
 * SOUNDS
 
function playCry() {
    // if (HUD.volumeOn) {
        // AM.audio.cry.img.pause();
        // AM.audio.cry.img.currentTime = 0;
        
        setTimeout(() => {
            AM.audio.cry.img.currentTime = 0;
            AM.audio.cry.img.play();
        }, 0);
    // }
}

// function playEat() {
//     if (HUD.volumeOn) {
//         AM.audio.eat.img.pause();
//         AM.audio.eat.img.currentTime = 0;
//         AM.audio.eat.img.play();
//     } 
// }

function playScore() {
    // if (HUD.volumeOn) {
        // AM.audio.score.img.pause();
        // AM.audio.score.img.currentTime = 0;
        setTimeout(() => {
            // AM.audio.score.img.pause();
            AM.audio.score.img.currentTime = 0;
            AM.audio.score.img.play();
        }, 0);
        
    // }
}

// function playBonus() {
//     if (HUD.volumeOn) {
//         AM.audio.bonus.img.pause();
//         AM.audio.bonus.img.currentTime = 0;
//         AM.audio.bonus.img.play();
//     }
// }

// *********************************** SOUNDS END ******************************************************** //

// #11A5CC
// #F8E7CD
/*
 * GAME UPDATES AND CYCLES
 

function spawn() {
    if (spawnT < spawnRate) {
        spawnT += 1 * delta;
    
    } else {
        spawnT = 0;
        addMob();
    }

}

function update() {
    if (delta < 1) {
        // bird.y += bird.vy * birdInfo.speed * delta;
        drawMap();
        drawDetours();
        drawMobs();
        displayTower();

        drawDraggedTower(dragX, dragY);
        showHighlightedCell();

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.fillRect(0, gridInfo.h * gridInfo.rows, canvas.width, canvas.height);
        ctx.restore();

        spawn();
    }
}

function gameCycle() {
    let now = Date.now();
    delta = (now - last) / 1000;
    last = now;

    if (!gameover) {
        if (gameStart) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            update();
        }
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    requestAnimationFrame(gameCycle);
}
*/
// *********************************** GAME UPDATES AND CYCLES END ******************************************************** //


// *********************************** PHASER GAME ENGINE INITIALIZATION *********************************************** //


function main(w, h){

    // go to scenes>campaign.js file for map rendering details
    const CampaignModeScene = new CampaignScene(w, h)
    
    const PvPModeScene = new PvPScene()
    const LobbyModeScene = new LobbyScene()

    var config = {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "#ffffff",
        scene: [CampaignModeScene]
    }

    var Game = new Phaser.Game(config)
    
}
    
