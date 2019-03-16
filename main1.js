var cnv=document.getElementById('MainFieldGame');
//Model
function Model(){
    var myView;
    this.start=function(view){
        myView=view;
    }
    this.updateView=function(){
        if(myView){
            myView.update();
        }
    }

    let shark={

    };

    let score={
        current: 0,
        highScore: localStorage.getItem('highscore'),
        xPos: document.body.clientWidth-150
    };
    this.getScore=function(){
        return score;
    }






    this.randomY=function randomY(){
        return 100+Math.floor(Math.random()*(document.body.clientHeight-200+1));
    }
    this.randomX=function(){
        return 100+Math.floor(Math.random()*(canvas.height-100+1));
    }
}


//Controller
function Controller(){
    let model;
    let view;

    this.checkLS=function(){
        if(!('highscore' in localStorage)){
            localStorage.setItem('highscore',0);
        }
    }
}


//View.
function View(){
    var myModel;
    var field;
    var ctx;
    this.start=function(model){
        myModel=model;
    }
    this.playField=function(goField){
        field=goField;
        ctx=field.getContext('2d');
    }

    this.clearAll=function(){

    }
    this.drawScore=function(){
        var score=myModel.getScore();
        ctx.fillStyle='white';
        ctx.font='normal bold 20px Acme'; 
        ctx.fillText('Your score: '+score.current,score.xPos,50);
        ctx.fillText('Highscore: '+score.highScore,score.xPos,75);
    }
    this.update=function(){
        if(field){
            this.clearAll();
            this.drawScore();
        }
    }

}





//
var myModel=new Model;
var myControls=new Controller;
var myView=new View;
myModel.start=myView;
myModel.playField=cnv;
myView.update();