function init(){
	var scene = new THREE.Scene()
	var gui = new dat.GUI()
	var clock = new THREE.Clock()

	var enableFog = false

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
	

	plane.rotation.x = Math.PI/2
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


	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	)

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
	var light = new THREE.AmbientLight('rgb(10, 30, 50)', intensity)
	return light
}

function getSphere(size){
	var geometry = new THREE.SphereGeometry(size, 24, 24)
	var material = new THREE.MeshBasicMaterial({
		color: "rgb(255, 255, 255)"
	})
	var mesh = new THREE.Mesh(geometry, material)

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

function getBorder(object){
	var geo = new THREE.EdgesGeometry( object.geometry )
	var mat = new THREE.LineBasicMaterial( { color: "black", linewidth: 10 } )
	var wireframe = new THREE.LineSegments( geo, mat )
	wireframe.renderOrder = 1 // make sure wireframes are rendered 2nd
	return wireframe
}

scene =  init()

var box1 = getBox(1, 1, 1)