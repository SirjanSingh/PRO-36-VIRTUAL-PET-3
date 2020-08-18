class Food{

    constructor(lastFed,foodLeft){
        this.image = loadImage("images/Milk.png")
        this.foodStock = foodLeft
        this.lastFed = lastFed
    
    }
    getFoodStock(){
        var foodStockRef  = database.ref('Food');
        foodStockRef.on("value",(data)=>{
           this.foodStock = data.val();
        })
    }

    updateFoodStock(a){
        database.ref('/').update({
            'Food' : a
          })
     
    }

    deductFood(){

this.foodStock = this.foodStock- 1;
database.ref('/').update({
    'Food' : this.foodStock
  })
    }

    updateLastFed(lastFed){
        database.ref('/').update({
            'lastFed' : lastFed
        })
    }
    display(){
         var x= 80 , y = 100;
         imageMode(CENTER);
       //  image(this.image,200,200,50,50)

        if(this.foodStock != 0){

           for(var i =0;i<this.foodStock;i++){
              if(i%10===0){
               x=80;
               y+=50
              }
              image(this.image,x,y,50,50)
              x=x+30;
           }

        }
        
    }
}