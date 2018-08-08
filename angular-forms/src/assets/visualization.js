var hillslopeData;
var hillslopeDataOld;
var json;
var InitDemo= function(hillslopeData, THREE, OrbitControls){
	hillslopeData = hillslopeData;
	hillslopeDataOld = hillslopeData;
	json = JSON.stringify(hillslopeData);
	var top_slope = hillslopeData["top_slope"];
	var slope = 0.01 * parseInt(hillslopeData["avg_slope"], 10);
	var length = parseInt(hillslopeData["length_ft"], 10);
	var individualLength = length/4;

	var vegetationType = hillslopeData['vegetation'];

	var	x1 = parseInt(hillslopeData["x_coord_init"], 10);
	var y1 = parseInt(hillslopeData["y_coord_init"], 10);
	var x2 = parseInt(hillslopeData["x_coord_top"], 10);
	var y2 = parseInt(hillslopeData["y_coord_top"], 10);
	var x3 = parseInt(hillslopeData["x_coord_avg"], 10);
	var y3 = parseInt(hillslopeData["y_coord_avg"], 10);
	var x4 = parseInt(hillslopeData["x_coord_toe"], 10);
	var y4 = parseInt(hillslopeData["y_coord_toe"], 10);

	var bottom = y4;

	var depth = 3/5 * length;
	var depth1 = depth/3;
	var depth2 = depth/2.5;
	var depth3 = depth/2;
	var depth4 = depth/1.5;

	var updateData = function(){
		hillslopeDataOld = hillslopeData;
		top_slope = hillslopeData["top_slope"];
		slope = 0.01 * parseInt(hillslopeData["avg_slope"], 10);
		length = parseInt(hillslopeData["length_ft"], 10);
		individualLength = length/4;
		vegetationType = hillslopeData['vegetation'];

		x1 = parseInt(hillslopeData["x_coord_init"], 10);
		y1 = parseInt(hillslopeData["y_coord_init"], 10);
		x2 = parseInt(hillslopeData["x_coord_top"], 10);
		y2 = parseInt(hillslopeData["y_coord_top"], 10);
		x3 = parseInt(hillslopeData["x_coord_avg"], 10);
		y3 = parseInt(hillslopeData["y_coord_avg"], 10);
		x4 = parseInt(hillslopeData["x_coord_toe"], 10);
		y4 = parseInt(hillslopeData["y_coord_toe"], 10);

		bottom = y4;
		depth = 3/5 * length;
		depth1 = depth/3;
		depth2 = depth/2.5;
		depth3 = depth/2;
		depth4 = depth/1.5;

		object.geometry.vertices[0] = new THREE.Vector3(x1,y1,depth1),
		object.geometry.vertices[1] = new THREE.Vector3(x2,y2,depth2),
		object.geometry.vertices[2] = new THREE.Vector3(x3,y3,depth4),
		object.geometry.vertices[3] = new THREE.Vector3(x4,y4,depth),
	//4 5 6 7
		object.geometry.vertices[4] = new THREE.Vector3(x1,bottom,depth1),
		object.geometry.vertices[5] = new THREE.Vector3(x2,bottom,depth2),
		object.geometry.vertices[6] = new THREE.Vector3(x3,bottom,depth4),
		object.geometry.vertices[7] = new THREE.Vector3(x4,bottom,depth),
	//8 9 10 11
		object.geometry.vertices[8] = new THREE.Vector3(x1,bottom,-depth1),
		object.geometry.vertices[9] = new THREE.Vector3(x2,bottom,-depth2),
		object.geometry.vertices[10] = new THREE.Vector3(x3,bottom,-depth4),
		object.geometry.vertices[11] = new THREE.Vector3(x4,bottom,-depth),
	//12 13 14 15
		object.geometry.vertices[12] = new THREE.Vector3(x1,y1,-depth1),
		object.geometry.vertices[13] = new THREE.Vector3(x2,y2,-depth2),
		object.geometry.vertices[14] = new THREE.Vector3(x3,y3,-depth4),
		object.geometry.vertices[15] = new THREE.Vector3(x4,y4,-depth)
}

//Finds the canvas
//Initializes webGL
var canvas = document.getElementById("Surface");
var gl = canvas.getContext("webgl");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, parseInt(canvas.style.width)/parseInt(canvas.style.height), 0.1, 1000 );
camera.position.set(100,-100,400)
//Orbit control allows the user to move the camera w/ their mouse
var controls = new OrbitControls( camera );
controls.target.set( 100, -180, 2 );
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.update();

