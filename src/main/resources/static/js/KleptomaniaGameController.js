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
    animStatic: 0,
    tNum:0,
    inPrision: false
};

var Dx = 1280;
var Dy = 720;
var stompClient = null;

var GameModelModule = (function () {
    //Alias
    var app;
    var Application = PIXI.Application;
    var currentArea = "";
    var loader = PIXI.loader;
    var resources = PIXI.loader.resources;
    var TextureCache = PIXI.utils.TextureCache;
    var Sprite = PIXI.Sprite;
    var Rectangle = PIXI.Rectangle;
    var libre = {x: 0, y: 250, width: Dx, height: Dy};
    var prision = {x:0, y:0, width: Dx, height: 250};

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
                var positions = [[1,180,270],[3,380,320],[2,60,470],[2,580,270],[1,900,500],[1,800,280],[3,550,500],[2,1100,280]];
                for (i=0; i<8; i++){
                    var House = new Sprite(resources.spritesheet.textures["house"+positions[i][0]+".png"]);
                    House.scale.x = 0.5;
                    House.scale.y = 0.5;
                    House.x = positions[i][1];
                    House.y = positions[i][2];  
                    House.visible = true;
                    houses.push(House);
                    app.stage.addChild(House);
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
                
                //load the prision
                Prision = new Sprite(resources.spritesheet.textures["prision.png"]);
                Prision.visible = true;
                Prision.scale.x = 6.0;
                Prision.scale.y = 0.6;
                Prision.x=0;
                Prision.y=0;
                app.stage.addChild(Prision);

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
        currentArea = libre;
        if (model.team == "T"){
            model.SpriteAct=TDStatic1;
        }else if (model.team=="C"){
            model.SpriteAct=PDStatic;
        }
        model.SpriteAct.x = model.thisxpos;
        model.SpriteAct.y = model.thisypos;
        model.SpriteAct.visible = true;

        if (model.team == 'T'){
            model.tNum++;
        }

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
            model.animationDir = "l";
            model.animationType = 1;
            model.animStatic = 0;
        };
        left.release = function () {
            if (!right.isDown) {
                model.thisvx = 0;
            }
            if(!up.isDown && !right.isDown && !down.isDown){
                model.animationType = 0;
            }
        };

        //Up
        up.press = function () {
            model.thisvy = -5;
            model.animationDir = "u";
            model.animationType = 1;
            model.animStatic = 0;
        };
        up.release = function () {
            if (!down.isDown) {
                model.thisvy = 0;
            }
            if(!down.isDown && !right.isDown && !left.isDown){
                model.animationType = 0;
            }
        };

        //Right
        right.press = function () {
            model.thisvx = 5;
            model.animationDir = "r";
            model.animationType = 1;
            model.animStatic = 0;
        };
        right.release = function () {
            if (!left.isDown) {
                model.thisvx = 0;
            }
            if(!up.isDown && !down.isDown && !left.isDown){
                model.animationType = 0;
            }
        };

        //Down
        down.press = function () {
            model.thisvy = 5;
            model.animationDir ="d";
            model.animationType = 1;
            model.animStatic = 0;
        };
        down.release = function () {
            if (!up.isDown ) {
                model.thisvy = 0;
            }
            if(!up.isDown && !right.isDown && !left.isDown){
                model.animationType = 0;
            }

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
                animationDir: model.animationDir,
                inPrision : model.inPrision
            }));

        state = play;

        app.ticker.add(delta => gameLoop(delta));
    }

    function gameLoop(delta) {
        state(delta);
    }
    
    function cp (point,Sprite){
        //calculate if the point (tuple) is over an sprite
        if (Sprite!=null){
            return ((Sprite.x<point[0]) && (Sprite.x+Sprite.width)>point[0]) && (Sprite.y<point[1] && (Sprite.y+Sprite.height)>point[1]);
        }else{
            return false;
        }
    }
    
    function ColSprites(Sprite1, Sprite2){
        //get the bounds of the Sprite1
        var ax = Sprite1.x;
        var ay = Sprite1.y;
        var bx = ax+Sprite1.width;
        var by = ay;
        var cx = ax;
        var cy = cx+Sprite1.height;
        var dx = bx;
        var dy = dx+cy;
        return (cp([ax,ay],Sprite2) && cp([bx,by],Sprite2) && cp([cx,cy],Sprite2) && cp([dx,dy],Sprite2));
    }
    
    function contain(sprite, contenedor) {
        var collision = true;
        
        //Left
        if (sprite.x < contenedor.x) {
            model.thisxpos = contenedor.x;
            sprite.x = model.thisxpos;
            collision = false;
        }

        //Top
        if (sprite.y < contenedor.y) {
            model.thisypos = contenedor.y;
            sprite.y = model.thisypos;
            collision = false;
        }

        //Right
        if (sprite.x + sprite.width > contenedor.width) {
            model.thisxpos = contenedor.width - sprite.width;
            sprite.x = model.thisxpos;
            collision = false;
        }

        //Bottom
        if (sprite.y + sprite.height > contenedor.height) {
            model.thisypos = contenedor.height - sprite.height;
            sprite.y = model.thisypos;
            collision = false;
        }

        //Return the `collision` value
        return collision;
    }
    
    function PoliceCapture(sprite){
        for (var key in model.players){
            player = model.players[key];
            if ((ColSprites(sprite,player.SpriteAct) || ColSprites(sprite,player.SpriteAct)) && (!player.inPrision && !model.inPrision)){
                if (model.team="T"){
                    model.inPrision = true;
                    model.thisxpos = 10;
                    model.thisypos = 10;
                    model.SpriteAct.x = 10;
                    model.SpriteAct.y = 10;
                    model.animationType = 0;
                    model.animationDir = "d";
                    currentArea = prision;
                    
                }else if (model.team="C"){
                    if (model.identification != player.identification){
                        stompClient.send("/app/captured." + sala, {}, JSON.stringify(
                            {   nickname: player.nickname,
                                identification: player.identification,
                                team: player.team,
                                thisxpos: 10,
                                thisypos: 10,
                                thisvy: 0,
                                thisvx: 0,
                                animationType: 0,
                                animationDir: player.animationDir,
                                inPrision: true
                            }));
                    } 
                }
            }
        }
    }
       
    function collision(sprite){
        var collited = false;
        var i = 0;
        while (i<houses.length && !collited){
            collited = (ColSprites(sprite, houses[i]) || ColSprites(houses[i],sprite));
            i+=1;
        }
        return collited;
    }
    
    function play() {
            if (contain(model.SpriteAct,currentArea) && !collision(model.SpriteAct)){
                PoliceCapture(model.SpriteAct);
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
                            animationDir: model.animationDir,
                            inPrision: model.inPrision
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
                            animationDir: model.animationDir,
                            inPrision: model.inPrision
                        }));
                    model.animStatic = 1;
                }
            }else{
                model.thisvx = 0;
                model.thisvy = 0;
                model.animationType = 0;
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
            model.players[data.identification] = {nickname: data.nickname, 
                                                identification: data.identification,
                                                team: data.team, 
                                                thisxpos: data.thisxpos, 
                                                thisypos: data.thisypos,
                                                thisvy: data.thisvy, 
                                                thisvx: data.thisvx, 
                                                animationType: data.animationType,
                                                animationDir: data.animationDir, 
                                                inPrision: data.inPrision,
                                                SpriteAct: null,
                                                tNum:null
                                            };
            if(data.team == 'T'){
                model.tNum++;
                model.players[data.identification].tNum = model.tNum;
            }

            paintExt(model.players[data.identification]);
        }
    };

    var paintExt = function (data) {
        console.log(data);
        if (data.SpriteAct != null){data.SpriteAct.visible = false;}
        if (data.animationType == 0) {
            if (data.team == 'T') {
                if (data.animationDir == "l") {
                    data.SpriteAct = (data.tNum == 1)? TLStatic1 : TLStatic2;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = (data.tNum == 1)? TUStatic1 : TUStatic2;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = (data.tNum == 1)? TDStatic1 : TDStatic2;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = (data.tNum == 1)? TRStatic1 : TRStatic2;
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
            data.SpriteAct.x = data.thisxpos;
            data.SpriteAct.y = data.thisypos;
            data.SpriteAct.visible = true;
        } else {
            if (data.team == 'T') {
                if (data.animationDir == "l") {
                    data.SpriteAct = (data.tNum == 1)? TLeftAnim1 : TLeftAnim2;
                }
                else if (data.animationDir == "u") {
                    data.SpriteAct = (data.tNum == 1)? TUpAnim1 : TUpAnim2;
                }
                else if (data.animationDir == "d") {
                    data.SpriteAct = (data.tNum == 1)? TDownAnim1 : TDownAnim2;
                }
                else if (data.animationDir == "r") {
                    data.SpriteAct = (data.tNum == 1)? TRightAnim1 : TRightAnim2;
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
            data.SpriteAct.x = data.thisxpos;
            data.SpriteAct.y = data.thisypos;
            data.SpriteAct.visible = true;
        }
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

    var imCaptured = function(data){
        if (data.inPrision && (data.identificacion == model.identificacion) && !model.inPrision){
            model.thisxpos = data.thisxpos;
            model.thisypos = data.thisypos;
            model.inPrision = data.inPrision;
            model.animationType = data.animationType;
            model.animatioDir = data.animationDir;
            model.thisvx = 0;
            model.thisvy = 0;
            currentArea = Prision;
        }        
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
            stompClient.subscribe('/topic/captured.'+lobby, function (data) {
                imCaptured(JSON.parse(data.body));
            });
            
            RestControllerModule.getPlayerId(sala,nickname);
            RestControllerModule.getPlayerTeam(sala,nickname);
            
            setupPixiApp(lobby);
            
        });
       
    };
    
    var joinMyTeam = function(myTeam){
        model.team = myTeam;
    };

    return {
        playing: playing,
        creatingPosition: creatingPosition,
        joinMyTeam: joinMyTeam

    }})();
