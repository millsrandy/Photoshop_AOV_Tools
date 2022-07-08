//Main AOV layer shuffle

function psAOVsMain {

    #target photoshop

    app.displayDialogs = DialogModes.NO;


    var layers = app.activeDocument.layers;
    var layersArray = [];
    var rgba = ["RGBA"];
    var alpha = ["alpha.REDGREENBLUE"];
    var diffuse = ["diffuse.REDGREENBLUE"];
    var direct = ["direct.REDGREENBLUE"];
    var indirect = ["indirect.REDGREENBLUE"];
    var specular = ["specular.REDGREENBLUE"];
    var sss = ["sss.REDGREENBLUE"];
    var len = layers.length;
    var topLayerArray = [];
    //var quadCrown = ["QuadCrown.REDGREENBLUE"];

    rgbaLayer();

    moveMatteLayers();

    aovLayersAdd(sss, 4);
    aovLayersAdd(specular, 10);
    aovLayersAdd(indirect, 4);
    aovLayersAdd(direct, 2);
    aovLayersAdd(diffuse, 2);

    backgroundFill(184, 139, 105);

    collectAllLayers("v001");

    /*     var quadCrown = selectLayerByName("QuadCrown.REDGREENBLUE");
        quadCrown.visible = false;
        var quadModel = selectLayerByName("QuadModel.REDGREENBLUE");
        quadModel.visible = false;
        var shadowCatcher = selectLayerByName("ShadowCatcher.REDGREENBLUE");
        shadowCatcher.visible = false;
        var alphaVis = selectLayerByName("alpha.REDGREENBLUE");
        alphaVis.visible = false;
     */
    //savePSB(activeDocument.path);



    // select layer by name
    function selectLayerByName(name) {
        function cTID(s) { return app.charIDToTypeID(s); };
        function sTID(s) { return app.stringIDToTypeID(s); };

        var desc14 = new ActionDescriptor();
        var ref4 = new ActionReference();
        ref4.putName(cTID('Lyr '), name);
        desc14.putReference(cTID('null'), ref4);
        desc14.putBoolean(cTID('MkVs'), false);
        executeAction(cTID('slct'), desc14, DialogModes.NO);

        if (app.activeDocument.activeLayer.name == name) {
            return app.activeDocument.activeLayer;
        }
        else {
            return null;
        }
    }

    // select RGBA layer and move to end of stack, duplicate and rename duplicate to "RGBA Shadow"
    function rgbaLayer() {
        var rgba = selectLayerByName("RGBA");
        if (rgba) {
            rgba.move(app.activeDocument, ElementPlacement.PLACEATEND);
            var rgbaShadow = rgba.duplicate(rgba, ElementPlacement.PLACEAFTER);
            rgbaShadow.opacity = 80;
            rgbaShadow.name = "RGBA Shadow";
        }
        else {
            return null;
        }
    }

    // select top layer (matte) and move to bottom until top layer is "alpha" then move alpha layer to bottom and disable visibility
    function moveMatteLayers() {

        for (i = 0; i < len; i++) {
            var topLayer = app.activeDocument.activeLayer = app.activeDocument.layers[0];
            if (topLayer != activeDocument.artLayers.getByName("alpha.REDGREENBLUE")) {
                selectSubject();
                addSubjectMask();
                topLayerArray.push(layers[i]);
                topLayer.visible = false;
                topLayer.move(app.activeDocument, ElementPlacement.PLACEATEND);
            }
            else if (topLayer == activeDocument.artLayers.getByName("alpha.REDGREENBLUE")) {
                topLayer.visible = false;
                topLayer.move(app.activeDocument, ElementPlacement.PLACEATEND);
                break;
            }
        }
    }

    // select aov layer by name and change blendmode and opacity
    function aovLayersAdd(name, opacity) {
        for (i = 0; i < len; i++) {
            var layerName = app.activeDocument.layers[i].name;
            if (layerName == name) {
                var layerName = selectLayerByName(layerName);
                layerName.blendMode = BlendMode.LINEARDODGE;
                layerName.opacity = opacity;
                layerName.blendmode;
                layerName.duplicate(layers[5], ElementPlacement.PLACEBEFORE);
            }
            else {
            }
        }
    }

    // select subject
    function selectSubject() {
        var desc1 = new ActionDescriptor();
        desc1.putBoolean(stringIDToTypeID("sampleAllLayers"), false);
        executeAction(stringIDToTypeID('autoCutout'), desc1, DialogModes.NO);
    }

    // add a mask from the selectSubject mask
    function addSubjectMask() {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        descriptor.putClass(s2t("new"), s2t("channel"));
        reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"));
        descriptor.putReference(s2t("at"), reference);
        descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealSelection"));
        executeAction(s2t("make"), descriptor, DialogModes.NO);
    }

    // check if there is a BG layer, if not create one and fill with color
    function backgroundFill(R, G, B) {
        var bgLayer = app.activeDocument.artLayers.add();
        bgLayer.isBackgroundLayer = true;
        bgLayer = selectLayerByName("Background");
        var bgColor = new SolidColor();
        bgColor.rgb.red = R;
        bgColor.rgb.green = G;
        bgColor.rgb.blue = B;
        activeDocument.selection.fill(bgColor);
        //R=184
        //G=139
        //B=105
    }

    // save file as PSB
    function savePSB(saveFile) {

        var desc1 = new ActionDescriptor();
        var desc2 = new ActionDescriptor();

        desc2.putBoolean(stringIDToTypeID('maximizeCompatibility'), true);
        desc1.putObject(charIDToTypeID('As  '), charIDToTypeID('Pht8'), desc2);
        desc1.putPath(charIDToTypeID('In  '), new File(saveFile));
        desc1.putBoolean(charIDToTypeID('LwCs'), true);
        executeAction(charIDToTypeID('save'), desc1, DialogModes.NO);
    }

    // create layerset and put all artlayers into it except background layer
    function collectAllLayers(name) {
        var layerSet = app.activeDocument.layerSets.add();
        layerSet.name = name;
        layerSet.move(selectLayerByName("Background"), ElementPlacement.PLACEBEFORE);

        for (i = 0; i < len + 999; i++) {
            var topLayerCollect = app.activeDocument.activeLayer = app.activeDocument.layers[0];
            var topLayerType = topLayerCollect.typename;
            var layerSetType = app.activeDocument.layerSets.typename;
            if (topLayerType != layerSetType) {
                topLayerCollect.move(layerSet, ElementPlacement.PLACEATEND);
                layerVisByName(app.activeDocument, "QuadCrown.REDGREENBLUE");
            }
            else {
            }
        }
    }

    // select only matte layers and turn off visiblity after they have been collected into layerSet
    function layerVisByName(layerSet, name) {
        var recurse = true;
        var multi = true;
        var cnt = 0;
        while (true) {
            try {
                var layer = layerSet.artLayers.getByName(name);
            }
            catch (e) {
                break;
            }
            layer.visibility ^= 1;
            cnt++;
            if (!multi) {
                break;
            }
        }
        if (!multi && cnt != 0) {
            return;
        }
        if (recurse) {
            var sets = layerSet.layerSets;
            var len = sets.length;
            for (var i = 0; i < len; i++) {
                layerVisByName(sets, name);
            }
        }
    };
}