var renderer = new THREE.WebGLRenderer({canvas:Surface});
renderer.setSize( parseInt(canvas.style.width), parseInt(canvas.style.height));

//This is our shape
var geometry = new THREE.Geometry();
var material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide, vertexColors: THREE.FaceColors});

//Creates vertices, adds them to the vertices array
geometry.vertices.push(
//0 1 2 3
	new THREE.Vector3(x1,y1,depth1),
	new THREE.Vector3(x2,y2,depth2),
	new THREE.Vector3(x3,y3,depth4),
	new THREE.Vector3(x4,y4,depth),
//4 5 6 7
	new THREE.Vector3(x1,bottom,depth1),
	new THREE.Vector3(x2,bottom,depth2),
	new THREE.Vector3(x3,bottom,depth4),
	new THREE.Vector3(x4,bottom,depth),
//8 9 10 11
	new THREE.Vector3(x1,bottom,-depth1),
	new THREE.Vector3(x2,bottom,-depth2),
	new THREE.Vector3(x3,bottom,-depth4),
	new THREE.Vector3(x4,bottom,-depth),
//12 13 14 15
	new THREE.Vector3(x1,y1,-depth1),
	new THREE.Vector3(x2,y2,-depth2),
	new THREE.Vector3(x3,y3,-depth4),
	new THREE.Vector3(x4,y4,-depth)
);

var normal = new THREE.Vector3( 0, 1, 0 ); //optional
var color = new THREE.Color( 0x236267 ); //optional
var color2 = new THREE.Color(0xAA6E39);
var color3 = new THREE.Color(0x684D34);
var materialIndex = 0; //optional

//combines all of the vertices into faces, or triangles
//front
var face1 = new THREE.Face3(0,1,5, normal, color2, materialIndex);
var face2 = new THREE.Face3(0,5,4, normal, color2, materialIndex);

var face3 = new THREE.Face3(1,2,6, normal, color2, materialIndex);
var face4 = new THREE.Face3(1,6,5, normal, color2, materialIndex);

var face5 = new THREE.Face3(2,3,7, normal, color2, materialIndex);
var face6 = new THREE.Face3(2,7,6, normal, color2, materialIndex);

//Bottoms
var face7 = new THREE.Face3(4,7,11, normal, color3, materialIndex);
var face8 = new THREE.Face3(4,11,8, normal, color3, materialIndex);

//Back
var face9 = new THREE.Face3(8,9,13, normal, color2, materialIndex);
var face10 = new THREE.Face3(8,13,12, normal, color2, materialIndex);

var face11 = new THREE.Face3(9,10,14, normal, color2, materialIndex);
var face12 = new THREE.Face3(9,14,13, normal, color2, materialIndex);

var face13 = new THREE.Face3(10,11,15, normal, color2, materialIndex);
var face14 = new THREE.Face3(10,15,14, normal, color2, materialIndex);

//Top
var face15 = new THREE.Face3(12,13,1, normal, color, materialIndex);
var face16 = new THREE.Face3(12,1,0, normal, color, materialIndex);

var face17 = new THREE.Face3(13,2,1, normal, color, materialIndex);
var face18 = new THREE.Face3(13,14,2, normal, color, materialIndex);

var face19 = new THREE.Face3(14,15,3, normal, color, materialIndex);
var face20 = new THREE.Face3(14,3,2, normal, color, materialIndex);
//side1
var face21 = new THREE.Face3(0,12,8, normal, color2, materialIndex);
var face22 = new THREE.Face3(0,8,4, normal, color2, materialIndex);
//side 2
var face23 = new THREE.Face3(3,15,11, normal, color, materialIndex);
var face24 = new THREE.Face3(3,11,7, normal, color, materialIndex);


//adds all of the faces to the geometry
geometry.faces.push(face1);
geometry.faces.push(face2);
geometry.faces.push(face3);
geometry.faces.push(face4);
geometry.faces.push(face5);
geometry.faces.push(face6);
geometry.faces.push(face7);
geometry.faces.push(face8);
geometry.faces.push(face9);
geometry.faces.push(face10);
geometry.faces.push(face11);
geometry.faces.push(face12);
geometry.faces.push(face13);
geometry.faces.push(face14);
geometry.faces.push(face15);
geometry.faces.push(face16);
geometry.faces.push(face17);
geometry.faces.push(face18);
geometry.faces.push(face19);
geometry.faces.push(face20);
geometry.faces.push(face21);
geometry.faces.push(face22);
geometry.faces.push(face23);
geometry.faces.push(face24);

