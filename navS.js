function mainMenuButtons(){
var startGameButton=document.getElementsByClassName('startGame')[0];
var highscoreButton=document.getElementsByClassName('highscore')[0];
var settingsButton=document.getElementsByClassName('settings')[0];
        if(startGameButton){
            startGameButton.addEventListener('click', goPlay);
        }
        if(highscoreButton){
            highscoreButton.addEventListener('click', goScore);
        }
        if(settingsButton){
            settingsButton.addEventListener('click', goSettings);
        }
}
mainMenuButtons();
function goScore(e){
        e.preventDefault();
        bulk();
            var divScore=document.getElementById('divScore');
            if(divScore){
                divScore.style.display='block';
                bulk();
            }else{
            var div=document.createElement('div');
            var parent=document.getElementsByClassName('mainWrapper')[0];
            parent.appendChild(div); 
            div.setAttribute('id', 'divScore');
            var ScoreA=[
                {value: localStorage.getItem('highscore')||0, applyButton: 'applyScore'}
            ];
            $('#highscoreTmpl').tmpl(ScoreA).appendTo('#divScore');
            bulk();
            var buttonScore=document.getElementById('applyScore');
            buttonScore.addEventListener('click',function(e){
                div.style.display='none'
                bulk();
            });
            }
    }
function goMenu(e){
        e.preventDefault();
        location.hash = "index";
        bulk();
    }
function goPlay(e){
        e.preventDefault();
        location.hash = "game";
        bulk();
    }
function goSettings(e){
        e.preventDefault();
        var setParent=document.getElementById('divSettings');
        if(setParent){
            setParent.style.display='block';
            bulk();
        }else{
            var div=document.createElement('div');
            var parent=document.getElementsByClassName('mainWrapper')[0];
            if(parent){
                parent.appendChild(div);
                
            }else{
                document.body.appendChild(div);
                div.style.left=50+'px';
            }
            div.setAttribute('id', 'divSettings');
            var SettingsA=[
                {closeButton: 'closeSettings', applyButton: 'applySettings'}
            ];
            $('#settingsTmpl').tmpl(SettingsA).appendTo('#divSettings');
            changeVolume();
            bulk();
        }
    }
var musicRange;
var soundRange;
if(!'musicVolume' in localStorage){
     localStorage.setItem('musicVolume',0.2);
}
if(!'soundVolume' in localStorage){
    localStorage.setItem('soundVolume',0.7);
}
window.onhashchange = loadNewPage;
function loadNewPage () {
	var hash = location.hash.substr(1);
	//console.log(hash);
	if (hash == "") {
		hash = "index";
    }
    switch(hash){
        case 'game':
        $.ajax(hash+".html",
            {
                type: 'GET',
                dataType: 'html',
                success: dataLoadGame
        });
        break;
        case 'index':
        $.ajax(hash+".html",
            {
                type: 'GET',
                dataType: 'html',
                success: dataShowNewPage
        });
        break;
        default:
        $.ajax(hash+".html",
            {
                type: 'GET',
                dataType: 'html',
                success: dataShowNewPage
        });
        break;
    } 
}
function dataShowNewPage(data){
    document.body.innerHTML = data;
    mainMenuButtons();
}
function dataLoadGame (data) {
    document.body.innerHTML = data;
    playMyGame();
}
function changeVolume(){
    var parent=document.getElementById('divSettings');
    var tempMusic=localStorage.getItem('musicVolume');
    var tempSound=localStorage.getItem('soundVolume');
    $('#musicRange').mousemove('change',function(){
        localStorage.setItem('musicVolume',this.value/10);
        })
    $('#soundRange').mousemove('change',function(){
        localStorage.setItem('soundVolume',this.value/10);
    })
    var closeSet=document.getElementById('closeSettings');
    closeSet.addEventListener('click', function(){
        localStorage.setItem('musicVolume',tempMusic);
        localStorage.setItem('soundVolume',tempSound);
        var win=document.getElementById('divSettings');
        parent.style.display='none';
        
        bulk();
    });
    var applySet=document.getElementById('applySettings');
    applySet.addEventListener('click', function(){
        var win=document.getElementById('divSettings');
        parent.style.display='none';
            try {updateVolumeG();}catch{updateVolumeM();}
        bulk();
    });
    
}
function updateVolumeM(){
    bulk.volume=localStorage.getItem('soundVolume')||0.4;
}
function updateVolumeG(){
    gulp.volume=localStorage.getItem('soundVolume')||0.4;
    explosion.volume=localStorage.getItem('soundVolume')||0.4;
    fishSound.volume=localStorage.getItem('soundVolume')||0.4;
    backAudio.volume=localStorage.getItem('musicVolume')||0.2;
    bulk.volume=localStorage.getItem('soundVolume')||0.4;
}
function bulk(){
    var sound=new Audio;
    sound.src='sounds/bulk.mp3';
    sound.autoplay=true;
    sound.loop=false;
}