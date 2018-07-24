var InitDemo= function(){
	console.log("This is working");
	//Finds the canvas
	//Initializes webGL
	var canvas = document.getElementById("Surface");
	var gl = canvas.getContext("webgl");
	var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
				camera.position.set( 10, 10, 40 );

		var controls = new THREE.OrbitControls( camera );
				controls.target.set( 0, 0, 2 );
				controls.update();

		var renderer = new THREE.WebGLRenderer({canvas:Surface});
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		var geometry = new THREE.Geometry();
		var material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide, vertexColors: THREE.FaceColors});

		var bottom = -2;

		var width = 25; 
		var depth = 15;
		var depth1= depth/3;
		var depth2=depth/2.5;
		var depth3=depth/2;
		var depth4=depth/1.5;

		var ycoord1 = 9;
		var ycoord2 = 6;
		var ycoord3 = 4;
		var ycoord4 = 2;
		var ycoord5 = 0;

		geometry.vertices.push(
			//0 1 2 3 4
				new THREE.Vector3( - width/3,ycoord1,depth1),
				new THREE.Vector3(- width/6,ycoord2,depth2),
				new THREE.Vector3(0,ycoord3,depth3),
				new THREE.Vector3(width/6,ycoord4,depth4),
				new THREE.Vector3(width/3,ycoord5,depth),
			//5 6 7 8 9		
				new THREE.Vector3(-width/3,bottom,depth1),
				new THREE.Vector3(-width/6,bottom,depth2),
				new THREE.Vector3(0,bottom,depth3),
				new THREE.Vector3(width/6,bottom,depth4),
				new THREE.Vector3(width/3,bottom,depth),
			//10 11 12 13 14		
				new THREE.Vector3(-width/3,bottom,-depth1),
				new THREE.Vector3(-width/6,bottom,-depth2),
				new THREE.Vector3(0,bottom,-depth3),
				new THREE.Vector3(width/6,bottom,-depth4),
				new THREE.Vector3(width/3,bottom,-depth),
			//15 16 17 18 19
				new THREE.Vector3(-width/3,ycoord1,-depth1),
				new THREE.Vector3(-width/6,ycoord2,-depth2),
				new THREE.Vector3(0,ycoord3,-depth3),
				new THREE.Vector3(width/6,ycoord4,-depth4),
				new THREE.Vector3(width/3,ycoord5,-depth),
			//20 21
				new THREE.Vector3(-width/3,(ycoord1/2),depth1),
				new THREE.Vector3(-width/3,(ycoord1/2),-depth1)
				);	

				var normal = new THREE.Vector3( 0, 1, 0 ); //optional
				var color = new THREE.Color( 0x236267 ); //optional
				var color2 = new THREE.Color(0xAA6E39);
				var color3 = new THREE.Color(0x684D34);
				var materialIndex = 0; //optional
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
				var face27 = new THREE.Face3(0,15,21, normal, color2, materialIndex);
				var face28 = new THREE.Face3(0,21,20, normal, color2, materialIndex);
				var face29 = new THREE.Face3(20,21,10, normal, color2, materialIndex);
				var face30 = new THREE.Face3(20,10,5, normal, color2, materialIndex);
		//side 2
				var face31 = new THREE.Face3(14,4,9, normal, color, materialIndex);
				var face32 = new THREE.Face3(14,19,4, normal, color, materialIndex);
			
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
				geometry.faces.push(face31);
				geometry.faces.push(face32);
				
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();
				var object = new THREE.Mesh(geometry, material);
				scene.add(object);

				var animate = function () {
					renderer.render( scene, camera );
					requestAnimationFrame( animate );
				};
				requestAnimationFrame( animate );
				animate();
};