//don't know what these do but it's important apparently
geometry.computeFaceNormals();
geometry.computeVertexNormals();
//Combines the shape and the material to form our hillslope
var object = new THREE.Mesh(geometry, material);
scene.add(object);
object.geometry.verticesNeedUpdate = true;


var cylinder1,
cylinder2,
cylinder3,
cylinder4,
cylinder5,
cylinder6;

var shrub1,
shrub2,
shrub3,
shrub4,
shrub5,
shrub6;

var rshrub1,
rshrub2,
rcylinder3,
rshrub3,
rshrub4,
rcylinder6;

//creates the functions which create the little shapes that compose 'vegetation'
var createForest = function(){
	var treeMaterial = new THREE.MeshBasicMaterial( {color: 0x005621} );
	var testMaterial = new THREE.MeshBasicMaterial( {color: 0xc10000} );

	var ygeometry1 = new THREE.CylinderGeometry(2, 10, 40, 32 );
	cylinder1 = new THREE.Mesh( ygeometry1, treeMaterial );
	scene.add( cylinder1 );
	cylinder1.position.set(x3 * 0.9,y3*0.8, depth4 * 0.6);

	var ygeometry2 = new THREE.CylinderGeometry(2, 20, 50, 32 );
	cylinder2 = new THREE.Mesh( ygeometry2, treeMaterial );
	scene.add( cylinder2 );
	cylinder2.position.set((x1 + x2) * .9,y1,-depth3/2);

	var ygeometry3 = new THREE.CylinderGeometry(2, 20, 50, 32 );
	cylinder3 = new THREE.Mesh( ygeometry3, treeMaterial );
	scene.add( cylinder3 );
	cylinder3.position.set(x2 * 3,y3 - (3/4)* y3,depth1);

	var ygeometry4 = new THREE.CylinderGeometry(2, 20, 50, 32 );
	cylinder4 = new THREE.Mesh( ygeometry4, treeMaterial );
	scene.add( cylinder4 );
	cylinder4.position.set((x2 + x3)/2, (y2 + y3)/2, -depth/4);

	var ygeometry5 = new THREE.CylinderGeometry(2, 20, 50, 32 );
	cylinder5 = new THREE.Mesh( ygeometry5, treeMaterial );
	scene.add( cylinder5 );
	cylinder5.position.set((x2 + x3) - (x2 + x3)*0.4,y3 * 0.6,depth2/2);

	var ygeometry6 = new THREE.CylinderGeometry(2, 20, 50, 32 );
	cylinder6 = new THREE.Mesh( ygeometry6, treeMaterial );
	scene.add( cylinder6 );
	cylinder6.position.set(((x2 + x3) - (x2 + x3)/3 + x3)/2,(y1 + y4) * 0.7,-depth/2);
};

var createRange = function(){
	var treeMaterial = new THREE.MeshBasicMaterial( {color: 0x005621} );
	var shrubMaterial = new THREE.MeshBasicMaterial( {color: 0xdbbb51} );

	var exvalue = (x2 + x3) - (x2 + x3)/3;

	var shrubGeometry1 = new THREE.SphereGeometry( 10,10,10 );
	shrub1 = new THREE.Mesh( shrubGeometry1, shrubMaterial );
	scene.add( shrub1 );
	shrub1.position.set(x3,y3, depth4/2);

	var shrubGeometry2 =  new THREE.SphereGeometry( 10,10,10 );
	shrub2  = new THREE.Mesh( shrubGeometry2,shrubMaterial  );
	scene.add( shrub2 );
	shrub2 .position.set((x1 + x2)/2,y1,-depth3/2);

	var treeGeometry3 = new THREE.CylinderGeometry(2, 20, 50, 32 );
	cylinder3 = new THREE.Mesh( treeGeometry3, treeMaterial );
	scene.add( cylinder3 );
	cylinder3.position.set(x2 * 3,y3 - (3/4)* y3,depth1);

	var shrubGeometry4 = new THREE.SphereGeometry( 10,10,10 );
	shrub3 = new THREE.Mesh( shrubGeometry4, shrubMaterial );
	scene.add( shrub3 );
	shrub3.position.set((x2 + x3)/2, (y2 + y3)/2, -depth/4);

	var shrubGeometry5 = new THREE.SphereGeometry( 10,10,10 );
	shrub4 = new THREE.Mesh( shrubGeometry5, shrubMaterial );
	scene.add( shrub4 );
	shrub4.position.set(exvalue,y3 * 0.7,depth2/2);

	var ygeometry6 = new THREE.CylinderGeometry( 2, 20, 50, 32 );
	cylinder6 = new THREE.Mesh( ygeometry6, treeMaterial );
	scene.add( cylinder6 );
	cylinder6.position.set((exvalue + x3)/2,(y1 + y4) * 0.7,-depth/2);
};

