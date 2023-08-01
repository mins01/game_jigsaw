"use strict";

import Piece from "./Piece.js";

class Board{
    boardWrap = null;
    pieces = [];
    usedPieces = [];
    sortPieces = [];
    constructor(board){
        this.boardWrap = board;
    }

    get divX(){ return parseInt(this.boardWrap.style.getPropertyValue('--div-x')); }
    set divX(v){ this.boardWrap.style.setProperty('--div-x',v); }
    get divY(){ return parseInt(this.boardWrap.style.getPropertyValue('--div-y')); }
    set divY(v){ this.boardWrap.style.setProperty('--div-y',v); }

    get width(){ return parseInt(this.boardWrap.style.getPropertyValue('--jigsaw-width')); }
    set width(v){ this.boardWrap.style.setProperty('--jigsaw-width',v+'px'); }
    get height(){ return parseInt(this.boardWrap.style.getPropertyValue('--jigsaw-height')); }
    set height(v){ this.boardWrap.style.setProperty('--jigsaw-height',v+'px'); }

    get remain(){ return this.boardWrap.querySelectorAll('.piece-wrap:not(.fixed)').length}

    initEvent(){
        this.boardWrap.addEventListener('pointerdown',this.pointerdown)
        this.boardWrap.addEventListener('pointerup',this.pointerup)
    }
    syncZIndex(){
        this.sortPieces.sort((a,b)=>{
            return a.zIndex - b.zIndex;
        })
        this.sortPieces.forEach((piece,idx) => {
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

        if(piece.isCorrect()){
            piece.correct();
        }

        this.syncZIndex();
        this.checkGame();
    }

    checkGame(){
        // 게임 종료 체크
        console.log('게임 종료 체크 in Board');
    }


    ready(){
        this.boardWrap.innerHTML = null;
        for(let i=this.pieces.length,m=this.divX * this.divY;i<m;i++){ //필요 피스 수 만큼 늘림 (늘어난 걸 줄이지는 않음)
            this.pieces.push(new Piece());
        }
        let i = 0;
        this.usedPieces = [];
        this.sortPieces = [];
        for(let iY=0,mY=this.divY;iY<mY;iY++){
            for(let iX=0,mX=this.divX;iX<mX;iX++){
                let piece = this.pieces[i++];
                piece.fixed = false;
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
                this.usedPieces.push(piece);
                this.sortPieces.push(piece);
                // this.boardWrap.appendChild(piece.wrap)
            }
        }
        this.syncZIndex();
    }
    draw(){
        this.boardWrap.innerHTML = null;
        this.usedPieces.forEach((piece)=>{
            this.boardWrap.appendChild(piece.wrap)
            piece.isolate();
        })
        // this.isolate();
    }
    isolate(){
        this.usedPieces.forEach((piece)=>{
            piece.isolate();
        })
    }
    shuffle(){
        this.usedPieces.forEach((piece,idx)=>{
            ElementMove.moveTo(piece.wrap,
                (Math.random()-0.5) * 2 * this.width  ,
                (Math.random()-0.5) * 2 * this.height
                )
            // ElementMove.isolate('in',piece.wrap)
            piece.isolate();
        })
    }
    unfixed(){
        this.usedPieces.forEach((piece,idx)=>{
            piece.fixed = false;
        })
    }


    autoResize = (event)=>{
        let rectBoardWrap = this.boardWrap.getBoundingClientRect();
        this.width = parseInt(rectBoardWrap.width);
        this.height = parseInt(rectBoardWrap.height);
        this.isolate();
    }
}

export default Board;