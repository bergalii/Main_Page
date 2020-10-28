document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let isGameOver = true;
    let platformCount = 4;
    let platforms = []
    let score = 0
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    const gravity = 0.9
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId

    class Platform {
        constructor(newPlatBottom) {
            this.left = Math.random() * 315;
            this.bottom = newPlatBottom;
            this.visual = document.createElement('div');

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }


    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++
                    document.getElementById('score').innerHTML = `Score: ${score}`
                    var newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }

    }

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        //doodlerLeftSpace = platforms[0].left
        doodlerLeftSpace = 10;
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    function fall() {
        //console.log('fall')
        isJumping = false
        clearInterval(upTimerId);
        downTimerId = setInterval(function() {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
                jump();
                //gameOver();
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= (platform.bottom + 15)) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    startPoint = doodlerBottomSpace;
                    jump();
                    isJumping = true;
                }
            })
        }, 20)
    }

    function jump() {
        console.log('jump');
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function() {
            doodlerBottomSpace += 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace > (startPoint + 200)) {
                fall();
                isJumping = false;
            }
        }, 30);
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function() {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            };
        }, 20)
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function() {
            if (doodlerLeftSpace <= 313) {
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            };
        }, 20)
    }



    function control(e) {
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        }
    }

    function gameOver() {
        isGameOver = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }


    function start() {
        isGameOver = false;
        if (!isGameOver) {
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30);
            jump(startPoint);
            document.addEventListener('keyup', control);
        };
    };
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            if (isGameOver) {
                console.log(document.querySelector('.grid').childNodes[3]);
                document.querySelector('.grid').childNodes[3].remove();
                start();
            };

        }
    });
});