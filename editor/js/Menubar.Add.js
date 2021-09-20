Menubar.Add = function(editor) {

    var container = new UI.Panel();
    container.setClass('menu');

    var title = new UI.Panel();
    title.setClass('title');
    title.setTextContent('Add');
    container.add(title);

    var options = new UI.Panel();
    options.setClass('options');
    container.add(options);

    // Group

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('Group');
    // option.onClick(function() {

    //     var mesh = new THREE.Group();
    //     mesh.name = 'Group';

    //     editor.execute(new AddObjectCommand(mesh));

    // });
    // options.add(option);

    //

    // options.add(new UI.HorizontalRule());

    // Plane

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Plane');


    option.onClick(function() {

        // if (confirm('url')) {
            var geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
            var material = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide});
            var mesh = new THREE.Mesh(geometry, material);
            mesh.name = 'Plane';

            editor.execute(new AddObjectCommand(mesh));

        // }

    });
    options.add(option);

    // Cube

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Section');
    option.onClick(function() {

        var geometry = new THREE.BoxBufferGeometry(2, 0.1, 2, 1, 1, 1);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x00ffff, side: THREE.DoubleSide }));
        mesh.name = 'Box';

        editor.execute(new AddObjectCommand(mesh));

    });
    options.add(option);

    // Circle

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Vision');
    option.onClick(function() {

        var geometry = new THREE.CircleBufferGeometry(1, 32, 0, Math.PI * 2);
        // var geometry = new THREE.CylinderBufferGeometry(0.5, 0, 0.7, 32, 1, false, 0, Math.PI * 2);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.DoubleSide, opacity: 0.36, transparent: true }));
        mesh.name = 'Circle';
        //mesh.rotation.x = Math.PI / 2;

        editor.execute(new AddObjectCommand(mesh));

    });
    options.add(option);

    // Cylinder

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Sensor');
    option.onClick(function() {

        var geometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 0.7, 32, 1, false, 0, Math.PI * 2);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
        mesh.name = 'Cylinder';
        mesh.rotation.x = Math.PI / 2;

        editor.execute(new AddObjectCommand(mesh));

    });
    options.add(option);

    // Sphere

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Object');
    option.onClick(function() {

        var geometry = new THREE.SphereBufferGeometry(1, 8, 6, 0, Math.PI * 2, 0, Math.PI);
        //var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
        mesh.name = 'Sphere';

        editor.execute(new AddObjectCommand(mesh));

    });
    options.add(option);

    options.add(new UI.HorizontalRule());

    // PointLight

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('PointLight');
    // option.onClick(function() {

    //     var color = 0xffffff;
    //     var intensity = 1;
    //     var distance = 0;

    //     var light = new THREE.PointLight(color, intensity, distance);
    //     light.name = 'PointLight';

    //     editor.execute(new AddObjectCommand(light));

    // });
    // options.add(option);

    //SpotLight

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('SpotLight');
    // option.onClick(function() {

    //     var color = 0xffffff;
    //     var intensity = 1;
    //     var distance = 0;
    //     var angle = Math.PI * 0.1;
    //     var penumbra = 0;

    //     var light = new THREE.SpotLight(color, intensity, distance, angle, penumbra);
    //     light.name = 'SpotLight';
    //     light.target.name = 'SpotLight Target';

    //     light.position.set(5, 10, 7.5);

    //     editor.execute(new AddObjectCommand(light));

    // });
    // options.add(option);

    // DirectionalLight

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Light');
    option.onClick(function() {

        var color = 0xffffff;
        var intensity = 1;

        var light = new THREE.DirectionalLight(color, intensity);
        light.name = 'DirectionalLight';
        light.target.name = 'DirectionalLight Target';

        light.position.set(5, 10, 7.5);

        editor.execute(new AddObjectCommand(light));

    });
    options.add(option);


    // AmbientLight

    // var option = new UI.Row();
    // option.setClass('option');
    // option.setTextContent('AmbientLight');
    // option.onClick(function() {

    //     var color = 0x222222;

    //     var light = new THREE.AmbientLight(color);
    //     light.name = 'AmbientLight';

    //     editor.execute(new AddObjectCommand(light));

    // });
    // options.add(option);

    // //

    options.add(new UI.HorizontalRule());

    // PerspectiveCamera

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('PerspectiveCamera');
    option.onClick(function() {

        var camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
        camera.name = 'PerspectiveCamera';

        editor.execute(new AddObjectCommand(camera));

    });
    options.add(option);

    return container;

};