const gameArea = document.querySelector('.gameArea');
const btn=document.createElement('button');
const output=document.createElement('div');
const inWord=document.createElement('input');
const scoreBoard=document.createElement('div');
const reset=document.createElement('button');
const Next=document.createElement('button');

const url='https://docs.google.com/spreadsheets/d/';
const ssid='1S8gVKhwwZKo12T8LCpkQJaS32-zeO5TUHDBzsyktFRE';
const q1='/gviz/tq?';
const q2='tqx=out:json';
let url1=`${url}${ssid}${q1}&${q2}`;
const myWords=[];//min two character

Next.textContent='Next Word';

Next.classList.add('btn-warning');

///game start variables
const game={sel:'',scramble:'',score:0,incorrect:0,wordsleft:0,played:30};

reset.textContent="RESET";
reset.classList.add('btn-secondary');
reset.style.marginTop='18px';

Next.style.display='none';

reset.addEventListener('click',(e)=>{
    location.reload();
})

let selectedValue=-1;
function change(){
    var selectBox = document.getElementById("choice");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;   
    bring(selectedValue,selectBox);
}
//alert(`${c.id}`);
scoreBoard.style.color='white';
scoreBoard.style.background="black";
scoreBoard.style.padding="10px";
scoreBoard.style.fontSize="2em";
inWord.setAttribute('type','text');
output.textContent="Your Game Will be Loaded after selecting the Level.......";
output.style.textAlign='center';
output.style.fontSize='1.2em';
inWord.classList.add('myInput');
btn.textContent="START GAME";
btn.classList.add('btn','btn-primary');

gameArea.append(output);
gameArea.append(inWord);
gameArea.prepend(scoreBoard);
gameArea.append(btn);
gameArea.append(Next);
gameArea.append(reset);




function bring(selectedValue,selectBox)
{
    if(selectedValue==0)
        alert('This level provides common english words which are used in our daily. You need to arrange them correctly');
    else if(selectedValue==1)
        alert("This level is children based you will be getting fruit names jumbled up. Your task is to rearrange them correctly");
    else if(selectedValue==2)
        alert("This level is a medium level, Here you will be provided a list of country names jumbled up. Your task is to rearrange them correctly");
    fetch(url1).then(res=>res.text()).then(data=>{
        const json=JSON.parse(data.substr(47).slice(0,-2))
        console.log(json.table);
        json.table.rows.forEach((element,index) => {
            console.log(index);
            if(selectedValue==index)
            {
                element.c.forEach(ele=>{
                    myWords.push(ele.v);
                    console.log(ele.v);
                })
            }
        });
        selectBox.style.display='none';
        btn.style.display='block';
        output.textContent="Click Now to start the GAME";
    })
}
console.log(myWords);
scoreBoard.style.display='none';
inWord.style.display='none';
btn.style.display='none';
reset.style.display='none';



///event listerners
btn.addEventListener('click',(e)=>{
    
    var timeleft = 60;

    var downloadTimer = setInterval(function function1(){
    document.getElementById('timer').innerHTML= timeleft +" "+"seconds remaining";

    timeleft -= 1;
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById('timer').innerHTML="Time is up!";
        alert("Time Up!")
        location.reload();
    }
    }, 1000);
    
    
    reset.style.display='block';
    if(game.played<=0){
        scoreBoard.textContent='';
        btn.textContent="";
        gameArea.style.background="green";
        gameArea.style.color="white";
        gameArea.style.fontSize="2.5em";
        gameArea.innerHTML=`<div>GAME OVER</div><br>`;
        gameArea.textContent+=` You got ${game.score} correct vs ${game.incorrect} incorrect`;
        
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
    // myWords.sort(()=>{return 0.7 - Math.random()});//randomizing the array
    // game.sel=myWords.shift();
    // game.wordsleft = myWords.length;
    // addScore();
    // game.scramble=sorter(game.sel);
    sorting();
    // output.style.fontSize='3em';
    // output.style.letterSpacing='0.5em';
    // inWord.setAttribute('maxlength',game.sel.length);
    // output.textContent=`${game.scramble}`;
})

function sorting()
{
    myWords.sort(()=>{return 0.7 - Math.random()});//randomizing the array
    game.sel=myWords.shift();
    game.wordsleft = myWords.length;
    addScore();
    game.scramble=sorter(game.sel);
    output.style.fontSize='3em';
    output.style.letterSpacing='0.5em';
    inWord.setAttribute('maxlength',game.sel.length);
    output.textContent=`${game.scramble}`;
}


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
        Next.style.display='none';
        inWord.style.borderColor="green";
        game.score++;
        game.played--;
        btn.style.display="block";
        inWord.disabled=true;
        btn.textContent="click for the next one";
        btn.style.marginTop='8px';
    }
    else
    {
        Next.style.display='block';
        inWord.style.borderColor='red';
        inWord.value='';
        inWord.focus();
        game.incorrect++;
    }
    addScore();
}

Next.addEventListener('click',(e)=>{
    sorting();
})


function addScore(){
    let tempOutput=`Score: <b>${game.score}</b> vs incorrect <i>(${game.incorrect})</i> <small>${game.played}</small> Words left`;
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