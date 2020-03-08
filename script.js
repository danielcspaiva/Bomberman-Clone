window.onload = () => { // FUNCAO A SER EXECUTADA QUANDO A JANELA CARREGAR
    const startGame = () => { // FUNCAO DE START GAME
        context = canvas.getContext("2d");
        requestId = window.requestAnimationFrame(updateGameArea);
        randMap = makeRandMap(map1);
    }

    let map1 = [ // MAPA TEMPLATE 1
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    let map2 = [ // MAPA TEMPLATE 2
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    let gridWidth = canvas.width / map1[0].length;
    let gridHeigth = canvas.height / map1.length;

    const makeRandMap = (map) => { // FUNCAO PARA CRIAR MAPAS RANDOMICOS A PARTIR DOS TEMPLATES
        for (let i = 0; i < map.length; i += 1) {
            for (let j = 0; j < map[0].length; j += 1) {
                if (map[i][j] === 0) {
                    if (Math.random() > 0.70) {
                        map[i][j] = 3;
                    }
                }
            }
        }
        map[1][1] = 0;
        map[1][2] = 0;
        map[2][1] = 0;
        return map;
    }

    const renderMap = (map) => { // FUNCAO PARA RENDERIZAR O MAPA
        // let gridWidth = canvas.width / map[0].length;
        // let gridHeigth = canvas.height / map.length;
        for (let i = 0; i < map.length; i += 1) {
            for (let j = 0; j < map[0].length; j += 1) {
                if (map[i][j] === 1) {
                    context.fillStyle = 'gray';
                    context.fillRect(j * gridWidth, i * gridHeigth, gridWidth, gridHeigth);
                }
                if (map[i][j] === 3) {
                    context.fillStyle = 'orange';
                    context.fillRect(j * gridWidth, i * gridHeigth, gridWidth, gridHeigth);
                }
            }
        }
    }

    const clear = () => { // FUNCAO PARA LIMPAR O CANVAS
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const updateGameArea = () => { // FUNCAO QUE ATUALIZA O CANVAS
        clear();
        renderMap(randMap);
        newPlayer.newPos();
        newPlayer.checkCollision();
        newPlayer.update();
        // bomb.update(); SEM SUCESSO NAS BOMBAS
        requestId = window.requestAnimationFrame(updateGameArea);
    }

    class Player { // CLASE PLAYER
        constructor() {
            this.lives = 10;
            this.x = 60;
            this.y = 60;
            this.speed = 3;
            this.speedX = 0;
            this.speedY = 0;
            this.size = 30;
            this.top = this.y;
            this.bottom = this.y + this.size;
            this.left = this.x;
            this.right = this.x + this.size;
            this.gridY = Math.floor((this.y + this.size/2) / gridHeigth);
            this.gridX = Math.floor((this.x + this.size/2) / gridWidth);
        }

        update() {
            context.fillStyle = 'blue';
            context.fillRect(this.x, this.y, this.size, this.size);
        }

        newPos() {
            if (this.x >= canvas.width - gridWidth - this.size && this.speedX > 0) {
                this.x = canvas.width - gridWidth - this.size;
            } else if (this.x <= gridWidth && this.speedX < 0) {
                this.x = gridWidth;
            } else {
                this.x += this.speedX;
            }
            this.gridX = Math.floor((this.x + this.size/2) / gridWidth);

            this.y += this.speedY;
            this.gridY = Math.floor((this.y + this.size/2) / gridHeigth);
            // console.log(this.gridX, this.gridY)
            console.log(randMap[this.gridX][this.gridY])
        }

        dropBomb() {
            console.log('dropBomb');
            // let bomb = new Bomb (this.x, this.y)
            let bomb = new Bomb();
        }

        checkCollision() {
            // console.log(`top = ${this.y + this.size} obs = ${this.gridY * gridHeigth + gridHeigth}`)
            // if (randMap[this.gridX][this.gridY-1] !== 0 && this.y < this.gridY * gridHeigth) {
            //     console.log('top collision');
            //     console.log(this.y)
            //     console.log(this.gridX, this.gridY)
            //     console.log(randMap[this.gridX][this.gridY])

            //     this.y = this.gridY * gridHeigth
            // } 
            // else if (randMap[this.gridX][this.gridY+1] !== 0 && this.y + this.size > (this.gridY + 1) * gridHeigth) {
            //     console.log('bottom collision');
            //     this.y = this.gridY * gridHeigth + gridHeigth - this.size
            // }
        }
    }

    class Bomb { // CLASSE BOMB
        constructor() {
            // this.x = x
            // this.y = y
            this.state = true
        }

        update() {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, 30, 30)
        }
    }

    document.onkeydown = function (e) { // EVENT LISTENER PARA CAPTURAR OS COMANDOS
        switch (e.keyCode) {
            case 65: // a
            case 37: // left arrow
                newPlayer.speedX = newPlayer.speed * -1;
                break;
            case 87: // w
            case 38: // arrow up
                newPlayer.speedY = newPlayer.speed * -1;
                break;
            case 68: // d
            case 39: // right arrow
                newPlayer.speedX = newPlayer.speed;
                break;
            case 83: // s
            case 40: // arrow down
                newPlayer.speedY = newPlayer.speed;
                break;
            case 32: // spacebar
                // newPlayer.dropBomb(newPlayer.x, newPlayer.y);
                let bomb = new Bomb()
                break;
        }
    }

    document.onkeyup = function (e) { // EVENT LISTENER PARA PARAR OS COMANDOS
        newPlayer.speedX = 0;
        newPlayer.speedY = 0;
    }

    startGame(); // CHAMADA PARA FUNCAO DE START GAME

    let newPlayer = new Player() // CRIACAO DE UM NOVO PLAYER
}