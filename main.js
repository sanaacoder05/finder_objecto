img="";
checkbox = "";
keyboard= [];

function preload(){
    input = document.getElementById('status').value;
   
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400)
}

function start(){
    objectDetection = ml5.objectDetector('cocossd',Modelloaded);
     document.getElementById('status').innerHTML="status : object detected";
}
function Modelloaded(){
    console.log('model loaded**');
    checkbox = true;

  
    
}

function gotresults(error,result){
    if(error){
        console.log(error);

    }

    else{
        console.log(result);

        keyboard = result;
    }
}

function draw(){
  
    image(video,0,0,650,450);
    if (checkbox != ""){
        r= random(100);
        g = random(150);
        b = random(95);
        objectDetection.detect(video,gotresults);
        for(i=0 ;i<keyboard.length;i++){
         
            fill(r,g,b);
            percent = floor(keyboard[i].confidence * 100);
            whatsup = keyboard[i].label;
            text(whatsup,keyboard[i].x + 10,keyboard[i].y+10);
            console.log(whatsup+" "+percent+"%"); 
            noFill();
            stroke(r,g,b);
            
            rect(keyboard[i].x,keyboard[i].y,keyboard[i].width,keyboard[i].height);
           

            if(keyboard[i].label == input){
            
                document.getElementById("de").innnerHTML = input+" detected";

            }

            else{
               
                document.getElementById("de").innnerHTML = input+" not detected";
            }

        }

        if(keyboard.length == 0){
            document.getElementById("de").innnerHTML = input+" not detected";
        }
    }

}