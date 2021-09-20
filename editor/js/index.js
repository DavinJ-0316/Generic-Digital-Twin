let holtWinters = getAugumentedDataset;

window.URL = window.URL || window.webkitURL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

Number.prototype.format = function() {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

//

var editor = new Editor();

let scene = editor.scene;

var viewport = new Viewport(editor);
document.body.appendChild(viewport.dom);

var script = new Script(editor);
document.body.appendChild(script.dom);

var player = new Player(editor);
document.body.appendChild(player.dom);

var toolbar = new Toolbar(editor);
document.body.appendChild(toolbar.dom);

var menubar = new Menubar(editor, viewport);
document.body.appendChild(menubar.dom);

var sidebar = new Sidebar(editor);
document.body.appendChild(sidebar.dom);

var modal = new UI.Modal();
document.body.appendChild(modal.dom);

//

editor.setTheme(editor.config.getKey('theme'));

editor.storage.init(function() {

    editor.storage.get(function(state) {

        if (isLoadingFromHash) return;

        if (state !== undefined) {

            editor.fromJSON(state);

        }

        var selected = editor.config.getKey('selected');

        if (selected !== undefined) {

            editor.selectByUuid(selected);

        }

    });

    //

    var timeout;

    function saveState(scene) {

        if (editor.config.getKey('autosave') === false) {

            return;

        }

        clearTimeout(timeout);

        timeout = setTimeout(function() {

            editor.signals.savingStarted.dispatch();

            timeout = setTimeout(function() {

                editor.storage.set(editor.toJSON());

                editor.signals.savingFinished.dispatch();

            }, 100);

        }, 1000);

    };

    var signals = editor.signals;

    signals.geometryChanged.add(saveState);
    signals.objectAdded.add(saveState);
    signals.objectChanged.add(saveState);
    signals.objectRemoved.add(saveState);
    signals.materialChanged.add(saveState);
    signals.sceneBackgroundChanged.add(saveState);
    signals.sceneFogChanged.add(saveState);
    signals.sceneGraphChanged.add(saveState);
    signals.scriptChanged.add(saveState);
    signals.historyChanged.add(saveState);

    signals.showModal.add(function(content) {

        modal.show(content);

    });

});

//

document.addEventListener('dragover', function(event) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

}, false);

document.addEventListener('drop', function(event) {

    event.preventDefault();

    if (event.dataTransfer.files.length > 0) {

        editor.loader.loadFile(event.dataTransfer.files[0]);

    }

}, false);

function onWindowResize(event) {

    editor.signals.windowResize.dispatch();

}

window.addEventListener('resize', onWindowResize, false);

onWindowResize();

//

var isLoadingFromHash = false;
var hash = window.location.hash;

if (hash.substr(1, 5) === 'file=') {

    var file = hash.substr(6);

    if (confirm('Any unsaved data will be lost. Are you sure?')) {

        var loader = new THREE.FileLoader();
        loader.crossOrigin = '';
        loader.load(file, function(text) {

            editor.clear();
            editor.fromJSON(JSON.parse(text));

        });

        isLoadingFromHash = true;

    }

}

/*
			window.addEventListener( 'message', function ( event ) {

				editor.clear();
				editor.fromJSON( event.data );

			}, false );
			*/

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

let currentD = null;
let lightScale = null;
let tempScale = null;
let numScale = null;

let pointTime = {
    on: null
};





/*const sensorSetting = [
    // './data/sensorSetting/sensorSetting1.json',
    // './data/sensorSetting/sensorSetting2.json',
    './data/sensorSetting/sensorSetting3.json',
    // './data/sensorSetting/sensorSetting4.json',
    // './data/sensorSetting/sensorSetting5.json',
    // '/data/sensorSetting/sensorSetting6.json',
    // './data/sensorSetting/sensorSetting7.json',
    // './data/sensorSetting/sensorSetting8.json',
    // './data/sensorSetting/sensorSetting9.json',
];*/


let currentIdx = null;

