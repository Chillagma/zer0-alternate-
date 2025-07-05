 function art(wallHeight,shade,movement,i,f_y1,o_y1){ctx.fillStyle = `rgb(255,0,0)`
            var rect_offset = 200
            var step = 30
            // If space is pressed, draw a yellow rectangle shrinking from bottom right to center



            //projectiles
          
            shooting_projectiles();
            
       //   ctx.fillRect(canvas.width-rect_offset,canvas.height-rect_offset, canvas.width+rect_offset, canvas.height+rect_offset);
          
           ctx.fillStyle = `rgb(110,110,250)`
  ///equations for a circle
          var f_y1 = (canvas.height - wallHeight) - 700 + (i / 25.5);

          var f_y2 =  wallHeight- (i / 25.5) +150;
          var o_y1=(canvas.height - wallHeight)/2
          //circle perspective

           // ctx.fillRect(spiralWallX, spiralWallY, 2, wallHeight);

          
            
         
          //fourth perspective 
          ctx.globalAlpha = 0.4
          ctx.fillStyle = `rgb(0,0,${shade})`
          ctx.fillRect(i, f_y1, 1, wallHeight);
          ctx.globalAlpha = 0.4
          //caste floor(first perspective)
          ctx.globalAlpha = 0.4

          ctx.fillStyle = `rgb(${shade},${shade},255)`
          ctx.fillRect(i, o_y1 , 1, (canvas.height+wallHeight)+500);

               // wallHeight*0.5 for depth
            //second parameter is the important one here.
          //fourth perspective 
           

        
         
          

       

          //third perspective
          ctx.fillStyle = `rgb(${shade},${(shade*5)+250},55)`
          ctx.fillRect(i+viewx,(canvas.height - wallHeight)-100, 1, wallHeight);


          //first perspective
          ctx.fillStyle = `rgb(${shade},${shade/2},${shade})`

          

            ctx.fillRect(i+movement, o_y1, 1, wallHeight);
          
          


   
   //second perspective 
            
          









          ctx.globalAlpha = 0.5;
          //caste floor(first perspective)
         
         //5 perspective 
          ctx.fillStyle = `rgb(0,0,${shade*2})`
          ctx.fillRect(i,-1*( (canvas.height - wallHeight)-900-(i/5.5)), 1, wallHeight);
          ctx.globalAlpha = 0.5;


          //6 perspective
          ctx.fillStyle = `rgb(${shade/2},${shade*2},55)`
          ctx.fillRect(i,-1*((canvas.height - wallHeight)-900), 1, wallHeight);
          ctx.globalAlpha = 0.5;


          //7 perspective
          ctx.fillStyle = `rgb(${shade/2},${shade*2},${shade})`
          ctx.fillRect(i+movement, -1*o_y1 -900, 1, wallHeight);
          ctx.globalAlpha = 0.5;


          
          




            //randomize the shading with addd/subtacting/*multiplying random magic numbers.


            
          //extra perspectives
          //xcross 1
          ctx.fillStyle = `rgb(255,55,55)`
          ctx.fillRect(i, (canvas.height - wallHeight)-500+(i), 1, wallHeight);
          //xcross 2
          ctx.fillStyle = `rgb(255,55,55)`
          ctx.fillRect(i, (canvas.height - wallHeight)+500-(i), 1, wallHeight)


          ctx.fillStyle = `rgb(55,255,55)`
          ctx.fillRect(i+500, (canvas.height - wallHeight)-800, 1, wallHeight);

          ctx.fillStyle = `rgb(55,${(shade*200)+50},${(shade*20)+50})`
          ctx.fillRect(i+500, (canvas.height - wallHeight)-i, 1, wallHeight);

          ctx.fillStyle = `rgb(${(shade*200)+100},55,${(shade*200)+100})`
          ctx.fillRect(i+500, (canvas.height - wallHeight)+i-800, 1, wallHeight);
          
          
          ctx.globalAlpha = 0.5;
}