var createChaparral = function(){
	var shrubMaterial = new THREE.MeshBasicMaterial( {color: 0xdbbb51} );
	var testMaterial = new THREE.MeshBasicMaterial( {color: 0xc10000} );

	var exvalue = (x2 + x3) - (x2 + x3)/3;

	var firstShrub = new THREE.SphereGeometry(  10,10,10 );
	shrub1 = new THREE.Mesh( firstShrub, shrubMaterial );
	scene.add( shrub1 );
	shrub1.position.set(x3,y3, depth4/2);

	var secondShrub =  new THREE.SphereGeometry(10,10,10);
	shrub2  = new THREE.Mesh( secondShrub,shrubMaterial  );
	scene.add( shrub2 );
	shrub2 .position.set((x1 + x2)/2,y1,-depth3/2);

	var thirdShrub = new THREE.SphereGeometry( 10,10,10 );
	shrub3 = new THREE.Mesh( thirdShrub, shrubMaterial);
	scene.add( shrub3 );
	shrub3.position.set(x2 * 3,y3 - (3/4)* y3,depth1);

	var fourthShrub = new THREE.SphereGeometry( 10,10,10 );
	shrub4 = new THREE.Mesh( fourthShrub, shrubMaterial );
	scene.add( shrub4 );
	shrub4.position.set((x2 + x3)/2, (y2 + y3)/2, -depth/4);

	var fifthShrub= new THREE.SphereGeometry( 10,10,10 );
	shrub5 = new THREE.Mesh( fifthShrub, shrubMaterial );
	scene.add( shrub5 );
	shrub5.position.set(exvalue,y3 * 0.7,depth2/2);

	var sixthShrub = new THREE.SphereGeometry( 10,10,10 );
	shrub6 = new THREE.Mesh( sixthShrub, shrubMaterial );
	scene.add( shrub6 );
	shrub6.position.set((exvalue + x3)/2,(y1 + y4) * 0.7,-depth/2);
};


//determines which shape-creation function to call & calls it
if(vegetationType === 'forest'){
	createForest();
}else if( vegetationType === 'range'){
	createRange();
}else if( vegetationType === 'chap'){
	createChaparral();
}

var updateShapeyShapes = function(){

	scene.remove( cylinder1 );
	scene.remove( cylinder2 );
	scene.remove( cylinder3 );
	scene.remove( cylinder4 );
	scene.remove( cylinder5 );
	scene.remove( cylinder6 );

	scene.remove( shrub1 );
	scene.remove( shrub2 );
	scene.remove( shrub3 );
	scene.remove( shrub4 );
	scene.remove( shrub5 );
	scene.remove( shrub6 );

	scene.remove( rshrub1 );
	scene.remove( rshrub2 );
	scene.remove( rcylinder3 );
	scene.remove( rshrub3 );
	scene.remove( rshrub4 );
	scene.remove( rcylinder6 );


	if(vegetationType === 'forest'){
		createForest();
	}else if( vegetationType === 'range'){
		createRange();
	}else if( vegetationType === 'chap'){
		createChaparral();
	}
};

var animate = function () {
	if(JSON.stringify(hillslopeDataOld) != JSON.stringify(hillslopeData)){
		updateData();
		updateShapeyShapes();
		object.geometry.verticesNeedUpdate = true;
		object.geometry.elementsNeedUpdate = true;
		object.material.needsUpdate = true;
	}
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
};
requestAnimationFrame( animate );
animate();
};
