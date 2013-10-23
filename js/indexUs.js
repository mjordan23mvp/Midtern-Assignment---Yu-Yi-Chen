var container, stats;
var camera, scene, projector, renderer;

init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.y = 300;
    camera.position.z = 500;

    scene = new THREE.Scene();

    var geometry = new THREE.CubeGeometry( 25, 25, 0 );
        
        for ( var i = 0; i < 60; i ++ ) {
            var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xFEFFCD, opacity: Math.random()*0.5 } ) );
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.scale.x = Math.random() * 2 + 1;
            object.scale.y = Math.random() * 2 + 1;
            object.scale.z = Math.random() * 2 + 1;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            scene.add( object );
        }

    projector = new THREE.Projector();

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '-100px';
    container.appendChild( stats.domElement );

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
    event.preventDefault();

    var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
    projector.unprojectVector( vector, camera );

    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {
        new TWEEN.Tween( intersects[ 0 ].object.position ).to({
            x: Math.random() * 800 - 400,
            y: Math.random() * 800 - 400,
            z: Math.random() * 800 - 400 }, 2000 )
            .easing( TWEEN.Easing.Elastic.Out).start();

        new TWEEN.Tween( intersects[ 0 ].object.rotation ).to({
            x: Math.random() * 1 * Math.PI,
            y: Math.random() * 1 * Math.PI,
            z: Math.random() * 1 * Math.PI }, 2000 )
            .easing( TWEEN.Easing.Elastic.Out).start();
    }
}

function animate() {
    requestAnimationFrame( animate );

    render();
    stats.update();
}

var radius = 500;
var theta = 0;

function render() {
    TWEEN.update();

    theta += 0.1;

    camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
    camera.lookAt( scene.position );

    renderer.render( scene, camera );

}