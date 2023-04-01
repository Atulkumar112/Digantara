import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"; // this is for i can move it in every diraction as i want

const scene = new THREE.Scene();  // thi sis a scene which i need to see like car, game body etc
// scene.background = new THREE.Color(0.5, 0.5, 0.5);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// 75 is an angle,     
camera.position.z=50;  // size of object or distance b/w my eye and object

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

//light of side
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

//point Light
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(6, 0, 3);
scene.add(pointLight);

// below shap is for earth 
const geometry = new THREE.SphereGeometry(15, 32, 32);  // givne width, hight, depth

const texture = new THREE.TextureLoader().load("earth with cloud.jpg");

const material = new THREE.MeshStandardMaterial({
  // color:'red',
  map: texture,
  // map: texture1,
  roughness:0.5,
  metalness:0.1,
 });
const earth = new THREE.Mesh(geometry, material);  // mesh for you compelte body 

scene.add(earth);

// for creating a spare who looks like sun
const lightGeometry = new THREE.IcosahedronGeometry(1, 15);  // this is for sun
// const lightGeometry = new THREE.SphereGeometry(1, 32, 16);
const lightMaterial = new THREE.MeshBasicMaterial({color: "#FDB813"});

const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);

lightSphere.position.set(6, 0, 3);
scene.add(lightSphere);


//creating object of orbitCortrol
const controls = new OrbitControls(camera, renderer.domElement);

//-------- CREATING A MULTILE OBJECTS
const objectGeometry = new THREE.IcosahedronGeometry(1, 15);
const objectMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const objectMesh = new THREE.InstancedMesh(objectGeometry, objectMaterial, 100);
objectMesh.position.set(6, 0, 3);
scene.add(objectMesh);


// third object
const objectGeometry3 = new THREE.IcosahedronGeometry(1, 15);
const objectMaterial3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const objectMesh3 = new THREE.InstancedMesh(objectGeometry3, objectMaterial3, 100);
objectMesh3.position.set(6, 0, 3);
scene.add(objectMesh3);



//--------------------------------------------------------------------------------------------------------------------
// Load the CSV file with the coordinates

var data;

// Load the CSV file using fetch
fetch('Digantara - test_data.csv')
  .then(response => response.text())
  .then(text => {
    // Parse the CSV data using Papa Parse
    data = Papa.parse(text).data;

    // Iterate through the data and create a cube for each row
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var cube = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var mesh = new THREE.Mesh(cube, material);
      mesh.position.set(row[2], row[3], row[4]);
      console.log(row[2], row[3], row[4]);
      scene.add(mesh);
    }
  });
//--------------------------------------------------------------------------------------------------------------

// below is the short code of above code using sin0

let theeta =0;   
animate();
// just for moving in x,y and z axis
function animate(){
    controls.update();

    theeta+=0.01;
    let sin0 = Math.sin(theeta);
    let cos0 = Math.cos(theeta);

    // earth.position.x = 3*sin0;

    let scalledCos = 100*cos0;
    let scalledSin = 100*sin0;

    // pointLight.position.set(scalledCos, 0, scalledSin);  
    // lightSphere.position.set(scalledCos, 0, scalledSin);
    pointLight.position.set(30*sin0, 0, 30*cos0);  
    lightSphere.position.set(scalledSin, 0, scalledCos);
    
    objectMesh.position.set(0,scalledSin, scalledCos);
    objectMesh3.position.set(0,scalledCos, scalledSin);

    
    // mesh.position.set(6764.306465*sin0,	278.4093188*sin0,	285.5082081*sin0);
    // mesh.position.set(30*sin0, 0, 30*cos0);

    // earth.rotation.x +=0.01;
    earth.rotation.y +=0.001;
    // earth.rotation.z +=0.01;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}
