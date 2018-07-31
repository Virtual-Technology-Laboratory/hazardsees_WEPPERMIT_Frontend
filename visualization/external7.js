var InitDemo= function(){

var hillslopeData = {'top_slope': '20', 'avg_slope': '20', 'toe_slope': '20', 'length_ft': '200', 'cli_fn': '../climates/al010831', 'severity': 'm', 'soil_type': 'loam', 'vegetation': 'range', 'rock_content': '50', 'pct_grass': '', 'pct_shrub': '', 'annual_precipitation': '54', 'annual_runoff_rain': '14', 'annual_runoff_winter': '1', 'storm_number':
'11710', 'rain_events': '3615', 'winter_events': '207', 'prob_sediment_yield_exceeded': '20'};

var json = JSON.stringify(hillslopeData);
var top_slope = hillslopeData["top_slope"];
var slope = parseInt(hillslopeData["avg_slope"], 10);
var bottom = parseInt(hillslopeData["toe_slope"], 10);
var length = parseInt(hillslopeData["length_ft"], 10);
var individualLength = length/4;

var vegetationType = hillslopeData['vegetation'];


	console.log("This is working");
	//Finds the canvas
	//Initializes webGL
	var canvas = document.getElementById("Surface");
	var gl = canvas.getContext("webgl");

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		camera.position.set( 100, 100, 400 );
	//Orbitcontrol allows the user to move the camera w/ their mouse
	var controls = new THREE.OrbitControls( camera );
		controls.target.set( 0, 0, 2 );
		controls.update();

	var renderer = new THREE.WebGLRenderer({canvas:Surface});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//This is our shape
	var geometry = new THREE.Geometry();
	var material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide, vertexColors: THREE.FaceColors});

	//all these variables make variables based on JSON keys. 
	

	var depth = 3/5 * length;
	var depth1 = depth/3;
	var depth2 = depth/2.5;
	var depth3 = depth/2;
	var depth4 = depth/1.5;

	var ycoord1 = 2/5 * length;
	var ycoord2 = ycoord1 - ((1/4)*length)/Math.tan(bottom);
	var ycoord3 = ycoord2 - ((1/4)*length)/Math.tan(slope);
	var ycoord4 = ycoord3 - ((1/4)*length)/Math.tan(slope);
	var ycoord5 = ycoord4 - ((1/4)*length)/Math.tan(bottom);

	var bottom = ycoord5;

	var vegetationType;

	//Creates vertices, adds them to the vertices array
	geometry.vertices.push(
	//0 1 2 3 4
		new THREE.Vector3( - length/3,ycoord1,depth1),
		new THREE.Vector3(- length/6,ycoord2,depth2),
		new THREE.Vector3(0,ycoord3,depth3),
		new THREE.Vector3(length/6,ycoord4,depth4),
		new THREE.Vector3(length/3,ycoord5,depth),
	//5 6 7 8 9		
		new THREE.Vector3(-length/3,bottom,depth1),
		new THREE.Vector3(-length/6,bottom,depth2),
		new THREE.Vector3(0,bottom,depth3),
		new THREE.Vector3(length/6,bottom,depth4),
		new THREE.Vector3(length/3,bottom,depth),
	//10 11 12 13 14		
		new THREE.Vector3(-length/3,bottom,-depth1),
		new THREE.Vector3(-length/6,bottom,-depth2),
		new THREE.Vector3(0,bottom,-depth3),
		new THREE.Vector3(length/6,bottom,-depth4),
		new THREE.Vector3(length/3,bottom,-depth),
	//15 16 17 18 19
		new THREE.Vector3(-length/3,ycoord1,-depth1),
		new THREE.Vector3(-length/6,ycoord2,-depth2),
		new THREE.Vector3(0,ycoord3,-depth3),
		new THREE.Vector3(length/6,ycoord4,-depth4),
		new THREE.Vector3(length/3,ycoord5,-depth)
		);	

		var normal = new THREE.Vector3( 0, 1, 0 ); //optional
		var color = new THREE.Color( 0x236267 ); //optional
		var color2 = new THREE.Color(0xAA6E39);
		var color3 = new THREE.Color(0x684D34);
		var materialIndex = 0; //optional

