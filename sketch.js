//Create variables here
var dog,hDog,database,foodS;
var foods;
var dogSp;
var fc=0;
var milnImg;
var bFeed,bAdd;
var feedTime,lastFedH,lastFedM,lastFed;
var foodObj;
var lastFedF;
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  hDog = loadImage("images/dogImg1.png");
}

function setup() {
 database = firebase.database();
  console.log(firebase.database)

  createCanvas(500, 500);
  foodObj = new Food(lastFedF ,foods);

 // exp = new Food(a,b);

  dogSp = createSprite(450,250,50,50)

  dogSp.addImage(dog)
  dogSp.scale = 0.25;


var foodStock = database.ref('Food');
  foodStock.on("value" ,(data)=> {
    foods = data.val();
  });
  foodObj.getFoodStock();
  console.log(foods)
  
 /* database.ref('/').update({
  'Food' : 20
  })*/

  

  
  //taking value of last fed from database
  var lastFedRef = database.ref('lastFed');
  lastFedRef.on("value",function(data){
    lastFedF= data.val()
  });
console.log(lastFedF)

  bAdd = createButton('Add Food');
  bFeed = createButton('Feed The Dog') 
  
  bAdd.position(450,75)
  bFeed.position(600,75)

  bFeed.mousePressed(()=>
  {
  lastFedH = hour();
  lastFedM = minute();
  //lastFed = lastFedH + ":" + lastFedM  + " hours"//+ ":" + lastFedS
  
  if(lastFedH >= 12){
    lastFed=  lastFedH%12 + ":" +lastFedM 
  }
   else if(lastFedH === 0){
     lastFed = 12 
  } 
  else {
  lastFed=  lastFedH + ":" +lastFedM 
  }

  console.log(lastFed)
  
  foodObj.updateLastFed(lastFed)

    foods = foods - 1;
    if(foods<0){
      foods = 0;
      }
  foodObj.updateFoodStock(foods);
  dogSp.addImage(hDog)
  fc = frameCount
  });

  bAdd.mousePressed(()=>{
    foods = foods + 1;
    if(foods>40){
      foods -= 1;
      }
    foodObj.updateFoodStock(foods);
  });

}


function draw() {  
background(46, 139, 87)


console.log(foodS,foods)

//exp.display()
  

//foodObj.display();



var fc1= fc + 100
if(frameCount>fc1){
  dogSp.addImage(dog)

}
//console.log(fc)


  
 
  //add styles here
 
fill("black")
stroke("yellow");
textSize(20);
//text("LAST FED "+ lastFedF,150,75)
if(lastFedF != undefined){
if(lastFedH >= 12){
 // text("Last Feed : " + lastFedH%12 + ":" +lastFedM +"PM" ,150,75)
 text("Last feed :"+ lastFedF + " AM",150,75)
} else if(lastFedH === 0){
  text("Last Feed : 12 AM" ,150,75);
} else {
  text("Last Feed : "+lastFedF +" PM" ,150,75);
}
}
//console.log(lastFedF)

//

drawSprites();
foodObj.display();
  }

