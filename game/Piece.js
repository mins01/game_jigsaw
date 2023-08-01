"use strict";

class Piece{
    wrap=null;
    shape=null;
    constructor(){
        this.#create();
    }
    #create(){
        // <div class="piece-wrap" data-pos-x="0" data-pos-y="0"><div class="piece-shape" data-shape-top="p" data-shape-right="p" data-shape-bottom="p" data-shape-left="p"></div></div>
        this.wrap = document.createElement('div');
        this.wrap.className = 'piece-wrap element-move-target';
        this.wrap.dataset.posX = '0';
        this.wrap.dataset.posY = '0';
        this.shape = document.createElement('div');
        this.shape.className = 'piece-shape';
        this.shape.dataset.shapeTop= '0';
        this.shape.dataset.shapeRight= '0';
        this.shape.dataset.shapeBottom= '0';
        this.shape.dataset.shapeLeft= '0';
        this.wrap.appendChild(this.shape);
        this.wrap.piece = this
    }

    get posX(){ return parseInt(this.wrap.dataset.posX); }
    set posX(v){ this.wrap.dataset.posX = v; }
    get posY(){ return parseInt(this.wrap.dataset.posY); }
    set posY(v){ this.wrap.dataset.posY = v; }

    get shapeTop(){ return this.shape.dataset.shapeTop; }
    set shapeTop(v){ this.shape.dataset.shapeTop = v; }
    get shapeRight(){ return this.shape.dataset.shapeRight; }
    set shapeRight(v){ this.shape.dataset.shapeRight = v; }
    get shapeBottom(){ return this.shape.dataset.shapeBottom; }
    set shapeBottom(v){ this.shape.dataset.shapeBottom = v; }
    get shapeLeft(){ return this.shape.dataset.shapeLeft; }
    set shapeLeft(v){ this.shape.dataset.shapeLeft = v; }

    get fixed(){ return this.wrap.classList.contain('fixed');}
    set fixed(v){ v?this.wrap.classList.add('fixed'):this.wrap.classList.remove('fixed');}

    get zIndex(){ return parseInt(this.wrap.style.zIndex??0); }
    set zIndex(v){ this.wrap.style.zIndex = v;}

    static randPN(){
        return Math.floor(Math.random()*2)===0?'n':'p'
    }
}

export default Piece;