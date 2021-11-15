const gameArea = document.querySelector('.gameArea');
const btn=document.createElement('button');
const output=document.createElement('div');
const inWord=document.createElement('input');
const scoreBoard=document.createElement('div');
const selWordList=document.createElement('div');

const url='https://docs.google.com/spreadsheets/d/';
const ssid='1S8gVKhwwZKo12T8LCpkQJaS32-zeO5TUHDBzsyktFRE';
const q1='/gviz/tq?';
const q2='tqx=out:json';
let url1=`${url}${ssid}${q1}&${q2}`;
const myWords=["hi","tiger","lion","bird"];//min two character
fetch(url1).then(res=>res.text()).then(data=>{
    const json=JSON.parse(data.substr(47).slice(0,-2))
    console.log(json.table);
    json.table.rows.forEach(element => {
        element.c.forEach((cell)=>{
            myWords.push(`${cell.v}`);
        })
    });
    btn.style.display='block';
    output.textContent="you may start the game now";
    selWordList.style.display='block';
}) 
console.log(myWords);

///game start variables
const game={sel:'',scramble:'',score:0,incorrect:0,wordsleft:0,played:myWords.length};


scoreBoard.style.color='white';
scoreBoard.style.background="black";
scoreBoard.style.padding="10px";
scoreBoard.style.fontSize="2em";
inWord.setAttribute('type','text');
output.textContent="Words are Loading.......";
output.style.textAlign='center';
output.style.fontSize='1.2em';
inWord.classList.add('myInput');
btn.textContent="START GAME";
btn.classList.add('btn','btn-primary');

gameArea.append(output);
gameArea.append(inWord);
gameArea.prepend(scoreBoard);
gameArea.append(btn);
gameArea.append(selWordList);

scoreBoard.style.display='none';
inWord.style.display='none';
btn.style.display='none';
selWordList.style.display='none';
///event listerners
btn.addEventListener('click',(e)=>{
    if(myWords.length<=0){
        scoreBoard.textContent='';
        btn.textContent="";
        gameArea.style.background="green";
        gameArea.style.color="white";
        gameArea.style.fontSize="2.5em";
        gameArea.innerHTML=`<div>GAME OVER</div><br>`;
        gameArea.textContent+=` You got ${game.score} correct vs ${game.incorrect} incorrect out of ${game.played} words total`;
        
    }else{
    }
    inWord.disabled=false;
    inWord.value="";
    inWord.style.borderWidth='1px';
    inWord.style.borderColor="#eee";
    inWord.style.letterSpacing="0.5em";
    scoreBoard.style.display='block';
    scoreBoard.textContent="Score : 0";
    inWord.style.display='inline';
    inWord.focus();
    btn.style.display='none';
    myWords.sort(()=>{return 0.5 - Math.random()});//randomizing the array
    game.sel=myWords.shift();
    game.wordsleft = myWords.length;
    addScore();
    game.scramble=sorter(game.sel);
    output.style.fontSize='3em';
    output.style.letterSpacing='0.5em';
    inWord.setAttribute('maxlength',game.sel.length);
    output.textContent=`${game.scramble}`;
})

inWord.addEventListener('keyup',(e)=>{
    inWord.style.borderColor="#eee";
    inWord.style.borderWidth='1px'; 
    if(inWord.value.length == game.sel.length || e.code=='Enter')
    {
        winChecker();
    }
})

function winChecker(){
    inWord.style.borderWidth='5px'
    if(inWord.value == game.sel)
    {
        inWord.style.borderColor="green";
        game.score++;
        btn.style.display="block";
        inWord.disabled=true;
        btn.textContent="click for the next one";
    }
    else
    {
        inWord.style.borderColor='red';
        inWord.value='';
        inWord.focus();
        game.incorrect++;
    }
    addScore();
}

function addScore(){
    let tempOutput=`Score: <b>${game.score}</b> vs incorrect <i>(${game.incorrect})</i> <small>${game.wordsleft}</small> Words left`;
    scoreBoard.innerHTML=tempOutput;
}



function sorter(val){
    let temp=game.sel.split('');
    temp.sort(()=>{return 0.5-Math.random()});
    temp=temp.join('');
    if(val===temp){
        return sorter(val)
    }
    return temp;
}