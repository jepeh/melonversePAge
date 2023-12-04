class CampaignScene extends Phaser.Scene {
    constructor(w, h){
        super("Campaign")

        this.w = w
        this.h = h
        

        // 1792 922 - full screen
        // 430 932 mobile
        // 1024 1366 ipad

        this.scale = {
            scaleX: 430 / this.w,
            scaleY: 932 / this.h
        }

        // map info
        this.gridInfo = {
            rows: 15,
            cols: 10,
            w: 1,
            h: 1,
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

        this.maxHeight = this.gridInfo.h * this.gridInfo.rows;
       
        
     
    }

    // first method to be called in phaser scene instance
    create(){

       
       
        //create/render map 
        // check orientation of device
        if (this.h > this.w) {
            this.gridInfo.w = this.w / this.gridInfo.cols;
            this.gridInfo.h = this.gridInfo.w;
        } else {
            this.gridInfo.h = this.h / this.gridInfo.rows;
            this.gridInfo.w = this.gridInfo.h; 
        }
        

            // update canvas
            // this/game is the parent of this scene, the canvas of phaser game
            this.scale.setGameSize(this.gridInfo.w * this.gridInfo.cols, this.h)
            this.scale.autoCenter = Phaser.Scale.CENTER_BOTH
            
            
            

            // draw the map
            this.drawMap()

    }

    // call if screen is adjusted
    adjustScreen(){
          // check orientation of device
          if (this.h > this.w) {
            this.gridInfo.w = this.w / this.gridInfo.cols;
            this.gridInfo.h = this.gridInfo.w;
        } else {
            this.gridInfo.h = this.h / this.gridInfo.rows;
            this.gridInfo.w = this.gridInfo.h;
        }

            // update canvas
            // this/game is the parent of this scene, the canvas of phaser game
            this.scale.setGameSize(this.gridInfo.w * this.gridInfo.cols, this.h)
            

            // draw the map
            this.drawMap()
    }

    drawMap(){

        const { rows, cols, w, h, data } = this.gridInfo;

       
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                
                if (data[i][j]) {
                    
                    var tiles = this.add.rectangle(j * w +(w/2), i * h, w *.999, h * .999);
                        tiles.setStrokeStyle(1, 0x000000)
                    
                } 
            }
        }
        
    }

    // method called immediately to load assets in phaser scene
    preload(){

    }

    // method called in each frame in phaser
    update(){

    }
}