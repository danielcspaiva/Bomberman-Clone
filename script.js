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
    
    let map3 = [ // MAPA TEMPLATE 3
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    
    let gridWidth = canvas.width / map1[0].length;
    let gridHeigth = canvas.height / map1.length;
    
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
                switch (map[j][i]) {
                    case 1:
                        context.fillStyle = 'gray';
                        context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
                        break;
                    case 2:
                        context.fillStyle = 'orange';
                        context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
                        break;
                    case 3:
                        context.fillStyle = 'black';
                        context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
                        break;
                    case 4:
                        context.fillStyle = 'red';
                        context.fillRect(i * gridWidth, j * gridHeigth, gridWidth, gridHeigth);
                        break;
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
        newPlayer.update();
        newPlayer.checkDamage();
        if (newPlayer2) {
            newPlayer2.newPos();
            newPlayer2.update();
            newPlayer2.checkDamage();
        }
        requestId = window.requestAnimationFrame(updateGameArea);
    }
    
    class Player { // CLASE PLAYER
        constructor(x, y, color, position) {
            this.healthPosition = position;
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = 5;
            this.speedX = 0;
            this.speedY = 0;
            this.size = 30;
            this.gridY = Math.floor((this.y + this.size/2) / gridHeigth);
            this.gridX = Math.floor((this.x + this.size/2) / gridWidth);
            this.bombPower = 2; // NAO IMPLEMENTADO
            this.hearts = 50;
        }
        
        update() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        
        newPos() {
            this.x += this.speedX;
            this.gridX = Math.floor((this.x + this.size/2) / gridWidth);
            
            this.y += this.speedY;
            this.gridY = Math.floor((this.y + this.size/2) / gridHeigth);
            
            // CHECKS COLLISION DETECTION
            if (randMap[this.gridY-1][this.gridX] !== 0 && randMap[this.gridY-1][this.gridX] !== 4 && this.y < this.gridY * gridHeigth) { 
                // COLISAO ACIMA
                this.y = this.gridY * gridHeigth;
            }
            if (randMap[this.gridY+1][this.gridX] !== 0 && randMap[this.gridY+1][this.gridX] !== 4 && this.y + this.size > (this.gridY + 1) * gridHeigth) { 
                // COLISAO ABAIXO
                this.y = this.gridY * gridHeigth + gridHeigth - this.size;
            }
            if (randMap[this.gridY][this.gridX-1] !== 0 && randMap[this.gridY][this.gridX-1] !== 4 && this.x < this.gridX * gridWidth) { 
                // COLISAO A ESQUERDA
                this.x = this.gridX * gridWidth;
            }
            if (randMap[this.gridY][this.gridX+1] !== 0 && randMap[this.gridY][this.gridX+1] !== 4 && this.x + this.size > (this.gridX + 1) * gridWidth) { 
                // COLISAO A DIREITA
                this.x = this.gridX * gridWidth + gridWidth - this.size;
            }
        }
        
        placeBomb() {
            let bombx = this.gridX;
            let bomby = this.gridY;
            randMap[bomby][bombx] = 3;
            setTimeout(function() {
                setTimeout(function() {
                    randMap[bomby][bombx] = 0;
                    if (randMap[bomby-1][bombx] !== 1){
                        randMap[bomby-1][bombx] = 0;
                    }
                    if (randMap[bomby+1][bombx] !== 1) {
                        randMap[bomby+1][bombx] = 0;
                    }
                    if (randMap[bomby][bombx-1] !== 1) {
                        randMap[bomby][bombx-1] = 0;
                    }
                    if (randMap[bomby][bombx+1] !== 1) {
                        randMap[bomby][bombx+1] = 0;
                    }
                }, 450);
                randMap[bomby][bombx] = 4;
                if (randMap[bomby-1][bombx] !== 1){
                    randMap[bomby-1][bombx] = 4;
                }
                if (randMap[bomby+1][bombx] !== 1) {
                    randMap[bomby+1][bombx] = 4;
                }
                if (randMap[bomby][bombx-1] !== 1) {
                    randMap[bomby][bombx-1] = 4;
                }
                if (randMap[bomby][bombx+1] !== 1) {
                    randMap[bomby][bombx+1] = 4;
                }
            }, 2300);
        }
        
        checkDamage() {
            if (randMap[this.gridY][this.gridX] === 4) {
                this.hearts -= 1;
            }
            context.font = "26px Sen";
            context.fillStyle = this.color;
            context.fillText(`Health: ${this.hearts}`, this.healthPosition, 35);
        }
    }

    document.onkeydown = function (e) { // EVENT LISTENER PARA CAPTURAR OS COMANDOS
        switch (e.keyCode) {
            case 32: // spacebar
                newPlayer.placeBomb();
                break;
            case 37: // left arrow
                newPlayer.speedX = newPlayer.speed * -1;
                break;
            case 38: // arrow up
                newPlayer.speedY = newPlayer.speed * -1;
                break;
            case 39: // right arrow
                newPlayer.speedX = newPlayer.speed;
                break;
            case 40: // arrow down
                newPlayer.speedY = newPlayer.speed;
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
    }
    
    document.onkeyup = function (e) { // EVENT LISTENER PARA PARAR OS COMANDOS
        switch (e.keyCode) {
            case 37: // left arrow
                newPlayer.speedX = 0;
                break;
            case 38: // arrow up
                newPlayer.speedY = 0;
                break;
            case 39: // right arrow
                newPlayer.speedX = 0;
                break;
            case 40: // arrow down
                newPlayer.speedY = 0;
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
    
    startGame(); // CHAMADA PARA FUNCAO DE START GAME
    
    let newPlayer = new Player(660, 460, 'purple', 575)
    // let newPlayer2 = 0 // CRIACAO DE UM NOVO PLAYER
    let newPlayer2 = new Player(60, 60, 'blue', 50) // CRIACAO DE UM NOVO PLAYER
}