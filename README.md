# Angular2-Intro
This repo contains a demo project used for a presentation introducing angular 2 & typescript. It is set up to run with Spring Boot. For the moment the Spring Boot only serves the angular 2 application, but soon it will also be used as a rest service controller.

For now, we want to focus on building angular 2 applications and try to keep the build & module loading process as simple as possible.

The main project consists of two sub projects
- frontend: contains the Angular 2 code   
- backend:  a Maven project that contains the Spring Boot application

In order to run the application you will first need to set up the frontend project. In order to do so, you first have to follow these steps.

- Install node.js  
- Install typescript globally: npm install typescript -g. You invoke the typescript compiler by using "tsc" from now on.
- Install gulp globally: npm install gulp -g. 

After that you need to go to the frontend project where you will find 3 configuration files: gulp.json, package.json,, tsconfig.json.

package.json contains some information about the project and the dependencies of the project on javascrip & css libraries (the dev-dependencies are dependencies on build tools and you can ignore them for now)

First run "npm install" in the frontend directory. This will use package.json to download the necessary javascript & css libraries to the node_modules folder. If there is an update of angular 2, you can run "npm install angular2 --save", this will install the new version but also updates the package.json file with the new version number. For information about the used version system, you can go here https://github.com/npm/node-semver.





 




