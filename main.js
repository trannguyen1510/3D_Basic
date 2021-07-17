<<<<<<< Updated upstream
function init(){
=======
function init (option) {
	// -------------- Init ------------------

	// Init global var
>>>>>>> Stashed changes
	var scene = new THREE.Scene()
	var gui = new dat.GUI()
	var clock = new THREE.Clock()

<<<<<<< Updated upstream
	var enableFog = true

	if (enableFog){
		scene.fog = new THREE.FogExp2(0xffffff, 0.01)
	}

	// var pointLight = getPointLight(1)
	// var spotLight = getSpotLight(1)
	var directionalLight = getDirectionalLight(1)
	// var ambientLight = getAmbientLight(5)

	var plane = getPlane(100)
	var sphere = getSphere(0.05)
	var boxGrid = getBoxGrid(20, 2.5)
	// var helper = new THREE.CameraHelper(directionalLight.shadow.camera)

	boxGrid.name = 'boxGrid'

	// wireframe = getBorder(box)
	
=======
	const constants = {
		side: {

			'THREE.FrontSide': THREE.FrontSide,
			'THREE.BackSide': THREE.BackSide,
			'THREE.DoubleSide': THREE.DoubleSide

		},
	} 

	// Init light
	// var directionalLight = getDirectionalLight(1)
	var ambientLight = getAmbientLight(2)
	var pointLight  = getPointLight(2)
	var spotLight  = getSpotLight(2)
	// Init plane
	var planeMaterial = getMaterial2('standard', 'rgb(200, 153, 153)')
	var plane = getPlane(planeMaterial, 40)

	// Init object
	var objectMaterial = getMaterial('standard', 'rgb(10, 133, 214)')
	var object = getObject(option, 2, objectMaterial)
	var sphere = getSphere(0.05)

	// Init helper
	// var helper = new THREE.CameraHelper(directionalLight.shadow.camera)
>>>>>>> Stashed changes

	plane.rotation.x = Math.PI/2
<<<<<<< Updated upstream
	// pointLight.position.y = 2
	// pointLight.intensity = 2
	// spotLight.position.y = 4
	// spotLight.intensity = 2
	directionalLight.position.x = 13
	directionalLight.position.y = 10
	directionalLight.position.z = 10
	directionalLight.intensity = 2

	// gui.add(pointLight, 'intensity', 0, 10)
	// gui.add(pointLight.position, 'y', 0, 5)
	// gui.add(spotLight, 'intensity', 0, 10)
	// gui.add(spotLight.position, 'x', 0, 20)
	// gui.add(spotLight.position, 'y', 0, 20)
	// gui.add(spotLight.position, 'z', 0, 20)
	// gui.add(spotLight, 'penumbra', 0, 1)
	// gui.add(directionalLight, 'intensity', 0, 10)
	// gui.add(directionalLight.position, 'x', 0, 20)
	// gui.add(directionalLight.position, 'y', 0, 20)
	// gui.add(directionalLight.position, 'z', 0, 20)

	// box.add(wireframe)
	// pointLight.add(sphere)
	// spotLight.add(sphere)
	directionalLight.add(sphere)

	scene.add(boxGrid)
	scene.add(plane)
	scene.add(directionalLight)
	// scene.add(helper)
	// scene.add(ambientLight)


=======
	// plane.position.y = -50

	// Sphere
	// sphere.position.y = sphere.geometry.parameters.radius
	object.position.x = 4;

	// Light
	pointLight.position.y = 10;
	pointLight.position.x = 5;

	// directionalLight.position.x = 13
	// directionalLight.position.y = 10
	// directionalLight.position.z = 10
	// directionalLight.intensity = 2

	// Texture



	// --------------- Add ----------------------------
	scene.add(plane)
	pointLight.add(sphere);
	scene.add(pointLight)
	console.log(pointLight)
	scene.add(object)
	// scene.add(helper)
	// ---------------- Camera ----------------------------
>>>>>>> Stashed changes
	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	)

<<<<<<< Updated upstream
	var cameraZRotation = new THREE.Group()
	var cameraYPosition = new THREE.Group()
	var cameraZPosition = new THREE.Group()
	var cameraXRotation = new THREE.Group()
	var cameraYRotation = new THREE.Group()

	cameraZRotation.name = 'cameraZRotation'
	cameraYPosition.name = 'cameraYPosition'
	cameraZPosition.name = 'cameraZPosition'
	cameraXRotation.name = 'cameraXRotation'
	cameraYRotation.name = 'cameraYRotation'

	cameraZRotation.add(camera)
	cameraYPosition.add(cameraZRotation)
	cameraZPosition.add(cameraYPosition)
	cameraXRotation.add(cameraZPosition)
	cameraYRotation.add(cameraXRotation)
	scene.add(cameraYRotation)

	zPosition = 100
	cameraYRotation.position.y = 1
	cameraZPosition.position.z = zPosition
	cameraXRotation.rotation.x = -Math.PI/2

	new TWEEN.Tween({val: 100})
		.to({val: -50}, 12000)
		.onUpdate(function() {
			cameraZPosition.position.z = this.val
		})
		.start()

	new TWEEN.Tween({val: -Math.PI/2})
		.to({val: 0}, 6000)
		.delay(1000)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function(){
			cameraXRotation.rotation.x = this.val
		})
		.start()

	new TWEEN.Tween({val: 0})
		.to({val: Math.PI/2}, 6000)
		.delay(1000)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function(){
			cameraYRotation.rotation.y = this.val
		})
		.start()

	gui.add(cameraXRotation.rotation, 'x', -Math.PI, Math.PI)
	gui.add(cameraYRotation.rotation, 'y', -Math.PI, Math.PI)
	gui.add(cameraZRotation.rotation, 'z', -Math.PI, Math.PI)
	gui.add(cameraZPosition.position, 'z', 0, zPosition)
	

	// var camera = new THREE.OrthographicCamera(
	// 	-15,  // left
	// 	15,   // right
	// 	15,   // top
	// 	-15,  // bottom
	// 	1,   // near plane
	// 	1000,  //far plane
	// )

	// camera.position.x = 1
	// camera.position.y = 2
	// camera.position.z = 5

	// camera.lookAt(new THREE.Vector3(0, 0, 0))
