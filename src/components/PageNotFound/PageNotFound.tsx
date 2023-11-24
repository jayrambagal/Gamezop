// @ts-nocheck
"use client"
import classes from './style.module.css';
import { useEffect, useRef } from 'react';
const DEFAULT_DIMENSIONS = {
    height: 300,
    width: 100,
};
const PageNotFound = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const gameStart = () => {
            let canvas, screen: any, gameSize: any, game: any, invaderAsset: any;
            // Assets
            let invaderCanvas: any,
                invaderMultiplier: any,
                initialOffsetInvader,
                invaderAttackRate: any,
                invaderSpeed: any;

            const invaderSpawnDelay = 250;

            const invaderSize = 20;

            // Counter
            let i = 0,
                kills = 0,
                spawnDelayCounter = invaderSpawnDelay;

            let invaderDownTimer: any;

            // Text
            const blocks = [[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]];

            // Game Controller
            // ---------------
            const Game = function () {
                this.level = -1;
                this.lost = false;
                this.player = new Player();

                this.invaders = [];

                this.invaderShots = [];

                if (invaderDownTimer === undefined) {
                    invaderDownTimer = setInterval(function () {
                        for (i = 0; i < game.invaders.length; i++) game.invaders[i].move();
                    }, 1000 - this.level * 1.8);
                }
            };

            Game.prototype = {
                update: function () {
                    // Next level
                    if (game.invaders.length === 0) {
                        spawnDelayCounter += 1;
                        if (spawnDelayCounter < invaderSpawnDelay) return;

                        this.level += 1;

                        invaderAttackRate -= 0.002;
                        invaderSpeed += 10;

                        game.invaders = createInvaders();

                        spawnDelayCounter = 0;
                    }

                    if (!this.lost) {
                        // Collision
                        game.player.projectile.forEach(function (projectile: any) {
                            game.invaders.forEach(function (invader: any) {
                                if (collides(projectile, invader)) {
                                    invader.destroy();
                                    projectile.active = false;
                                }
                            });
                        });

                        this.invaderShots.forEach(function (invaderShots: any) {
                            if (collides(invaderShots, game.player)) {
                                game.player.destroy();
                            }
                        });

                        for (i = 0; i < game.invaders.length; i++) game.invaders[i].update();
                    }

                    // Don't stop player & projectiles.. they look nice
                    game.player.update();
                    for (i = 0; i < game.invaderShots.length; i++) game.invaderShots[i].update();

                    this.invaders = game.invaders.filter(function (invader: any) {
                        return invader.active;
                    });
                },

                draw: function () {
                    if (this.lost) {
                        screen.fillStyle = 'rgba(0, 0, 0, 0.03)';
                        screen.fillRect(0, 0, gameSize?.width, gameSize?.height);

                        screen.font = '55px Lucida Console';
                        screen.textAlign = 'center';
                        screen.fillStyle = 'white';
                        screen.fillText('You lost', gameSize?.width / 2, gameSize?.height / 2);
                        screen.font = '20px Lucida Console';
                        screen.fillText('Points: ' + kills, gameSize?.width / 2, gameSize?.height / 2 + 30);
                    } else {
                        screen.clearRect(0, 0, gameSize?.width, gameSize?.height);

                        screen.font = '10px Lucida Console';
                        screen.textAlign = 'right';
                        screen.fillText('Points: ' + kills, gameSize?.width, gameSize?.height - 12);
                    }

                    screen.beginPath();

                    let i;
                    this.player.draw();
                    if (!this.lost) for (i = 0; i < this.invaders.length; i++) this.invaders[i].draw();
                    for (i = 0; i < this.invaderShots.length; i++) this.invaderShots[i].draw();

                    screen.fill();
                },

                invadersBelow: function (invader: any) {
                    return (
                        this.invaders.filter(function (b: any) {
                            return (
                                Math.abs(invader.coordinates.x - b.coordinates.x) === 0 &&
                                b.coordinates.y > invader.coordinates.y
                            );
                        }).length > 0
                    );
                },
            };

            // Invaders
            // --------
            const Invader = function (coordinates: any) {
                this.active = true;
                this.coordinates = coordinates;
                this.size = {
                    width: invaderSize,
                    height: invaderSize,
                };
                this.patrolX = 0;

                this.speedX = invaderSpeed;
            };

            Invader.prototype = {
                update: function () {
                    if (Math.random() > invaderAttackRate && !game.invadersBelow(this)) {
                        const projectile = new Projectile(
                            {
                                x: this.coordinates.x + this.size.width / 2,
                                y: this.coordinates.y + this.size.height - 5,
                            },
                            {
                                x: 0,
                                y: 2,
                            }
                        );
                        game.invaderShots.push(projectile);
                    }
                },
                draw: function () {
                    if (this.active) screen.drawImage(invaderCanvas, this.coordinates.x, this.coordinates.y);
                },
                move: function () {
                    if (this.patrolX < 0 || this.patrolX > 100) {
                        this.speedX = -this.speedX;
                        this.patrolX += this.speedX;
                        this.coordinates.y += this.size.height;

                        if (this.coordinates.y + this.size.height * 2 > gameSize?.height) game.lost = true;
                    } else {
                        this.coordinates.x += this.speedX;
                        this.patrolX += this.speedX;
                    }
                },
                destroy: function () {
                    this.active = false;
                    kills += 1;
                },
            };

            // Player
            // ------
            const Player = function () {
                this.active = true;
                this.size = {
                    width: 16,
                    height: 16,
                };
                this.shooterHeat = -3;
                this.coordinates = {
                    x: (gameSize?.width / 2 - this.size.width / 2) | 0,
                    y: gameSize?.height - this.size.height * 2,
                };

                this.projectile = [];
                this.keyboarder = new KeyController();
            };

            Player.prototype = {
                update: function () {
                    for (let i = 0; i < this.projectile.length; i++) this.projectile[i].update();

                    this.projectile = this.projectile.filter(function (projectile) {
                        return projectile.active;
                    });

                    if (!this.active) return;

                    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && this.coordinates.x > 0)
                        this.coordinates.x -= 2;
                    else if (
                        this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) &&
                        this.coordinates.x < gameSize?.width - this.size.width
                    )
                        this.coordinates.x += 2;

                    if (this.keyboarder.isDown(this.keyboarder.KEYS.Space)) {
                        this.shooterHeat += 1;
                        if (this.shooterHeat < 0) {
                            const projectile = new Projectile(
                                {
                                    x: this.coordinates.x + this.size.width / 2 - 1,
                                    y: this.coordinates.y - 1,
                                },
                                {
                                    x: 0,
                                    y: -7,
                                }
                            );
                            this.projectile.push(projectile);
                        } else if (this.shooterHeat > 12) this.shooterHeat = -3;
                    } else {
                        this.shooterHeat = -3;
                    }
                },
                draw: function () {
                    if (this.active) {
                        screen.rect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height);
                        screen.rect(this.coordinates.x - 2, this.coordinates.y + 2, 20, 6);
                        screen.rect(this.coordinates.x + 6, this.coordinates.y - 4, 4, 4);
                    }

                    for (let i = 0; i < this.projectile.length; i++) this.projectile[i].draw();
                },
                destroy: function () {
                    this.active = false;
                    game.lost = true;
                },
            };

            // Projectile
            // ------
            const Projectile = function (coordinates: any, velocity: any) {
                this.active = true;
                this.coordinates = coordinates;
                this.size = {
                    width: 3,
                    height: 3,
                };
                this.velocity = velocity;
            };

            Projectile.prototype = {
                update: function () {
                    this.coordinates.x += this.velocity.x;
                    this.coordinates.y += this.velocity.y;

                    if (this.coordinates.y > gameSize?.height || this.coordinates.y < 0) this.active = false;
                },
                draw: function () {
                    if (this.active)
                        screen.rect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height);
                },
            };

            // Keyboard input tracking
            // -----------------------
            const KeyController = function () {
                this.KEYS = {
                    LEFT: 37,
                    RIGHT: 39,
                    Space: 32,
                };
                const keyCode = [37, 39, 32];
                const keyState = {};

                let counter;
                window.addEventListener('keydown', function (e: any) {
                    for (counter = 0; counter < keyCode.length; counter++)
                        if (keyCode[counter] == e.keyCode) {
                            keyState[e.keyCode] = true;
                            e.preventDefault();
                        }
                });

                window.addEventListener('keyup', function (e: any) {
                    for (counter = 0; counter < keyCode.length; counter++)
                        if (keyCode[counter] == e.keyCode) {
                            keyState[e.keyCode] = false;
                            e.preventDefault();
                        }
                });

                this.isDown = function (keyCode: any) {
                    return keyState[keyCode] === true;
                };
            };

            // Other functions
            // ---------------
            function collides(a: any, b: any) {
                return (
                    a.coordinates.x < b.coordinates.x + b.size.width &&
                    a.coordinates.x + a.size.width > b.coordinates.x &&
                    a.coordinates.y < b.coordinates.y + b.size.height &&
                    a.coordinates.y + a.size.height > b.coordinates.y
                );
            }

            function getPixelRow(rowRaw: any) {
                const textRow = [],
                    row = Math.floor(rowRaw / invaderMultiplier);
                let placer = 0;
                if (row >= blocks.length) return [];
                for (let i = 0; i < blocks[row].length; i++) {
                    const tmpContent = blocks[row][i] * invaderMultiplier;
                    for (let j = 0; j < invaderMultiplier; j++) textRow[placer + j] = tmpContent + j;
                    placer += invaderMultiplier;
                }
                return textRow;
            }

            // Write Text
            // -----------
            function createInvaders() {
                const invaders = [];

                let i = blocks.length * invaderMultiplier;
                while (i--) {
                    const j = getPixelRow(i);
                    for (let k = 0; k < j.length; k++) {
                        invaders.push(
                            new Invader({
                                x: j[k] * invaderSize,
                                y: i * invaderSize,
                            })
                        );
                    }
                }
                return invaders;
            }

            window.addEventListener('load', function () {
                invaderAsset = new Image();
                invaderAsset.onload = function () {
                    invaderCanvas = document.createElement('canvas');
                    invaderCanvas.width = invaderSize;
                    invaderCanvas.height = invaderSize;
                    invaderCanvas.getContext('2d').drawImage(invaderAsset, 0, 0);

                    canvas = canvasRef?.current;
                    screen = canvas?.getContext('2d');

                    initGameStart();
                    loop();
                };

                invaderAsset.src = 'https://stillh.art/project/spaceInvaders/invader.gif';
            });
            window.addEventListener('resize', function () {
                initGameStart();
            });

            document.getElementById('restart').addEventListener('click', function () {
                initGameStart();
            });
            function initGameStart() {
                const clientWidth = window
                    ? window.screen.width
                    : document
                        ? document.body.clientWidth
                        : DEFAULT_DIMENSIONS.width;

                if (clientWidth > 1200 && screen && screen.canvas && screen.canvas.width && screen.canvas.height) {
                    screen.canvas.width = 1200;
                    screen.canvas.height = 500;
                    gameSize = {
                        width: 1200,
                        height: 500,
                    };
                    invaderMultiplier = 3;
                    initialOffsetInvader = 420;
                } else if (
                    clientWidth > 950 &&
                    screen &&
                    screen.canvas &&
                    screen.canvas.width &&
                    screen.canvas.height
                ) {
                    screen.canvas.width = 900;
                    screen.canvas.height = 600;
                    gameSize = {
                        width: 900,
                        height: 600,
                    };
                    invaderMultiplier = 2;
                    initialOffsetInvader = 280;
                } else if (
                    clientWidth >= 600 &&
                    screen &&
                    screen.canvas &&
                    screen.canvas.width &&
                    screen.canvas.height
                ) {
                    screen.canvas.width = 500;
                    screen.canvas.height = 400;
                    gameSize = {
                        width: 500,
                        height: 400,
                    };
                    invaderMultiplier = 2;
                    initialOffsetInvader = 280;
                }

                kills = 0;
                invaderAttackRate = 0.999;
                invaderSpeed = 20;
                spawnDelayCounter = invaderSpawnDelay;

                game = new Game();
            }

            function loop() {
                game.update();
                game.draw();
                requestAnimationFrame(loop);
            }
        };

        gameStart();
    }, []);

    return (
        <section className={classes.section}>
            <p className={classes.para}>
                404 - Page not found with a game ! Use <span className={classes.btn}>space</span>{' '}
                to shoot and
                <span className={classes.btn}>←</span>
                <span className={classes.btn}>→</span>to move!
            </p>

            <div className={classes.canvasWrapper}>
                <canvas ref={canvasRef} />
            </div>
            <button className={classes.reloadButton} id={'restart'}>
                Reload
            </button>
        </section>
    );
};

export default PageNotFound;
