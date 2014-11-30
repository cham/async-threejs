async-threejs
=============

Slides and demos for my asyncjs talk on WebGL and three.js, January 2015

Lights, camera, objects
-----------------------

a-simple-scene.html
- scenes are containers for your three.js objects. You can have multiple scenes, but usually you only need one.
- we'll need a camera to take pictures of our scene. As with scenes, you'll often only need one of these. There are a few different types of camera, PerspectiveCamera will give you a 'natural' look. It takes 4 arguments - the field of view, the view aspect, the 'near' cutoff and the 'far' cutoff.
- a renderer renders the objects in our scene to the screen. There are 3 renderers - CSS, Canvas and WebGL. We'll only deal with the WebGL renderer for this talk.
- after initialising our scene, camera and renderer, we set the size of the renderer, render the scene, and append the domElement of the renderer to the body of our HTML document.
- the rather exciting result is a black screen, as we've not added anything to our scene yet!
- you can change the background colour of our render via renderer.setClearColor(hex);

a-less-simple-scene.html
- our scene works but is a bit boring, there's nothing in it!
- let's add a sphere to start
- object meshes in Three are composed of two things - a Geometry and a Material
- think of geometry as the shape and material as the paint
- when these are combined, we have a Mesh that can be added to the scene
- spheres take 7 arguments, for a basic sphere you only need the first argument, the radius
- the next two arguments define the number of horizontal and vertical segments
- the next four arguments are required to make sphere slices, if you just want a part of a sphere
- after we have defined our Geometry, it's time to paint it with a Material
- a MeshBasicMaterial defines a basic material
- this material does not require lighting, and just paints it the colour we've specified
- I've moved the camera back, as otherwise it would be inside the sphere
- when rendered, we can see the sphere on the screen.
- it looks like a circle since the basic material does not show any shading, if we turn on wireframes then it's a bit clearer what's going on

a-lit-scene
- if we want anything other than basic materials then we're going to need some lights
- there are a bunch of different lights in Three that all work in different ways
- in this example we've used a SpotLight, which has a position and shines a cone of light on a target
- SpotLights take up to 5 arguments, their colour, their intensity, the distance they illuminate for (default 0 = infinity), the angle of the cone, and the rate at which the light falls off if distance is not 0
- in our lit scene example, we position the spotlight at 1000,1000,1000. The default target will be 0,0,0 which is where our sphere is
- I've changed the material the sphere uses to a Lambert material so that the light affects it. I'll cover materials in more detail later.
- if we now render the scene, we can see our sphere with some shading applied
