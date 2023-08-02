"use strict";

// import Piece from "./Piece.js";
import Board from "./Board.js";

class Game{
    gameWrap = null;
    board = null;
    em = null;
    constructor(gameWrap){
        this.gameWrap = gameWrap;
        this.board = new Board(gameWrap.querySelector('.board-wrap'))
        this.board.checkGame = this.checkGame;
        this.board.initEvent();
    }

    get width(){ return parseInt(this.gameWrap.style.getPropertyValue('--jigsaw-width')); }
    set width(v){ this.gameWrap.style.setProperty('--jigsaw-width',v+'px'); }
    get height(){ return parseInt(this.gameWrap.style.getPropertyValue('--jigsaw-height')); }
    set height(v){ this.gameWrap.style.setProperty('--jigsaw-height',v+'px'); }

    get ended(){ return this.gameWrap.classList.contains('ended');}
    set ended(v){ v?this.gameWrap.classList.add('ended'):this.gameWrap.classList.remove('ended');}

    setBoard(divX,divY){
        this.board.divX = parseInt(divX);
        this.board.divY = parseInt(divY);
        this.board.ready();
        this.board.unfixed();
        this.board.shuffle();
    }
    start(){
        this.ended = false;
        this.board.draw();
    }
    end(){
        this.ended = true;
        setTimeout(()=>{
            alert('직소 퍼즐 맞추기 완료!');
            console.log('게임 종료','남음',this.board.remain);
        },100)
    }

    checkGame = ()=>{
        if(this.ended){
            console.log('이미 게임이 종료되었습니다.');
        }else if(this.board.remain==0){
            console.log('game.end() 호출');
            this.end();
        }else{
            console.log('게임 종료 체크 in Game','남음',this.board.remain);
        }
    }

    solve(){
        this.board.sortPieces.sort((a,b)=>{
            return Math.random() - 0.5 ;
        })
        let gapTime = 3000/this.board.sortPieces.length;
        gapTime = Math.min(100,gapTime);
        console.log('처리딜레이단위시간',gapTime);
        this.board.sortPieces.forEach((piece,idx) => {
            if(piece.fixed){return}
            setTimeout(()=>{
                ElementMove.moveTo(piece.wrap,0,0);
                piece.correct();
                this.checkGame();
            },idx*gapTime)
            
        });
    }

    preview(){
        this.gameWrap.classList.toggle('preview');
    }
    resize = (event)=>{
        // this.board.autoResize();
        this.autoResize();
    }

    autoResize = (event)=>{
        let rectBoardWrap = this.board.boardWrap.getBoundingClientRect();
        this.width = parseInt(rectBoardWrap.width);
        this.height = parseInt(rectBoardWrap.height);
        this.board.isolate();
    }
}

export default Game;