//combines all of the vertices into faces, or triangles
		//front	
		var face1 = new THREE.Face3(0,1,6, normal, color2, materialIndex);
		var face2 = new THREE.Face3(0,6,5, normal, color2, materialIndex);

		var face3 = new THREE.Face3(1,2,7, normal, color2, materialIndex);
		var face4 = new THREE.Face3(1,7,6, normal, color2, materialIndex);
				
		var face5 = new THREE.Face3(2,3,8, normal, color2, materialIndex);
		var face6 = new THREE.Face3(2,8,7, normal, color2, materialIndex);
				
		var face7 = new THREE.Face3(3,4,9, normal, color2, materialIndex);
		var face8 = new THREE.Face3(3,9,8, normal, color2, materialIndex);
		//Bottoms
		var face9 = new THREE.Face3(5,14,9, normal, color3, materialIndex);
		var face10 = new THREE.Face3(5,10,14, normal, color3, materialIndex);
		//Back
		var face11 = new THREE.Face3(10,11,16, normal, color2, materialIndex);
		var face12 = new THREE.Face3(10,16,15, normal, color2, materialIndex);
		var face13 = new THREE.Face3(11,12,17, normal, color2, materialIndex);
		var face14 = new THREE.Face3(11,17,16, normal, color2, materialIndex);
		var face15 = new THREE.Face3(12,13,18, normal, color2, materialIndex);
		var face16 = new THREE.Face3(12,18,17, normal, color2, materialIndex);
		var face17 = new THREE.Face3(13,14,19, normal, color2, materialIndex);
		var face18 = new THREE.Face3(13,19,18, normal, color2, materialIndex);
		//Top		
		var face19 = new THREE.Face3(15,1,16, normal, color, materialIndex);
		var face20 = new THREE.Face3(15,0,1, normal, color, materialIndex);
		var face21 = new THREE.Face3(16,2,17, normal, color, materialIndex);
		var face22 = new THREE.Face3(16,1,2, normal, color, materialIndex);
		var face23 = new THREE.Face3(17,3,18, normal, color, materialIndex);
		var face24 = new THREE.Face3(17,2,3, normal, color, materialIndex);
		var face25 = new THREE.Face3(18,4,19, normal, color, materialIndex);
		var face26 = new THREE.Face3(18,3,4, normal, color, materialIndex);
//side1
		var face27 = new THREE.Face3(0,5,10, normal, color2, materialIndex);
		var face28 = new THREE.Face3(10,15,0, normal, color2, materialIndex);
//side 2
		var face29 = new THREE.Face3(14,4,9, normal, color, materialIndex);
		var face30 = new THREE.Face3(14,19,4, normal, color, materialIndex);


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
		geometry.faces.push(face25);
		geometry.faces.push(face26);
		geometry.faces.push(face27);
		geometry.faces.push(face28);
		geometry.faces.push(face29);
		geometry.faces.push(face30);

//don't know what these do but it's important apparently
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
//Combines the shape and the material to form our hillslope
		var object = new THREE.Mesh(geometry, material);
		scene.add(object);

//creates the functions which create the little shapes that compose 'vegetation'
var createForest = function(){
	var treeMaterial = new THREE.MeshBasicMaterial( {color: 0x005621} );

	var ygeometry1 = new THREE.CylinderGeometry(0.8, 8, 20, 32 );
	var cylinder1 = new THREE.Mesh( ygeometry1, treeMaterial );
	scene.add( cylinder1 );
	cylinder1.position.set(length/6,ycoord4 * 1.25, depth4/2);

	var ygeometry2 = new THREE.CylinderGeometry(0.8, 8, 20, 32 );
	var cylinder2 = new THREE.Mesh( ygeometry2, treeMaterial );
	scene.add( cylinder2 );
	cylinder2.position.set(0,ycoord3,-depth3/2);

	var ygeometry3 = new THREE.CylinderGeometry(0.8, 8, 20, 32 );
	var cylinder3 = new THREE.Mesh( ygeometry3, treeMaterial );
	scene.add( cylinder3 );
	cylinder3.position.set(- length/6,ycoord2,depth2/2);

	var ygeometry4 = new THREE.CylinderGeometry(0.8, 8, 20, 32 );
	var cylinder4 = new THREE.Mesh( ygeometry4, treeMaterial );
	scene.add( cylinder4 );
	cylinder4.position.set(- length/4,ycoord1 * 0.8,-depth1/2);

	var ygeometry5 = new THREE.CylinderGeometry(0.8, 8, 20, 32 );
	var cylinder5 = new THREE.Mesh( ygeometry5, treeMaterial );
	scene.add( cylinder5 );
	cylinder5.position.set(length/4, ycoord4, -depth/2);

	var ygeometry6 = new THREE.CylinderGeometry(0.8, 8, 20, 32 );
	var cylinder6 = new THREE.Mesh( ygeometry6, treeMaterial );
	scene.add( cylinder6 );
	cylinder6.position.set(length/4,ycoord4,depth - depth/3);
};

