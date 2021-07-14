function init () {
	// -------------- Init ------------------

	// Init global var
	var scene = new THREE.Scene()
	var gui = new dat.GUI()
	var clock = new THREE.Clock()

	const constants = {
		side: {

			'THREE.FrontSide': THREE.FrontSide,
			'THREE.BackSide': THREE.BackSide,
			'THREE.DoubleSide': THREE.DoubleSide

		},
	} 

	var enableFog = false

	if (enableFog){
		scene.fog = new THREE.FogExp2(0xffffff, 0.01)
	}

	// Init light
	var directionalLight = getDirectionalLight(1)
	var ambientLight = getAmbientLight(100)

	// Init plane
	var planeMaterial = getMaterial2('standard', 'rgb(153, 153, 153)')
	var plane = getPlane(planeMaterial, 300)


	//Init cube/box (hình hộp)
	var boxMaterial = getMaterial2('basic', 'rgb(92, 133, 214)')
	var box = getBox(sphereMaterial, 5, 5, 5)
	console.log(box)

	// Init sphere (hình cầu)
	var sphereMaterial = getMaterial('standard', 'rgb(186, 193, 194)')
	var sphere = getSphere(sphereMaterial, 1, 24)


	// Init cone (hình nón)



	// Init cylinder (hình trụ)



	// Init wheel (bánh xe)



	// Init tea pot (ấm trà)


	// Init multiple boxs
	var boxGrid = getBoxGrid(20, 2.5)


	// Init....


	// Init helper
	var helper = new THREE.CameraHelper(directionalLight.shadow.camera)

	// ---------------- Manipulate materials --------------

	// Plane
	plane.rotation.x = Math.PI/2
	plane.position.y = -50

	// Sphere
	sphere.position.y = sphere.geometry.parameters.radius	


	// Light
	directionalLight.position.x = 13
	directionalLight.position.y = 10
	directionalLight.position.z = 10
	directionalLight.intensity = 2
	// Texture




	// ---------------- dat.gui -------------
	var folder3 = gui.addFolder('material')
	// folder3.add(sphereMaterial, 'shininess', 0, 1000)  // only for phong material
	// folder3.add(planeMaterial, 'shininess', 0, 1000)

	// folder3.add(sphereMaterial, 'roughness', 0, 1)
	// folder3.add(planeMaterial, 'roughness', 0, 1)
	// folder3.add(sphereMaterial, 'metalness', 0, 1)
	// folder3.add(planeMaterial, 'metalness', 0, 1)
	folder3.open()



	// --------------- Add ----------------------------
	scene.add(box)
	// scene.add(plane)
	scene.add(ambientLight)
	// scene.add(helper)


	// ---------------- Camera ----------------------------
	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	)


	camera.position.y = 20
	camera.position.z = 20

	camera.lookAt(new THREE.Vector3(0, 0, 0))

	// -------------- Callback -------------------------

	var renderer = new THREE.WebGLRenderer()
	renderer.shadowMap.enabled = true
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setClearColor("rgb(120, 120, 120)")
	document.getElementById("webgl").appendChild(renderer.domElement)
	renderer.render(scene, camera)

	var controls = new THREE.OrbitControls(camera, renderer.domElement)

	update(renderer, scene, camera, controls, clock)

	return scene
}	


// -------------- Get object --------------------

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

	return mesh
}


// Get box
function getBox(material, w, h, d){
	var geometry = new THREE.BoxGeometry(w, h, d)
	var mesh = new THREE.Mesh(geometry, material)
	mesh.castShadow = true

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

// Get sphere
function getSphere(material, size, segments){
	var geometry = new THREE.SphereGeometry(size, segments, segments)
	var mesh = new THREE.Mesh(geometry, material)
	mesh.castShadow = true

	return mesh
}


// Get cone



// Get cylinder



// Get wheel


// Get teapot


// Get....


// Get light
function getSpotLight(intensity, color) {
	color = color == undefined ? 'rgb(255, 255, 255):' : color
	var light = new THREE.SpotLight(color, intensity)
	light.castShadow = true
	light.penumbra = 0.5

	// Set up shadow properties for the light
	light.shadow.bias = 0.001 // adjust glitching between object and plane when shadowing
	light.shadow.mapSize.width = 2048  // default: 1024
	light.shadow.mapSize.height = 2048  // default: 1024

	return light
}

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity)
	light.castShadow = true
	return light
}

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
	var light = new THREE.AmbientLight(0x404040, intensity)
	return light
}

// ----------- Style ---------------------

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

	};
}

function update(renderer, scene, camera, controls, clock) {
	renderer.render(scene, camera)

	controls.update()
	// TWEEN.update()

	// var timeElapsed = clock.getElapsedTime()
	// var speed = 1.5

	// var cameraXRotation = scene.getObjectByName('cameraXRotation')
	// if (cameraXRotation.rotation.x < 0){
	// 	cameraXRotation.rotation.x += 0.01
	// }

	// var cameraZPosition = scene.getObjectByName('cameraZPosition')
	// cameraZPosition.position.z -= 0.25

	// var cameraZRotation = scene.getObjectByName('cameraZRotation')
	// cameraZRotation.rotation.z = noise.simplex2(timeElapsed * 1.5, timeElapsed * 1.5) * 0.05

	// var boxGrid = scene.getObjectByName('boxGrid')
	// boxGrid.children.forEach(function(child, index) {
	// 	var x = timeElapsed * speed + index
	// 	// child.scale.y = (Math.sin(x) + 1) / 2  + 0.001
	// 		// get rid of negative value  cause sin->(-1,1)
	// 		// get rid of glitch effect when value is 0

	// 	child.scale.y = (noise.simplex2(x, x) + 1) / 2  + 0.001

	// 	child.position.y = child.scale.y/2
	// })

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

scene =  init()

console.log(window.scene)