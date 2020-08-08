//Create variables here
var dog,hDog,database,foodS,foods=20;
var dogSp;
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
  
  dogSp = createSprite(250,250,50,50)

  dogSp.addImage(dog)
  dogSp.scale = 0.4;


var foodStock = database.ref('Food');
  foodStock.on("value" ,function(data) {
    foodS = data.val();
  });
 /* database.ref('/').update({
  'Food' : 20
  })*/
}


function draw() {  
background(46, 139, 87)
console.log(foodS,foods)



if(keyWentDown(UP_ARROW)){

  foodS = foodS - 1;
updateStock(foodS);
dogSp.addImage(hDog)
}


if(keyWentDown(DOWN_ARROW)){
foodS = foodS + 1;
updateStock(foodS)
}

if(foodS>20){
  foodS = 20;
  }
  if(foodS<0){
    foodS = 0;
    }

  drawSprites();
  //add styles here
push();
fill("black")
stroke("yellow");
textSize(20);
text("Number of milk cans left left "+foodS,125,75 )
text("PRESS UP ARROW KEY TO FEED THE DOG" , 65 ,425);
pop();
//textSize()
fill("black")
stroke("yellow");
textSize(18);
text("PRESS DOWN ARROW KEY TO INCREASE FOODSTOCK" , 5 ,475);



}

function updateStock(x){
 database.ref('/').update({
   'Food' : x
 })
}


/*function writeStock2(){
  database.ref('/').set({
    'Food' : foodS
      
  })
}

function readStock(data){
    foodStock= data.val();


    foodS = foodStock;


}*/