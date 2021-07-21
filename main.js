let object, style, camera, light, plane, controls, material, color, loader

const scene = new THREE.Scene()
let renderer = new THREE.WebGLRenderer({ antialias: true })
let gui = new dat.GUI();
gui.domElement.id = 'gui'
loader = new THREE.TextureLoader()


function init () {

	var enableFog = true
	const constants = {
		side: {
			'THREE.FrontSide': THREE.FrontSide,
			'THREE.BackSide': THREE.BackSide,
			'THREE.DoubleSide': THREE.DoubleSide
		},
	}
	let lightGeo = new THREE.SphereGeometry(2, 24, 24)
	let lightMat = new THREE.MeshBasicMaterial({
		color: "rgb(255, 255, 255)"
	})
	let lightShape = new THREE.Mesh(lightGeo, lightMat)
	light = getLight('point', 1)

	// Init plane
	var planeMaterial = getMaterial2('standard', 'rgb(153, 153, 153)')
	var plane = getPlane(planeMaterial, 500)
	plane.name = 'plane'

	// Init helper
	// var helper = new THREE.CameraHelper(directionalLight.shadow.camera)
	// Init object

	// ---------------- Manipulate materials --------------

	// Plane
	plane.rotation.x = Math.PI/2
	plane.position.y = -50

	light.position.x = 20
	light.position.y = 70
	light.position.z = 25

	// Sphere
	// sphere.position.y = sphere.geometry.parameters.radius



	// --------------- Add ----------------------------
	scene.add(plane)
	light.add(lightShape)
	scene.add(light)
	// scene.add(helper)

	// ---------------- Camera ----------------------------
	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	)

	camera.position.x = 25
	camera.position.y = 100
	camera.position.z = 50

	camera.lookAt(new THREE.Vector3(0, 0, 0))


	// -------------- Callback -------------------------

	renderer.shadowMap.enabled = true
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setClearColor("rgb(120, 120, 120)")
	document.getElementById("webgl").appendChild(renderer.domElement)
	renderer.render(scene, camera)

	controls = new THREE.OrbitControls(camera, renderer.domElement)

	update(renderer, scene, camera, controls)
}

function addObjectEvent(option){
	if (object !== undefined) {
        scene.remove(object)
        object.geometry.dispose()
        object.material.dispose()
    }
    if (style !== undefined) {
        scene.remove(style)
        style.geometry.dispose()
        style.material.dispose()
    }
    if (light !== undefined) {
        material = 'standard'
    }
    else {
        material = 'basic'
    }
    color = 'rgb(92, 133, 214)'
	let objectMaterial = getMaterial(material, color)
	objectMaterial.name = 'material'
	object = getObject(option, 20, objectMaterial)
	scene.add(object)
	update(renderer, scene, camera, controls)
}

function addLightEvent(opt){

	// Code here
}

function addStyleEvent(opt){
	if (style !== undefined) {
        scene.remove(style)
        style.geometry.dispose()
        style.material.dispose()
    }
	if (object !== undefined) {
        scene.remove(object)
    }
	style = getStyleObject(opt, 20, object)
	scene.add(style)
	update(renderer, scene, camera, controls)
}

// -------------- Get object --------------------
function getObject(type, size, material) {
	var geometry
	var segmentMultiplier = 1
	switch (type) {
		case 'box':
			geometry = new THREE.BoxGeometry(size, size, size)
			break
		case 'sphere':
			geometry = new THREE.SphereGeometry(size, 32*segmentMultiplier, 32*segmentMultiplier)
			break
		case 'cone':
			geometry = new THREE.ConeGeometry(size, size, 256*segmentMultiplier)
			break;
		case 'cylinder':
			geometry = new THREE.CylinderGeometry(size, size, 3*size)
			break
		case 'wheel':
			geometry = new THREE.TorusGeometry( size*2/3, size/3, size*2/3, 6*size )
			if (material.name == 'basic') {
				material.map = loader.load('/assets/textures/wheel.jpg')
			}
			else {
				material.roughnessMap = loader.load('/assets/textures/wheel.jpg')
				material.roughness = 1
				material.metalness = 0
			}
			break
		case 'teapot':
			geometry = new THREE.TeapotGeometry(size*2/3, 10)
			break
		default:
			break
	}
	var obj = new THREE.Mesh(geometry, material)
	obj.castShadow = true
	obj.name = type
	obj.position.set(0,size,0)
	return obj
}

