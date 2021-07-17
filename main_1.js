

// init
var light  = getLight(LightOption, 1)
// light position
light.position.y = 10;
light.position.x = 5;

//add light
// scene.add(plane)
light.add(sphere);
scene.add(light)
// scene.add(object)
gui.add(light,'intensity',0,10);
gui.add(light.position,'x',0,20);
gui.add(light.position,'y',0,20);
gui.add(light.position,'z',0,20);



function getLight(type, intensity) {
	var light
	// var segmentMultiplier = 1
	switch (type) {
		case 'PoinLight':
			object = new THREE.PointLight(0xffffff, intensity)
			break
		case 'DirectionalLight':
			object = new THREE.DirectionalLight(0xffffff, intensity)
			break
		case 'AmbientLight':
			object = new THREE.AmbientLight(0xffffff, intensity)
			break;
	}
    light.castShadow = true
    return light;
}