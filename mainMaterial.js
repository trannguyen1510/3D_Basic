function init(){
	var scene = new THREE.Scene()
	var gui = new dat.GUI()
	var clock = new THREE.Clock()

	var enableFog = false

	if (enableFog){
		scene.fog = new THREE.FogExp2(0xffffff, 0.01)
	}

	// Initialize objects
	var planeMaterial = getMaterial('standard', 'rgb(255, 255, 255)')
	var plane = getPlane(planeMaterial, 300)

	var sphereMaterial = getMaterial('standard', 'rgb(255, 255, 255)')
	var sphere = getSphere(sphereMaterial, 1, 24)

	var ligtLeft = getSpotLight(1, 'rgb(255, 220, 180)')
	var ligtRight = getSpotLight(1, 'rgb(255, 220, 180)')

	// Manipulate objects
	sphere.position.y = sphere.geometry.parameters.radius
	plane.rotation.x = Math.PI/2

	ligtLeft.position.x = -5
	ligtLeft.position.y = 2
	ligtLeft.position.z = -4

	ligtRight.position.x = 5
	ligtRight.position.y = 2
	ligtRight.position.z = -4

	// Manipulate materials
	/// Load cube map
	var path = '/assets/cubemap/'
	var format = '.jpg'
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	]

	var reflectionCube = new THREE.CubeTextureLoader().load(urls)
	reflectionCube.format = THREE.RGBFormat

	scene.background = reflectionCube

	var loader = new THREE.TextureLoader()
	planeMaterial.map = loader.load('/assets/textures/floor.jpg')
	planeMaterial.bumpMap = loader.load('/assets/textures/floor.jpg')
	planeMaterial.roughnessMap = loader.load('/assets/textures/floor.jpg')
	planeMaterial.bumpScale = 0.01
	planeMaterial.metalness = 0
	planeMaterial.roughness = 0.3
	planeMaterial.envMap = reflectionCube

	sphereMaterial.roughness = 0
	sphereMaterial.metalness = 1
	// sphereMaterial.roughnessMap = loader.load('/assets/textures/metalCut.jpg')
	sphereMaterial.envMap = reflectionCube

	var maps = ['map', 'bumpMap', 'roughnessMap']
	maps.forEach(function (mapName) {
		var texture = planeMaterial[mapName]
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
		texture.repeat.set(15, 15)
	})

	//dat.gui
	var folder1 = gui.addFolder('light_1')
	folder1.add(ligtLeft, 'intensity', 0, 10)
	folder1.add(ligtLeft.position, 'x', -5, 15)
	folder1.add(ligtLeft.position, 'y', -5, 15)
	folder1.add(ligtLeft.position, 'z', -5, 15)

	var folder2 = gui.addFolder('light_2')
	folder2.add(ligtRight, 'intensity', 0, 10)
	folder2.add(ligtRight.position, 'x', -5, 15)
	folder2.add(ligtRight.position, 'y', -5, 15)
	folder2.add(ligtRight.position, 'z', -5, 15)


	var folder3 = gui.addFolder('material')
	// folder3.add(sphereMaterial, 'shininess', 0, 1000)  // only for phong material
	// folder3.add(planeMaterial, 'shininess', 0, 1000)
	folder3.add(sphereMaterial, 'roughness', 0, 1)
	folder3.add(planeMaterial, 'roughness', 0, 1)
	folder3.add(sphereMaterial, 'metalness', 0, 1)
	folder3.add(planeMaterial, 'metalness', 0, 1)
	folder3.open()

	// Add objects
	scene.add(sphere)
	scene.add(plane)
	scene.add(ligtLeft)
	scene.add(ligtRight)


	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	)


	camera.position.y = 5
	camera.position.z = 5

	camera.lookAt(new THREE.Vector3(0, 0, 0))

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

function getBox(w, h, d){
	var geometry = new THREE.BoxGeometry(w, h, d)
	var material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)"
	})
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


function getPlane(material, size){
	var geometry = new THREE.PlaneGeometry(size, size)
	var mesh = new THREE.Mesh(geometry, material)
	mesh.receiveShadow = true

	return mesh
}

function getSphere(material, size, segments){
	var geometry = new THREE.SphereGeometry(size, segments, segments)
	var mesh = new THREE.Mesh(geometry, material)
	mesh.castShadow = true

	return mesh
}

function getMaterial(type, color){
	var selectedMaterial;
	var materialOptions = {
		color: color == undefined ? 'rgb(255, 255, 255)': color,
		side: THREE.DoubleSide
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

function getBorder(object){
	var geo = new THREE.EdgesGeometry( object.geometry )
	var mat = new THREE.LineBasicMaterial( { color: "black", linewidth: 10 } )
	var wireframe = new THREE.LineSegments( geo, mat )
	wireframe.renderOrder = 1 // make sure wireframes are rendered 2nd
	return wireframe
}

scene =  init()

var box1 = getBox(1, 1, 1)