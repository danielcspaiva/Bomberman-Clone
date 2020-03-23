window.onload = () => { // FUNCAO A SER EXECUTADA QUANDO A JANELA CARREGAR

    let start = false;
    let players = 1;
    context = canvas.getContext("2d");

    const menu = () => {
        renderMap(mapMenu)
        for (let i = 0; i < mapMenu[0].length; i += 1) {
            context.drawImage(solidBlock, 50 * i, 0, 50, 50)
        }
        context.drawImage(superBomberman, 100, -50, 500, 500)
        context.font = "26px silkscreenbold";
        context.fillStyle = 'white';
        context.fillText('Press enter', canvas.width / 2 - 105, canvas.height / 1.55);
        context.fillText('single player', canvas.width / 2 - 120, canvas.height / 1.35);
        context.fillText('MULTI PLAYER', canvas.width / 2 - 110, canvas.height / 1.25);
        if (players === 1) {
            context.fillText('>', canvas.width / 2 - 145, canvas.height / 1.35);
        }
        if (players === 2) {
            context.fillText('>', canvas.width / 2 - 135, canvas.height / 1.25);
        }
        requestId2 = window.requestAnimationFrame(menu);
    }

    const startGame = () => { // FUNCAO DE START GAME
        window.cancelAnimationFrame(requestId2);
        title.pause()
        startSound.play()
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                randMap = makeRandMap(map1);
                break;
            case 1:
                randMap = makeRandMap(map2);
                break;
        }
        setTimeout(() => {
            level1.play()
            updateGameArea()
        }, 500);
    }

    const makeRandMap = (map) => { // FUNCAO PARA CRIAR MAPAS RANDOMICOS A PARTIR DOS TEMPLATES
        for (let j = 0; j < map.length; j += 1) {
            for (let i = 0; i < map[0].length; i += 1) {
                if (map[j][i] === 0 && Math.random() > 0.70) {
                    map[j][i] = 2;
                }
            }
        }
        map[1][1] = 0;
        map[1][2] = 0;
        map[2][1] = 0;
        map[9][13] = 0;
        map[8][13] = 0;
        map[9][12] = 0;
        return map;
    }

    const renderMap = (map) => { // FUNCAO PARA RENDERIZAR O MAPA
        for (let j = 0; j < map.length; j += 1) {
            for (let i = 0; i < map[0].length; i += 1) {
                context.drawImage(field, i * gridWidth, j * gridHeigth + offset, 50, 50)
                switch (map[j][i]) {
                    case 1: //SOLID BLOCK
                        context.drawImage(solidBlock, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 2: // WALL
                        context.drawImage(wall, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 3: // BOMB
                        context.drawImage(bomb, 0, 0, 19, 20, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 4: // EXPLOSION
                        context.drawImage(explosion, 45, 0, 20, 20, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 5: // POWER UP 1
                        context.drawImage(items, 0, 0, 16, 16, i * gridWidth + 10, j * gridHeigth + offset + 10, 30, 30)
                        break;
                    case 6: // POWER UP 2
                        context.drawImage(items, 34, 0, 16, 16, i * gridWidth + 10, j * gridHeigth + offset + 10, 30, 30)
                        break;
                    case 7: // POWER UP 3
                        context.drawImage(items, 18, 0, 16, 16, i * gridWidth + 10, j * gridHeigth + offset + 10, 30, 30)
                        break;
                }
            }
        }
    }

    const clear = () => { // FUNCAO PARA LIMPAR O CANVAS
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const statusBar = () => {
        context.drawImage(cleanStatusBar, 50, 0, 650, 50)
        context.drawImage(solidBlock, 0, 0, 50, 50)
        context.drawImage(solidBlock, 700, 0, 50, 50)
        context.drawImage(whiteHead, 65, 10, 30, 30)
        context.fillStyle = this.color;
        context.drawImage(heart, 103, 13, 25, 25)
        context.fillText(`${newPlayer.health}`, 135, 33);
        context.drawImage(items, 0, 0, 16, 16, 210, 10, 30, 30)
        context.font = "16px silkscreenbold";
        context.fillText(`${newPlayer.bombPower}`, 230, 40);
        context.drawImage(items, 34, 0, 16, 16, 255, 10, 30, 30)
        context.fillText(`${newPlayer.speed - 1}`, 275, 40);
        context.drawImage(items, 18, 0, 16, 16, 300, 10, 30, 30)
        context.fillText(`${newPlayer.bombs}`, 320, 40);
        if (newPlayer2) {
            context.drawImage(heart, 545, 13, 25, 25)
            context.drawImage(blackHead, 650, 10, 30, 30);
            context.font = "26px silkscreenbold";
            context.fillText(`${newPlayer2.health}`, 578, 33);
            context.font = "16px silkscreenbold";
            context.drawImage(items, 0, 0, 16, 16, 410, 10, 30, 30)
            context.fillText(`${newPlayer2.bombPower}`, 430, 40);
            context.drawImage(items, 34, 0, 16, 16, 455, 10, 30, 30)
            context.fillText(`${newPlayer2.speed - 1}`, 470, 40);
            context.drawImage(items, 18, 0, 16, 16, 500, 10, 30, 30)
            context.fillText(`${newPlayer2.bombs}`, 520, 40);
        }
        if (!newPlayer2) {
            context.drawImage(enemy, 0, 0, 22, 36, 655, -2, 22 * 1.3, 36 * 1.3)
            context.font = "26px silkscreenbold";
            if (newPlayer.enemiesKilled < 10) {
                context.fillText(`0${newPlayer.enemiesKilled}`, 608, 32);
            } else {
                context.fillText(`${newPlayer.enemiesKilled}`, 608, 32);
            }
        }
        context.font = "26px silkscreenbold";
    }

    const gameOver = (player) => {
        level1.pause()
        setTimeout(() => {
            window.cancelAnimationFrame(requestId);
            clear();
            for (let i = 0; i < mapMenu[0].length; i += 1) {
                context.drawImage(solidBlock, 50 * i, 0, 50, 50)
            }
            renderMap(mapMenu);
            if (players === 2) {
                context.fillText(`GAME OVER, ${player.name} WON!`, 130, canvas.height / 2 - 20);
                context.fillText(`PRESS ENTER TO PLAY AGAIN`, 120, 320);
            }
            if (players === 1) {
                context.fillText(`GAME OVER!`, 280, canvas.height / 2 - 50);
                context.fillText(`YOUR FINAL SCORE IS ${newPlayer.enemiesKilled}`, 155, canvas.height / 2);
                context.fillText(`PRESS ENTER TO PLAY AGAIN`, 120, 350);
            }
        }, 500);
    }

    class Player { // CLASE PLAYER
        constructor(x, y, color, healthPosition, health, name, img) {
            this.name = name;
            this.healthPosition = healthPosition;
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = 2;
            this.speedX = 0;
            this.speedY = 0;
            this.size = 30;
            this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
            this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
            this.bombs = 1;
            this.bombPower = 1;
            this.health = health;
            this.right = this.up = this.right = false;
            this.down = false;
            this.srcx = 0;
            this.srcy = 0;
            this.width = 16;
            this.height = 24;
            this.img = img;
            this.direction = Math.floor(Math.random() * 4);
            this.countAnim = 0;
            this.enemiesKilled = 0;

        }

        update() {
            context.fillStyle = this.color;
            this.sprites()
            context.drawImage(this.img, this.srcx, this.srcy, this.width, this.height, this.x, this.y - 20 + offset, this.width * 2.1, this.height * 2.1);
        }

        newPos() {
            this.x += this.speedX;
            this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);

            this.y += this.speedY;
            this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);

            // CHECKS COLLISION DETECTION
            if (
                randMap[this.gridY - 1][this.gridX] !== 0 &&
                randMap[this.gridY - 1][this.gridX] !== 4 &&
                randMap[this.gridY - 1][this.gridX] !== 5 &&
                randMap[this.gridY - 1][this.gridX] !== 6 &&
                randMap[this.gridY - 1][this.gridX] !== 7 &&
                this.y < this.gridY * gridHeigth
            ) {
                // COLISAO ACIMA
                this.y = this.gridY * gridHeigth;
            }
            if (
                randMap[this.gridY + 1][this.gridX] !== 0 &&
                randMap[this.gridY + 1][this.gridX] !== 4 &&
                randMap[this.gridY + 1][this.gridX] !== 5 &&
                randMap[this.gridY + 1][this.gridX] !== 6 &&
                randMap[this.gridY + 1][this.gridX] !== 7 &&
                this.y + this.size > (this.gridY + 1) * gridHeigth
            ) {
                // COLISAO ABAIXO
                this.y = this.gridY * gridHeigth + gridHeigth - this.size;
            }
            if (
                randMap[this.gridY][this.gridX - 1] !== 0 &&
                randMap[this.gridY][this.gridX - 1] !== 4 &&
                randMap[this.gridY][this.gridX - 1] !== 5 &&
                randMap[this.gridY][this.gridX - 1] !== 6 &&
                randMap[this.gridY][this.gridX - 1] !== 7 &&
                this.x < this.gridX * gridWidth
            ) {
                // COLISAO A ESQUERDA
                this.x = this.gridX * gridWidth;
            }
            if (
                randMap[this.gridY][this.gridX + 1] !== 0 &&
                randMap[this.gridY][this.gridX + 1] !== 4 &&
                randMap[this.gridY][this.gridX + 1] !== 5 &&
                randMap[this.gridY][this.gridX + 1] !== 6 &&
                randMap[this.gridY][this.gridX + 1] !== 7 &&
                this.x + this.size > (this.gridX + 1) * gridWidth
            ) {
                // COLISAO A DIREITA
                this.x = this.gridX * gridWidth + gridWidth - this.size;
            }

            if (randMap[this.gridY][this.gridX] === 5) {
                this.bombPower += 1;
                randMap[this.gridY][this.gridX] = 0;
            }

            if (randMap[this.gridY][this.gridX] === 6) {
                this.speed += 1;
                randMap[this.gridY][this.gridX] = 0;
            }

            if (randMap[this.gridY][this.gridX] === 7) {
                this.bombs += 1;
                randMap[this.gridY][this.gridX] = 0;
            }
        }

        sprites() {
            if (this.down) {
                this.srcy = 0;
            }
            if (this.right) {
                this.srcy = 26;
            }
            if (this.up) {
                this.srcy = 51;
            }
            if (this.left) {
                this.srcy = 76;
            }
            if (this.down || this.right || this.up || this.left) {
                this.countAnim += 1;
                if (this.countAnim > 25) this.countAnim = 0;
                this.srcx = Math.floor(this.countAnim / 5) * (this.width + 1);
            }
        }

        placeBomb() {
            placeBombSound.play()
            let bombx = this.gridX;
            let bomby = this.gridY;
            randMap[bomby][bombx] = 3;
            let bombPower = this.bombPower
            setTimeout(function () {
                setTimeout(function () {
                    for (let j = 0; j < randMap.length; j += 1) {
                        for (let i = 0; i < randMap[0].length; i += 1) {
                            if (randMap[j][i] === 4) {
                                randMap[j][i] = 0;
                            }
                        }
                    }
                }, 450);
                randMap[bomby][bombx] = 4;
                bombSound2.play()
                if (
                    randMap[bomby - 1][bombx] !== 1 &&
                    randMap[bomby - 1][bombx] !== 3 &&
                    randMap[bomby - 1][bombx] !== 5 &&
                    randMap[bomby - 1][bombx] !== 6 &&
                    randMap[bomby - 1][bombx] !== 7
                ) {
                    randMap[bomby - 1][bombx] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby - 2][bombx] !== 1 &&
                        randMap[bomby - 2][bombx] !== 3 &&
                        randMap[bomby - 2][bombx] !== 5 &&
                        randMap[bomby - 2][bombx] !== 6 &&
                        randMap[bomby - 2][bombx] !== 7
                    ) {
                        randMap[bomby - 2][bombx] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby - 3][bombx] !== 1 &&
                            randMap[bomby - 3][bombx] !== 3 &&
                            randMap[bomby - 3][bombx] !== 5 &&
                            randMap[bomby - 3][bombx] !== 6 &&
                            randMap[bomby - 3][bombx] !== 7
                        ) {
                            randMap[bomby - 3][bombx] = 4;
                        }
                    }
                }
                if (
                    randMap[bomby + 1][bombx] !== 1 &&
                    randMap[bomby + 1][bombx] !== 3 &&
                    randMap[bomby + 1][bombx] !== 5 &&
                    randMap[bomby + 1][bombx] !== 6 &&
                    randMap[bomby + 1][bombx] !== 7
                ) {
                    randMap[bomby + 1][bombx] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby + 2][bombx] !== 1 &&
                        randMap[bomby + 2][bombx] !== 3 &&
                        randMap[bomby + 2][bombx] !== 5 &&
                        randMap[bomby + 2][bombx] !== 6 &&
                        randMap[bomby + 2][bombx] !== 7
                        ) {
                        randMap[bomby + 2][bombx] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby + 3][bombx] !== 1 &&
                            randMap[bomby + 3][bombx] !== 3 &&
                            randMap[bomby + 3][bombx] !== 5 &&
                            randMap[bomby + 3][bombx] !== 6 &&
                            randMap[bomby + 3][bombx] !== 7
                            ) {
                            randMap[bomby + 3][bombx] = 4;
                        }
                    }
                }
                if (
                    randMap[bomby][bombx - 1] !== 1 &&
                    randMap[bomby][bombx - 1] !== 3 &&
                    randMap[bomby][bombx - 1] !== 5 &&
                    randMap[bomby][bombx - 1] !== 6 &&
                    randMap[bomby][bombx - 1] !== 7
                    ) {
                    randMap[bomby][bombx - 1] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby][bombx - 2] !== 1 &&
                        randMap[bomby][bombx - 2] !== 3 &&
                        randMap[bomby][bombx - 2] !== 5 &&
                        randMap[bomby][bombx - 2] !== 6 &&
                        randMap[bomby][bombx - 2] !== 7
                        ) {
                        randMap[bomby][bombx - 2] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby][bombx - 3] !== 1 &&
                            randMap[bomby][bombx - 3] !== 3 &&
                            randMap[bomby][bombx - 3] !== 5 &&
                            randMap[bomby][bombx - 3] !== 6 &&
                            randMap[bomby][bombx - 3] !== 7
                            ) {
                            randMap[bomby][bombx - 3] = 4;
                        }
                    }
                }
                if (
                    randMap[bomby][bombx + 1] !== 1 &&
                    randMap[bomby][bombx + 1] !== 3 &&
                    randMap[bomby][bombx + 1] !== 5 &&
                    randMap[bomby][bombx + 1] !== 6 &&
                    randMap[bomby][bombx + 1] !== 7
                    ) {
                    randMap[bomby][bombx + 1] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby][bombx + 2] !== 1 &&
                        randMap[bomby][bombx + 2] !== 3 &&
                        randMap[bomby][bombx + 2] !== 5 &&
                        randMap[bomby][bombx + 2] !== 6 &&
                        randMap[bomby][bombx + 2] !== 7
                        ) {
                        randMap[bomby][bombx + 2] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby][bombx + 3] !== 1 &&
                            randMap[bomby][bombx + 3] !== 3 &&
                            randMap[bomby][bombx + 3] !== 5 &&
                            randMap[bomby][bombx + 3] !== 6 &&
                            randMap[bomby][bombx + 3] !== 7
                            ) {
                            randMap[bomby][bombx + 3] = 4;
                        }
                    }
                }
            }, 2300);
        }

        checkDamage(damage = 0) {
            if (randMap[this.gridY][this.gridX] === 4) {
                this.health -= 1;
            }
            this.health -= damage;
            if (this.health < 0) {
                this.health = 0;
                stageComplete.play()
                gameOver(this)
            }
            this.health = Math.round(this.health)
        }

        checkEnemyDied() {
            if (randMap[this.gridY][this.gridX] === 4) {
                this.health -= 1;
                if (this.health < 0) {
                    if (Math.random() > 0.2) {
                        switch (Math.floor(Math.random() * 3)) {
                            case 0:
                                randMap[this.gridY][this.gridX] = 5;
                                break;
                            case 1:
                                randMap[this.gridY][this.gridX] = 6;
                                break;
                            case 2:
                                randMap[this.gridY][this.gridX] = 7;
                                break;
                        }
                    }
                    return true
                }
            }
        }

        randomMove() {
            switch (this.direction) {
                case 0:
                    this.x += 1;
                    this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
                    if (randMap[this.gridY][this.gridX + 1] !== 0 && randMap[this.gridY][this.gridX + 1] !== 4 && this.x + this.size > (this.gridX + 1) * gridWidth) {
                        // COLISAO A DIREITA
                        this.x = this.gridX * gridWidth + gridWidth - this.size;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
                case 1:
                    this.x -= 1;
                    this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
                    if (randMap[this.gridY][this.gridX - 1] !== 0 && randMap[this.gridY][this.gridX - 1] !== 4 && this.x < this.gridX * gridWidth) {
                        // COLISAO A ESQUERDA
                        this.x = this.gridX * gridWidth;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
                case 2:
                    this.y += 1;
                    this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
                    if (randMap[this.gridY + 1][this.gridX] !== 0 && randMap[this.gridY + 1][this.gridX] !== 4 && this.y + this.size > (this.gridY + 1) * gridHeigth) {
                        // COLISAO ABAIXO
                        this.y = this.gridY * gridHeigth + gridHeigth - this.size;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
                case 3:
                    this.y -= 1;
                    this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
                    if (randMap[this.gridY - 1][this.gridX] !== 0 && randMap[this.gridY - 1][this.gridX] !== 4 && this.y < this.gridY * gridHeigth) {
                        // COLISAO ACIMA
                        this.y = this.gridY * gridHeigth;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
            }
            context.drawImage(enemy, 3, 3, 19, 30, this.x, this.y - 20 + offset, 30, 50);
        }
    }

    const updateGameArea = () => { // FUNCAO QUE ATUALIZA O CANVAS
        frames += 1;
        clear();
        renderMap(randMap);
        statusBar();
        newPlayer.newPos();
        newPlayer.update();
        newPlayer.checkDamage();
        if (newPlayer2) {
            newPlayer2.newPos();
            newPlayer2.update();
            newPlayer2.checkDamage();
        }
        if (frames % 150 === 0) {
            if (randMap[randy][randx] !== 0) {
                randx = Math.floor(Math.random() * map1[0].length);
                randy = Math.floor(Math.random() * map1.length);
            } else {
                enemies.push(new Player(randx * 50 + 10, randy * 50 + 10, 'white', 100, 5, enemies))
                randx = Math.floor(Math.random() * map1[0].length);
                randy = Math.floor(Math.random() * map1.length);
            }
        }
        enemies.forEach((enemy, i) => {
            enemy.randomMove()
            if (enemy.gridX === newPlayer.gridX && enemy.gridY === newPlayer.gridY) {
                newPlayer.checkDamage(1);
            }
            if (newPlayer2) {
                if (enemy.gridX === newPlayer2.gridX && enemy.gridY === newPlayer2.gridY) {
                    newPlayer2.checkDamage(1);
                }
            }
            if (enemy.checkEnemyDied()) {
                enemies.splice(i, 1);
                newPlayer.enemiesKilled += 1;
            }
            
        });
        requestId = window.requestAnimationFrame(updateGameArea);
    }

    document.onkeydown = function (e) { // EVENT LISTENER PARA CAPTURAR OS COMANDOS
        switch (e.keyCode) {
            case 32: // spacebar
                if (newPlayer.bombs > 0) {
                    newPlayer.bombs -= 1;
                    newPlayer.placeBomb();
                    setTimeout(() => {
                        newPlayer.bombs += 1;
                    }, 2300);
                }
                break;
            case 37: // left arrow
                newPlayer.speedX = newPlayer.speed * -1;
                newPlayer.left = true;
                newPlayer.right = false;
                newPlayer.up = false;
                newPlayer.down = false;
                break;
            case 38: // arrow up
                newPlayer.speedY = newPlayer.speed * -1;
                newPlayer.left = false;
                newPlayer.right = false;
                newPlayer.up = true;
                newPlayer.down = false;
                break;
            case 39: // right arrow
                newPlayer.speedX = newPlayer.speed;
                newPlayer.left = false;
                newPlayer.right = true;
                newPlayer.up = false;
                newPlayer.down = false;
                break;
            case 40: // arrow down
                newPlayer.speedY = newPlayer.speed;
                newPlayer.left = false;
                newPlayer.right = false;
                newPlayer.up = false;
                newPlayer.down = true;
                break;
        }
        switch (e.keyCode) {
            case 81: // q
                if (newPlayer2.bombs > 0) {
                    newPlayer2.bombs -= 1;
                    newPlayer2.placeBomb();
                    setTimeout(() => {
                        newPlayer2.bombs += 1;
                    }, 2300);
                }
                break;
            case 65: // a
                newPlayer2.speedX = newPlayer2.speed * -1;
                newPlayer2.left = true;
                newPlayer2.right = false;
                newPlayer2.up = false;
                newPlayer2.down = false;
                break;
            case 87: // w
                newPlayer2.speedY = newPlayer2.speed * -1;
                newPlayer2.left = false;
                newPlayer2.right = false;
                newPlayer2.up = true;
                newPlayer2.down = false;
                break;
            case 68: // d
                newPlayer2.speedX = newPlayer2.speed;
                newPlayer2.left = false;
                newPlayer2.right = true;
                newPlayer2.up = false;
                newPlayer2.down = false;
                break;
            case 83: // s
                newPlayer2.speedY = newPlayer2.speed;
                newPlayer2.left = false;
                newPlayer2.right = false;
                newPlayer2.up = false;
                newPlayer2.down = true;
                break;
        }
        if (!start) {
            if (e.keyCode === 13) {
                if (players === 1) {
                    newPlayer2 = 0;
                    start = true;
                    startGame();
                }
                if (players === 2) {
                    start = true;
                    startGame();
                }
            }
            if (e.keyCode === 38) {
                players = 1;
            }
            if (e.keyCode === 40) {
                players = 2;
            }
        } else {
            if (e.keyCode === 13) {
                window.location.reload();
            }
        }
    }

    document.onkeyup = function (e) { // EVENT LISTENER PARA PARAR OS COMANDOS
        switch (e.keyCode) {
            case 37: // left arrow
                newPlayer.speedX = 0;
                newPlayer.left = false;
                break;
            case 38: // arrow up
                newPlayer.speedY = 0;
                newPlayer.up = false;
                break;
            case 39: // right arrow
                newPlayer.speedX = 0;
                newPlayer.right = false;
                break;
            case 40: // arrow down
                newPlayer.speedY = 0;
                newPlayer.down = false;
                break;
        }
        switch (e.keyCode) {
            case 65: // a
                newPlayer2.speedX = 0;
                newPlayer2.left = false;
                break;
            case 87: // w
                newPlayer2.speedY = 0;
                newPlayer2.up = false;
                break;
            case 68: // d
                newPlayer2.speedX = 0;
                newPlayer2.right = false;
                break;
            case 83: // s
                newPlayer2.speedY = 0;
                newPlayer2.down = false;
                break;
        }
    }

    let newPlayer = new Player(60, 60, 'white', 135, 100, 'Player 2', bomberman); // CRIACAO DE UM NOVO PLAYER
    let newPlayer2 = new Player(660, 460, 'white', 550, 100, 'Player 1', bomberman2);
    let enemies = [];

    menu(); // CHAMADA PARA FUNCAO DE START GAME

    title.play()
}