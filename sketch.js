//Create variables here
var dog, dog1, happyDog, database, foodS, foodStock;
var fedTime, lastFed,foodObj,feed,addFood; 
function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg1.png");
  dog1 = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(1100, 300);

  database = firebase.database();

  dog = createSprite(900, 150, 15, 15);
  dog.addImage(dog1);
  dog.scale = 0.3;

  var foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  foodObj = new food();


  feed=createButton("Feed the dog");
  feed.position(900,67);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(1000,67);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(rgb(46, 139, 87));
foodObj.display();

drawSprites();

fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed === 0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
   }
  }
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour+1()
  })
}

function addFoods(){
  foodS = foodS + 1;
  database.ref('/').update({
    Food:foodS
  })
}

