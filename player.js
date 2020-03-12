// class Player { // CLASE PLAYER
//     constructor(x, y, color, healthPosition, health, name, img) {
//         this.name = name;
//         this.healthPosition = healthPosition;
//         this.x = x;
//         this.y = y;
//         this.color = color;
//         this.speed = 3;
//         this.speedX = 0;
//         this.speedY = 0;
//         this.size = 30;
//         this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
//         this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
//         this.bombPower = 2; // NAO IMPLEMENTADO
//         this.health = health;
//         this.hearts = [1, 1, 1, 1, 1];
//         this.right = this.up = this.right = false;
//         this.down = false;
//         this.srcx = 0;
//         this.srcy = 0;
//         this.width = 16;
//         this.height = 24;
//         this.img = img;
//         this.direction = Math.floor(Math.random() * 4);
//         this.countAnim = 0;
//     }

//     update() {
//         context.fillStyle = this.color;
//         // context.fillRect(this.x, this.y, this.size, this.size);
//         // console.log(this.img)
//         this.sprites()
//         context.drawImage(this.img, this.srcx, this.srcy, this.width, this.height, this.x, this.y - 20  + offset, this.width * 2.1, this.height * 2.1)
//     }

//     newPos() {
//         this.x += this.speedX;
//         this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);

//         this.y += this.speedY;
//         this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);

//         // CHECKS COLLISION DETECTION
//         if (randMap[this.gridY - 1][this.gridX] !== 0 && randMap[this.gridY - 1][this.gridX] !== 4 && this.y < this.gridY * gridHeigth) {
//             // COLISAO ACIMA
//             this.y = this.gridY * gridHeigth;
//         }
//         if (randMap[this.gridY + 1][this.gridX] !== 0 && randMap[this.gridY + 1][this.gridX] !== 4 && this.y + this.size > (this.gridY + 1) * gridHeigth) {
//             // COLISAO ABAIXO
//             this.y = this.gridY * gridHeigth + gridHeigth - this.size;
//         }
//         if (randMap[this.gridY][this.gridX - 1] !== 0 && randMap[this.gridY][this.gridX - 1] !== 4 && this.x < this.gridX * gridWidth) {
//             // COLISAO A ESQUERDA
//             this.x = this.gridX * gridWidth;
//         }
//         if (randMap[this.gridY][this.gridX + 1] !== 0 && randMap[this.gridY][this.gridX + 1] !== 4 && this.x + this.size > (this.gridX + 1) * gridWidth) {
//             // COLISAO A DIREITA
//             this.x = this.gridX * gridWidth + gridWidth - this.size;
//         }
//     }

//     sprites() {
//         if(this.down) {
//             this.srcy = 0;
//         }
//         if (this.right) {
//             this.srcy = 26;
//         }
//         if (this.up) {
//             this.srcy = 51;
//         }
//         if (this.left) {
//             this.srcy = 76;
//         }
//         // this.countAnim = 0;
//         if (this.down || this.right || this.up || this.left) {
//             this.countAnim += 1;
//             if (this.countAnim > 25) this.countAnim = 0;
//             this.srcx = Math.floor(this.countAnim / 5) * (this.width + 1);
//         }
//     }

