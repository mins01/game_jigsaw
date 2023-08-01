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

    get ended(){ return this.gameWrap.classList.contain('ended');}
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
        if(this.board.remain==0){
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
        console.log(gapTime);
        this.board.sortPieces.forEach((piece,idx) => {
            setTimeout(()=>{
                ElementMove.moveTo(piece.wrap,0,0);
                piece.correct();
                this.checkGame();
            },idx*gapTime)
            
        });
    }

    resize = (event)=>{
        this.board.autoResize();
    }
}

export default Game;