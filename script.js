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
        for (let j = 0; j < map.length; j += 1) {
            for (let i = 0; i < map[0].length; i += 1) {
                if (map[j][i] === 0) {
                    if (Math.random() > 0.70) {
                        map[j][i] = 3;
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
        for (let j = 0; j < map.length; j += 1) {
            for (let i = 0; i < map[0].length; i += 1) {
                if (map[j][i] === 1) {
                    context.fillStyle = 'gray';
                    context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
                }
                if (map[j][i] === 3) {
                    context.fillStyle = 'orange';
                    context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
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
        // newPlayer.checkCollision();
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
            this.x += this.speedX;
            this.gridX = Math.floor((this.x + this.size/2) / gridWidth);
            
            this.y += this.speedY;
            this.gridY = Math.floor((this.y + this.size/2) / gridHeigth);

            // CHECKS COLLISION DETECTION
            if (randMap[this.gridY-1][this.gridX] !== 0 && this.y < this.gridY * gridHeigth) {
                // console.log('top collision');
                this.y = this.gridY * gridHeigth
            }
            if (randMap[this.gridY+1][this.gridX] !== 0 && this.y + this.size > (this.gridY + 1) * gridHeigth) {
                // console.log('bottom collision');
                this.y = this.gridY * gridHeigth + gridHeigth - this.size
            }
            if (randMap[this.gridY][this.gridX-1] !== 0 && this.x < this.gridX * gridWidth) {
                // console.log('left collision');
                this.x = this.gridX * gridWidth;
            }
            if (randMap[this.gridY][this.gridX+1] !== 0 && this.x + this.size > (this.gridX + 1) * gridWidth) {
                // console.log('right collision');
                this.x = this.gridX * gridWidth + gridWidth - this.size;
            }
        }

        dropBomb() {
            console.log('dropBomb');
            // let bomb = new Bomb (this.x, this.y)
            let bomb = new Bomb();
        }

        checkCollision() {
            
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