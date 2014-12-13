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

multiple-spheres
- it's pretty easy to add multiple spheres to our scene
- I've added a new method called "randomlyPositionedSphere", which calls sphere() as with our last example, but also sets the position of our sphere
- the position is just a random place within the range specified with maxPosition, in all three axes
- then it's just a case of adding a randomlyPositionedSphere to the scene 100 times with a for loop


Simple Animation
----------------

circular-motion
- a bit of maths!
- to plot the path of a circle, we can use a sine and cosine wave
- a sine wave for one of the axes, and a cosine wave for the other axis
- if both axes use a sine wave, or both use a cosine wave, then we get a nicely eased, but linear line
- let's look at using this for the camera position in our spheres scene

moving-camera
- up until now we've only rendered the scene once
- if we're going to have any animation in the scene then we'll need to render multiple times
- requestAnimationFrame will allow us to render our scene up to 60 times per second
- we create a tick function, that positions the camera, renders the scene, increments a tick counter, then schedules another call to itself with requestAnimationFrame
- it's necessary to tell the camera where to look after we've moved it, or it keep facing forward when moved rather than tracking 0, 0, 0
- in order to move the camera in a circle, we set the x coordinate to a position on a sine wave, and the z coordinate to a position on a cosine wave, as we saw in the previous example
- et voila!

more-complicated-paths
- here I've increased the period of the x coordinate
- this means that we'll be drawing 3 circles per iteration in x, and 1 in y
- the result of this is a helix type path

moving-camera-2
- if we apply our helix path to the position of the camera we get the following result

moving-camera-moving-objects
- in this example, the spheres have a random size between 0 and 50 when created
- I've also given them a 'speed' attribute when they are made
- the speed of each sphere is random in each axis
- then on each tick, we increase the x, y and z coordinate of each sphere based on a sine wave and the speed we gave it when it was created
- this results in a moving cloud of spheres


Objects
-------

planes

vertices

faces

boxes

circles

spheres

rings

tori

torusknots

cylinders

cones

pyramids

tetrahedrons

icosahedrons

octahedrons


Importing Objects
-----------------
examples from tf3dm.com


A better sandbox
----------------


Materials
---------