//     placeBomb() {
//         placeBombSound.play()
//         let bombx = this.gridX;
//         let bomby = this.gridY;
//         randMap[bomby][bombx] = 3;
//         setTimeout(function () {
//             setTimeout(function () {
//                 randMap[bomby][bombx] = 0;
//                 if (randMap[bomby - 1][bombx] !== 1 && randMap[bomby - 1][bombx] !== 3) {
//                     randMap[bomby - 1][bombx] = 0;
//                     if (this.bombPower > 1 && randMap[bomby - 2][bombx] !== 1 && randMap[bomby - 2][bombx] !== 3) {
//                         randMap[bomby - 2][bombx] = 0;
//                         if(this.bombPower > 2 && randMap[bomby - 3][bombx] !== 1 && randMap[bomby - 3][bombx] !== 3) {
//                             randMap[bomby - 3][bombx] = 0;
//                         }
//                     }
//                 }
//                 if (randMap[bomby + 1][bombx] !== 1 && randMap[bomby + 1][bombx] !== 3) {
//                     randMap[bomby + 1][bombx] = 0;
//                     if(this.bombPower > 1 && randMap[bomby + 2][bombx] !== 1 && randMap[bomby + 2][bombx] !== 3) {
//                         randMap[bomby + 2][bombx] = 0;
//                         if(this.bombPower > 2 && randMap[bomby + 3][bombx] !== 1 && randMap[bomby + 3][bombx] !== 3) {
//                             randMap[bomby + 3][bombx] = 0;
//                         }
//                     }
//                 }
//                 if (randMap[bomby][bombx - 1] !== 1 && randMap[bomby][bombx - 1] !== 3) {
//                     randMap[bomby][bombx - 1] = 0;
//                     if(this.bombPower > 1 && randMap[bomby][bombx - 2] !== 1 && randMap[bomby][bombx - 2] !== 3) {
//                         randMap[bomby][bombx - 2] = 0;
//                         if(this.bombPower > 1 && randMap[bomby][bombx - 3] !== 1 && randMap[bomby][bombx - 3] !== 3) {
//                             randMap[bomby][bombx - 3] = 0;
//                         }
//                     }
//                 }
//                 if (randMap[bomby][bombx + 1] !== 1 && randMap[bomby][bombx + 1] !== 3) {
//                     randMap[bomby][bombx + 1] = 0;
//                     if(this.bombPower > 1 && randMap[bomby][bombx + 2] !== 1 && randMap[bomby][bombx + 2] !== 3) {
//                         randMap[bomby][bombx + 2] = 0;
//                         if(this.bombPower > 1 && randMap[bomby][bombx + 3] !== 1 && randMap[bomby][bombx + 3] !== 3) {
//                             randMap[bomby][bombx + 3] = 0;
//                         }
//                     }
//                 }
//             }, 450);
//             randMap[bomby][bombx] = 4;
//             bombSound2.play()
//             if (randMap[bomby - 1][bombx] !== 1 && randMap[bomby - 1][bombx] !== 3) {
//                 randMap[bomby - 1][bombx] = 4;
//                 if(this.bombPower > 1 && randMap[bomby - 2][bombx] !== 1 && randMap[bomby - 2][bombx] !== 3) {
//                     randMap[bomby - 2][bombx] = 4;
//                     if(this.bombPower > 2 && randMap[bomby - 3][bombx] !== 1 && randMap[bomby - 3][bombx] !== 3) {
//                         randMap[bomby - 3][bombx] = 4;
//                     }
//                 }
//             }
//             if (randMap[bomby + 1][bombx] !== 1 && randMap[bomby + 1][bombx] !== 3) {
//                 randMap[bomby + 1][bombx] = 4;
//                 if(this.bombPower > 1 && randMap[bomby + 2][bombx] !== 1 && randMap[bomby + 2][bombx] !== 3) {
//                     randMap[bomby + 2][bombx] = 4;
//                     if(this.bombPower > 2 && randMap[bomby + 3][bombx] !== 1 && randMap[bomby + 3][bombx] !== 3) {
//                         randMap[bomby + 3][bombx] = 4;
//                     }
//                 }
//             }
//             if (randMap[bomby][bombx - 1] !== 1 && randMap[bomby][bombx - 1] !== 3) {
//                 randMap[bomby][bombx - 1] = 4;
//                 if(this.bombPower > 1 && randMap[bomby][bombx - 2] !== 1 && randMap[bomby][bombx - 2] !== 3) {
//                     randMap[bomby][bombx - 2] = 4;
//                     if(this.bombPower > 1 && randMap[bomby][bombx - 3] !== 1 && randMap[bomby][bombx - 3] !== 3) {
//                         randMap[bomby][bombx - 3] = 4;
//                     }
//                 }
//             }
//             if (randMap[bomby][bombx + 1] !== 1 && randMap[bomby][bombx + 1] !== 3) {
//                 randMap[bomby][bombx + 1] = 4;
//                 if(this.bombPower > 1 && randMap[bomby][bombx + 2] !== 1 && randMap[bomby][bombx + 2] !== 3) {
//                     randMap[bomby][bombx + 2] = 4;
//                     if(this.bombPower > 1 && randMap[bomby][bombx + 3] !== 1 && randMap[bomby][bombx + 3] !== 3) {
//                         randMap[bomby][bombx + 3] = 4;
//                     }
//                 }
//             }
//         }, 2300);
//     }

