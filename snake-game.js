function init() {
   canvas = document.getElementById("mycanvas");
   pen = canvas.getContext('2d');
   W = H = canvas.height = canvas.width = 800;
   cs = 50;
   score=0;
   game_over=false;
   // adding image
   food_img=new Image();
   food_img.src="apple.jpg";
   trophy=new Image();
   trophy.src="trophy.png";
   food=getRandomFood();
   snake = {
      initial_len: 5,
      color: "blue",
      cells: [],
      direction: "right",
      createSnake: function () {
         for (var i = this.initial_len; i > 0; i--) {
            this.cells.push({ x: i, y: 4 });
         }
      },
      drawSnake: function () {
         for (var i = 0; i < this.cells.length; i++) {
            pen.fillStyle = this.color;
            pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
         }
      },
      updateSnake: function () {
         var headX = this.cells[0].x;
         var headY = this.cells[0].y;
         if(headX==food.x && headY==food.y){
            food=getRandomFood();
            score++;
         }
         else{
         this.cells.pop();
         }
         
         var nextX,nextY;
         if(this.direction=="right"){
            nextX=headX+1;
            nextY=headY;
         }
         else if(this.direction=="left"){
            nextX=headX-1;
            nextY=headY;
         }
         else if(this.direction=="down"){
            nextX=headX;
            nextY=headY+1;
         }
         else{
            nextX=headX;
            nextY=headY-1;
         }
         this.cells.unshift({ x: nextX, y: nextY });
         var last_x= Math.round(W/cs);
         var last_y= Math.round(H/cs);
         if(this.cells[0].x<0||this.cells[0].y<0 || this.cells[0].x>last_x||this.cells[0].y>last_y){
            game_over=true;
         }
      }
   };
   snake.createSnake();

}
function draw() {
   pen.clearRect(0, 0, W, H);
   snake.drawSnake();
   pen.fillStyle=food.color;
   pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
   pen.drawImage(trophy,20,20,cs,cs);
   pen.fillStyle="black";
   pen.font="30px Roboto";
   pen.fillText(score,40,50);
}
function update() {
   function keyPressed(e){
      if(e.key=="ArrowRight"){
         snake.direction="right";
      }
      else if(e.key=="ArrowDown"){
         snake.direction="down";
      }
      else if(e.key=="ArrowUp"){
         snake.direction="up";
      }
      else{
         snake.direction="left";
      }
   }
   document.addEventListener('keydown',keyPressed);
   snake.updateSnake();
}
function getRandomFood(){
   var foodX=Math.round(Math.random()*(W-cs)/cs);
   var foodY=Math.round(Math.random()*(H-cs)/cs);
   var food ={
      x:foodX,
      y:foodY,
      color:"red",
   }
   return food;
}
function gameloop() {
   if(game_over==true){
      clearInterval(f);
      alert("game over");
   }
   draw();
   update();
}
init();
var f=setInterval(gameloop, 100);