=======
	// gui
	gui.add(pointLight,'intensity',0,10);
	gui.add(pointLight.position,'x',0,10);
	gui.add(pointLight.position,'y',0,10);
	gui.add(pointLight.position,'z',0,10);




	camera.position.x = 5;
	camera.position.y = 10;
	camera.position.z = 10;

	camera.lookAt(new THREE.Vector3(0, 0, 0))

	// -------------- Callback -------------------------
>>>>>>> Stashed changes

	var renderer = new THREE.WebGLRenderer()
	renderer.shadowMap.enabled = true
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setClearColor("rgb(120, 120, 120)")
	document.getElementById("webgl").appendChild(renderer.domElement)
	renderer.render(scene, camera)

	var controls = new THREE.OrbitControls(camera, renderer.domElement)

	update(renderer, scene, camera, controls, clock)

	return scene
<<<<<<< Updated upstream
}

function getBox(w, h, d){
	var geometry = new THREE.BoxGeometry(w, h, d)
	var material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)"
	})
	var mesh = new THREE.Mesh(geometry, material)
	mesh.castShadow = true
=======
}	



// -------------- Get object --------------------
function getObject(type, size, material) {
	var object
	var segmentMultiplier = 1
	switch (type) {
		case 'box':
			object = new THREE.BoxGeometry(size, size, size)
			break
		case 'sphere':
			object = new THREE.SphereGeometry(size, 32*segmentMultiplier, 32*segmentMultiplier)
			break
		case 'cone':
			object = new THREE.ConeGeometry(size, size, 256*segmentMultiplier)
			break;
		case 'teapot':
			object = new THREE.TeapotGeometry(size, 10)
			break
		case 'car':
			object = createCar()

		default:
			break
	}
	var obj = new THREE.Mesh(object, material)
	obj.castShadow = true
	obj.name = type
	obj.position.set(0,size,0)
	return obj
}

function getMaterial(type, color){
	var selectedMaterial;
	var materialOptions = {
		color: color == undefined ? 'rgb(255, 255, 255)': color
	}
	switch(type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions)
			break
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions)
			break
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions)
			break
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions)
			break
		
	}

	return selectedMaterial
}

function getMaterial2(type, color){
	var selectedMaterial;
	console.log(color)
	var materialOptions = {
		color: color == undefined ? 'rgb(255, 255, 255)': color,
		side: THREE.DoubleSide
	}
	console.log(materialOptions)
	switch(type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions)
			break
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions)
			break
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions)
			break
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions)
			break
	}

	return selectedMaterial
}


// Get plane
function getPlane(material, size){
	var geometry = new THREE.PlaneGeometry(size, size)
	var mesh = new THREE.Mesh(geometry, material)
	mesh.receiveShadow = true

>>>>>>> Stashed changes
	return mesh
}

