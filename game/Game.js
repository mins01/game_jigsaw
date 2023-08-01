"use strict";

// import Piece from "./Piece.js";
import Board from "./Board.js";

class Game{
    board = null;
    em = null;
    constructor(boardWrap){
        this.board = new Board(boardWrap)
        this.board.checkGame = this.checkGame;
        this.board.initEvent();
    }

    setBoard(dovx,y){
        game.board.divX = 5;
        game.board.divY = 4;
        game.board.ready();
        // game.board.initEvent();
        // game.board.unfixed();
        // game.board.shuffle();
    }
    start(){

    }
    end(){
        alert('게임 종료');
    }

    checkGame = ()=>{
        if(this.board.remain==0){
            setTimeout(()=>{
                alert('직소 퍼즐 맞추기 완료!');
            },100)
            
        }else{
            console.log('게임 종료 체크 in Game','남음',this.board.remain);
        }
        
    }

    solve(){
        game.board.pieces.forEach((piece) => {
            ElementMove.moveTo(piece.wrap,0,0);
        });
    }

    resize = (event)=>{
        this.board.autoResize();
        this.board.i
    }
}

export default Game;