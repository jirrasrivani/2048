'use strict';
let grid;
let old_grid;
let score = 0,prev_score=0;
let moves=0;
let p;
let q;
let flag=0;
let uflag=0;
let gover=0;
let gwon=0;

function start()
{
    window.location.href="index.html";
}


function newGame()
{
    window.location.href="index.html";
}

function undo()
{
    if(uflag==0){
    grid=copyGrid(old_grid);
    flag=0;
    moves=moves-1;
    score=prev_score;
    updateCanvas();
    uflag=1;
    if(gover==1)
    gover=0;
    }
}


let colorSizes = {
    "2":{
        size: 64,
        // color: "#4494C1"
        // color: "#2494C1"
        color:"#ff99ff"
    },
    "4":{
        size: 64,
        // color: "#9944C1"
        // color: green
        color:"#ff80ff"
    },
    "8":{
        size: 64,
        // color: "#9994C1"
        // color: blue
        color: " #ff66ff"
    },
    "16":{
        size: 64,
        color: "#ff4dff"
        // color: yellow
    },
    "32":{
        size: 64,
        color: "#ff33ff"
        // color: pink 
    },
    "64":{
        size: 64,
        color: "#ff1aff"
        // color: orange
    },
    "128":{
        size: 36,
        color: "#ff00ff"
        // color:purple
    },
    "256":{
        size: 36,
        color: "#e600e6"
        // color : violet
    },
    "512":{
        size: 36,
        // color: "#F1C500"
        // color: brown
        color: "#cc00cc"
    },
    "1024":{
        size: 18,
        color: "#b300b3"
        // color: lightpink
    },
    "2048":{
        size: 18,
        color: "#ff9900"
        // color: gold
    }
}

function isGameOver()
{
    let gameover=true;
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            if(grid[i][j] == 0){
                gameover=false;
            }
            if(i!=3 && grid[i][j]===grid[i+1][j])
            {
                gameover=false;
            }
            if(j!=3 && grid[i][j]===grid[i][j+1])
            {
                gameover=false;
            }
        }
    }
    
    return gameover;
}

function isGameWon()
{
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            if(grid[i][j] == 2048){
                return true;
            }
            
        }
    }
    return false;
}

function blankGrid()
{
    return [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];
}
function setup()
{ 
    // alert(x);
   createCanvas(400,400).position(550,150).elt.style.border='5px solid black';
    noLoop();
    grid=blankGrid();
    addNumber();
    addNumber();
    updateCanvas();
}
function addNumber()
{
    flag=0;
    let options=[];
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            if(grid[i][j]==0)
            {
                options.push({
                    a:i,
                    b:j
                });
            }
        }
    }
    
    if(options.length>0)
    {
        let spot=random(options);
        let r=random(1);
        grid[spot.a][spot.b]=r>0.5?2:4;
        // console.log(spot.x*100);
        // console.log(spot.y*100);
        p=spot.a;
        q=spot.b;
        flag=1;
    }

}
function compare(a,b)
{
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
           if(a[i][j]!==b[i][j])
           {
                return true;
           }
        }
    }
    return false;
}

function copyGrid(grid)
{
    let extra=blankGrid();
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            extra[i][j]=grid[i][j];
        }
    }
    return extra;

}

function flipGrid(grid)
{
    for(let i=0;i<4;i++)
    {
        grid[i].reverse();
    }
    return grid;
}
function rotateGrid(grid)
{
    let newGrid=blankGrid();
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            newGrid[i][j]=grid[j][i];
        }
    }
    return newGrid;
}
function keyPressed()
{

    old_grid=copyGrid(grid);
    
    prev_score=score;
    let flipped=false;
    let rotated=false;
    let played=true;
    if(gwon==0){

    if(keyCode === DOWN_ARROW){
        //
    }   else if(keyCode === UP_ARROW)
    {
        grid=flipGrid(grid);
        flipped=true;
    }
    else if(keyCode === RIGHT_ARROW)
    {
        grid=rotateGrid(grid);
        rotated=true;
    }
    else if(keyCode === LEFT_ARROW)
    {
        grid=rotateGrid(grid);  
        grid=flipGrid(grid);
        rotated=true;
        flipped=true; 
    }
    else
    {
        played=false;
    }

    if(played=true)
    {
        uflag=0;
       

        let past=copyGrid(grid);
        
        for(let i=0;i<4;i++)
        {
           grid[i]=operate(grid[i]);
        }
        let changed=compare(past,grid);
        if(flipped)
        {
            grid=flipGrid(grid);
        }
        if(rotated)
        {
            grid=rotateGrid(grid);
            grid=rotateGrid(grid);
            grid=rotateGrid(grid);
        }
        if(changed)
        {
            addNumber();
            if(gover==0 )
             moves=moves+1;
        }
        
        updateCanvas();

        let gameover=isGameOver();
        if(gameover)
        {   
            gover=1;
            fill(0);
            rect(0,150,400,100);
            fill(255);
            text("GAME OVER",200,200);
            console.log("GAME OVER");
            select('#game').html("GAME OVER");
        }
        let gamewon=isGameWon();
        if(gamewon)
        {
            // grid=blankGrid();
            gwon=1;
            updateCanvas();
            fill(0);
            rect(0,75,400,100);
            fill(255);
            text("Your score is "+score,200,125);
            fill(0);
            rect(0,200,400,100);
            fill(255);
            text("GAME WON",200,250);
            console.log("GAME WON");
            select('#game').html("GAME WON");
            
        }
        
    }
  }
    
 }
function operate(row)
{
    row=slide(row);
    row=combine(row);
    row=slide(row);
   
    return row;
}

function updateCanvas()
{
    background(255);
    drawGrid();
    select('#score').html(score);
    select('#moves').html(moves);
}
function slide(row)
{
     let arr=row.filter(val=>val);
     let missing=4-arr.length;
     let zeros=Array(missing).fill(0);
     arr=zeros.concat(arr);
     return arr;
}
function combine(row)
{
    for(let i=3;i>=0;i--)
    {
        let a=row[i];
        let b=row[i-1];
        if(a==b)
        {
            row[i]=a+b;
            score+=row[i];
            row[i-1]=0;
        }
    }
    return row;

}
function drawGrid()
{
    let w=100;
    let a=100;
    let b=100;
    
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
           noFill();
           strokeWeight(2);
           //stroke(0);
           let val=grid[i][j];
           let s=val.toString();
        //    console.log(s);
        //    console.log(colorSizes[s].color);
        //    console.log(colorSizes[s].size);


           stroke(20); 
           if(val!=0){

                    fill(colorSizes[s].color);
            }
           else{
               noFill();
           }
        
           rect(i*w,j*w,w,w);
           
           if(val!==0)
           {
               textAlign(CENTER,CENTER);   
               noStroke();
               fill(0);
               textSize(colorSizes[s].size);
               text(val,i*w+w/2,j*w+w/2);
           }
        }
    }
    if(flag==1){
      
        let val=grid[p][q];
        let s=val.toString();
        fill(40);
        rect(p*100,q*100,100,100);
        fill(255);
        textSize(colorSizes[s].size);
        text(val,p*w+w/2,q*w+w/2);
    }
    
}
