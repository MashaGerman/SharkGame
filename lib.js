
// здесь все картинки, чтобы к моменту старта были готовы
        var pics={
            sharkLeft: 'PNG/Shark/SharkLeft.png',
            sharkRight: 'PNG/Shark/Shark.png',
            explosion: 'PNG/Effects/Explosion.png',
            torpedo: 'PNG/Enemy/Torpedo.png',
            submarine: 'PNG/Enemy/SubmarineYellow.png',
            bigFish: 'PNG/Fish/MediumFishPurple.png',
            bigFish1: 'PNG/Fish/MediumFishBrown.png',
            greenFish: 'PNG/Fish/SmallFishGreen.png',
            yellowFish: 'PNG/Fish/SmallFishYellow.png',
            redFish: 'PNG/Fish/SmallFishRed.png',
            chain: 'PNG/Enemy/Chain.png',
            seaMines: 'PNG/Enemy/SeaMines.png',
            redStar: 'PNG/Fish/StarfishRed.png',
            greenStar: 'PNG/Fish/StarfishGreen.png',
            heart: 'PNG/Items/Hearth.png',
            menu: 'PNG/UI/Buttons/Yellow.png'
        }

        function UserElements(){
            this.settings=new Image();
            this.settings.src=pics.menu;
            this.menuButton=new Image;
            this.menuButton.src=pics.menu;
            this.life=new Image();
            this.life.src=pics.heart;
            this.nowScore=0;
            this.highscore=localStorage.getItem('highscore');
            this.scorePosX=document.body.clientWidth-150;
        };
        var itemOptions=[
            {
                type: 'shark',
                src: pics.shark,
                x:100,
                y:100,
                speed: null,
                w: 128,
                h:96
            },
            {
                type: 'star',
                src: [pics.redStar],
                x:240,
                y:460,
                speed: 0,
                w: 42,
                h:42
            },
            {
                type: 'star',
                src: [pics.greenStar],
                x:270,
                y:480,
                speed: 0,
                w: 42,
                h:42
            },
            {
                type: 'smallfish',
                src: [pics.redFish],
                x:-10,
                y: randomY(),
                speed: 1,
                w: 40,
                h:24
            },
            {
                type: 'smallfish',
                src: [pics.redFish],
                x:-40,
                y: randomY(),
                speed: 1.5,
                w: 40,
                h:24
            },
            {
                type: 'smallfish',
                src: [pics.greenFish],
                x:-40,
                y: randomY(),
                speed: 2,
                w: 40,
                h:24
            },
            {
                type: 'smallfish',
                src: [pics.greenFish],
                x:-10,
                y: randomY(),
                speed: 1.5,
                w: 40,
                h:24
            },
            {
                type: 'smallfish',
                src: [pics.yellowFish],
                x:-20,
                y: randomY(),
                speed: 2,
                w: 40,
                h:24
            },
            {
                type: 'smallfish',
                src: [pics.yellowFish],
                x:-50,
                y: randomY(),
                speed: 2,
                w: 40,
                h:24
            },
            {
                type: 'bigfish',
                src: [pics.bigFish1],
                x:document.body.clientWidth+110,
                y: randomY(),
                speed: -1.5,
                w: 72,
                h:52
            },
            {
                type: 'bigfish',
                src: [pics.bigFish],
                x:document.body.clientWidth+150,
                y: randomY(),
                speed: -2,
                w: 72,
                h:52
            },
            {
                type: 'chain',
                src: [pics.chain],
                x:210,
                y: 460,
                speed: null,
                w: 16,
                h:24
            },
            {
                type: 'chain',
                src: [pics.chain],
                x:210,
                y: 436,
                speed: null,
                w: 16,
                h:24
            },
            {
                type: 'chain',
                src: [pics.chain],
                x:210,
                y: 412,
                speed: null,
                w: 16,
                h:24
            },
            {
                type: 'mine',
                src: [pics.seaMines],
                x:185,
                y: 357,
                speed: null,
                w: 64,
                h:64
            },
            {
                type: 'submarine',
                src: [pics.submarine],
                x:document.body.clientWidth+110,
                y: 220,
                speed: null,
                w: 128,
                h:112
            },
            {
                type: 'explosion',
                src: [pics.explosion],
                x:100,
                y:100,
                speed: 8,
                w: 64,
                h:64
            }
        ]
        function Item(type,src, x, y,speed,w,h){
            var _that=this;
            this.type=type;
            this.pic=new Image();
            this.pic.src=src;
            this.posX=x;
            this.posY=y;
            this.speed=speed;
            this.size={
                width: w,
                height: h,
                xL: _that.posX,
                xR: _that.posX+w,//
                yT: _that.posY,
                yB: _that.posY+h//
            };
            switch(type){
                case 'shark':
                        this.shift=1;
                        this.spriteX=0;
                        this.spriteY=0;
                        this.shiftX=256;
                        this.shiftY=192;
                        
                        var posX=100;
                        var posY=100;
                        this.lives=3;
                        this.dead=false;
                        this.eat=false;
                        this.moveLeft=false;
                        var eatCount=8;
                        var timesS=8;
                        this.getX=function(){
                            return posX;
                        }
                        this.getY=function(){
                            return posY;
                        }
                        this.setX=function(n){
                            posX+=n*4;
                            _that.size.xL=posX;
                            _that.size.xR=posX+_that.width;
                        }
                        this.setY=function(n){
                            posY+=n*4;
                            _that.size.yT=posY;
                            _that.size.yB=posY+_that.size.height;
                        }
                        this.getPic=function(){
                            _that.pic.src=_that.moveLeft?pics.sharkLeft:pics.sharkRight;
                            if(_that.dead){
                                timesS--;
                                if(timesS==0){
                                    timesS=10;
                                    _that.spriteX=0;
                                    _that.spriteY=0;
                                    _that.dead=false;
                                }
                                if(_that.moveLeft){
                                    _that.spriteX=1280;
                                    _that.spriteY=192;
                                }else{
                                    _that.spriteX=512;
                                    _that.spriteY=192;
                                }
                            }else if(_that.eat){
                                eatCount--;
                                //sounds[1].autoplay=false;
                                if(eatCount==0){
                                    _that.eat=false;
                                    eatCount=10;
                                    _that.spriteX=0;
                                    _that.spriteY=0;
                                }
                                if(_that.moveLeft){
                                    _that.spriteX=1024;
                                    _that.spriteY=192;
                                }else{
                                    _that.spriteX=768;
                                    _that.spriteY=192;
                                }
                            }else if((!_that.dead)&&(!_that.eat)){
                                _that.spriteY=0;
                                if(_that.spriteX==1792) {_that.shift=-1;}
                                if(_that.spriteX==0) {_that.shift=1;} 
                                _that.spriteX+=_that.shiftX*_that.shift;
                            }
                            
                            return {spriteX: _that.spriteX, spriteY: _that.spriteY};
                        };
                            
                break;
                case 'smallfish':
                    this.go=function(){
                        _that.posX+=2*_that.speed;
                        if(_that.posX>document.body.clientWidth){
                        _that.posX=-10;
                            if(_that.posY>100){ 
                                _that.posY-=40;
                            }else if(_that.posY<document.body.clientHeight-150){
                                _that.posY+=15;
                            }
                        }
                    }
                break;
                case 'bigfish':
                this.go=function(){
                    _that.posX+=2*_that.speed;
                     if(_that.posX<-300){
                    _that.posX=document.body.clientWidth+180;
                        if(_that.posY<100){ 
                            _that.posY+=40;
                        }else if(_that.posY>document.body.clientHeight-130){
                            _that.posY-=15;
                        }
                    }
                }
                break;
                case 'star':
                break;
                case 'chain':
                break;
                case 'explosion':
                    this.sprite=-64;
                    this.explode=function(x,y){
                        while(_that.speed>0){
                            _that.posX=x-32;
                            _that.posY=y-32;
                            _that.speed--;
                        }
                        
                        
                    }
                    this.getSprite=function(){
                        _that.sprite+=64;
                        return _that.sprite;
                    }
                    
                break;
                case 'submarine':
                    this.posXstable=document.body.clientWidth*3/4;
                    this.go=function(){
                        if(_this.posX>_this.posXstable){
                        _this.posX-=2;}else{
                        _this.posX=_this.posXstable;
                        }
                    };
                    this.goOn=function(){
                        _this.posX-=2;
                    }
                break;
            }
          }   
    
        function ModelGame(){
            var _this=this;
            var myView=null;
            this.stop=false;
            //static
            this.elements=new UserElements();
            this.players=[];
            for(var i=0; i<itemOptions.length; i++) {
                let char = itemOptions[i];
                this.players.push(new Item(char.type, char.src, char.x, char.y, char.speed, char.w, char.h));
            }
            this.gulp=new Audio();
            this.playGulp=function(){
                _this.gulp.src='sounds/gulp.mp3';
                _this.gulp.autoplay=true;
                _this.gulp.volume=localStorage.getItem('soundVolume')||0.4;
            }
            this.explosion=new Audio();
            this.playBump=function(){
                _this.explosion.src='sounds/bigBang.mp3';
                _this.explosion.autoplay=true;
                _this.explosion.volume=localStorage.getItem('soundVolume')||0.4;
            }
            this.setLife=function(m){
                let shark=_this.players[0];
                shark.lives+=m;
                if (shark.lives==0){
                    _this.stop=true;
                }
            }
            this.getLife=function(){
                return _this.players[0]['lives'];
            }
            this.start=function(view){
                myView=view;
            };
            this.getScore=function(){
                return _this.elements.nowScore;
            }
            this.setScore=function(m){
                _this.elements.nowScore+=m;
            }
            this.bigBump=false;
            this.check=function(){
                var shark=_this.players[0];
                var sharkX=shark.getX();
                var sharkY=shark.getY();
                for(var i=0;i<_this.players.length;i++){
                    let item=_this.players[i];
                    if((item.type=='smallfish')||(item.type=='bigfish')||(item.type=='star')||(item.type=='mine')){
                        let w=128;
                        let h=96;
                        var midItemX=(item.size.width/2+item.posX);
                        var midItemY=(item.size.height/2+item.posY);
                        if((midItemX>sharkX)&&(midItemX<sharkX+w)&&(midItemY<sharkY+h-10)&&(midItemY>sharkY+10)){
                            switch(item.type){
                                case 'mine': 
                                    let bumb=_this.players[_this.players.length-1];
                                    item.posX=-200;
                                    _this.setLife(-1);
                                    shark.dead=true;
                                    _this.bigBump=true;
                                    bumb.explode(midItemX,midItemY);
                                    _this.playBump();
                                break;
                                case 'bigfish': 
                                    item.posX=document.body.clientWidth+1510;
                                    _this.setScore(200);
                                    shark.eat=true;
                                    _this.playGulp();
                                break;
                                default:
                                    item.posX=-100;
                                    shark.eat=true;
                                    _this.setScore(100);
                                    _this.playGulp();
                                break;
                            }
                        }
                    }
                   
                }
            }
            this.updateModel=function(){
                for(var i=0;i<_this.players.length;i++){
                    let item=_this.players[i];
                    if((item.type=='smallfish')||(item.type=='bigfish')){
                         _this.players[i].go();
                    }
                }
                
            };
            this.updateView=function(){
                if(myView){
                myView.updateCnv();
                _this.check();
                _this.updateModel();
                }  
            
            
            
            
            
            }
        }

        function ViewGame(){
            var _this=this;
            var cnv=null;
            var context=null;
            var myModel=null;
            this.start=function(model, field){
                myModel=model;
                cnv=field;
            }
            this.clearAll=function(){
                context.clearRect(0, 0, cnv.width, cnv.height);
            }
            this.drawUI=function(){
                 //buttons
                 context.drawImage(myModel.elements.settings, 228, 152, 76,76,20,76,38,38);
                context.drawImage(myModel.elements.menuButton, 152, 76, 76,76,20,120,38,38);
                //lives
                var lives=myModel.elements.life;
                var temp=myModel.getLife();
                    for(var i=0, xLife=0;i<temp;i++){
                        context.drawImage(lives, 0, 0, 96,96,20+xLife,20,48,48);
                        xLife+=48;
                    }
                //drawScore
                var highscore=localStorage.getItem('highscore');
                var current=myModel.getScore();
                context.fillStyle='white';
                context.font='normal bold 20px Acme'; 
                context.fillText('Your score: '+current,myModel.elements.scorePosX,50);
                context.fillText('Highscore: '+highscore,myModel.elements.scorePosX,75);

            };
            
            this.drawPlayers=function(){
                for(var i=0;i<myModel.players.length;i++){
                    let player=myModel.players[i];
                    if (player){

                        switch(player.type){
                            case 'shark':
                                var shark=player.getPic();
                                var sharkX=player.getX();
                                var sharkY=player.getY();
                                context.drawImage(player.pic, shark.spriteX, shark.spriteY, 256,192,sharkX,sharkY,128,96);
                    
                            break;
                            case 'smallfish':
                                context.drawImage(player.pic, 0, 0, 80,48,player.posX,player.posY,player.size.width,player.size.height);
                            break;
                            case 'bigfish':
                                context.drawImage(player.pic, 0, 0, 144,104,player.posX,player.posY,player.size.width,player.size.height);
                            break;
                            case 'star':
                                context.drawImage(player.pic, 0, 0, 84,84,player.posX,player.posY,player.size.width,player.size.width);
                            break;
                            case 'chain':
                                context.drawImage(player.pic, 0, 0, 32,48,player.posX,player.posY,player.size.width,player.size.height);
                            break;
                            case 'mine':
                                context.drawImage(player.pic, 128, 0, 128,128,player.posX,player.posY,player.size.width,player.size.height);  
                            break;
                            case 'explosion':
                            if(myModel.bigBump){
                                let spr=player.getSprite();
                                context.drawImage(player.pic, spr, 0, 64,64,player.posX,player.posY,64,64);
                            }
                                
                            break;
                            case 'submarine':
                                
                            break;
                        }
                    }       
                }
            };
        
            /*
        
            this.drawSubmarine=function(){
                context.drawImage(myModel.submarine.pic, 0, 0, myModel.submarine.size.width*2,myModel.submarine.size.height*2,myModel.submarine.posX,myModel.submarine.posY,myModel.submarine.size.width,myModel.submarine.size.height);
                if(myModel.torpedo1){
                    context.drawImage(myModel.torpedo1.pic, 0, 0, myModel.torpedo1.size.width*2,myModel.torpedo1.size.height*2,myModel.torpedo1.posX,myModel.torpedo1.posY,myModel.torpedo1.size.width,myModel.torpedo1.size.height);
                }
                if(myModel.submarine.torpedo2){
                    context.drawImage(myModel.submarine.torpedo2.pic, 0, myModel.submarine.torpedo2.size.height*2, myModel.submarine.torpedo2.size.width*2,myModel.submarine.torpedo2.size.height*2,myModel.submarine.torpedo2.posX,myModel.submarine.torpedo2.posY,myModel.submarine.torpedo2.size.width,myModel.submarine.torpedo2.size.height);  
                }
                if(myModel.submarine.torpedo3){
                    context.drawImage(myModel.submarine.torpedo3.pic, 0, myModel.submarine.torpedo3.size.height*4, myModel.submarine.torpedo3.size.width*2,myModel.submarine.torpedo3.size.height*2,myModel.submarine.torpedo3.posX,myModel.submarine.torpedo3.posY,myModel.submarine.torpedo3.size.width,myModel.submarine.torpedo3.size.height);
                
                }
            }*/
            this.updateCnv=function(){
                context=cnv.getContext('2d');
                _this.clearAll();
                _this.drawUI();
                _this.drawPlayers();
            };
        }
            
        function ControllerGame(){
            var myModel = null; 
            var myField = null;
            var _this=this; 
            this.anim;
            this.start=function(model,field) {
                myModel=model;
                myField=field;
            };
            this.check=function(){
                if(myModel.stop){
                    _this.iLose();
                }
                if(myModel.elements.nowScore>300){
                    myModel.stop=true;
                    _this.iWin();
                }
            }
            this.iLose=function(){
                var divL=document.getElementById('divResult');
                if(divL){
                    document.body.appendChild(divL);
                }else{
                    var divL=document.createElement('div');
                    divL.setAttribute('id','divResultL');
                    var HScore=localStorage.getItem('highscore');
                    var WinL=[
                        {which: 'loseGame', current: myModel.elements.nowScore, goOn:'', highscore: HScore, restart: 'restartButton', menu: 'menuButton'}
                    ];
                    $('#gameResultTMPL').tmpl(WinL).appendTo(divL);
                    document.body.appendChild(divL);
                }
                bulk();
                var restartGame=document.getElementById('restartButton');
                restartGame.addEventListener('click',function(e){
                    document.body.removeChild(divL);
                    playMyGame();
                    bulk();
                });
                var goMenu=document.getElementById('menuButton');
                goMenu.addEventListener('click',function(e){
                    e.preventDefault();
                    location.hash = "index";
                    bulk();
                });
            };
            this.iWin=function(){
                var divR=document.getElementById('divResult');
                if(divR){
                    document.body.appendChild(divR);
                }else{
                    var div=document.createElement('div');
                    div.setAttribute('id','divResult');
                    var HScore=localStorage.getItem('highscore');
                    var WinA=[
                        {which: 'winGame', current: myModel.elements.nowScore, goOn:'playMore', highscore: HScore, restart: 'restartButton', menu: 'menuButton'}
                    ];
                    $('#gameResultTMPL').tmpl(WinA).appendTo(div);
                    document.body.appendChild(div);
                    if(myModel.elements.nowScore>HScore){
                        localStorage.setItem('highscore', myModel.elements.nowScore);
                        var newS=document.createElement('h5');
                        newS.innerHTML="You set a new HIGHSCORE";
                        var divMain=document.getElementsByClassName('main')[0];
                        divMain.appendChild(newS);
                    }
                }
                    bulk();
                    var restartGame=document.getElementById('restartButton');
                    restartGame.addEventListener('click',function(e){
                        let div1=document.getElementById('divResult');
                        document.body.removeChild(div1);
                        playMyGame();
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
            this.handleInput=function(){
                let shark=myModel.players[0];
                var posXshark=shark.getX();
                var posYshark=shark.getY();
                
                if((input.isDown('DOWN'))&&(posYshark<(myField.height-shark.size.height))){
                    
                    shark.setY(1);
                    
                }else if(input.isDown('DOWN')){
                    shark.setY(0);
                }
                if((input.isDown('UP'))&&(posYshark>5)){
                        shark.setY(-1);
                    }else if(input.isDown('UP')){
                        shark.setY(0);
                    }
                if((input.isDown('LEFT'))&&(posXshark>5)){
                        shark.setX(-1);
                        shark.moveLeft=true;
                    }else if(input.isDown('LEFT')){
                        shark.moveLeft=true;
                        posXshark=0;
                    }
                if((input.isDown('RIGHT'))&&(posXshark<(document.body.clientWidth-shark.size.width))) {
                        shark.setX(1);
                        shark.moveLeft=false;
                        }else if(input.isDown('RIGHT')){
                            shark.moveLeft=false;
                            document.body.clientWidth-shark.size.width;
                        }
                };
            }
            function randomY(){
                return 100+Math.floor(Math.random()*(document.body.clientHeight-200+1));
            }
                