//     checkDamage(damage = 0) {
//         if (randMap[this.gridY][this.gridX] === 4) {
//             this.health -= 1;
//         }
//         this.health -= damage;
//         if (this.health < 0) {
//             this.health = 0;
//             stageComplete.play()
//             gameOver(this)
//         }
//         this.health = Math.round(this.health)
//         // for
//         context.fillStyle = this.color;
//         context.fillText(`${this.health}`, this.healthPosition, 33);
//     }

//     checkEnemyDied() {
//         if (randMap[this.gridY][this.gridX] === 4) {
//             this.health -= 1;
//             if (this.health < 0) {
//                 return true
//             }
//         }
//     }

//     randomMove() {
//         switch (this.direction) {
//             case 0:
//                 this.x += 1;
//                 this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
//                 if (randMap[this.gridY][this.gridX + 1] !== 0 && randMap[this.gridY][this.gridX + 1] !== 4 && this.x + this.size > (this.gridX + 1) * gridWidth) {
//                     // COLISAO A DIREITA
//                     this.x = this.gridX * gridWidth + gridWidth - this.size;
//                     this.direction = Math.floor(Math.random() * 4)
//                 }
//                 break;
//             case 1:
//                 this.x -= 1;
//                 this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
//                 if (randMap[this.gridY][this.gridX - 1] !== 0 && randMap[this.gridY][this.gridX - 1] !== 4 && this.x < this.gridX * gridWidth) {
//                     // COLISAO A ESQUERDA
//                     this.x = this.gridX * gridWidth;
//                     this.direction = Math.floor(Math.random() * 4)
//                 }
//                 break;
//             case 2:
//                 this.y += 1;
//                 this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
//                 if (randMap[this.gridY + 1][this.gridX] !== 0 && randMap[this.gridY + 1][this.gridX] !== 4 && this.y + this.size > (this.gridY + 1) * gridHeigth) {
//                     // COLISAO ABAIXO
//                     this.y = this.gridY * gridHeigth + gridHeigth - this.size;
//                     this.direction = Math.floor(Math.random() * 4)
//                 }
//                 break;
//             case 3:
//                 this.y -= 1;
//                 this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
//                 if (randMap[this.gridY - 1][this.gridX] !== 0 && randMap[this.gridY - 1][this.gridX] !== 4 && this.y < this.gridY * gridHeigth) {
//                     // COLISAO ACIMA
//                     this.y = this.gridY * gridHeigth;
//                     this.direction = Math.floor(Math.random() * 4)
//                 }
//                 break;
//         }
//         context.drawImage(enemy, 3, 3, 19, 30, this.x, this.y - 20 + offset, 30, 50);
//     }
// }

// const gameOver = (player) => {
//     level1.pause()
//     setTimeout(() => {
//         window.cancelAnimationFrame(requestId);
//         clear();
//         for (let i = 0; i < mapMenu[0].length; i += 1) {
//             context.drawImage(solidBlock, 50 * i, 0, 50, 50)
//         }
//         renderMap(mapMenu);
//         context.fillText(`${player.name} LOST`, canvas.width / 2 - 80, canvas.height / 2);
//         context.fillText(`PRESS ENTER TO PLAY AGAIN`, canvas.width / 2 - 200, canvas.height / 3);
//     }, 500);
// }