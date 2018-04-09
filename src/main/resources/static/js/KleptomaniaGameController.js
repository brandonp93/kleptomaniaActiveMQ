var model = {
    thisxpos:0,
    thisypos:0,
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
    var PRStatic;
    var PRMove1;
    var PRMove2;
    var PLStatic;
    var PLMove1;
    var PLMove2;
    var PUStatic;
    var PUMove1;
    var PUMove2;
    var PDStatic;
    var PDMove1;
    var PDMove2;
    var TRStatic;
    var TRMove1;
    var TRMove2;
    var TLStatic;
    var TLMove1;
    var TLMove2;
    var TUStatic;
    var TUMove1;
    var TUMove2;
    var TDStatic;
    var TDMove1;
    var TDMove2;
    var Diamond;
    var Coin;
    var Gold;



    
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
                console.log(resources.spritesheet.textures);
                PRStatic = new Sprite(resources.spritesheet.textures["PRStatic.png"]);
                PRStatic.visible = false;
                app.stage.addChild(PRStatic);
                PRMove1 = new Sprite(resources.spritesheet.textures["PRMov1.png"]);
                PRMove1.visible = false;
                app.stage.addChild(PRMove1);
                PRMove2 = new Sprite(resources.spritesheet.textures["PRMov2.png"]);
                PRMove2.visible = false;
                app.stage.addChild(PRMove2);
                PLStatic = new Sprite(resources.spritesheet.textures["PLStatic.png"]);
                PLStatic.visible = false;
                app.stage.addChild(PLStatic);
                PLMove1 = new Sprite(resources.spritesheet.textures["PLMov1.png"]);
                PLMove1.visible = false;
                app.stage.addChild(PLMove1);
                PLMove2 = new Sprite(resources.spritesheet.textures["PLMov2.png"]);
                PLMove2.visible = false;
                app.stage.addChild(PLMove2);
                PUStatic = new Sprite(resources.spritesheet.textures["PUStatic.png"]);
                PUStatic.visible = false;
                app.stage.addChild(PUStatic);
                PUMove1 = new Sprite(resources.spritesheet.textures["PUMov1.png"]);
                PUMove1.visible = false;
                app.stage.addChild(PUMove1);
                PUMove2 = new Sprite(resources.spritesheet.textures["PUMov2.png"]);
                PUMove2.visible = false;
                app.stage.addChild(PUMove2);
                PDStatic = new Sprite(resources.spritesheet.textures["PDStatic.png"]);
                PDStatic.visible = false;
                app.stage.addChild(PDStatic);
                PDMove1 = new Sprite(resources.spritesheet.textures["PDMov1.png"]);
                PDMove1.visible = false;
                app.stage.addChild(PDMove1);
                PDMove2 = new Sprite(resources.spritesheet.textures["PDMov2.png"]);
                PDMove2.visible = false;
                app.stage.addChild(PDMove2);
                TRStatic = new Sprite(resources.spritesheet.textures["TRStatic.png"]);
                TRStatic.visible = false;
                app.stage.addChild(TRStatic);
                TRMove1 = new Sprite(resources.spritesheet.textures["TRMov1.png"]);
                TRMove1.visible = false;
                app.stage.addChild(TRMove1);
                TRMove2 = new Sprite(resources.spritesheet.textures["TRMov2.png"]);
                TRMove2.visible = false;
                app.stage.addChild(TRMove2);
                TLStatic = new Sprite(resources.spritesheet.textures["TLStatic.png"]);
                TLStatic.visible = false;
                app.stage.addChild(TLStatic);
                TLMove1 = new Sprite(resources.spritesheet.textures["TLMov1.png"]);
                TLMove1.visible = false;
                app.stage.addChild(TLMove1);
                TLMove2 = new Sprite(resources.spritesheet.textures["TLMov2.png"]);
                TLMove2.visible = false;
                app.stage.addChild(TLMove2);
                TUStatic = new Sprite(resources.spritesheet.textures["TUStatic.png"]);
                TUStatic.visible = false;
                app.stage.addChild(TUStatic);
                TUMove1 = new Sprite(resources.spritesheet.textures["TUMov1.png"]);
                TUMove1.visible = false;
                app.stage.addChild(TUMove1);
                TUMove2 = new Sprite(resources.spritesheet.textures["TUMov2.png"]);
                TUMove2.visible = false;
                app.stage.addChild(TUMove2);
                TDStatic = new Sprite(resources.spritesheet.textures["TDStatic.png"]);
                TDStatic.visible = false;
                app.stage.addChild(TDStatic);
                TDMove1 = new Sprite(resources.spritesheet.textures["TDMov1.png"]);
                TDMove1.visible = false;
                app.stage.addChild(TDMove1);
                TDMove2 = new Sprite(resources.spritesheet.textures["TDMov2.png"]);
                TDMove2.visible = false;
                app.stage.addChild(TDMove2);
                Diamond = new Sprite(resources.spritesheet.textures["Diamond.png"]);
                Diamond.visible = false;
                app.stage.addChild(Diamond);
                Coin = new Sprite(resources.spritesheet.textures["Coin.png"]);
                Coin.visible = false;
                app.stage.addChild(Coin);
                Gold = new Sprite(resources.spritesheet.textures["Gold.png"]);
                Gold.visible = false;
                app.stage.addChild(Gold);
            });
    };

    return {
        setupApp: setupPixiApp
    }
})();
GameModelModule.setupApp();