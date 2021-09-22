Menubar.File = function(editor) {

    var NUMBER_PRECISION = 6;

    function parseNumber(key, value) {

        return typeof value === 'number' ? parseFloat(value.toFixed(NUMBER_PRECISION)) : value;

    }

    //

    var config = editor.config;

    var container = new UI.Panel();
    container.setClass('menu');

    var title = new UI.Panel();
    title.setClass('title');
    title.setTextContent('File');
    container.add(title);

    var options = new UI.Panel();
    options.setClass('options');
    container.add(options);

    // New

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Refresh');
    option.onClick(function() {

     

            location.reload();
            editor.clear();
         

   

    });
    options.add(option);

    //

    options.add(new UI.HorizontalRule());


    // Import
    // var form = document.createElement('form');
    // form.style.display = 'none';
    // document.body.appendChild(form);

    // var fileInput = document.createElement('input');
    // fileInput.type = 'file';
    // fileInput.addEventListener('change', function(event) {

    //     editor.loader.loadFile(fileInput.files[0]);
    //     form.reset();

    // });
    // form.appendChild(fileInput);

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Import');
    // option.onClick(function() {

    //     fileInput.click();

    // });
    // options.add(option);



    // Import
    // var form = document.createElement('form');
    // form.style.display = 'none';
    // document.body.appendChild(form);

    // var fileInput = document.createElement('input');
    // fileInput.type = 'file';
    // fileInput.addEventListener('change', function(event) {

    //     editor.loader.loadFile(fileInput.files[0]);
    //     form.reset();

    // });
    // form.appendChild(fileInput);

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Import');
    // option.onClick(function() {

    //     //fileInput.click();
    //     editor.loader.loadFile("../json/teapot.obj");

    // });
    // options.add(option);

    // Import

    var form = document.createElement('form');
    form.style.display = 'none';
    document.body.appendChild(form);

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function(event) {

        editor.loader.loadFile(fileInput.files[0]);
        form.reset();

    });
    form.appendChild(fileInput);

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Smart Building*');
    option.onClick(function() {

         if (confirm('Make sure you click the Refresh button to clear the content before changing to Smart Farm or Crab Camera')) {


        //fileInput.click();
        // editor.loader.loadFile("../json/teapot.obj");
        // editor.loader.loadFile("http://127.0.0.1:5000/json/teapot.obj");
        // editor.loader.loadFile("http://127.0.0.1:5000/json/scene.json");
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/6059e4235a5a1440bbd19445", true);
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/60650dda418f307e25866a77", true);
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/608107b79a9aa9333354c332", true);
        editor.clear();
       
        editor.loader.myLoadFile("https://api.jsonbin.io/b/6147e7939548541c29b5249d/1", true);

     
        }
  
    });
    options.add(option);

    //my import
    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('MyImport');
    // option.onClick(function() {

    //     //fileInput.click();
    //     //console.log("loading")
    //editor.loader.myLoadFile("https://api.jsonbin.io/b/6059e4235a5a1440bbd19445",true);
    //     // editor.loader.myLoadFile("http://127.0.0.1:5000/json/scene.json");
    //     editor.loader.myLoadFile("https://groups.csail.mit.edu/graphics/classes/6.837/F03/models/teapot.obj");
    //     editor.loader.myLoadFile("http://groups.csail.mit.edu/graphics/classes/6.837/F03/models/teapot.obj");

    // });
    // options.add(option);


    //

    options.add(new UI.HorizontalRule());


    var form = document.createElement('form');
    form.style.display = 'none';
    document.body.appendChild(form);

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function(event) {

        editor.loader.loadFile(fileInput.files[0]);
        form.reset();

    });
    form.appendChild(fileInput);

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Smart Farm*');
    option.onClick(function() {

           
        if (confirm('Make sure you click the Refresh button to clear the content before changing to Smart Building or Crab Camera')) {
    
    
        //fileInput.click();
        // editor.loader.loadFile("../json/teapot.obj");
        // editor.loader.loadFile("http://127.0.0.1:5000/json/teapot.obj");
        // editor.loader.loadFile("http://127.0.0.1:5000/json/scene.json");
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/6059e4235a5a1440bbd19445", true);
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/60650dda418f307e25866a77", true);
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/608107b79a9aa9333354c332", true);
       
        editor.clear();
       
        editor.loader.myLoadFile("https://api.jsonbin.io/b/61480715aa02be1d444b7551/1", true);


         }
      
    });
    options.add(option);

    options.add(new UI.HorizontalRule());


    var form = document.createElement('form');
    form.style.display = 'none';
    document.body.appendChild(form);

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function(event) {

        editor.loader.loadFile(fileInput.files[0]);
        form.reset();

    });
    form.appendChild(fileInput);

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Crab Camera');
    option.onClick(function() {

        //fileInput.click();
        // editor.loader.loadFile("../json/teapot.obj");
        // editor.loader.loadFile("http://127.0.0.1:5000/json/teapot.obj");
        // editor.loader.loadFile("http://127.0.0.1:5000/json/scene.json");
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/6059e4235a5a1440bbd19445", true);
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/60650dda418f307e25866a77", true);
        // editor.loader.myLoadFile("https://api.jsonbin.io/b/608107b79a9aa9333354c332", true);
        editor.clear();
      
        editor.loader.myLoadFile("https://api.jsonbin.io/b/61481817aa02be1d444b7a10", true);
   


    });
    options.add(option);

    options.add(new UI.HorizontalRule());

    // Export Geometry

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Export Geometry');
    // option.onClick(function() {

    //     var object = editor.selected;

    //     if (object === null) {

    //         alert('No object selected.');
    //         return;

    //     }

    //     var geometry = object.geometry;

    //     if (geometry === undefined) {

    //         alert('The selected object doesn\'t have geometry.');
    //         return;

    //     }

    //     var output = geometry.toJSON();

    //     try {

    //         output = JSON.stringify(output, parseNumber, '\t');
    //         output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

    //     } catch (e) {

    //         output = JSON.stringify(output);

    //     }

    //     saveString(output, 'geometry.json');

    // });
    // options.add(option);

    // Export Object

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Export Object');
    // option.onClick(function() {

    //     var object = editor.selected;

    //     if (object === null) {

    //         alert('No object selected');
    //         return;

    //     }

    //     var output = object.toJSON();

    //     try {

    //         output = JSON.stringify(output, parseNumber, '\t');
    //         output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

    //     } catch (e) {

    //         output = JSON.stringify(output);

    //     }

    //     saveString(output, 'model.json');

    // });
    // options.add(option);

    // Export Scene

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Export Scene');
    // option.onClick(function() {

    //     var output = editor.scene.toJSON();

    //     try {

    //         output = JSON.stringify(output, parseNumber, '\t');
    //         output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

    //     } catch (e) {

    //         output = JSON.stringify(output);

    //     }

    //     saveString(output, 'scene.json');

    // });
    // options.add(option);

    // //

    // options.add(new UI.HorizontalRule());

    // // Export GLB

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Export GLB');
    // option.onClick(function() {

    //     var exporter = new THREE.GLTFExporter();

    //     exporter.parse(editor.scene, function(result) {

    //         saveArrayBuffer(result, 'scene.glb');

    //         // forceIndices: true, forcePowerOfTwoTextures: true
    //         // to allow compatibility with facebook
    //     }, { binary: true, forceIndices: true, forcePowerOfTwoTextures: true });

    // });
    // options.add(option);

    // Export GLTF

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Export GLTF');
    // option.onClick(function() {

    //     var exporter = new THREE.GLTFExporter();

    //     exporter.parse(editor.scene, function(result) {

    //         saveString(JSON.stringify(result, null, 2), 'scene.gltf');

    //     });


    // });
    // options.add(option);

    // Export OBJ

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Export');
    // option.onClick(function() {

    //     var object = editor.selected;

    //     if (object === null) {

    //         alert('No object selected.');
    //         return;

    //     }

    //     var exporter = new THREE.OBJExporter();

    //     saveString(exporter.parse(object), 'model.obj');

    // });
    // options.add(option);

    // Export STL

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Export STL');
    // option.onClick(function() {

    //     var exporter = new THREE.STLExporter();

    //     saveString(exporter.parse(editor.scene), 'model.stl');

    // });
    // options.add(option);

    // //

    // options.add(new UI.HorizontalRule());

    // options.add(new UI.HorizontalRule());
    
    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('View Article');
    option.onClick(function() {

   
          window.open("https://link.springer.com/chapter/10.1007/978-3-030-82529-4_21", "_blank")

   

    });
    options.add(option);

    //

    options.add(new UI.HorizontalRule());


    // Publish

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }

    var username = getQueryVariable("username");

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Publish');
    option.onClick(function() {

        // var zip = new JSZip();

        //

        var output = editor.toJSON();
        output.metadata.type = 'App';
        delete output.history;

        var vr = output.project.vr;

        output = JSON.stringify(output, parseNumber, '\t');
        output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

        // zip.file('app.json', output);
        jsonName = `${username}.json` || "app.json";
        saveString(output, jsonName);
        //

        // var title = config.getKey('project/title');

        // var manager = new THREE.LoadingManager(function() {

        //     //save(zip.generate({ type: 'blob' }), (title !== '' ? title : 'untitled') + '.zip');

        //     var testing = new Blob({})

        // });

        // var loader = new THREE.FileLoader(manager);
        // loader.load('js/libs/app/index.html', function(content) {

        //     content = content.replace('<!-- title -->', title);

        // var includes = [];

        // if (vr) {

        //     includes.push('<script src="js/WebVR.js"></script>');

        // }

        // content = content.replace('<!-- includes -->', includes.join('\n\t\t'));

        // var editButton = '';

        // if (config.getKey('project/editable')) {

        //     editButton = [
        //         '',
        //         '			var button = document.createElement( \'a\' );',
        //         '			button.href = \'https://threejs.org/editor/#file=\' + location.href.split( \'/\' ).slice( 0, - 1 ).join( \'/\' ) + \'/app.json\';',
        //         '			button.style.cssText = \'position: absolute; bottom: 20px; right: 20px; padding: 12px 14px; color: #fff; border: 1px solid #fff; border-radius: 4px; text-decoration: none;\';',
        //         '			button.target = \'_blank\';',
        //         '			button.textContent = \'EDIT\';',
        //         '			document.body.appendChild( button );',
        //         ''
        //     ].join('\n');
        // }

        // content = content.replace('\n\t\t\t/* edit button */\n', editButton);

        // zip.file('index.html', content);

        // });
        // loader.load('js/libs/app.js', function(content) {

        //     zip.file('js/app.js', content);

        // });
        // loader.load('../build/three.min.js', function(content) {

        //     zip.file('js/three.min.js', content);

        // });

        // if (vr) {

        //     loader.load('../examples/js/vr/WebVR.js', function(content) {

        //         zip.file('js/WebVR.js', content);

        //     });

        // }

    });
    options.add(option);

    //

    var link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link); // Firefox workaround, see #6594

    function save(blob, filename) {

        link.href = URL.createObjectURL(blob);
        link.download = filename || 'data.json';
        link.click();

        // URL.revokeObjectURL( url ); breaks Firefox...

    }

    function saveArrayBuffer(buffer, filename) {

        save(new Blob([buffer], { type: 'application/octet-stream' }), filename);

    }

    function saveString(text, filename) {

        save(new Blob([text], { type: 'text/plain' }), filename);

    }

    return container;

};
