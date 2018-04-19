var model = {
    thisxpos:0,
    thisypos:0,
    thisvx:0,
    thisvy:0,
    loadedPolices:[],
    loadedObjects:[],
    loadedThiefs:[]
};

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

    //Sprites var
    var PRStatic;
    var PLStatic;
    var PUStatic;
    var PDStatic;
    var TRStatic;
    var TLStatic;
    var TUStatic;
    var TDStatic;
    var Diamond;
    var Coin;
    var Gold;
    var PUpAnim;
    var PDownAnim;
    var PLeftAnim;
    var PRightAnim;
    var TUpAnim;
    var TDownAnim;
    var TLeftAnim;
    var TRightAnim;

    //structure world vars 
    var Background;
    var Prision;
    var Obstacle;
    var Trap;
    var houses=[];

    //Util var
    var animationType = 0;
    var animationDir;
    var SpriteAct;

    //Initial setup
    var setupPixiApp = function () {
        window.addEventListener("resize", function() {
            app.renderer.resize(window.innerWidth, window.innerHeight);
        });
        app = new Application(window.innerWidth, window.innerHeight, {resolution:1});
        document.body.appendChild(app.view);
        loadSprites();
    };

    var loadSprites = function () {
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
                for (i=0; i<16; i++){
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
                TRStatic = new Sprite(resources.spritesheet.textures["TRStatic.png"]);
                TRStatic.scale.x = 0.3;
                TRStatic.scale.y = 0.3;
                TRStatic.visible = false;
                app.stage.addChild(TRStatic);
                //set the image of the thieft to left
                TLStatic = new Sprite(resources.spritesheet.textures["TLStatic.png"]);
                TLStatic.scale.x = 0.3;
                TLStatic.scale.y = 0.3;
                TLStatic.visible = false;
                app.stage.addChild(TLStatic);
                //set the image of the thieft to up
                TUStatic = new Sprite(resources.spritesheet.textures["TUStatic.png"]);
                TUStatic.scale.x = 0.3;
                TUStatic.scale.y = 0.3;
                TUStatic.visible = false;
                app.stage.addChild(TUStatic);
                //set the image of the thieft to down
                TDStatic = new Sprite(resources.spritesheet.textures["TDStatic.png"]);
                TDStatic.scale.x = 0.3;
                TDStatic.scale.y = 0.3;
                TDStatic.visible = false;
                app.stage.addChild(TDStatic);

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
                TUpAnim = new PIXI.extras.AnimatedSprite(frames);
                TUpAnim.scale.x = 0.3;
                TUpAnim.scale.y = 0.3;
                TUpAnim.animationSpeed = 0.2;
                TUpAnim.play();
                TUpAnim.visible = false;
                app.stage.addChild(TUpAnim);
                frames = [];
                frames.push(resources.spritesheet.textures["TDStatic.png"]);
                frames.push(resources.spritesheet.textures["TDMov1.png"]);
                frames.push(resources.spritesheet.textures["TDMov2.png"]);
                frames.push(resources.spritesheet.textures["TDStatic.png"]);
                TDownAnim = new PIXI.extras.AnimatedSprite(frames);
                TDownAnim.scale.x = 0.3;
                TDownAnim.scale.y = 0.3;
                TDownAnim.animationSpeed = 0.2;
                TDownAnim.play();
                TDownAnim.visible = false;
                app.stage.addChild(TDownAnim);
                frames = [];
                frames.push(resources.spritesheet.textures["TRStatic.png"]);
                frames.push(resources.spritesheet.textures["TRMov1.png"]);
                frames.push(resources.spritesheet.textures["TRMov2.png"]);
                frames.push(resources.spritesheet.textures["TRStatic.png"]);
                TRightAnim = new PIXI.extras.AnimatedSprite(frames);
                TRightAnim.scale.x = 0.3;
                TRightAnim.scale.y = 0.3;
                TRightAnim.animationSpeed = 0.2;
                TRightAnim.play();
                TRightAnim.visible = false;
                app.stage.addChild(TRightAnim);
                frames = [];
                frames.push(resources.spritesheet.textures["TLStatic.png"]);
                frames.push(resources.spritesheet.textures["TLMov1.png"]);
                frames.push(resources.spritesheet.textures["TLMov2.png"]);
                frames.push(resources.spritesheet.textures["TLStatic.png"]);
                TLeftAnim = new PIXI.extras.AnimatedSprite(frames);
                TLeftAnim.scale.x = 0.3;
                TLeftAnim.scale.y = 0.3;
                TLeftAnim.animationSpeed = 0.2;
                TLeftAnim.play();
                TLeftAnim.visible = false;
                app.stage.addChild(TLeftAnim);
                init();
            });
    };

    function init() {
        model.thisxpos = (Math.random() * 300) + 1;
        model.thisypos = (Math.random() * 300) + 1;
        SpriteAct=TDStatic;
        SpriteAct.x = model.thisxpos;
        SpriteAct.y = model.thisypos;
        SpriteAct.visible = true;
        animationType = 0;
        animationDir = "d";

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
            animationDir = "l";
            animationType = 1;
        };
        left.release = function () {
            if (!right.isDown && model.thisvy === 0) {
               model.thisvx = 0;
            }
            animationType = 0;
        };

        //Up
        up.press = function () {
            model.thisvy = -5;
            model.thisvx = 0;
            animationDir = "u";
            animationType = 1;
        };
        up.release = function () {
            if (!down.isDown && model.thisvx === 0) {
                model.thisvy = 0;
            }
            animationType = 0;
        };

        //Right
        right.press = function () {
            model.thisvx = 5;
            model.thisvy = 0;
            animationDir = "r";
            animationType = 1;
        };
        right.release = function () {
            if (!left.isDown && model.thisvy === 0) {
                model.thisvx = 0;
            }
            animationType = 0;
        };

        //Down
        down.press = function () {
            model.thisvy = 5;
            model.thisvx = 0;
            animationDir ="d";
            animationType = 1;
        };
        down.release = function () {
            if (!up.isDown && model.thisvx === 0) {
                model.thisvy = 0;
            }
            animationType = 0;
        };
        state = play;

        app.ticker.add(delta => gameLoop(delta));
    }

    function gameLoop(delta) {
        state(delta);
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
        SpriteAct.visible = false;
        if(animationType == 0){
            if(animationDir == "l"){SpriteAct = TLStatic;}
            else if(animationDir == "u"){SpriteAct = TUStatic;}
            else if(animationDir == "d"){SpriteAct = TDStatic;}
            else if(animationDir == "r"){SpriteAct = TRStatic;}
        }else{
            if(animationDir == "l"){SpriteAct = TLeftAnim;}
            else if(animationDir == "u"){SpriteAct = TUpAnim;}
            else if(animationDir == "d"){SpriteAct = TDownAnim;}
            else if(animationDir == "r"){SpriteAct = TRightAnim;}
        }
        SpriteAct.x = model.thisxpos;
        SpriteAct.y = model.thisypos;
        SpriteAct.visible = true;
    }

    return {
        setupApp: setupPixiApp
    }})();
GameModelModule.setupApp();