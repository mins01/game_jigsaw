"use strict";

import Piece from "./Piece.js";

class Board{
    board = null;
    pieces = [];
    constructor(board){
        this.board = board;
    }

    get divX(){ return parseInt(this.board.style.getPropertyValue('--div-x')); }
    set divX(v){ this.board.style.setProperty('--div-x',v); }
    get divY(){ return parseInt(this.board.style.getPropertyValue('--div-y')); }
    set divY(v){ this.board.style.setProperty('--div-y',v); }

    get width(){ return this.board.style.getPropertyValue('--jigsaw-width'); }
    set width(v){ this.board.style.setProperty('--jigsaw-width',v); }
    get height(){ return this.board.style.getPropertyValue('--jigsaw-height'); }
    set height(v){ this.board.style.setProperty('--jigsaw-height',v); }

    
    draw(){
        this.board.innerHTML = null;
        for(let i=this.pieces.length,m=this.divX * this.divY;i<m;i++){ //필요 피스 수 만큼 늘림 (늘어난 걸 줄이지는 않음)
            this.pieces.push(new Piece());
        }
        let i = 0;
        for(let iY=0,mY=this.divX;iY<mY;iY++){
            for(let iX=0,mX=this.divX;iX<mX;iX++){
                let piece = this.pieces[i++];
                piece.posX = iX;
                piece.posY = iY;
                piece.shapeTop = Piece.randPN();
                piece.shapeRight = Piece.randPN();
                piece.shapeBottom = Piece.randPN();
                piece.shapeLeft = Piece.randPN();
                // 테투리 피스 0
                if(piece.posX ===0 ){ piece.shapeLeft = '0';}
                if(piece.posY ===0 ){ piece.shapeTop = '0';}
                if(piece.posX ===mX-1 ){ piece.shapeRight = '0';}
                if(piece.posY ===mY-1 ){ piece.shapeBottom = '0';}
                this.board.appendChild(piece.piece)
            }
        }

    }

}

export default Board;