var Loader = function(editor) {


    var scope = this;
    var signals = editor.signals;

    this.texturePath = '';


    this.myLoadFile = function(file, isjson) {

        if (file.endsWith(".json") || isjson) {
            $.getJSON(file, function(data) {
                //console.log(file,data);


                // var dataj;
                // try {
                //     dataj = JSON.parse(data);
                // } catch (error) {
                //     alert(error);
                //     return;
                // }
                handleJSONText(data, file);
                console.log("loaded");
            });
        } else if (file.endsWith(".obj")) {

            $.ajax({
                type: 'GET',
                dataType: "obj",
                url: file,
                crossDomain: true,
                success: function(responseData, textStatus, jqXHR) {
                    console.log("in");
                    var data = (responseData['AuthenticateUserResult']);
                    console.log(data);
                },
                error: function(responseData, textStatus, errorThrown) {
                    alert('POST failed.');
                }
            });

            //NO WAY! cross region
            var objLoader = new THREE.OBJLoader();
            // var object = loader.parse(data);
            // editor.execute(new AddObjectCommand(object));

            objLoader.load(file, function(object) {

                var meshMaterial = new THREE.MeshBasicMaterial({ color: 0xeeefff });
                object.material = meshMaterial;
                editor.execute(new AddObjectCommand(object));

            });
        }


        return;
        var xhr = new XMLHttpRequest();
        xhr.open("get", file, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(xhr.responseText);

                if (file.endsWith(".json")) {

                    var data;
                    try {

                        data = JSON.parse(xhr.responseText);
                        console.log(data);

                    } catch (error) {

                        alert(error);
                        return;

                    }
                    handleJSONText(data, file);
                } else if (file.endsWith(".obj")) {
                    var objLoader = new THREE.OBJLoader();
                    objLoader.load(file, function(object) {

                        var meshMaterial = new THREE.MeshBasicMaterial({ color: 0xeeefff });
                        object.material = meshMaterial;
                        editor.execute(new AddObjectCommand(object));

                    });
                } else if (file.endsWith(".fbx")) {


                    var loader = new THREE.FBXLoader();
                    //var object = loader.parse(contents);
                    //editor.execute(new AddObjectCommand(object));

                    loader.load(file, function(object) {

                        var meshMaterial = new THREE.MeshBasicMaterial({ color: 0xeeefff });
                        object.material = meshMaterial;
                        editor.execute(new AddObjectCommand(object));

                    });
                }
            }
        }
        xhr.send(null)

        return;
    };

    this.loadFile = function(file) {

        $.getJSON(file, function(data) {
            console.log(data);
        });

        return;

        function fake_click(obj) {
            var ev = document.createEvent('MouseEvents');
            ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            obj.dispatchEvent(ev);
        }

        function export_raw(name, data) {
            var urlObject = window.URL || window.webkitURL || window;
            var export_blob = new Blob([data]);
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
            save_link.href = urlObject.createObjectURL(export_blob);
            save_link.download = name;
            fake_click(save_link);
        }

        var objdata;
        export_raw(file, objdata);

        console.log(objdata);

        return;

        var filename = file; //file.name;
        var extension = filename.split('.').pop().toLowerCase();

        //debug function[ignored]
        function downloadWithBlob(url) {
            fetch(url).then(res => res.blob().then(blob => {
                //  var a = document.createElement('a');
                //  var url = window.URL.createObjectURL(blob);
                //  var filename = 'scene.json';
                //  a.href = url;
                //  a.download = filename;
                //  a.click();
                //  window.URL.revokeObjectURL(url);
                console.log("downloaded", blob);

                var url = URL.createObjectURL(blob);

                var worker = new Worker(url);

                // worker.onmessage = function(event) {

                //     event.data.metadata = { version: 2 };
                //     handleJSON(event.data, file, filename);

                // };

                // worker.postMessage(Date.now());



            }));


        }

        //downloadWithBlob(filename); 
        var objLoader = new THREE.OBJLoader();
        objLoader.load(filename, function(object) {

            // object.position.y = 0;
            // object.rotation.y = 0.5;
            // object.scale.set(0.05, 0.05, 0.05);
            // scene.add(object);
            var meshMaterial = new THREE.MeshBasicMaterial({ color: 0xeeefff });
            object.material = meshMaterial;
            editor.execute(new AddObjectCommand(object));

        });
        return;

        var reader = new FileReader();
        reader.addEventListener('progress', function(event) {

            var size = '(' + Math.floor(event.total / 1000).format() + ' KB)';
            var progress = Math.floor((event.loaded / event.total) * 100) + '%';
            console.log('Loading', filename, size, progress);

        });

        switch (extension) {

            case '3ds':

                reader.addEventListener('load', function(event) {

                    var loader = new THREE.TDSLoader();
                    var object = loader.parse(event.target.result);

                    editor.execute(new AddObjectCommand(object));

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'amf':

                reader.addEventListener('load', function(event) {

                    var loader = new THREE.AMFLoader();
                    var amfobject = loader.parse(event.target.result);

                    editor.execute(new AddObjectCommand(amfobject));

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'awd':

                reader.addEventListener('load', function(event) {

                    var loader = new THREE.AWDLoader();
                    var scene = loader.parse(event.target.result);

                    editor.execute(new SetSceneCommand(scene));

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'babylon':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;
                    var json = JSON.parse(contents);

                    var loader = new THREE.BabylonLoader();
                    var scene = loader.parse(json);

                    editor.execute(new SetSceneCommand(scene));

                }, false);
                reader.readAsText(file);

                break;

            case 'babylonmeshdata':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;
                    var json = JSON.parse(contents);

                    var loader = new THREE.BabylonLoader();

                    var geometry = loader.parseGeometry(json);
                    var material = new THREE.MeshStandardMaterial();

                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.name = filename;

                    editor.execute(new AddObjectCommand(mesh));

                }, false);
                reader.readAsText(file);

                break;

            case 'ctm':

                reader.addEventListener('load', function(event) {

                    var data = new Uint8Array(event.target.result);

                    var stream = new CTM.Stream(data);
                    stream.offset = 0;

                    var loader = new THREE.CTMLoader();
                    loader.createModel(new CTM.File(stream), function(geometry) {

                        geometry.sourceType = "ctm";
                        geometry.sourceFile = file.name;

                        var material = new THREE.MeshStandardMaterial();

                        var mesh = new THREE.Mesh(geometry, material);
                        mesh.name = filename;

                        editor.execute(new AddObjectCommand(mesh));

                    });

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'dae':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var loader = new THREE.ColladaLoader();
                    var collada = loader.parse(contents);

                    collada.scene.name = filename;

                    editor.execute(new AddObjectCommand(collada.scene));

                }, false);
                reader.readAsText(file);

                break;

            case 'fbx':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var loader = new THREE.FBXLoader();
                    var object = loader.parse(contents);

                    editor.execute(new AddObjectCommand(object));

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'glb':
            case 'gltf':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;
                    var loader;

                    if (isGltf1(contents)) {

                        loader = new THREE.LegacyGLTFLoader();

                    } else {

                        loader = new THREE.GLTFLoader();

                    }

                    loader.parse(contents, '', function(result) {

                        result.scene.name = filename;
                        editor.execute(new AddObjectCommand(result.scene));

                    });

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'js':
            case 'json':

            case '3geo':
            case '3mat':
            case '3obj':
            case '3scn':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    // 2.0

                    if (contents.indexOf('postMessage') !== -1) {

                        var blob = new Blob([contents], { type: 'text/javascript' });
                        var url = URL.createObjectURL(blob);

                        var worker = new Worker(url);

                        worker.onmessage = function(event) {

                            event.data.metadata = { version: 2 };
                            handleJSON(event.data, file, filename);

                        };

                        worker.postMessage(Date.now());

                        return;

                    }

                    // >= 3.0

                    var data;

                    try {

                        data = JSON.parse(contents);

                    } catch (error) {

                        alert(error);
                        return;

                    }

                    handleJSON(data, file, filename);

                }, false);
                reader.readAsText(file);

                break;


            case 'kmz':

                reader.addEventListener('load', function(event) {

                    var loader = new THREE.KMZLoader();
                    var collada = loader.parse(event.target.result);

                    collada.scene.name = filename;

                    editor.execute(new AddObjectCommand(collada.scene));

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'md2':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var geometry = new THREE.MD2Loader().parse(contents);
                    var material = new THREE.MeshStandardMaterial({
                        morphTargets: true,
                        morphNormals: true
                    });

                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.mixer = new THREE.AnimationMixer(mesh);
                    mesh.name = filename;

                    editor.execute(new AddObjectCommand(mesh));

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'obj':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var object = new THREE.OBJLoader().parse(contents);
                    object.name = filename;

                    editor.execute(new AddObjectCommand(object));

                }, false);
                reader.readAsText(file);

                break;

            case 'playcanvas':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;
                    var json = JSON.parse(contents);

                    var loader = new THREE.PlayCanvasLoader();
                    var object = loader.parse(json);

                    editor.execute(new AddObjectCommand(object));

                }, false);
                reader.readAsText(file);

                break;

            case 'ply':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var geometry = new THREE.PLYLoader().parse(contents);
                    geometry.sourceType = "ply";
                    geometry.sourceFile = file.name;

                    var material = new THREE.MeshStandardMaterial();

                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.name = filename;

                    editor.execute(new AddObjectCommand(mesh));

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            case 'stl':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var geometry = new THREE.STLLoader().parse(contents);
                    geometry.sourceType = "stl";
                    geometry.sourceFile = file.name;

                    var material = new THREE.MeshStandardMaterial();

                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.name = filename;

                    editor.execute(new AddObjectCommand(mesh));

                }, false);

                if (reader.readAsBinaryString !== undefined) {

                    reader.readAsBinaryString(file);

                } else {

                    reader.readAsArrayBuffer(file);

                }

                break;

            case 'svg':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var loader = new THREE.SVGLoader();
                    var paths = loader.parse(contents);

                    //

                    var group = new THREE.Group();
                    group.scale.multiplyScalar(0.1);
                    group.scale.y *= -1;

                    for (var i = 0; i < paths.length; i++) {

                        var path = paths[i];

                        var material = new THREE.MeshBasicMaterial({
                            color: path.color,
                            depthWrite: false
                        });

                        var shapes = path.toShapes(true);

                        for (var j = 0; j < shapes.length; j++) {

                            var shape = shapes[j];

                            var geometry = new THREE.ShapeBufferGeometry(shape);
                            var mesh = new THREE.Mesh(geometry, material);

                            group.add(mesh);

                        }

                    }

                    editor.execute(new AddObjectCommand(group));

                }, false);
                reader.readAsText(file);

                break;

                /*
                case 'utf8':

                	reader.addEventListener( 'load', function ( event ) {

                		var contents = event.target.result;

                		var geometry = new THREE.UTF8Loader().parse( contents );
                		var material = new THREE.MeshLambertMaterial();

                		var mesh = new THREE.Mesh( geometry, material );

                		editor.execute( new AddObjectCommand( mesh ) );

                	}, false );
                	reader.readAsBinaryString( file );

                	break;
                */

            case 'vtk':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var geometry = new THREE.VTKLoader().parse(contents);
                    geometry.sourceType = "vtk";
                    geometry.sourceFile = file.name;

                    var material = new THREE.MeshStandardMaterial();

                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.name = filename;

                    editor.execute(new AddObjectCommand(mesh));

                }, false);
                reader.readAsText(file);

                break;

            case 'wrl':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var result = new THREE.VRMLLoader().parse(contents);

                    editor.execute(new SetSceneCommand(result));

                }, false);
                reader.readAsText(file);

                break;

            case 'zip':

                reader.addEventListener('load', function(event) {

                    var contents = event.target.result;

                    var zip = new JSZip(contents);

                    // BLOCKS

                    if (zip.files['model.obj'] && zip.files['materials.mtl']) {

                        var materials = new THREE.MTLLoader().parse(zip.file('materials.mtl').asText());
                        var object = new THREE.OBJLoader().setMaterials(materials).parse(zip.file('model.obj').asText());
                        editor.execute(new AddObjectCommand(object));

                    }

                }, false);
                reader.readAsBinaryString(file);

                break;

            default:

                alert('Unsupported file format (' + extension + ').');

                break;

        }

    };

    function handleJSON(data, file, filename) {

        if (data.metadata === undefined) { // 2.0

            data.metadata = { type: 'Geometry' };

        }

        if (data.metadata.type === undefined) { // 3.0

            data.metadata.type = 'Geometry';

        }

        if (data.metadata.formatVersion !== undefined) {

            data.metadata.version = data.metadata.formatVersion;

        }

        switch (data.metadata.type.toLowerCase()) {

            case 'buffergeometry':

                var loader = new THREE.BufferGeometryLoader();
                var result = loader.parse(data);

                var mesh = new THREE.Mesh(result);

                editor.execute(new AddObjectCommand(mesh));

                break;

            case 'geometry':

                var loader = new THREE.JSONLoader();
                loader.setTexturePath(scope.texturePath);

                var result = loader.parse(data);

                var geometry = result.geometry;
                var material;

                if (result.materials !== undefined) {

                    if (result.materials.length > 1) {

                        material = new THREE.MultiMaterial(result.materials);

                    } else {

                        material = result.materials[0];

                    }

                } else {

                    material = new THREE.MeshStandardMaterial();

                }

                geometry.sourceType = "ascii";
                geometry.sourceFile = file.name;

                var mesh;

                if (geometry.animation && geometry.animation.hierarchy) {

                    mesh = new THREE.SkinnedMesh(geometry, material);

                } else {

                    mesh = new THREE.Mesh(geometry, material);

                }

                mesh.name = filename;

                editor.execute(new AddObjectCommand(mesh));

                break;

            case 'object':

                var loader = new THREE.ObjectLoader();
                loader.setTexturePath(scope.texturePath);

                var result = loader.parse(data);

                if (result instanceof THREE.Scene) {

                    editor.execute(new SetSceneCommand(result));

                } else {

                    editor.execute(new AddObjectCommand(result));

                }

                break;

            case 'app':

                editor.fromJSON(data);

                break;

        }

    };


    function handleJSONText(data, filename) {

        if (data.metadata === undefined) { // 2.0

            data.metadata = { type: 'Geometry' };

        }

        if (data.metadata.type === undefined) { // 3.0

            data.metadata.type = 'Geometry';

        }

        if (data.metadata.formatVersion !== undefined) {

            data.metadata.version = data.metadata.formatVersion;

        }

        switch (data.metadata.type.toLowerCase()) {

            case 'buffergeometry':

                var loader = new THREE.BufferGeometryLoader();
                var result = loader.parse(data);

                var mesh = new THREE.Mesh(result);

                editor.execute(new AddObjectCommand(mesh));

                break;

            case 'geometry':

                var loader = new THREE.JSONLoader();
                loader.setTexturePath(scope.texturePath);

                var result = loader.parse(data);

                var geometry = result.geometry;
                var material;

                if (result.materials !== undefined) {

                    if (result.materials.length > 1) {

                        material = new THREE.MultiMaterial(result.materials);

                    } else {

                        material = result.materials[0];

                    }

                } else {

                    material = new THREE.MeshStandardMaterial();

                }

                geometry.sourceType = "ascii";
                geometry.sourceFile = filename;

                var mesh;

                if (geometry.animation && geometry.animation.hierarchy) {

                    mesh = new THREE.SkinnedMesh(geometry, material);

                } else {

                    mesh = new THREE.Mesh(geometry, material);

                }

                mesh.name = filename;

                editor.execute(new AddObjectCommand(mesh));

                break;

            case 'object':

                var loader = new THREE.ObjectLoader();
                loader.setTexturePath(scope.texturePath);

                var result = loader.parse(data);

                if (result instanceof THREE.Scene) {

                    editor.execute(new SetSceneCommand(result));

                } else {

                    editor.execute(new AddObjectCommand(result));

                }

                break;

            case 'app':

                editor.fromJSON(data);

                break;

        }

    };

    function isGltf1(contents) {

        var resultContent;

        if (typeof contents === 'string') {

            // contents is a JSON string
            resultContent = contents;

        } else {

            var magic = THREE.LoaderUtils.decodeText(new Uint8Array(contents, 0, 4));

            if (magic === 'glTF') {

                // contents is a .glb file; extract the version
                var version = new DataView(contents).getUint32(4, true);

                return version < 2;

            } else {

                // contents is a .gltf file
                resultContent = THREE.LoaderUtils.decodeText(new Uint8Array(contents));

            }

        }

        var json = JSON.parse(resultContent);

        return (json.asset != undefined && json.asset.version[0] < 2);

    }

};