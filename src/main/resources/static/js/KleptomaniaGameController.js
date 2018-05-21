var sala;
var nick;
var model = {
    nickname: null,
    identification: null,
    team: 'T',
    thisxpos:0,
    thisypos:0,
    thisvx: 0,
    thisvy: 0,
    players:{},
    SpriteAct: null,
    animationType: 0,
    animationDir: 'd',
    animStatic: 0
};

var Dx = screen.width*0.99;
var Dy = screen.height*0.86;
var stompClient = null;

var GameModelModule = (function () {
    //Alias
    var app;
    var Application = PIXI.Application;
    var Container = PIXI.Container;
    var loader = PIXI.loader;
    var resources = PIXI.loader.resources;
    var TextureCache = PIXI.utils.TextureCache;
    var Sprite = PIXI.Sprite;
    var Rectangle = PIXI.Rectangle;
    var container = {x: 0, y: 0, width: Dx, height: Dy};

    //Sprites var
    var PRStatic;
    var PLStatic;
    var PUStatic;
    var PDStatic;
    var TRStatic1;
    var TLStatic1;
    var TUStatic1;
    var TDStatic1;
    var TRStatic2;
    var TLStatic2;
    var TUStatic2;
    var TDStatic2;
    var Diamond;
    var Coin;
    var Gold;
    var PUpAnim;
    var PDownAnim;
    var PLeftAnim;
    var PRightAnim;
    var TUpAnim1;
    var TDownAnim1;
    var TLeftAnim1;
    var TRightAnim1;
    var TUpAnim2;
    var TDownAnim2;
    var TLeftAnim2;
    var TRightAnim2;

    //structure world vars 
    var Background;
    var Prision;
    var Obstacle;
    var Trap;
    var houses=[];

    //Util var
    var animationType = 0;
    var animationDir;

    //Initial setup
    var setupPixiApp = function (lobby) {
        window.addEventListener("resize", function() {
            app.renderer.resize(Dx, Dy);
        });
        
        app = new Application(Dx, Dy, {resolution:1});
        document.body.appendChild(app.view);
        loadSprites(lobby);
        
    };

    var loadSprites = function (lobby) {
        loader
            .add("spritesheet","../images/Spritesheet.json")
            .load( function () {
                //load the structures
                Background = new Sprite(resources.spritesheet.textures["background.png"]);
                Background.scale.x = 1.0;
                Background.scale.y = 1.0;
                Background.x=0;
                Background.y=0;
                Background.visible = true;
                app.stage.addChild(Background);
                //load Houses
                var a = screen.width/4;
                var b = screen.height/4;
                var xs = [50,a,a*2,a*3];
                var ys = [10,b,b*2,b*3];
                var c = 0;
                var d = 0;
                for (i=0; i<8; i++){
                    var House = new Sprite(resources.spritesheet.textures["house"+Math.floor((Math.random() * 3) + 1)+".png"]);
                    House.scale.x = 0.5;
                    House.scale.y = 0.5;
                    House.x = xs[d];
                    House.y = ys[c];  
                    House.visible = true;
                    houses.push(House);
                    app.stage.addChild(House);
                    if (d==3){
                        c+=1;
                        d=0;
                    }else{
                        d+=1;
                    } 
                }

                //set the image of the police to right
                PRStatic = new Sprite(resources.spritesheet.textures["PRStatic.png"]);
                PRStatic.scale.x = 0.3;
                PRStatic.scale.y = 0.3;
                PRStatic.visible = false;
                app.stage.addChild(PRStatic);
                //set the image of the police to left
                PLStatic = new Sprite(resources.spritesheet.textures["PLStatic.png"]);
                PLStatic.scale.x = 0.3;
                PLStatic.scale.y = 0.3;
                PLStatic.visible = false;
                app.stage.addChild(PLStatic);
                //set the image of the police to up
                PUStatic = new Sprite(resources.spritesheet.textures["PUStatic.png"]);
                PUStatic.scale.x = 0.3;
                PUStatic.scale.y = 0.3;
                PUStatic.visible = false;
                app.stage.addChild(PUStatic);
                //set the image of the police to down
                PDStatic = new Sprite(resources.spritesheet.textures["PDStatic.png"]);
                PDStatic.scale.x = 0.3;
                PDStatic.scale.y = 0.3;
                PDStatic.visible = false;
                app.stage.addChild(PDStatic);

                //set the image of the thieft to right
                TRStatic1 = new Sprite(resources.spritesheet.textures["TRStatic.png"]);
                TRStatic1.scale.x = 0.3;
                TRStatic1.scale.y = 0.3;
                TRStatic1.visible = false;
                app.stage.addChild(TRStatic1);
                //set the image of the thieft to left
                TLStatic1 = new Sprite(resources.spritesheet.textures["TLStatic.png"]);
                TLStatic1.scale.x = 0.3;
                TLStatic1.scale.y = 0.3;
                TLStatic1.visible = false;
                app.stage.addChild(TLStatic1);
                //set the image of the thieft to up
                TUStatic1 = new Sprite(resources.spritesheet.textures["TUStatic.png"]);
                TUStatic1.scale.x = 0.3;
                TUStatic1.scale.y = 0.3;
                TUStatic1.visible = false;
                app.stage.addChild(TUStatic1);
                //set the image of the thieft to down
                TDStatic1 = new Sprite(resources.spritesheet.textures["TDStatic.png"]);
                TDStatic1.scale.x = 0.3;
                TDStatic1.scale.y = 0.3;
                TDStatic1.visible = false;
                app.stage.addChild(TDStatic1);

                //set the image of the thieft to right
                TRStatic2 = new Sprite(resources.spritesheet.textures["TRStatic.png"]);
                TRStatic2.scale.x = 0.3;
                TRStatic2.scale.y = 0.3;
                TRStatic2.visible = false;
                app.stage.addChild(TRStatic2);
                //set the image of the thieft to left
                TLStatic2 = new Sprite(resources.spritesheet.textures["TLStatic.png"]);
                TLStatic2.scale.x = 0.3;
                TLStatic2.scale.y = 0.3;
                TLStatic2.visible = false;
                app.stage.addChild(TLStatic2);
                //set the image of the thieft to up
                TUStatic2 = new Sprite(resources.spritesheet.textures["TUStatic.png"]);
                TUStatic2.scale.x = 0.3;
                TUStatic2.scale.y = 0.3;
                TUStatic2.visible = false;
                app.stage.addChild(TUStatic2);
                //set the image of the thieft to down
                TDStatic2 = new Sprite(resources.spritesheet.textures["TDStatic.png"]);
                TDStatic2.scale.x = 0.3;
                TDStatic2.scale.y = 0.3;
                TDStatic2.visible = false;
                app.stage.addChild(TDStatic2);

                //Load the resources of the world
                Diamond = new Sprite(resources.spritesheet.textures["Diamond.png"]);
                Diamond.visible = false;
                Diamond.scale.x = 0.3;
                Diamond.scale.y = 0.3;
                app.stage.addChild(Diamond);
                Coin = new Sprite(resources.spritesheet.textures["Coin.png"]);
                Coin.scale.x = 0.3;
                Coin.scale.y = 0.3;
                Coin.visible = false;
                app.stage.addChild(Coin);
                Gold = new Sprite(resources.spritesheet.textures["Gold.png"]);
                Gold.scale.x = 0.3;
                Gold.scale.y = 0.3;
                Gold.visible = false;
                app.stage.addChild(Gold);
                
                var frames = [];
                frames.push(resources.spritesheet.textures["PUStatic.png"]);
                frames.push(resources.spritesheet.textures["PUMov1.png"]);
                frames.push(resources.spritesheet.textures["PUMov2.png"]);
                frames.push(resources.spritesheet.textures["PUStatic.png"]);
                PUpAnim = new PIXI.extras.AnimatedSprite(frames);
                PUpAnim.scale.x = 0.3;
                PUpAnim.scale.y = 0.3;
                PUpAnim.animationSpeed = 0.2;
                PUpAnim.play();
                PUpAnim.visible = false;
                app.stage.addChild(PUpAnim);
                frames = [];
                frames.push(resources.spritesheet.textures["PDStatic.png"]);
                frames.push(resources.spritesheet.textures["PDMov1.png"]);
                frames.push(resources.spritesheet.textures["PDMov2.png"]);
                frames.push(resources.spritesheet.textures["PDStatic.png"]);
                PDownAnim = new PIXI.extras.AnimatedSprite(frames);
                PDownAnim.scale.x = 0.3;
                PDownAnim.scale.y = 0.3;
                PDownAnim.animationSpeed = 0.2;
                PDownAnim.play();
                PDownAnim.visible = false;
                app.stage.addChild(PDownAnim);
                frames = [];
                frames.push(resources.spritesheet.textures["PRStatic.png"]);
                frames.push(resources.spritesheet.textures["PRMov1.png"]);
                frames.push(resources.spritesheet.textures["PRMov2.png"]);
                frames.push(resources.spritesheet.textures["PRStatic.png"]);
                PRightAnim = new PIXI.extras.AnimatedSprite(frames);
                PRightAnim.scale.x = 0.3;
                PRightAnim.scale.y = 0.3;
                PRightAnim.animationSpeed = 0.2;
                PRightAnim.play();
                PRightAnim.visible = false;
                app.stage.addChild(PRightAnim);
                frames = [];
                frames.push(resources.spritesheet.textures["PLStatic.png"]);
                frames.push(resources.spritesheet.textures["PLMov1.png"]);
                frames.push(resources.spritesheet.textures["PLMov2.png"]);
                frames.push(resources.spritesheet.textures["PLStatic.png"]);
                PLeftAnim = new PIXI.extras.AnimatedSprite(frames);
                PLeftAnim.scale.x = 0.3;
                PLeftAnim.scale.y = 0.3;
                PLeftAnim.animationSpeed = 0.2;
                PLeftAnim.play();
                PLeftAnim.visible = false;
                app.stage.addChild(PLeftAnim);

                frames = [];
                frames.push(resources.spritesheet.textures["TUStatic.png"]);
                frames.push(resources.spritesheet.textures["TUMov1.png"]);
                frames.push(resources.spritesheet.textures["TUMov2.png"]);
                frames.push(resources.spritesheet.textures["TUStatic.png"]);
                TUpAnim1 = new PIXI.extras.AnimatedSprite(frames);
                TUpAnim1.scale.x = 0.3;
                TUpAnim1.scale.y = 0.3;
                TUpAnim1.animationSpeed = 0.2;
                TUpAnim1.play();
                TUpAnim1.visible = false;
                app.stage.addChild(TUpAnim1);
                frames = [];
                frames.push(resources.spritesheet.textures["TDStatic.png"]);
                frames.push(resources.spritesheet.textures["TDMov1.png"]);
                frames.push(resources.spritesheet.textures["TDMov2.png"]);
                frames.push(resources.spritesheet.textures["TDStatic.png"]);
                TDownAnim1 = new PIXI.extras.AnimatedSprite(frames);
                TDownAnim1.scale.x = 0.3;
                TDownAnim1.scale.y = 0.3;
                TDownAnim1.animationSpeed = 0.2;
                TDownAnim1.play();
                TDownAnim1.visible = false;
                app.stage.addChild(TDownAnim1);
                frames = [];
                frames.push(resources.spritesheet.textures["TRStatic.png"]);
                frames.push(resources.spritesheet.textures["TRMov1.png"]);
                frames.push(resources.spritesheet.textures["TRMov2.png"]);
                frames.push(resources.spritesheet.textures["TRStatic.png"]);
                TRightAnim1 = new PIXI.extras.AnimatedSprite(frames);
                TRightAnim1.scale.x = 0.3;
                TRightAnim1.scale.y = 0.3;
                TRightAnim1.animationSpeed = 0.2;
                TRightAnim1.play();
                TRightAnim1.visible = false;
                app.stage.addChild(TRightAnim1);
                frames = [];
                frames.push(resources.spritesheet.textures["TLStatic.png"]);
                frames.push(resources.spritesheet.textures["TLMov1.png"]);
                frames.push(resources.spritesheet.textures["TLMov2.png"]);
                frames.push(resources.spritesheet.textures["TLStatic.png"]);
                TLeftAnim1 = new PIXI.extras.AnimatedSprite(frames);
                TLeftAnim1.scale.x = 0.3;
                TLeftAnim1.scale.y = 0.3;
                TLeftAnim1.animationSpeed = 0.2;
                TLeftAnim1.play();
                TLeftAnim1.visible = false;
                app.stage.addChild(TLeftAnim1);

                frames = [];
                frames.push(resources.spritesheet.textures["TUStatic.png"]);
                frames.push(resources.spritesheet.textures["TUMov1.png"]);
                frames.push(resources.spritesheet.textures["TUMov2.png"]);
                frames.push(resources.spritesheet.textures["TUStatic.png"]);
                TUpAnim2 = new PIXI.extras.AnimatedSprite(frames);
                TUpAnim2.scale.x = 0.3;
                TUpAnim2.scale.y = 0.3;
                TUpAnim2.animationSpeed = 0.2;
                TUpAnim2.play();
                TUpAnim2.visible = false;
                app.stage.addChild(TUpAnim2);
                frames = [];
                frames.push(resources.spritesheet.textures["TDStatic.png"]);
                frames.push(resources.spritesheet.textures["TDMov1.png"]);
                frames.push(resources.spritesheet.textures["TDMov2.png"]);
                frames.push(resources.spritesheet.textures["TDStatic.png"]);
                TDownAnim2 = new PIXI.extras.AnimatedSprite(frames);
                TDownAnim2.scale.x = 0.3;
                TDownAnim2.scale.y = 0.3;
                TDownAnim2.animationSpeed = 0.2;
                TDownAnim2.play();
                TDownAnim2.visible = false;
                app.stage.addChild(TDownAnim2);
                frames = [];
                frames.push(resources.spritesheet.textures["TRStatic.png"]);
                frames.push(resources.spritesheet.textures["TRMov1.png"]);
                frames.push(resources.spritesheet.textures["TRMov2.png"]);
                frames.push(resources.spritesheet.textures["TRStatic.png"]);
                TRightAnim2 = new PIXI.extras.AnimatedSprite(frames);
                TRightAnim2.scale.x = 0.3;
                TRightAnim2.scale.y = 0.3;
                TRightAnim2.animationSpeed = 0.2;
                TRightAnim2.play();
                TRightAnim2.visible = false;
                app.stage.addChild(TRightAnim2);
                frames = [];
                frames.push(resources.spritesheet.textures["TLStatic.png"]);
                frames.push(resources.spritesheet.textures["TLMov1.png"]);
                frames.push(resources.spritesheet.textures["TLMov2.png"]);
                frames.push(resources.spritesheet.textures["TLStatic.png"]);
                TLeftAnim2 = new PIXI.extras.AnimatedSprite(frames);
                TLeftAnim2.scale.x = 0.3;
                TLeftAnim2.scale.y = 0.3;
                TLeftAnim2.animationSpeed = 0.2;
                TLeftAnim2.play();
                TLeftAnim2.visible = false;
                app.stage.addChild(TLeftAnim2);
                init();
            });
    };


    function init() {
        //model.thisxpos = (Math.random() * 300) + 1;
        //model.thisypos = (Math.random() * 300) + 1;

        model.SpriteAct=TDStatic1;
        model.SpriteAct.x = model.thisxpos;
        model.SpriteAct.y = model.thisypos;
        model.SpriteAct.visible = true;

        function keyboard(keyCode) {
            let key = {};
            key.code = keyCode;
            key.isDown = false;
            key.isUp = true;
            key.press = undefined;
            key.release = undefined;
            //The `downHandler`
            key.downHandler = event =>{
                if (event.keyCode === key.code) {
                    if (key.isUp && key.press) key.press();
                    key.isDown = true;
                    key.isUp = false;
                }
                event.preventDefault();
            };

            //The `upHandler`
            key.upHandler = event =>{
                if (event.keyCode === key.code) {
                    if (key.isDown && key.release) key.release();
                    key.isDown = false;
                    key.isUp = true;
                }
                event.preventDefault();
            };

            //Attach event listeners
            window.addEventListener(
                "keydown", key.downHandler.bind(key), false
            );
            window.addEventListener(
                "keyup", key.upHandler.bind(key), false
            );
            return key;
        }

        //Capture the keyboard arrow keys
        var left = keyboard(37),
            up = keyboard(38),
            right = keyboard(39),
            down = keyboard(40);

        //Left
        left.press = function () {
            model.thisvx = -5;
            model.thisvy = 0;
            model.animationDir = "l";
            model.animationType = 1;
            model.animStatic = 0;
        };
        left.release = function () {
            if (!right.isDown && model.thisvy === 0) {
               model.thisvx = 0;
            }
            model.animationType = 0;
        };

        //Up
        up.press = function () {
            model.thisvy = -5;
            model.thisvx = 0;
            model.animationDir = "u";
            model.animationType = 1;
            model.animStatic = 0;
        };
        up.release = function () {
            if (!down.isDown && model.thisvx === 0) {
                model.thisvy = 0;
            }
            model.animationType = 0;
        };

        //Right
        right.press = function () {
            model.thisvx = 5;
            model.thisvy = 0;
            model.animationDir = "r";
            model.animationType = 1;
            model.animStatic = 0;
        };
        right.release = function () {
            if (!left.isDown && model.thisvy === 0) {
                model.thisvx = 0;
            }
            model.animationType = 0;
        };

        //Down
        down.press = function () {
            model.thisvy = 5;
            model.thisvx = 0;
            model.animationDir ="d";
            model.animationType = 1;
            model.animStatic = 0;
        };
        down.release = function () {
            if (!up.isDown && model.thisvx === 0) {
                model.thisvy = 0;
            }
            model.animationType = 0;
        };

        stompClient.send("/app/position." + sala, {}, JSON.stringify(
            {   nickname: model.nickname,
                identification: model.identification,
                team: model.team,
                thisxpos: model.thisxpos,
                thisypos: model.thisypos,
                thisvy: model.thisvy,
                thisvx: model.thisvx,
                animationType: model.animationType,
                animationDir: model.animationDir
            }));

        state = play;

        app.ticker.add(delta => gameLoop(delta));
    }

    function gameLoop(delta) {
        state(delta);
    }
    
    function contain(sprite) {

        let collision = false;

        //Left
        if (sprite.x < container.x) {
          sprite.x = container.x;
          collision = true;
        }

        //Top
        if (sprite.y < container.y) {
          sprite.y = container.y;
          collision = true;
        }

        //Right
        if (sprite.x + sprite.width > container.width) {
          sprite.x = container.width - sprite.width;
          collision = true;
        }

        //Bottom
        if (sprite.y + sprite.height > container.height) {
          sprite.y = container.height - sprite.height;
          collision = true;
        }

        //Return the `collision` value
        return collision;
    }
    
    function collision(sprite){
        var collited = false;
        var i = 0;
        while (i<houses.length && !collited){
            collited = hitTestRectangle(sprite, houses[i]);
            i+=1;
        }
    }
    
    function play() {

            model.thisxpos += model.thisvx;
            model.thisypos += model.thisvy;
            paintm(model);
            if(model.animationType != 0 ){
                stompClient.send("/app/position." + sala, {}, JSON.stringify(
                    {
                        nickname: model.nickname,
                        identification: model.identification,
                        team: model.team,
                        thisxpos: model.thisxpos,
                        thisypos: model.thisypos,
                        thisvy: model.thisvy,
                        thisvx: model.thisvx,
                        animationType: model.animationType,
                        animationDir: model.animationDir
                    }));
            }else if (model.animationType == 0 && model.animStatic != 1){
                stompClient.send("/app/position." + sala, {}, JSON.stringify(
                    {
                        nickname: model.nickname,
                        identification: model.identification,
                        team: model.team,
                        thisxpos: model.thisxpos,
                        thisypos: model.thisypos,
                        thisvy: model.thisvy,
                        thisvx: model.thisvx,
                        animationType: model.animationType,
                        animationDir: model.animationDir
                    }));
                model.animStatic = 1;
            }

    }

    var receipt = function (data) {
        if(data.identification in model.players){
            model.players[data.identification].thisxpos = data.thisxpos;
            model.players[data.identification].thisypos = data.thisypos;
            model.players[data.identification].animationDir = data.animationDir;
            model.players[data.identification].animationType = data.animationType;
            paintExt(model.players[data.identification]);
        }else if (data.identification !== model.identification) {
            model.players[data.identification] = {nickname: data.nickname, identification: data.identification,
                                                  team: data.team, thisxpos: data.thisxpos, thisypos: data.thisypos,
                                                  thisvy: data.thisvy, thisvx: data.thisvx, animationType: data.animationType,
                                                  animationDir: data.animationDir, SpriteAct: null};
            paintExt(model.players[data.identification]);

        }
    };

    var paintExt = function (data) {
        if (data.SpriteAct != null){data.SpriteAct.visible = false;}
        if (data.animationType == 0) {
            if (data.team == 'T') {
                if (data.animationDir == "l") {
                    data.SpriteAct = TLStatic2;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = TUStatic2;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = TDStatic2;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = TRStatic2;
                }
            } else if (data.team == 'C') {
                if (data.animationDir == "l") {
                    data.SpriteAct = PLStatic;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = PUStatic;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = PDStatic;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = PRStatic;
                }
            }
        } else {
            if (data.team == 'T') {
                if (data.animationDir == "l") {
                    data.SpriteAct = TLeftAnim2;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = TUpAnim2;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = TDownAnim2;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = TRightAnim2;
                }
            } else if (data.team == 'C') {
                if (data.animationDir == "l") {
                    data.SpriteAct = PLeftAnim;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = PUpAnim;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = PDownAnim;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = PRightAnim;
                }
            }
        }
        data.SpriteAct.x = data.thisxpos;
        data.SpriteAct.y = data.thisypos;
        data.SpriteAct.visible = true;

    };

    var paintm = function (data) {
        data.SpriteAct.visible = false;
        if (data.animationType == 0) {
            if (data.team == 'T') {
                if (data.animationDir == "l") {
                    data.SpriteAct = TLStatic1;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = TUStatic1;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = TDStatic1;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = TRStatic1;
                }
            } else if (data.team == 'C') {
                if (data.animationDir == "l") {
                    data.SpriteAct = PLStatic;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = PUStatic;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = PDStatic;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = PRStatic;
                }
            }
        } else {
            if (data.team == 'T') {
                if (data.animationDir == "l") {
                    data.SpriteAct = TLeftAnim1;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = TUpAnim1;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = TDownAnim1;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = TRightAnim1;
                }
            } else if (data.team == 'C') {
                if (data.animationDir == "l") {
                    data.SpriteAct = PLeftAnim;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = PUpAnim;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = PDownAnim;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = PRightAnim;
                }
            }
        }
        data.SpriteAct.x = data.thisxpos;
        data.SpriteAct.y = data.thisypos;
        data.SpriteAct.visible = true;
    };

    var playing = function () {
        
        nickname = sessionStorage.getItem('nickname');
        model.nickname = nickname;
        var nickname1 = sessionStorage.getItem('nickname1');
        if(nickname1!=null){           
            console.log("Entro al if");  
            console.log("Funcion playing nickname: "+nickname);
            console.log("Funcion playing lobby: "+nickname1);
            sala = nickname1;
            connect(nickname1);
            
            
        }
        else{
            console.log("Entro al else");
            var invitedRoom = sessionStorage.getItem('invitedRoom');
            console.log("Funcion playing nickname: "+nickname);
            console.log("Funcion playing lobby: "+invitedRoom);
            sala = invitedRoom;
            connect(invitedRoom);
            
        }   
    };

    //Aqui deberia ir la posición de inicio según la letra que ya asigno el servidor( ya la asigna)
    var creatingPosition = function (spawnChar) {
        console.log("Spawn Char: " + spawnChar);
        model.identification = spawnChar;
        if(spawnChar === spawnChar.toUpperCase()){
            if(spawnChar === 'A'){
                console.log("spawnChar is A");
                model.thisxpos = 300;
                model.thisypos = 300;
            }
            else if (spawnChar === 'B'){
                console.log("spawnChar is B");
                model.thisxpos = 500;
                model.thisypos = 500;
            }
        }
    };

    var connect = function (lobby) {
        var socket = new SockJS('/stompendpoint');
        var nickname = sessionStorage.getItem('nickname');
        console.log("nickname: ",nickname);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/gameThieves.'+lobby, function (data) {

            });
            stompClient.subscribe('/topic/colorized.'+lobby, function (data) {
                receipt(JSON.parse(data.body));
            });
            RestControllerModule.getPlayerId(sala,nickname);
            RestControllerModule.getPlayerTeam(sala,nickname);
            
            setupPixiApp(lobby);
            
        });
       
    };
    
    var joinMyTeam = function(myTeam){
        model.team = myTeam;
    }

    return {
        playing: playing,
        creatingPosition: creatingPosition,
        joinMyTeam: joinMyTeam

    }})();
