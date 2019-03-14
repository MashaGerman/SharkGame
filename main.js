
function randomY(){
    return 100+Math.floor(Math.random()*(document.body.clientHeight-200+1));
}
function playMyGame(){
        if(!('highscore' in localStorage)){
            localStorage.setItem('highscore',0);
        }
        var model=new ModelGame();
        var view=new ViewGame();
        var controller=new ControllerGame();
        var anim;
        var container=document.getElementById('MainFieldGame');
        model.start(view);
        view.start(model,container);
        controller.start(model,container);
        animate(function(timePassed){
            if(!model.stop){
                controller.handleInput();
                model.updateView();
                controller.check();
            }else{
                cancelAnimationFrame(anim);
            }
        },30000);
    
        function animate(draw, duration) {
                if (!model.stop){
                    var start = performance.now();
                    anim=requestAnimationFrame(function animate(time) {
                        var timePassed = time - start;
                        if (timePassed > duration) {
                            if(!model.stop){
                            timePassed = duration;
                            model.stop=true;
                            console.log('stop by duration');
                            controller.iLose();
                            }
                            
                            cancelAnimationFrame(anim);
                        }
                        draw(timePassed);
                        if (timePassed < duration) {
                            anim=requestAnimationFrame(animate);
                        }
                    });
                }      
        }
        /*
        submarine.src='PNG/Enemy/SubmarineYellow.png';
        var torpedo1=new Image();
        torpedo1.src='PNG/Enemy/Torpedo.png';
        var torpedo2=new Image();
        torpedo2.src='PNG/Enemy/Torpedo.png';
        var torpedo3=new Image();
        torpedo3.src='PNG/Enemy/Torpedo.png';
        var posXtorpedo=posXstable+50;
        var posYtorpedo=330;
        var torpExplode=false;
        function drawSubmarine(){
            
            if((torpedo1)||(torpedo2)||(torpedo3)){
                if(posXsubmarine>posXstable){
                posXsubmarine-=2;
                }else{
                posXsubmarine=posXstable;
                    if(torpedo1){
                        context.drawImage(torpedo1, 0, 0, torpedo.width*2,torpedo.height*2,posXtorpedo,posYtorpedo,torpedo.width,torpedo.height);
                            posXtorpedo-=5;
                            checkTorp();
                                if(torpExplode){
                                    sharkDead=true;
                                    explode();
                                    console.log('tirp 1 -life');
                                    explodeTorpedo(torpedo1);
                                    torpedo1=null;
                                }
                            if(posXtorpedo<-170){
                                torpedo1=null;
                                posXtorpedo=posXstable+50;
                            }
                    }else if(torpedo2){
                        context.drawImage(torpedo2, 0, 48, torpedo.width*2,torpedo.height*2,posXtorpedo,posYtorpedo,torpedo.width,torpedo.height);
                            posXtorpedo-=5;
                            checkTorp();
                            if(torpExplode){
                                    sharkDead=true;
                                    console.log('tirp 2 -life');
                                    explode();
                                    explodeTorpedo(torpedo2);
                                    torpedo2=null;
                                }
                                if(posXtorpedo<-170){
                                torpedo2=null;
                                posXtorpedo=posXstable+50;
                            }
                    }else if(torpedo3){
                        context.drawImage(torpedo3, 0, 96, torpedo.width*2,torpedo.height*2,posXtorpedo,posYtorpedo,torpedo.width,torpedo.height);
                            posXtorpedo-=5;
                            checkTorp();
                            if(torpExplode){
                                    sharkDead=true;
                                    console.log('tirp 3 -life');
                                    explode();
                                    explodeTorpedo(torpedo3);
                                    torpedo3=null;
                            }
                            if(posXtorpedo<-170){
                            torpedo3=null;
                            }
                    } 
                }
            }else{
                    posXsubmarine-=2;
                }
            context.drawImage(submarine, 0, 0, subm.width*2,subm.height*2,posXsubmarine,posYsubmarine,subm.height,subm.width);
            
        }
        function checkTorp(){
            if((sharkPoint.xL<(posXtorpedo+torpedo.width))&&(sharkPoint.xR-40>posXtorpedo)&&(sharkPoint.yT<(posYtorpedo+torpedo.height))&&(sharkPoint.yB>posYtorpedo)){
                torpExplode=true;
                console.log('i caught');
            }
        }
        function explodeTorpedo(item){
            item=null;
            posXexpTorpedo=posXtorpedo+15;
            var explosion=new Image();
            explosion.src='PNG/Effects/Explosion.png';
            context.drawImage(explosion, shiftExp, 0, 64,64,posXexpTorpedo,posYtorpedo-15,64,64);
            posXexpTorpedo+=64;
            if(shiftExp>512){
                explosion=null;
                shift=0;
            }
            if((torpedo1)||(torpedo2)||(torpedo3)){
                posXtorpedo=posXstable+50;
                torpExplode=false;
            }
        }
*/
        fishSound=new Audio;
        fishSound.src='sounds/fishMove.mp3';
        fishSound.autoplay=true;
        fishSound.loop=true;
        fishSound.volume=localStorage.getItem('soundVolume')||0.4;
        }
var cnv=document.getElementById('MainFieldGame');
    if(cnv){
        cnv.addEventListener('click',function(e){
            if(e.which==1){
                if((e.pageX>20)&&(e.pageX<58)&&(e.pageY>76)&&(e.pageY<114)){
                    goSettings(e);
                }else if((e.pageX>20)&&(e.pageX<58)&&(e.pageY>120)&&(e.pageY<158)){
                    model.gulp.pause();
                    model.explosion.pause();                        
                    fishSound.pause()
                        backAudio.pause();
                        goMenu(e);
                    }
            }
        });
    }
playMyGame();
/*var backAudio=new Audio;
backAudio.src='sounds/Fon.mp3';
backAudio.autoplay=true; 
backAudio.loop=true;
backAudio.volume=localStorage.getItem('musicVolume')||0.4;*/