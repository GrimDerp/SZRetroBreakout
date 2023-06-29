<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GrimDerpsJsBreakOut</title>
        <style>
            *{
                padding: 0;
                margin: 0;
            }
            canvas {
                background: #eee;
                display: block;
                margin: 0 auto;
            }
        </style>
</head>
    <body>
        <canvas id="myCanvas" width="480" height="320"></canvas>

        <script>
            const canvas = document.getElementById("myCanvas");
            const ctx = canvas.getContext("2d");
            const ballRadius = 10;
            const paddleHeight = 10;
            const paddleWidth = 80;

            const brickRowCount = 4;
            const brickColumnCount = 7;
            const brickWidth = 50;
            const brickHeight = 18;
            const brickPadding = 8;
            const brickOffsetTop = 30;
            const brickOffsetLeft = 30;
            //const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            //const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

            let paddleX = (canvas.width - paddleWidth) / 2;
            let score = 0;
            let x = canvas.width / 2;
            let y = canvas.height - 30;
            let dx = 2;
            let dy = -2;
            let rightPressed = false;
            let leftPressed = false;
            let lives = 5;

            const bricks = [];
            for (let c = 0; c < brickColumnCount; c++){
                bricks[c] = [];
                for (let r = 0; r < brickRowCount; r++){
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }

            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);
            document.addEventListener("mousemove", mouseMoveHandler, false);

            function keyDownHandler(e) {
                if (e.key === "Right" || e.key === "ArrowRight") {
                    rightPressed = true;
                } else if (e.key === "Left" || e.key === "ArrowLeft") {
                    leftPressed = true;
                }
            }
            function keyUpHandler(e) {
                if (e.key === "Right" || e.key === "ArrowRight") {
                    rightPressed = false;
                }
                else if(e.key == "Left" || e.key == "ArrowLeft") {
                    leftPressed = false;
                }
            }

            function mouseMoveHandler(e){
                const relativeX = e.clientX - canvas.offsetLeft;
                if (relativeX > 0 && relativeX < canvas.width) {
                    paddleX = relativeX - paddleWidth / 2;
                }
            }

            function collisionDetection(){
                for(let c = 0; c < brickColumnCount; c++){
                    for(let r = 0; r < brickRowCount; r++){
                        const b = bricks[c][r];
                        // calculations etc
                        if (b.status === 1) {
                            if (
                                x > b.x &&
                                x < b.x + brickWidth &&
                                y > b.y &&
                                y < b.y + brickHeight
                                ) {
                                dy = -dy;
                                b.status = 0;
                                score++;
                                if (score === brickRowCount * brickColumnCount) {
                                    alert("YOU WIN, CONGRATULATIONS!");
                                    document.location.reload();
                                    
                                    }
                                }
                            }
                    }
                }
            }

            function drawScore(){
                ctx.font = "16px Roboto";
                ctx.fillStyle = "#0095DD";
                ctx.fillText(`Score: ${score}`, 8, 20);
            }

            function drawLives(){
                ctx.font = "16px Roboto";
                ctx.fillStyle = "#0095DD";
                ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
            }

            function drawBall(){
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            function drawPaddle(){
                ctx.beginPath();
                ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            function drawBricks() {
                for (let c = 0; c < brickColumnCount; c++) {
                    for (let r = 0; r < brickRowCount; r++) {
                        if (bricks[c][r].status === 1) {
                        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                        }
                    }
                }
            }

            function draw(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBall();
                drawPaddle();
                drawBricks();
                collisionDetection();
                drawScore();
                drawLives();

                if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                if(y + dy < ballRadius) {
                    dy = -dy;
                }
                else if(y + dy > canvas.height-ballRadius) {
                    if(x > paddleX && x < paddleX + paddleWidth) {
                        if(y= y-paddleHeight){
                            dy = -dy  ;
			            }
                }
                else {
                    lives--;
                    if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                    
                    } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    }
                    }
                }
    
                if(rightPressed && paddleX < canvas.width-paddleWidth) {
                    paddleX += 7;
                }
                else if(leftPressed && paddleX > 0) {
                    paddleX -= 7;
                }

                x += dx;
                y += dy;
                requestAnimationFrame(draw);
            }

            draw();

        </script>
    </body>
</html>
