var backAudio=new Audio;
backAudio.src='sounds/Fon.mp3';
backAudio.autoplay=true; 
backAudio.loop=true;
backAudio.volume=localStorage.getItem('musicVolume')||0.2;
var gulp;
var explosion;
var fishSound;
var nowScore;
var Shark;

function playMyGame(){
if(!('highscore' in localStorage)){
    localStorage.setItem('highscore',0);
}
var cnv=document.getElementById('MainFieldGame');
var context=cnv.getContext('2d');
//draw shark
var sharkW=128;
var sharkH=96;
var sharkX=0;
var sharkPoint={
    xL:0,
    xR:0,
    yT:0,
    yB:0
}

var shift=1;
var speedX=0;
var speedY=0;
var posXshark=150;
var posYshark=100;
var moveLeft=false;
shark=new Image();
shark.onload=drawShark;
shark.src= 'PNG/Shark/shark.png';
var sharkDead=false; 
var sharkEat=false;
gulp=new Audio;
function playGulp(){
    gulp.src='sounds/gulp.mp3';
    gulp.autoplay=true;
    gulp.volume=localStorage.getItem('soundVolume')||0.4;
}
var eatCount=7;
var timesS=5;  
var SharkLives=3; 
function drawShark(){
    var posImg=sharkX;
    sharkPoint.xL=posXshark;
    sharkPoint.xR=posXshark+sharkW;
    sharkPoint.yT=posYshark;
    sharkPoint.yB=posYshark+sharkH;
    if(sharkDead){
        if(moveLeft){
            context.drawImage(shark, 1280, 192, 256,192,posXshark,posYshark,128,96);
        }else{
            context.drawImage(shark, 512, 192, 256,192,posXshark,posYshark,128,96);
        }
        timesS--;
        if(timesS==0){
            SharkLives--;
        }else if(timesS<0){
            sharkDead=false;
        }
    }else if(sharkEat){
        if(moveLeft){
            context.drawImage(shark, 1024, 192, 256,192,posXshark,posYshark,128,96);
        }else{
            context.drawImage(shark, 768, 192, 256,192,posXshark,posYshark,128,96);
        }
        eatCount--;
        if(eatCount==0){
            eatCount=7;
            sharkEat=false;
        }
    }else{
        var temp=context.drawImage(shark, posImg, 0, 256,192,posXshark,posYshark,128,96);  
    }
    if(sharkX==1792) {shift=-1;}
    if(sharkX==0) {shift=1;} 
    sharkX+=256*shift;
}
//draw static
// draw user elements 
//button settings
var settingsButton=new Image;
settingsButton.src='PNG/UI/Buttons/Yellow.png';
//button menu
var menuButton=new Image;
menuButton.src='PNG/UI/Buttons/Yellow.png';
//lives
var life=new Image();
life.src='PNG/Items/Hearth.png';
function drawUI(){
    context.drawImage(settingsButton, 228, 152, 76,76,20,76,38,38);
    context.drawImage(settingsButton, 152, 76, 76,76,20,120,38,38);
    for(var i=0, xLife=0;i<SharkLives;i++){
        context.drawImage(life, 0, 0, 96,96,20+xLife,20,48,48);
        xLife+=48;
    }
}
//score 
nowScore=0;
var highScore=localStorage.getItem('highscore');
function drawScore(){
var xPos=document.body.clientWidth-150;
context.fillStyle='white';
context.font='normal bold 20px Acme'; 
context.fillText('Your score: '+nowScore,xPos,50);
context.fillText('Highscore: '+highScore,xPos,75);
}

//draw stars
const starSize=42;
var star1=new Image();
var posXstar1=Math.floor( Math.random()*((document.body.clientWidth-42)+1) );
star1.src='PNG/Fish/StarfishGreen.png';
const posYstar1=470;
var star2=new Image();
star2.src='PNG/Fish/StarfishRed.png';
var posXstar2=posXstar1+60;
const posYstar2=490;
function drawStar(){
    context.drawImage(star1, 0, 0, 84,84,posXstar1,posYstar1,starSize,starSize);
    context.drawImage(star2, 0, 0, 84,84,posXstar2,posYstar2,starSize,starSize);  
}
//eat green star NOT WORK
if((posXstar1<sharkPoint.xR+10)&&(posXstar1+starSize-10>sharkPoint.xL)&&(posYstar1<sharkPoint.yB-10)&&(posYstar1+starSize>sharkPoint.yT+10)){
    star1=null;
    sharkEat=true;
    playGulp();
}
//eat red star NOT WORK
if((sharkPoint.yT+10<posYstar2+starSize)&&(sharkPoint.yB-10>posYstar2)&&(sharkPoint.xL<posXstar2+starSize)&&(sharkPoint.xR>posXstar2)){
    star2=null;
    sharkEat=true;
    playGulp();
}

//draw chain
var posXbomb=Math.floor( Math.random()*((document.body.clientWidth-64)+1) );
var bombX=posXbomb-26;
var chain=new Image();
chain.src='PNG/Enemy/Chain.png';
var bomb=new Image();
bomb.src='PNG/Enemy/SeaMines.png';
var ifBombExplode=false;
var posXexplosion=0;
function bombExplode(){
    var explosion=new Image();
    explosion.src='PNG/Effects/Explosion.png';
    context.drawImage(explosion, posXexplosion, 0, 64,64,bombX,382,64,64);
    posXexplosion+=64;
    bomb=null;
    if(posXexplosion>512){
        explosion=null;
        bombX=-100;
    }
}
explosion=new Audio;
function explode(){
    explosion.src='sounds/BigBang.mp3';
    explosion.autoplay=true;
    explosion.volume=localStorage.getItem('soundVolume')||0.4
    return false;
}
function drawMines() {
    context.drawImage(chain, 0, 0, 32,48,posXbomb,490,16,24);
    context.drawImage(chain, 0, 0, 32,48,posXbomb,466,16,24); 
    context.drawImage(chain, 0, 0, 32,48,posXbomb,442,16,24); 
    if((sharkPoint.yB>400)&&(sharkPoint.yT<420)&&(sharkPoint.xL<bombX-6)&&(sharkPoint.xR>bombX+26)){
        ifBombExplode=true;
        sharkDead=true;
        explode();
    }
    if(bomb){
    context.drawImage(bomb, 0, 0, 128,128,posXbomb-26,382,64,64); 
    }
    if(ifBombExplode){
    bombExplode (); 
    ifbombExplode =false;
    }
}

// draw small fish
var redFish=new Image();
redFish.src='PNG/Fish/SmallFishRed.png';
redFish.classname='smallFish';
var redFish2=new Image();
redFish2.src='PNG/Fish/SmallFishRed.png';
redFish2.classname='smallFish';
var yellowFish=new Image();
yellowFish.src='PNG/Fish/SmallFishYellow.png';
yellowFish.classname='smallFish';
var greenFish=new Image();
greenFish.src='PNG/Fish/SmallFishGreen.png';
greenFish.classname='smallFish';
var smallFishW=40;
var smallFishH=24;
var posXredFish=-10;
var posXredFish2=-70;
var posXyellowFish=-100;
var posXgreenFish=-40;
var posYredFish=randomY();
var posYredFish2=randomY();
var posYyellowFish=randomY();
var posYgreenFish=randomY();


function drawRedFish2(){
    context.drawImage(redFish2, 0, 0, 80,48,posXredFish2,posYredFish2,smallFishW,smallFishH);
    posXredFish2+=8;
    if(posXredFish2>document.body.clientWidth){
        posXredFish2=-10;
        if(posYredFish2>100){ 
            posYredFish2-=40;
        }else if(posXredFish2<document.body.clientHeight-150){
            posYredFish2+=15;
        }
    }else if((posXredFish2<sharkPoint.xR+10)&&(posXredFish2+smallFishW-30>sharkPoint.xL+20)&&(posYredFish2<sharkPoint.yB-10)&&(posYredFish2+smallFishH>sharkPoint.yT+10)){
            posXredFish2-=1000;
            posYredFish2=randomY();
            nowScore+=100;
            sharkEat=true;
            playGulp();
        }
}
function drawRedFish1(){
    context.drawImage(redFish, 0, 0, 80,48,posXredFish,posYredFish,smallFishW,smallFishH);
    posXredFish+=5;
    if(posXredFish>document.body.clientWidth){
        posXredFish=-10;
        if(posYredFish>100){ 
            posYredFish-=10;
        }else if(posXredFish<document.body.clientHeight-150){
            posYredFish+=15;
        }
    }else if((posXredFish<sharkPoint.xR+10)&&(posXredFish+smallFishW-30>sharkPoint.xL+20)&&(posYredFish<sharkPoint.yB-10)&&(posYredFish+smallFishH>sharkPoint.yT+10)){
            posXredFish-=1000;
            posYredFish=randomY();
            nowScore+=100;
            sharkEat=true;
            playGulp();
        }
}
function drawYellowFish1(){
    context.drawImage(yellowFish, 0, 0, 80,48,posXyellowFish,posYyellowFish,smallFishW,smallFishH);
    posXyellowFish+=2;
    if(posXyellowFish>document.body.clientWidth){
        randomY();
        posXyellowFish=-10;

        if(posYyellowFish>100){ 
            posYyellowFish-=30;
        }else if(posXyellowFish<document.body.clientHeight-150){
            posYyellowFish+=35;
        }
    }else if((posXyellowFish<sharkPoint.xR+10)&&(posXyellowFish+smallFishW-30>sharkPoint.xL+20)&&(posYyellowFish<sharkPoint.yB-10)&&(posYyellowFish+smallFishH>sharkPoint.yT+10)){
            posXyellowFish-=500;
            posYyellowFish=randomY();
            nowScore+=100;
            sharkEat=true;
            playGulp();
        }
}
function drawGreenFish1(){
    context.drawImage(greenFish, 0, 0, 80,48,posXgreenFish,posYgreenFish,smallFishW,smallFishH);
    posXgreenFish+=3;
    if(posXgreenFish>document.body.clientWidth){
        posXgreenFish=-10;
        randomY();
        if(posYgreenFish>100){ 
            posYgreenFish-=10;
        }else if(posXgreenFish<document.body.clientHeight-150){
            posYgreenFish+=15;
        }
    }else if((posXgreenFish<sharkPoint.xR+10)&&(posXgreenFish+smallFishW-30>sharkPoint.xL+20)&&(posYgreenFish<sharkPoint.yB-10)&&(posYgreenFish+smallFishH>sharkPoint.yT+10)){
        posXgreenFish-=1000;
        posYgreenFish=randomY();
        nowScore+=100;
        sharkEat=true;
        playGulp();
    }
}
//draw big fish
var bigPurpleFish=new Image();
var bigPoint={
    height:52,
    width:72
}
bigPurpleFish.src='PNG/Fish/MediumFishPurple.png';
var posXbigPurpleFish=document.body.clientWidth+110;
var posYbigPurpleFish=Math.floor( Math.random()*((document.body.clientHeight-150)+1));
function drawPurpleFish1(){
    context.drawImage(bigPurpleFish, 0, 0, 144,104,posXbigPurpleFish,posYbigPurpleFish,72,52);
    posXbigPurpleFish-=7;
    if(posXbigPurpleFish<-300){
        posXbigPurpleFish=document.body.clientWidth+180;
        if(posYbigPurpleFish<100){ 
            posYbigPurpleFish+=40;
        }else if(posXbigPurpleFish>document.body.clientHeight-130){
            posYbigPurpleFish-=35;
        }
    }else if((posXbigPurpleFish<sharkPoint.xR-20)&&(posXbigPurpleFish+bigPoint.width>sharkPoint.xL)&&(posYbigPurpleFish<sharkPoint.yB-30)&&(posYbigPurpleFish+bigPoint.height>sharkPoint.yT)){
        posXbigPurpleFish+=1000;
        posYbigPurpleFish=Math.floor( Math.random()*((document.body.clientHeight-150)+1));
        nowScore+=200;
        sharkEat=true;
        playGulp();
    }
}

fishSound=new Audio;
fishSound.src='sounds/fishMove.mp3';
fishSound.autoplay=true;
fishSound.loop=true;
fishSound.volume=localStorage.getItem('soundVolume')||0.4;
//redraw canvas
var updateCNV=setInterval(function(){
    clearAll();
    drawStar();
    drawMines();
    drawShark(); 
    drawGreenFish1();
    drawRedFish1();
    drawRedFish2();
    drawYellowFish1();
    drawPurpleFish1();
    drawUI();
    drawScore();
    checkScore();
    checkLives();
    handleInput();
    },40);
function clearAll(){
    context.clearRect(0, 0, cnv.width, cnv.height);
}
function randomY(){
    return 100+Math.floor(Math.random()*(document.body.clientHeight-200+1));
}
function handleInput() {
    if((input.isDown('DOWN'))&&(posYshark<(cnv.height-sharkH))){
            posYshark+=5;
        }else if(input.isDown('DOWN')){
            posYshark=cnv.height-sharkH;
        }
    if((input.isDown('UP'))&&(posYshark>5)){
            posYshark-=5;
        }else if(input.isDown('UP')){
            posYshark=0;
        }
    if((input.isDown('LEFT'))&&(posXshark>5)){
            posXshark-=5;
            shark.src='PNG/Shark/sharkLeft.png';
            moveLeft=true;
        }else if(input.isDown('LEFT')){
            posXshark=0;
        }
    if((input.isDown('RIGHT'))&&(posXshark<(document.body.clientWidth-sharkW))) {
            posXshark+=5;
            shark.src='PNG/Shark/Shark.png';
            moveleft=false;
            }else if(input.isDown('RIGHT')){
                document.body.clientWidth-sharkW;
            }
}
/*addEventListener('keydown',function(e){
        switch(e.keyCode){
            case 37:
                if(posXshark>5) {
                    posXshark-=5;
                    shark.src='PNG/Shark/sharkLeft.png';
                    moveLeft=true;
                }else{
                    posXshark=0;
                }
            break;
            case 38:
                if(posYshark>5) {
                    posYshark-=5;
                }else{
                    posYshark=0;
                }
            break;
            case 39:
                if(posXshark<(document.body.clientWidth-sharkW)) {
                posXshark+=5;
                shark.src='PNG/Shark/Shark.png';
                moveleft=false;
                }else{
                    document.body.clientWidth-sharkW;
                }
            break;
            case 40:
                if(posYshark<(cnv.height-sharkH)) {
                    posYshark+=5;
                }else{
                    posYshark=cnv.height-sharkH;
                }
            break;
        }
    });*/
                cnv.addEventListener('click',function(e){
                    if(e.which==1){
                        if((e.pageX>20)&&(e.pageX<58)&&(e.pageY>76)&&(e.pageY<114)){
                            goSettings(e);
                        }else if((e.pageX>20)&&(e.pageX<58)&&(e.pageY>120)&&(e.pageY<158)){
                            gulp.pause();
                            explosion.pause();
                            fishSound.pause();
                            backAudio.pause();
                            var t=clearInterval(updateCNV);
                            goMenu(e);
                        }
                    }
                });
    function checkScore(){
        if(nowScore>2000){
            clearInterval(updateCNV);
            iWin();
        }
    }
    function checkLives(){
        if(SharkLives<1){
            clearInterval(updateCNV);
            iLose();
        }
    }
function iWin (){
    var divR=document.getElementById('divResult');
    if(divR){
        document.body.appendChild(divR);
    }else{
        var div=document.createElement('div');
        div.setAttribute('id','divResult');
        var HScore=localStorage.getItem('highscore');
        var WinA=[
            {which: 'winGame', current: nowScore, goOn:'playMore', highscore: HScore, restart: 'restartButton', menu: 'menuButton'}
        ];
        $('#gameResultTMPL').tmpl(WinA).appendTo(div);
        document.body.appendChild(div);
        if(nowScore>HScore){
            localStorage.setItem('highscore', nowScore);
            var newS=document.createElement('h5');
            newS.innerHTML="You set a new HIGHSCORE";
            var divMain=document.getElementsByClassName('main')[0];
            divMain.appendChild(newS);
        }
    }
    bulk();
    var restartGame=document.getElementById('restartButton');
    restartGame.addEventListener('click',function(e){
        location.hash='';
        location.hash = "game";
        bulk();
    });
    var goMenu=document.getElementById('menuButton');
    goMenu.addEventListener('click',function(e){
        e.preventDefault();
        location.hash = "index";
        bulk();
    });
    var playMore=document.getElementById('playMore');
    playMore.addEventListener('click',function(e){
        alert('No levels available');
        location.hash = "index";
        bulk();
    });
}
function iLose(){
    var divL=document.getElementById('divResult');
    if(divL){
        document.body.appendChild(divL);
    }else{
        var divL=document.createElement('div');
        divL.setAttribute('id','divResultL');
        var HScore=localStorage.getItem('highscore');
        var WinL=[
            {which: 'loseGame', current: nowScore, goOn:'', highscore: HScore, restart: 'restartButton', menu: 'menuButton'}
        ];
        $('#gameResultTMPL').tmpl(WinL).appendTo(divL);
        document.body.appendChild(divL);
    }
    bulk();
    var restartGame=document.getElementById('restartButton');
    restartGame.addEventListener('click',function(e){
        location.hash='';
        location.hash = "game";
        bulk();
    });
    var goMenu=document.getElementById('menuButton');
    goMenu.addEventListener('click',function(e){
        e.preventDefault();
        location.hash = "index";
        bulk();
    });
}
}