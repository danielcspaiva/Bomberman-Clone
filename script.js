window.onload = () => { // FUNCAO A SER EXECUTADA QUANDO A JANELA CARREGAR

    let start = false;
    let players = 1;
    context = canvas.getContext("2d");

    const menu = () => {
        renderMap(mapMenu)
        for (let i = 0; i < mapMenu[0].length; i += 1) {
            context.drawImage(solidBlock, 50 * i, 0, 50, 50)
        }
        // context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(superBomberman, 100, -50, 500, 500)
        context.font = "26px silkscreenbold";
        context.fillStyle = 'white';
        context.fillText('single player', canvas.width / 2 - 100, canvas.height / 1.4);
        context.fillText('MULTI PLAYER', canvas.width / 2 - 100, canvas.height / 1.25);

        // if(players === 1) {
        //     context.fillText('>', canvas.width / 2 - 130, canvas.height / 1.4);
        // }
        // if(players === 2) {
        //     context.fillText('>', canvas.width / 2 - 130, canvas.height / 1.25);
        // }
        // console.log(players)
        // document.onkeydown = function (e) { // EVENT LISTENER PARA CAPTURAR OS COMANDOS
        //     switch (e.keyCode) {
        //         case 38: // arrow up
        //             players = 1;
        //             break;
        //         case 40: // arrow down
        //             players = 2;
        //             break;
        //     }
        //     if (e.keyCode === 13) {
        //         if (!start) {
        //             startGame();
        //             start = true;
        //         } else {
        //             window.location.reload();
        //         }
        //     }
        // }
        // requestId = window.requestAnimationFrame(menu);
    }

    // menu()
// }
    const startGame = () => { // FUNCAO DE START GAME
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                randMap = makeRandMap(map1);
                break;
            case 1:
                randMap = makeRandMap(map2);
                break;
        }
        updateGameArea();
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
                    case 1:
                        // context.fillStyle = 'gray';
                        // context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
                        context.drawImage(solidBlock, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 2:
                        // context.fillStyle = 'orange';
                        // context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
                        context.drawImage(wall, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 3:
                        // context.fillStyle = 'black';
                        // context.fillRect(i * gridWidth + 10, j * gridHeigth + 10, gridWidth - 20, gridHeigth - 20);
                        context.drawImage(bomb, 0, 0, 19, 20, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        // context.drawImage(bomberman, this.srcx, this.srcy, this.width, this.height, this.x, this.y - 10, this.width * 1.8, this.height * 1.8)
                        break;
                        break;
                    case 4:
                        // context.fillStyle = 'red';
                        // context.fillRect(i * gridWidth + 10, j * gridHeigth + 10, gridWidth - 20, gridHeigth - 20);
                        context.drawImage(explosion, 45, 0, 20, 20, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                }
            }
        }
    }

    const clear = () => { // FUNCAO PARA LIMPAR O CANVAS
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const statusBar = () => {
        context.drawImage(statusBarSprite, 50, 0, 650, 50)
        context.drawImage(solidBlock, 0, 0, 50, 50)
        context.drawImage(solidBlock, 700, 0, 50, 50)
    }

    const gameOver = (player) => {
        setTimeout(() => {
            window.cancelAnimationFrame(requestId);
            clear();
            // context.font = "26px Sen";
            context.fillText(`${player.name} LOST`, canvas.width / 2 - 80, canvas.height / 2);
            context.fillText(`PRESS ENTER TO PLAY AGAIN`, canvas.width / 2 - 200, canvas.height / 3);
        }, 500);
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
            if (enemy.checkEnemyDied()) enemies.splice(i, 1);
        });
        requestId = window.requestAnimationFrame(updateGameArea);
    }

    class Player { // CLASE PLAYER
        constructor(x, y, color, healthPosition, hearts, name, img) {
            this.name = name;
            this.healthPosition = healthPosition;
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = 3;
            this.speedX = 0;
            this.speedY = 0;
            this.size = 30;
            this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
            this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
            this.bombPower = 2; // NAO IMPLEMENTADO
            this.hearts = hearts;
            this.right = this.up = this.right = false;
            this.down = true;
            this.srcx = 0;
            this.srcy = 0;
            this.width = 16;
            this.height = 24;
            this.img = bomberman;
            this.direction = Math.floor(Math.random() * 4);
        }

        update() {
            context.fillStyle = this.color;
            // context.fillRect(this.x, this.y, this.size, this.size);
            // console.log(this.img)
            context.drawImage(bomberman, this.srcx, this.srcy, this.width, this.height, this.x, this.y - 20  + offset, this.width * 2.1, this.height * 2.1)
        }

        newPos() {
            this.x += this.speedX;
            this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);

            this.y += this.speedY;
            this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);

            // CHECKS COLLISION DETECTION
            if (randMap[this.gridY - 1][this.gridX] !== 0 && randMap[this.gridY - 1][this.gridX] !== 4 && this.y < this.gridY * gridHeigth) {
                // COLISAO ACIMA
                this.y = this.gridY * gridHeigth;
            }
            if (randMap[this.gridY + 1][this.gridX] !== 0 && randMap[this.gridY + 1][this.gridX] !== 4 && this.y + this.size > (this.gridY + 1) * gridHeigth) {
                // COLISAO ABAIXO
                this.y = this.gridY * gridHeigth + gridHeigth - this.size;
            }
            if (randMap[this.gridY][this.gridX - 1] !== 0 && randMap[this.gridY][this.gridX - 1] !== 4 && this.x < this.gridX * gridWidth) {
                // COLISAO A ESQUERDA
                this.x = this.gridX * gridWidth;
            }
            if (randMap[this.gridY][this.gridX + 1] !== 0 && randMap[this.gridY][this.gridX + 1] !== 4 && this.x + this.size > (this.gridX + 1) * gridWidth) {
                // COLISAO A DIREITA
                this.x = this.gridX * gridWidth + gridWidth - this.size;
            }
        }

        placeBomb() {
            let bombx = this.gridX;
            let bomby = this.gridY;
            randMap[bomby][bombx] = 3;
            setTimeout(function () {
                setTimeout(function () {
                    randMap[bomby][bombx] = 0;
                    if (randMap[bomby - 1][bombx] !== 1 && randMap[bomby - 1][bombx] !== 3) {
                        randMap[bomby - 1][bombx] = 0;
                    }
                    if (randMap[bomby + 1][bombx] !== 1 && randMap[bomby + 1][bombx] !== 3) {
                        randMap[bomby + 1][bombx] = 0;
                    }
                    if (randMap[bomby][bombx - 1] !== 1 && randMap[bomby][bombx - 1] !== 3) {
                        randMap[bomby][bombx - 1] = 0;
                    }
                    if (randMap[bomby][bombx + 1] !== 1 && randMap[bomby][bombx + 1] !== 3) {
                        randMap[bomby][bombx + 1] = 0;
                    }
                }, 450);
                randMap[bomby][bombx] = 4;
                if (randMap[bomby - 1][bombx] !== 1 && randMap[bomby - 1][bombx] !== 3) {
                    randMap[bomby - 1][bombx] = 4;
                }
                if (randMap[bomby + 1][bombx] !== 1 && randMap[bomby + 1][bombx] !== 3) {
                    randMap[bomby + 1][bombx] = 4;
                }
                if (randMap[bomby][bombx - 1] !== 1 && randMap[bomby][bombx - 1] !== 3) {
                    randMap[bomby][bombx - 1] = 4;
                }
                if (randMap[bomby][bombx + 1] !== 1 && randMap[bomby][bombx + 1] !== 3) {
                    randMap[bomby][bombx + 1] = 4;
                }
            }, 2300);
        }

        checkDamage(damage = 0) {
            if (randMap[this.gridY][this.gridX] === 4) {
                this.hearts -= 5;
            }
            this.hearts -= damage;
            if (this.hearts < 0) {
                this.hearts = 0;
                gameOver(this)
            }
            this.hearts = Math.round(this.hearts)
            // context.font = "26px Sen";
            context.fillStyle = this.color;
            // this.hearts = Math.round(this.hearts)
            context.fillText(`${this.name}: ${this.hearts}`, this.healthPosition, 35);
        }

        checkEnemyDied() {
            if (randMap[this.gridY][this.gridX] === 4) {
                this.hearts -= 1;
                if (this.hearts < 0) {
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
            context.drawImage(enemy, 3, 3, 19, 30, this.x, this.y - 20 + offset, 30, 50)
            // context.fillStyle = this.color;
            // context.fillRect(this.x, this.y, this.size, this.size);

        }
    }

    document.onkeydown = function (e) { // EVENT LISTENER PARA CAPTURAR OS COMANDOS
        switch (e.keyCode) {
            case 32: // spacebar
                newPlayer.placeBomb();
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
                players = 1;
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
                players = 2;
                break;
        }
        switch (e.keyCode) {
            case 16: // left shit
                newPlayer2.placeBomb();
                break;
            case 65: // a
                newPlayer2.speedX = newPlayer2.speed * -1;
                break;
            case 87: // w
                newPlayer2.speedY = newPlayer2.speed * -1;
                break;
            case 68: // d
                newPlayer2.speedX = newPlayer2.speed;
                break;
            case 83: // s
                newPlayer2.speedY = newPlayer2.speed;
                break;
        }
        if (e.keyCode === 13) {
            if (!start) {
                startGame();
                start = true;
            } else {
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
                newPlayer.down = true;
                break;
        }
        switch (e.keyCode) {
            case 65: // a
                newPlayer2.speedX = 0;
                break;
            case 87: // w
                newPlayer2.speedY = 0;
                break;
            case 68: // d
                newPlayer2.speedX = 0;
                break;
            case 83: // s
                newPlayer2.speedY = 0;
                break;
        }
    }

    menu(); // CHAMADA PARA FUNCAO DE START GAME

    let newPlayer = new Player(60, 60, 'white', 120, 1000, 'Player 1', bomberman) // CRIACAO DE UM NOVO PLAYER
    let newPlayer2 = new Player(660, 460, 'white', 530, 1000, 'Player 2', bomberman)
    // let newPlayer2 = 0 // CRIACAO DE UM NOVO PLAYER

    let enemies = []
}