var createRange = function(){
	var treeMaterial = new THREE.MeshBasicMaterial( {color: 0x005621} );
	var shrubMaterial = new THREE.MeshBasicMaterial( {color: 0xdbbb51} );

	var shrubGeometry1 = new THREE.SphereGeometry( 6, 8, 8 );
	var shrub1 = new THREE.Mesh( shrubGeometry1, shrubMaterial );
	scene.add( shrub1 );
	shrub1.position.set(length/6,ycoord4 * 1.25, depth4/2);

	var shrubGeometry2 =  new THREE.SphereGeometry( 6, 8, 8 );
	var shrub2  = new THREE.Mesh( shrubGeometry2,shrubMaterial  );
	scene.add( shrub2 );
	shrub2 .position.set(0,ycoord3,-depth3/2);

	var treeGeometry3 = new THREE.CylinderGeometry(0.8, 8, 20, 32 );
	var cylinder3 = new THREE.Mesh( treeGeometry3, treeMaterial );
	scene.add( cylinder3 );
	cylinder3.position.set(- length/6,ycoord2,depth2/2);

	var shrubGeometry4 = new THREE.SphereGeometry( 6, 8, 8 );
	var shrub3 = new THREE.Mesh( shrubGeometry4, shrubMaterial );
	scene.add( shrub3 );
	shrub3.position.set(- length/4,ycoord1 * 0.8,-depth1/2);

	var shrubGeometry5 = new THREE.SphereGeometry( 6, 8, 8 );
	var shrub4 = new THREE.Mesh( shrubGeometry5, shrubMaterial );
	scene.add( shrub4 );
	shrub4.position.set(length/4, ycoord4/2, -depth/2);
 
	var ygeometry6 = new THREE.CylinderGeometry( 0.8, 8, 20, 32 );
	var cylinder6 = new THREE.Mesh( ygeometry6, treeMaterial );
	scene.add( cylinder6 );
	cylinder6.position.set(length/4,ycoord4,depth - depth/3);
};

var createChaparral = function(){
	var shrubMaterial = new THREE.MeshBasicMaterial( {color: 0xdbbb51} );
	
	var firstShrub = new THREE.SphereGeometry(  8, 8, 8 );
	var shrub1 = new THREE.Mesh( firstShrub, shrubMaterial );
	scene.add( shrub1 );
	shrub1.position.set(length/6,ycoord4 * 1.25, depth4/2);

	var secondShrub =  new THREE.SphereGeometry( 8, 8, 8 );
	var shrub2  = new THREE.Mesh( secondShrub,shrubMaterial  );
	scene.add( shrub2 );
	shrub2 .position.set(0,ycoord3,-depth3/2);

	var thirdShrub = new THREE.SphereGeometry( 8, 8, 8 );
	var shrub3 = new THREE.Mesh( thirdShrub, shrubMaterial );
	scene.add( shrub3 );
	shrub3.position.set(- length/4,ycoord1 * 0.8,-depth1/2);

	var fourthShrub = new THREE.SphereGeometry( 8, 8, 8 );
	var shrub4 = new THREE.Mesh( fourthShrub, shrubMaterial );
	scene.add( shrub4 );
	shrub4.position.set(length/4, ycoord4/2, -depth/2);
 	
 	var fifthShrub= new THREE.SphereGeometry( 8, 8, 8 );
	var shrub5 = new THREE.Mesh( fifthShrub, shrubMaterial );
	scene.add( shrub5 );
	shrub5.position.set(- length/6,ycoord2,depth2/2);
	
	var sixthShrub = new THREE.SphereGeometry( 8, 8, 8 );
	var shrub6 = new THREE.Mesh( sixthShrub, shrubMaterial );
	scene.add( shrub6 );
	shrub6.position.set(length/4,ycoord4/2,depth - depth/3);

};

//determines which shape-creation function to call & calls it
if(vegetationType === 'forest'){
	createForest();
}else if( vegetationType === 'range'){
	createRange();
}else if( vegetationType === 'chaparral'){
	createChaparral();
}else{
	console.log('404 not found');
}
//self explanatory
		var animate = function () {
			renderer.render( scene, camera );
			requestAnimationFrame( animate );
		};
		requestAnimationFrame( animate );
		animate();
};
