var gulp = require('gulp');
var del = require('del');
var os = require('os');
var childProcess = require('child_process');
var runSequence = require('run-sequence');

/**
 * The only tasks that you probably need are:
 *
 * - build : First cleans distribution folder, then adds libs, compiles typescript files and copies html resources to the distribution folder. The compilation expects
 * a tsconfig.json file.
 *
 * - build-watch-resources : First does a build and then watches changes in html resources. This should be used if your IDE does the incremental compilation.
 *
 * - build-watch : First does a build and then watches changes in typescript files and html resources. This should be used on the command line or if your IDE does not do do incremental
 * compilation or if you have switched it off.
 *
 * - setup-typings : This sets up the typings folder (angular2-related & rx at the moment). This should be used after an npm update of one of these libraries.
 *
 **/

var PATHS = {
    src: {
        html: 'src/**/*.html'
    },
    lib: [
        /* angular 2 libraries */
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        /* module loader (polyfill needed for ie) */
        'node_modules/systemjs/dist/system-csp-production.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        /* if you want to use rx, otherwise not necessary */
        'node_modules/@reactivex/rxjs/dist/global/Rx.js',
        /* included in order to use bootstrap */
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
    ],
    typings: 'typings',
    //dist: '../backend/src/main/resources/static/app'
    dist: 'dist'
};

function deleteFiles(fileList,done) {
    del(fileList, {force:true}, done);
}

gulp.task('clean-distribution', function (done) {
    deleteFiles([PATHS.dist],done);
});

gulp.task('clean-typings', function (done) {
    del(['typings'], {force:true},done);
});

/* This utility task compiles all typescript files by calling the tsc compiler. */
gulp.task('compile-all', function(done) {
    compile([],done);
});

/* This utility task compiles all typescript files and starts watching changes using the tsc compiler. */
gulp.task('compile-all-watch-ts', function(done) {
    compile(['--watch'],done);
});

function compile(args,done) {

    var isWindows = /^win/.test(os.platform());
    var command =  isWindows ?  "tsc.cmd" : "tsc";

    var child = childProcess.spawn(command,args);

    child.stdout.on('data', function (data) {
        process.stdout.write(data);
    });

    child.stderr.on('data', function (data) {
        process.stderr.write('Compilation failed with error: ' + data);
        process.exit();
    });

    child.on('exit', function (code) {
        process.stdout.write('Compilation finished with code: ' + code + '\n');
        done();
    });

}

gulp.task('clean-angular2-typings', function (callback) {
    del(['typings/angular2','typings/es6-shim','typings/jasmine'], {force:true},callback);
});

gulp.task('setup-angular2-typings', ['clean-angular2-typings'], function () {
    return gulp.src('node_modules/angular2/bundles/typings/**/*.d.ts').pipe(gulp.dest(PATHS.typings));
});

gulp.task('clean-rx-typings', function (callback) {
    del(['typings/rx'], {force:true},callback);
});

gulp.task('setup-rx-typings', ['clean-rx-typings'],function () {
    return gulp.src('node_modules/@reactivex/rxjs/dist/cjs/**/*.d.ts').pipe(gulp.dest(PATHS.typings+'/rx'));
});

gulp.task('setup-typings', function(callback) {
    runSequence(['setup-angular2-typings', 'setup-rx-typings'], callback);
});

gulp.task('build', function(callback) {
    runSequence('clean-distribution', ['copy-libs', 'copy-html','compile-all'], callback);
});

gulp.task('build-watch-ts', function(callback) {
    runSequence('clean-distribution', ['copy-libs', 'copy-html','compile-all-watch-ts'], callback);
});

gulp.task('copy-html', function () {
    return gulp.src(PATHS.src.html).pipe(gulp.dest(PATHS.dist));
});

gulp.task('copy-libs', function () {
    return gulp.src(PATHS.lib).pipe(gulp.dest(PATHS.dist + '/lib'));
});

function watchResources() {
    gulp.watch(PATHS.src.html, ['copy-html']);
}

gulp.task('watch-resources',  function () {
    watchResources();
});

gulp.task('build-watch-resources', ['build'], function() {
    watchResources();
});

gulp.task('build-watch', ['build-watch-ts'], function() {
    watchResources();
});

