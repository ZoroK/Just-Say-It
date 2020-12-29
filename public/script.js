
const welcome=document.getElementById("welcome");
const play= document.getElementById("play");
const url="/getwords";
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const wordout= document.getElementById("word");
const out=document.getElementById("output");
let dat;
let ii;
let fl=1;
let recog;
let flag=0;
let speaking;

play.addEventListener("click",help);


function help(){
   fetch(url, {method:"GET"})
   .then( res => res.json())
   .then( (data) => {
       console.log(data);
       dat=data;
       startgame();
   })
   .catch( err => console.log(err));
}


async function startgame(){
     play.style.display="none";

    console.log(dat);
    if (!('SpeechRecognition' in window)) {
        console.log('Sorry your browser does not support speech reco. ');
        return;
      }
      ii=0;
      recog=new  SpeechRecognition();
      recog.continuous=true;
      recog.interimResults=true;
      recog.addEventListener("result",checkres);
      await gogogo();
      return ;
}

   async function startr(){
       await recog.start();      
       console.log("started");
   }
   async function stopr(){
       await recog.stop();
       console.log("stopped");
   }

   function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function gogogo(){
    if(ii<10)
    {
       displayword(dat[ii]);
       if(!ii)await startr();
    }
    else {await stopr();gamewon();}
}

function displayword(word){
    welcome.textContent=word;
    console.log(word);
}

function useroutput(word,col){
    if(col)out.style.color="green";
    else out.style.color="red";
    out.textContent=word;
}

function playag(){
    document.getElementById("btpa").style.display="block";
  //  document.getElementById("btpa").style.textAlign="center";
}

function gamelost(){
    // await stopr();
    out.innerText= "sorry you lost";
    playag(); 
   // console.log("sorry");
}

function gamewon(){
    // await stopr();
    out.innerText="woohooo you won";
    playag();
  //  console.log("wohooooo");
}


async function checkres(res){
  //  await stopr();
    //console.log(data);
    let w= res.results[0][0].transcript;
    let fw= w.indexOf(" ");
    let word;
    if(fw==-1)word=w;
    else word=w.substr(0,fw);
   // console.log(word);
    word =word.toLowerCase();

    //useroutput(word);

    if(word!=dat[ii])
    {
        useroutput(word,0);
         await stopr();
        await sleep(2000);
        gamelost();
        return;
    }
    useroutput(word,1);
    ii++;
 //   console.log("sssss");
    gogogo();
  //  return w;
}