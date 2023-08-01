"use strict";

import Piece from "./Piece.js";

class Board{
    board = null;
    pieces = [];
    usedPieces = [];
    constructor(board){
        this.board = board;
    }

    get divX(){ return parseInt(this.board.style.getPropertyValue('--div-x')); }
    set divX(v){ this.board.style.setProperty('--div-x',v); }
    get divY(){ return parseInt(this.board.style.getPropertyValue('--div-y')); }
    set divY(v){ this.board.style.setProperty('--div-y',v); }

    get width(){ return parseInt(this.board.style.getPropertyValue('--jigsaw-width')); }
    set width(v){ this.board.style.setProperty('--jigsaw-width',v+'px'); }
    get height(){ return parseInt(this.board.style.getPropertyValue('--jigsaw-height')); }
    set height(v){ this.board.style.setProperty('--jigsaw-height',v+'px'); }

    initEvent(){
        this.board.addEventListener('pointerdown',this.pointerdown)
        this.board.addEventListener('pointerup',this.pointerup)
        
    }
    syncZIndex(){
        this.usedPieces.sort((a,b)=>{
            return a.zIndex - b.zIndex;
        })
        this.usedPieces.forEach((piece,idx) => {
            piece.zIndex = idx+1+10;
        });
    }
    pointerdown = (event)=>{
        let target = ElementMove.findTarget(event.target);
        if(!target) return;
        let piece = target.piece??null;
        piece.zIndex = 999999;
    }
    pointerup = (event)=>{
        let target = ElementMove.findTarget(event.target);
        if(!target) return;
        let piece = target.piece??null;
        let rect = target.getBoundingClientRect();
        let pos = ElementMove.pos(target);

        if(Math.abs(pos.x/rect.width) < 0.3 && Math.abs(pos.y/rect.height) < 0.3){
            ElementMove.moveTo(target,0,0);
            piece.fixed = true;
        }
        this.syncZIndex()
    }


    draw(){
        this.board.innerHTML = null;
        for(let i=this.pieces.length,m=this.divX * this.divY;i<m;i++){ //필요 피스 수 만큼 늘림 (늘어난 걸 줄이지는 않음)
            this.pieces.push(new Piece());
        }
        let i = 0;
        this.usedPieces = [];
        for(let iY=0,mY=this.divY;iY<mY;iY++){
            for(let iX=0,mX=this.divX;iX<mX;iX++){
                let piece = this.pieces[i++];
                piece.fixed = false;
                this.usedPieces.push(piece);
                piece.posX = iX;
                piece.posY = iY;
                piece.shapeTop = Piece.randPN();
                piece.shapeRight = Piece.randPN();
                piece.shapeBottom = Piece.randPN();
                piece.shapeLeft = Piece.randPN();
                // 테투리 피스 0
                if(piece.posX ===0 ){ piece.shapeLeft = '0';}
                else{ piece.shapeLeft = this.pieces[piece.posX -1 + piece.posY * mX].shapeRight=='n'?'p':'n' } //왼쪽 피스 도출에 싱크
                if(piece.posY ===0 ){ piece.shapeTop = '0';}
                else{ piece.shapeTop = this.pieces[piece.posX + (piece.posY -1) * mX].shapeBottom=='n'?'p':'n' } //위 피스의 도출에 싱크
                if(piece.posX ===mX-1 ){ piece.shapeRight = '0';}
                if(piece.posY ===mY-1 ){ piece.shapeBottom = '0';}
                this.board.appendChild(piece.wrap)
            }
        }
        this.syncZIndex();
    }

    shuffle(){
        this.usedPieces.forEach((piece,idx)=>{
            ElementMove.moveTo(piece.wrap,
                (Math.random()-0.5) * 4 * this.width  ,
                (Math.random()-0.5) * 4 * this.height
                )
            ElementMove.isolate('in',piece.wrap)
        })
        
    }

}

export default Board;