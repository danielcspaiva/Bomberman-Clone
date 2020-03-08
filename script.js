window.onload = () => { // FUNCAO A SER EXECUTADA QUANDO A JANELA CARREGAR
    const startGame = () => { // FUNCAO DE START GAME
        console.log('start function');
        context = canvas.getContext("2d");
        requestId = window.requestAnimationFrame(updateGameArea);
        randMap = makeRandMap(map1)
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
        map[1][1] = 0
        return map;
    }

    const renderMap = (map) => { // FUNCAO PARA RENDERIZAR O MAPA
        let gridWidth = canvas.width / map[0].length
        let gridHeigth = canvas.height / map.length
        for (let i = 0; i < map.length; i += 1) {
            for (let j = 0; j < map[0].length; j += 1) {
                if (map[i][j] === 1) {
                    context.fillStyle = 'gray';
                    context.fillRect(j * gridWidth, i * gridHeigth, gridWidth, gridHeigth)
                }
                if (map[i][j] === 3) {
                    context.fillStyle = 'orange';
                    context.fillRect(j * gridWidth, i * gridHeigth, gridWidth, gridHeigth)
                }
            }
        }
    }

    const clear = () => { // FUNCAO PARA LIMPAR O CANVAS
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const updateGameArea = () => { // FUNCAO QUE ATUALIZA O CANVAS
        clear();
        renderMap(randMap)
        newPlayer.newPos();
        newPlayer.update();
        // bomb.update(); SEM SUCESSO NAS BOMBAS
        requestId = window.requestAnimationFrame(updateGameArea);
    }

    class Player { // CLASE PLAYER
        constructor() {
            this.lives = 10;
            this.x = 60;
            this.y = 60;
            this.speed = 2.5;
            this.speedX = 0;
            this.speedY = 0;
            this.size = 30;
            this.top = this.y
            this.bottom = this.y + this.size
            this.left = this.x
            this.right = this.x + this.size
        }

        update() {
            context.fillStyle = 'blue';
            context.fillRect(this.x, this.y, this.size, this.size)
        }

        newPos() {
            if (this.x >= canvas.width - 50 - this.size && this.speedX > 0) {
                this.x = canvas.width - 50 - this.size
            } else if (this.x <= 50 && this.speedX < 0) {
                this.x = 50
            } else {
                this.x += this.speedX;
            }

            if (this.y >= canvas.height - 50 - this.size && this.speedY > 0) {
                this.y = canvas.height - 50 - this.size
            } else if (this.y <= 50 && this.speedY < 0) {
                this.y = 50
            } else {
                this.y += this.speedY;
            }
        }

        left() {
            return this.x;
        }
        right() {
            if (this.x + 50 < canvas.width) {
                console.log('bateu')
                return this.x + this.width;
            } else {
                console.log('nao bateu')
                return this.x;
            }
        }
        top() {
            return this.y;
        }
        bottom() {
            return this.y + this.height;
        }

        dropBomb() {
            console.log('dropBomb')
            // let bomb = new Bomb (this.x, this.y)
            let bomb = new Bomb()
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