let opacityMeshs = [];
let hidMeshs = [];





/*let data = [
    {
        name: 'Entrance',
        innerRoomName: 'Entrance'
    },
    {
        name: 'null',
        innerRoomName: 'Anyname'
    },
    {
        name: 'Staff Room V-111',
        innerRoomName: 'V-111',
    },
    {
        name: 'Staff Room V-110',
        innerRoomName: 'V-110',
    },
    {
        name: 'Staff Room V-154',
        innerRoomName: 'V-154',
    },
    {
        name: 'Staff Room V-159',
        innerRoomName: 'V-159',
    },
    {
        name: 'Staff Common Room V-131',
        innerRoomName: 'V-131',
    }
];*/

Promise.all(['./data/sensorSetting/getAllSettings.json','./data/sensorSetting/getDataSettings.json'].map(url => d3.json(url)))
    .then(([sensorSetting, data])=>{
        console.log(sensorSetting, data);
        Promise.all(sensorSetting.map(url => d3.json(url)))
            .then(datas => {

                d3.json('./data/userSetting/user.json')
                    .then(user => {
                        let forecast_len_ratio = getQueryVariable("forecast_len_ratio") || user.forecast_len_ratio || 0.2;
                        /*let token = getQueryVariable("forecast_len_ratio") || user.token;
                        if (token !== 'ok') {
                            console.log('token is wrong!');
                            return;
                        }*/
                        let algorithm = 'holtWinters';

                        function lightRoom(lightItem) {
                            let rooms = lightItem.room.split(",");
                            rooms.filter(r => !user.room.includes(r)).forEach(room => {
                                let d = data.find(d => d.name === room);
                                // let hidMesh = scene.models.getObjectByName(d.innerRoomName);
                                let hidMesh = scene.getObjectByName(d.innerRoomName);

                                if (hidMesh) {

                                    let c = lightScale(lightItem.value);
                                    hidMeshs.push(hidMesh);
                                    // console.log('--', d.innerRoomName, hidMesh, c)
                                    let mat = new THREE.MeshPhongMaterial({ color: "#00FF00" });
                                    mat.color = new THREE.Color(c);
                                    // mat.transparent = true;
                                    // mat.opacity = 0.2;

                                    hidMesh.material = mat;

                                    viewport.render();

                                }

                            })

                        }

                        function tempRoom(lightItem) {
                            let rooms = lightItem.room.split(",");
                            //console.log('rooms',rooms);
                            rooms.filter(r => !user.room.includes(r)).forEach(room => {
                                let d = data.find(d => d.name === room);
                                //let hidMesh = scene.models.getObjectByName(d.innerRoomName);
                                let hidMesh = scene.getObjectByName(d.innerRoomName);

                                if (hidMesh) {
                                    let c = tempScale(lightItem.value);
                                    hidMeshs.push(hidMesh);
                                    // console.log('--', d.innerRoomName, hidMesh, c)

                                    /*hidMesh.material.color = new THREE.Color( c );
                                    hidMesh.material.transparent = true;
                                    hidMesh.material.opacity = 0.5;*/

                                    let mat = new THREE.MeshPhongMaterial({ color: "#00FF00" });
                                    mat.color = new THREE.Color(c);
                                    // mat.transparent = true;
                                    // mat.opacity = 0.2;

                                    hidMesh.material = mat;
                                    viewport.render();
                                }
                                /*let c = tempScale(lightItem.value);
                                hidMeshs.push(...hidMesh);

                                hidMesh.forEach(m=>{

                                    m.material.color = new THREE.Color( c );
                                    m.material.transparent = true;
                                    m.material.opacity = 0.5
                                });*/
                            })


                        }

                        let group_116 = new THREE.Group();
                        scene.add(group_116);

                        function genPeople(item) {
                            let rooms = item.room.split(",");
                            scene.remove(group_116);
                            group_116 = new THREE.Group();
                            scene.add(group_116);
                            rooms.forEach(room => {
                                let d = data.find(d => d.name === room);
                                let hidMesh = scene.getObjectByName(d.innerRoomName);
                                // let hidMesh = scene.models.getObjectByName(d.innerRoomName);
                                if (hidMesh) {
                                    let box = new THREE.Box3();
                                    box.expandByObject(hidMesh);
                                    let sphere = new THREE.Sphere();
                                    box.getBoundingSphere(sphere);
                                    let center = sphere.center;

                                    /*let box2 = new THREE.Box3();
                                    let cubeMesh = scene.models.getObjectByName(d.cube);
                                    box2.expandByObject(cubeMesh[0]);
                                    let sphere2 = box2.getBoundingSphere();*/

                                    let num = item.value;
                                    let r = sphere.radius * 2;

                                    for (let i = 0; i < num; i++) {
                                        let shpereGeom = new THREE.IcosahedronBufferGeometry(r, 4);
                                        let mat = new THREE.MeshPhongMaterial({ color: "#00FF00" });
                                        let mesh = new THREE.Mesh(shpereGeom, mat);
                                        mesh.position.set(center.x * (i + 1), center.y, center.z);
                                        // console.log(mesh);
                                        group_116.add(mesh);

                                    }
                                }



                            })

                        }




                        for (let i = 1; i < data.length; i++) {
                            let obj = data[i];
                            let targets = datas.filter(d => d.sensor === obj.name);
                            // console.log(targets);
                            targets.forEach(target => {
                                let type = target.type;
                                obj[type] = target.chart;
                            });

                        }

                        let cube = data.map(d => d.cube).filter(d => !!d);
                        let innerRoomNames = data.map(d => d.innerRoomName).filter(d => !!d);



                        Promise.all(datas.map(data => d3.json(data.url)))
                            //Promise.all(datas.map(data => d3.json(data)))
                            .then(
                                jsons => {
                                    // jsons.forEach((json, idx) => {
                                    //     var predictionLength = Math.ceil(json.feeds.length * forecast_len_ratio);
                                    //     var forecast_time = holtWinters(json.feeds.map(feed => new Date(feed.created_at).getTime()), predictionLength);

                                    //     let values = json.feeds.map(feed => (Object.keys(feed).includes('field2') ? +feed.field2 : +feed.field1) || 0);
                                    //     if (values.filter(v => v === 0).length < 40) {
                                    //         var forecast_value = [];
                                    //         // console.log('json.feeds.map(feed=>(Object.keys(feed).includes(\'field2\')? +feed.field2: +feed.field1) || 0)', json.feeds.map(feed => (Object.keys(feed).includes('field2') ? +feed.field2 : +feed.field1) || 0));
                                    //         forecast_value = holtWinters(values, predictionLength);
                                    //         for (let i = json.feeds.length + 1; i < forecast_time.augumentedDataset.length; i++) {
                                    //             json.feeds.push({ created_at: forecast_time.augumentedDataset[i], field2: Math.ceil(forecast_value.augumentedDataset[i]) })
                                    //         }
                                    //     } else {
                                    //         for (let i = json.feeds.length + 1; i < forecast_time.augumentedDataset.length; i++) {
                                    //             json.feeds.push({ created_at: forecast_time.augumentedDataset[i], field2: 0 })
                                    //         }
                                    //     }
                                    // });


                                    let data = {};
                                    let times = [];

                                    let lights = [];
                                    let temps = [];
                                    let nums = [];

                                    jsons.forEach((json, idx) => {
                                        json.feeds.forEach(feed => {
                                            let time = new Date(feed.created_at);
                                            let has = times.find(t => t - time === 0);
                                            if (!has) {
                                                times.push(time);
                                            }
                                            let value = Object.keys(feed).includes('field2') ? +feed.field2 : +feed.field1;
                                            if (Number.isNaN(value)) {
                                                value = 0;
                                            }
                                            let type = datas[idx].type,
                                                room = datas[idx].sensor;

                                            if (has) {
                                                data[time.toString()].push({ type, room, value })
                                            } else {
                                                data[time.toString()] = [{ type, room, value }]
                                            }

                                            switch (type) {
                                                case 'light':
                                                    lights.push(value);
                                                    break;
                                                case 'temp':
                                                    temps.push(value);
                                                    break;
                                                case 'nums':
                                                    nums.push(value);
                                                    break;
                                            }
                                        });
                                    });


                                    times.sort((a, b) => a - b);

                                    let x = d3.scaleTime().domain(d3.extent(times)).range([0, 1000]);
                                    //let x = d3.scaleTime().domain(d3.extent(times)).nice().range([0,1000]);
                                    lightScale = d3.scaleLinear().domain(d3.extent(lights)).range(['#262626', '#FFFFFF']);
                                    tempScale = d3.scaleLinear().domain(d3.extent(temps)).range(['#00B0F0', '#FF0000']);

                                    let svg = d3.select('svg');

                                    let axis = d3.axisBottom(x);

                                    let g = svg.append('g')
                                        .style('transform', 'translate(0px, 77px)')
                                        .call(axis);

                                    let forecast_len = 1000 * forecast_len_ratio;
                                    let prediction_line = g.append('g');
                                    prediction_line.append('line')
                                        .attr('x1', 1000 - forecast_len)
                                        .attr('y1', 3)
                                        .attr('x2', 1000)
                                        .attr('y2', 3)
                                        .style('stroke', 'red')
                                        .style('stroke-dasharray', '5,5')

                                        .style('stroke-width', 2);
                                    prediction_line.append('text')
                                        .attr('x', 1000 - forecast_len / 2)
                                        .attr('y', -7)
                                        .html('Prediction')
                                        .style('fill', 'red')
                                        .style('font-size', 19);

                                    let brush = d3.brushX()
                                        .extent([
                                            [0, -10],
                                            [1000, 20]
                                        ])
                                        .on('brush', brushed);

                                    function brushed({ selection }) {
                                        if (selection) {
                                            let num = selection[0];
                                            let time = x.invert(num);

                                            let deltas = times.map(t => ({ time: t, delta: Math.abs(t - time) }));
                                            deltas.sort((a, b) => a.delta - b.delta);
                                            currentD = data[deltas[0].time.toString()];


                                            let lightItems = currentD.filter(d => d.type === 'light');
                                            lightItems.forEach(item => lightRoom(item));

                                            let tempItems = currentD.filter(d => d.type === 'temp');
                                            tempItems.forEach(item => tempRoom(item));

                                            /*let numItems = currentD.filter(d=>d.type === 'nums');
                                            numItems.forEach(item=>genPeople(item));*/


                                        }
                                    }
                                    const defaultSelection = [x(times[0]), x(times[1])];
                                    g.call(brush)
                                        .call(brush.move, defaultSelection);

                                    d3.select('.domain').style('stroke', 'none');
                                    d3.selectAll('.tick text').style('fill', '#fff');
                                    d3.select("#loading").style('display', 'none');
                                }
                            );
                    });
            });
    });




// d3.json('https://api.jsonbin.io/b/6077e3125b165e19f620818e/3')
// d3.json('https://api.jsonbin.io/b/6077e3125b165e19f620818e/4')
// .then(data=>{
//     console.log(data);


//     let keys = Object.keys(data);
//     console.log(keys);

//     let values = Object.values(data);
//     console.log(values);

//     for(let i =0; i < keys.length; i++) {
//         let key = [];
//         key.push(`${keys[i]}`);
//         console.log(key);

//         let value = [];
//         value.push(`${values[i]}`);
//         console.log(value);


//         let sels = d3.select("#charts").selectAll('iframe')
//             .data(key);

//         console.log(sels);

//         sels.enter()
//             .append('iframe')
//             .attr('width','500px')
//             .attr('height','270px')
//             // .attr('src', d=>data[d]);
//             .attr('src',value)
//     }


// })