function getBoxGrid(amount, seperationMultiplier){
	var group = new THREE.Group()

	for (var i=0; i<amount; i++){
		var obj = getBox(1, 3, 1)
		obj.position.x = i * seperationMultiplier
		obj.position.y = obj.geometry.parameters.height/2
		group.add(obj)

		for (var j=0; j<amount; j++){
			var obj = getBox(1, 3, 1)
			obj.position.x = i * seperationMultiplier
			obj.position.y = obj.geometry.parameters.height/2
			obj.position.z = j * seperationMultiplier
			group.add(obj)
		}
	}

	group.position.x = -(seperationMultiplier * (amount-1))/2
	group.position.z = -(seperationMultiplier * (amount-1))/2

	return group
}

<<<<<<< Updated upstream

function getPlane(size){
	var geometry = new THREE.PlaneGeometry(size, size)
	var material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)",
		side: THREE.DoubleSide
	})
	var mesh = new THREE.Mesh(geometry, material)
	mesh.receiveShadow = true
	return mesh
}

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity)
	light.castShadow = true
	return light
}

function getSpotLight(intensity) {
	var light = new THREE.SpotLight(0xffffff, intensity)
	light.castShadow = true

	light.shadow.bias = 0.001 // adjust glitching between object and plane when shadowing

	light.shadow.mapSize.width = 2048  // default: 1024
	light.shadow.mapSize.height = 2048  // default: 1024
=======
function getLight(type, size, material) {
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
// Get light
function getSpotLight(intensity, color) {
	var light = new THREE.SpotLight(0xffffff, intensity)
	light.castShadow = true
	return light;
}
// function getSpotLight(intensity, color) {
// 	color = color == undefined ? 'rgb(255, 255, 255):' : color
// 	var light = new THREE.SpotLight(color, intensity)
// 	light.castShadow = true
// 	light.penumbra = 0.5

// 	// Set up shadow properties for the light
// 	light.shadow.bias = 0.001 // adjust glitching between object and plane when shadowing
// 	light.shadow.mapSize.width = 2048  // default: 1024
// 	light.shadow.mapSize.height = 2048  // default: 1024
>>>>>>> Stashed changes

// 	return light
// }

function getDirectionalLight(intensity) {
	var light = new THREE.DirectionalLight(0xffffff, intensity)
	light.castShadow = true

	// Default value: +-5
	light.shadow.camera.left = -50
	light.shadow.camera.right = 50
	light.shadow.camera.bottom = -50
	light.shadow.camera.top = 50


	light.shadow.mapSize.width = 4096  // default: 1024
	light.shadow.mapSize.height = 4096  // default: 1024

	return light
}

function getAmbientLight(intensity) {
<<<<<<< Updated upstream
	var light = new THREE.AmbientLight('rgb(10, 30, 50)', intensity)
	return light
}

=======
	var light = new THREE.AmbientLight(0xffffff, intensity)
	return light
}

// ----------- Style ---------------------
// Sphere
>>>>>>> Stashed changes
function getSphere(size){
	var geometry = new THREE.SphereGeometry(size, 24, 24)
	var material = new THREE.MeshBasicMaterial({
		color: "rgb(255, 255, 255)"
	})
	var mesh = new THREE.Mesh(geometry, material)
<<<<<<< Updated upstream
=======

	return mesh
}


// Box grid
function getBorder(object){
	var geo = new THREE.EdgesGeometry( object.geometry )
	var mat = new THREE.LineBasicMaterial( { color: "black", linewidth: 10 } )
	var wireframe = new THREE.LineSegments( geo, mat )
	wireframe.renderOrder = 1 // make sure wireframes are rendered 2nd
	return wireframe
}

// -------------- GUI ---------------
function guiScene( gui, scene ) {

	const folder = gui.addFolder( 'Scene' );

	const data = {
		background: '#000000',
		'ambient light': ambientLight.color.getHex()
	};

	folder.addColor( data, 'ambient light' ).onChange( handleColorChange( ambientLight.color ) );

	guiSceneFog( folder, scene );

}

function guiSceneFog( folder, scene ) {

	const fogFolder = folder.addFolder( 'scene.fog' );

	const fog = new THREE.Fog( 0x3f7b9d, 0, 60 );

	const data = {
		fog: {
			'THREE.Fog()': false,
			'scene.fog.color': fog.color.getHex()
		}
	};

	fogFolder.add( data.fog, 'THREE.Fog()' ).onChange( function ( useFog ) {

		if ( useFog ) {

			scene.fog = fog;

		} else {

			scene.fog = null;

		}

	} );

	fogFolder.addColor( data.fog, 'scene.fog.color' ).onChange( handleColorChange( fog.color ) );

}

function guiMaterial( gui, mesh, material, geometry ) {

	const folder = gui.addFolder( 'THREE.Material' );

	folder.add( material, 'transparent' );
	folder.add( material, 'opacity', 0, 1 ).step( 0.01 );
	folder.add( material, 'alphaTest', 0, 1 ).step( 0.01 ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'visible' );
	folder.add( material, 'side', constants.side ).onChange( needsUpdate( material, geometry ) );

}

function guiMeshStandardMaterial( gui, mesh, material, geometry ) {

	const data = {
		color: material.color.getHex(),
		emissive: material.emissive.getHex(),
		envMaps: envMapKeys[ 0 ],
		map: diffuseMapKeys[ 0 ],
		roughnessMap: roughnessMapKeys[ 0 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	const folder = gui.addFolder( 'THREE.MeshStandardMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.addColor( data, 'emissive' ).onChange( handleColorChange( material.emissive ) );

	folder.add( material, 'roughness', 0, 1 );
	folder.add( material, 'metalness', 0, 1 );
	folder.add( material, 'flatShading' ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'wireframe' );
	folder.add( material, 'vertexColors' ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'fog' );
	folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
	folder.add( data, 'map', diffuseMapKeys ).onChange( updateTexture( material, 'map', diffuseMaps ) );
	folder.add( data, 'roughnessMap', roughnessMapKeys ).onChange( updateTexture( material, 'roughnessMap', roughnessMaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );

	// TODO metalnessMap

}


// -------------- Transformation ------------




// -------------- Texture --------------





// ------------- Animation -----------------


// ------------- Event ----------------------
function handleColorChange( color ) {

	return function ( value ) {

		if ( typeof value === 'string' ) {

			value = value.replace( '#', '0x' );

		}

		color.setHex( value );

	};
}

function needsUpdate( material, geometry ) {

	return function () {

		material.vertexColors = material.vertexColors;
		material.side = parseInt( material.side ); //Ensure number
		material.needsUpdate = true;
		geometry.attributes.position.needsUpdate = true;
		geometry.attributes.normal.needsUpdate = true;
		geometry.attributes.color.needsUpdate = true;
>>>>>>> Stashed changes

	return mesh
}

function update(renderer, scene, camera, controls, clock) {
	renderer.render(scene, camera)

	controls.update()
	TWEEN.update()

	var timeElapsed = clock.getElapsedTime()
	var speed = 1.5

	// var cameraXRotation = scene.getObjectByName('cameraXRotation')
	// if (cameraXRotation.rotation.x < 0){
	// 	cameraXRotation.rotation.x += 0.01
	// }

	// var cameraZPosition = scene.getObjectByName('cameraZPosition')
	// cameraZPosition.position.z -= 0.25

	var cameraZRotation = scene.getObjectByName('cameraZRotation')
	cameraZRotation.rotation.z = noise.simplex2(timeElapsed * 1.5, timeElapsed * 1.5) * 0.05

	var boxGrid = scene.getObjectByName('boxGrid')
	boxGrid.children.forEach(function(child, index) {
		var x = timeElapsed * speed + index
		// child.scale.y = (Math.sin(x) + 1) / 2  + 0.001
			// get rid of negative value  cause sin->(-1,1)
			// get rid of glitch effect when value is 0

		child.scale.y = (noise.simplex2(x, x) + 1) / 2  + 0.001

		child.position.y = child.scale.y/2
	})

	// Object Rotation
	// var box = scene.getObjectByName("box-1")
	// box.rotation.x += 0.001
	// box.rotation.x += 0.001
	// box.rotation.y += 0.001
	// box.rotation.z += 0.001
	requestAnimationFrame(function () {
		update(renderer, scene, camera, controls, clock)
	})
}

<<<<<<< Updated upstream
function getBorder(object){
	var geo = new THREE.EdgesGeometry( object.geometry )
	var mat = new THREE.LineBasicMaterial( { color: "black", linewidth: 10 } )
	var wireframe = new THREE.LineSegments( geo, mat )
	wireframe.renderOrder = 1 // make sure wireframes are rendered 2nd
	return wireframe
}

scene =  init()

var box1 = getBox(1, 1, 1)
=======
export { init }
>>>>>>> Stashed changes
