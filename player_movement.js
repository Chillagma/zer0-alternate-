function updatePlayer() {
      let speed_2 =2
      let time = performance.now() / 1000;
      if (keys['a']){

        player.angle -= 0.05/speed_2;
       //movement += Math.cos(movement/45) *55;
      } 
      if (keys['d']) {
        player.angle += 0.05/speed_2;
       // movement -= Math.cos(movement/45) *55;
      }
      if (keys['w']) {
      //  movement += Math.cos(movement/45) *55;
        player.x += Math.cos(player.angle) * speed;
        player.y += Math.sin(player.angle) * speed ;
        player2.x += Math.cos(player.angle) * speed;
        player2.y += Math.sin(player.angle) * speed;
       // player_other.x += Math.cos(player.angle) * speed;
       // player_other.y += Math.sin(player.angle) * speed;
      }
      if (keys['s']) {
        player.x -= Math.cos(player.angle) * speed;
        player.y -= Math.sin(player.angle) * speed;
        player2.x -= Math.cos(player.angle) * speed;
        player2.y -= Math.sin(player.angle) * speed;
       // player_other.x -= Math.cos(player.angle) * speed;
       // player_other.y -= Math.sin(player.angle) * speed;
      // movement -= Math.cos(movement/45) *55;
      }
    
      
    }
    updatePlayer();