function box( width, height, depth ) {

				width = width * 0.5,
				height = height * 0.5,
				depth = depth * 0.5;

				const geometry = new THREE.BufferGeometry();
				const position = [];

				position.push(
					- width, - height, - depth,
					- width, height, - depth,

					- width, height, - depth,
					width, height, - depth,

					width, height, - depth,
					width, - height, - depth,

					width, - height, - depth,
					- width, - height, - depth,

					- width, - height, depth,
					- width, height, depth,

					- width, height, depth,
					width, height, depth,

					width, height, depth,
					width, - height, depth,

					width, - height, depth,
					- width, - height, depth,

					- width, - height, - depth,
					- width, - height, depth,

					- width, height, - depth,
					- width, height, depth,

					width, height, - depth,
					width, height, depth,

					width, - height, - depth,
					width, - height, depth
				 );

				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ) );

				return geometry;

			}

function getStyleObject(type, size, obj) {
	let geo, mat, styleObj

	switch (type) {
		case 'point':
			geo = obj.geometry
			mat = new THREE.PointsMaterial( { color: color, size: 2 } )
			styleObj = new THREE.Points( geo, mat )
			break
		case 'line':
			geo = new THREE.WireframeGeometry( obj.geometry )
			mat = new THREE.LineBasicMaterial( { color: color} )
			styleObj = new THREE.Line( geo, mat )
			styleObj.renderOrder = 1 // make sure wireframes are rendered 2nd
			break
		case 'solid':
			styleObj = obj.clone()
			break
		case "dash":
			geo = box( 20, 20, 20 )
			mat = new THREE.LineDashedMaterial( { color: "black" , dashSize: 1, gapSize: 0.5} )
			styleObj = new THREE.Line( geo, mat )
			styleObj.computeLineDistances()
		default:
			break
	}
	styleObj.name = type
	styleObj.position.set(0,size,0)
	return styleObj
}

function getBorder(object){
	var geo = new THREE.WireframeGeometry( object.geometry )
	var mat = new THREE.LineBasicMaterial( { color: "black", linewidth: 20 } )
	var wireframe = new THREE.LineSegments( geo, mat )
	wireframe.renderOrder = 1 // make sure wireframes are rendered 2nd
	return wireframe
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
		case 'line':
			selectedMaterial = new THREE.LineBasicMaterial(materialOptions)
			break
		default:
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions)

	}

	return selectedMaterial
}

function getMaterial2(type, color){
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

function getPlane(material, size){
	var geometry = new THREE.PlaneGeometry(size, size)
	var mesh = new THREE.Mesh(geometry, material)
	mesh.receiveShadow = true

	return mesh
}

function getLight(type, intensity) {
	
	switch (type) {
		case 'point':
			light = new THREE.PointLight(0xffffff, intensity)
			break
		case 'directional':
			light = new THREE.DirectionalLight(0xffffff, intensity)
			break
		case 'ambient':
			light = new THREE.AmbientLight(0xffffff, intensity)
			break
	}
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
// 	return light
// }

// -------------- GUI ---------------
function guiScene( gui, scene ) {

	const folder = gui.addFolder( 'Scene' );
	if (light != undefined) {
		const data = {
		background: '#000000',
		'ambient light': light.color.getHex()
		}

	folder.addColor( data, 'ambient light' ).onChange( handleColorChange( light.color ) );
	}

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

function update(renderer, scene, camera, controls) {
	renderer.render(scene, camera)

	controls.update()

	requestAnimationFrame(function () {
		update(renderer, scene, camera, controls)
	})
}

guiScene(gui, scene)

let opt
let objectOption = document.querySelectorAll('.object-option')
let lightOption = document.querySelectorAll('.light-option')
let styleOption = document.querySelectorAll('.style-option')

let basic = document.querySelector('.basic')
let phong = document.querySelector('.phong')
let standard = document.querySelector('.standard')

function clickEvent() {
    objectOption.forEach(option =>
    {
        option.onclick = () =>
        {
            opt = option.innerText.toLowerCase()
            addObjectEvent(opt)
        }
    })

    lightOption.forEach(option =>
    {
        option.onclick = () =>
        {
            opt = option.innerText.toLowerCase()
            addObject(opt)
        }
    })

    styleOption.forEach(option =>
    {
        option.onclick = () =>
        {
            opt = option.innerText.toLowerCase()
            addStyleEvent(opt)
        }
    })
}
init()
clickEvent()