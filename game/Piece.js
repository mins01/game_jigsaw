"use strict";

class Piece{
    piece=null;
    shape=null;
    constructor(){
        this.#create();
    }
    #create(){
        // <div class="piece-wrap" data-pos-x="0" data-pos-y="0"><div class="piece-shape" data-shape-top="p" data-shape-right="p" data-shape-bottom="p" data-shape-left="p"></div></div>
        this.piece = document.createElement('div');
        this.piece.className = 'piece-wrap';
        this.piece.dataset.posX = '0';
        this.piece.dataset.posY = '0';
        this.shape = document.createElement('div');
        this.shape.className = 'piece-shape';
        this.shape.dataset.shapeTop= '0';
        this.shape.dataset.shapeRight= '0';
        this.shape.dataset.shapeBottom= '0';
        this.shape.dataset.shapeLeft= '0';
        this.piece.appendChild(this.shape);
    }

    get posX(){ return parseInt(this.piece.dataset.posX); }
    set posX(v){ this.piece.dataset.posX = v; }
    get posY(){ return parseInt(this.piece.dataset.posY); }
    set posY(v){ this.piece.dataset.posY = v; }

    get shapeTop(){ return this.shape.dataset.shapeTop; }
    set shapeTop(v){ this.shape.dataset.shapeTop = v; }
    get shapeRight(){ return this.shape.dataset.shapeRight; }
    set shapeRight(v){ this.shape.dataset.shapeRight = v; }
    get shapeBottom(){ return this.shape.dataset.shapeBottom; }
    set shapeBottom(v){ this.shape.dataset.shapeBottom = v; }
    get shapeLeft(){ return this.shape.dataset.shapeLeft; }
    set shapeLeft(v){ this.shape.dataset.shapeLeft = v; }

    static randPN(){
        if(Math.floor(Math.random()*2)===0){
            return 'n'
        };
        return 'p'
    }
}

export default Piece;