# POC to use anuglar2/ionic2 parts with angular1/ionic1
Implementing a really simple todo app with generator-m-ionic v1.6.0

## Step 1: Add the typescript parts

install gulp-tsc, gulp-tslint and tslint module
```
  $ npm install gulp-tsc gulp-tslint tslint --save-dev
```
Hint: Make sure you have no global typescript installed, otherwise the global library will maybe not match the gulp task

add [core-js](https://github.com/zloirock/core-js)
```
 $ bower install core.js --save
```
install typings module and typings for ionic, angular, jquery, cordova, angular-ui-router, core-js
```
  $ npm install -g typings
  $ typings install ionic angular jquery cordova angular-ui-router core-js --save --ambient
```
add tsconfig.json
- See [tsconfig.json](./tsconfig.json) here in the root for detailed configuration

add tslint.json (most rules are adopted to work similar as the ESLint rules)
 - See [tslint.json](./tslint.json) here in the root for detailed configuration

## Step 2: Modify the watch/build process
changes to gulpfile.js
```js
  jsFiles: ['app/.tmp/**/*.js', '!app/bower_components/**/*.js'], // new .tmp path (sourcemaps wont work otherwise)
  tsFiles: ['app/**/*.ts'],
```
changes to gulp/injecting.js
```js
var typescript = require('gulp-tsc'); // load gulp-tsc
var fs = require('fs'); // load fs

gulp.task('inject-all', ['compile', // add the compile task to inject-all

$.inject( // app/.tmp/**/*.js files
  gulp.src('app/.tmp/**/*.js') // change the path to the new .tmp path
    ...
  {
    ignorePath: '../app/.tmp', // add the ignorePath
    relative: true
  }))

// build typescript to tmp
gulp.task('compile', function () { // add the compile task
  var tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json'));
  return gulp.src(paths.tsFiles)
  .pipe(typescript(tsconfig.compilerOptions))
  .pipe(gulp.dest('app/.tmp/'));
});
```
changes to gulp/watching.js
```js
// watch for changes in ts
gulp.watch(paths.tsFiles, ['compile']); // add the watcher for ts files
```
changes to gulp/building.js
```js
// add the js temp folder to the clean task
return gulp.src(['.tmp', 'app/.tmp', paths.dist + '/*'])
```
changes to gulp/linting.js
```js
gulp.task('linting', ['eslint', 'tslint', 'jsonlint']); // add tslint task
gulp.task('linting-throw', ['eslint-throw', 'tslint-throw', 'jsonlint-throw']); // add tslint-throw task

// add the new tslint function with the tasks below

// check app and test for tslint errors
var tslint = function (fail) {
  fail = fail || false;
  return function () {
    return gulp.src(paths.tsFiles)
      .pipe($.tslint())
      .pipe($.tslint.report('prose', {emitError: fail}));

  };
};
gulp.task('tslint', tslint());
gulp.task('tslint-throw', tslint(true));
```

changes to .gitignore
```
#typescript
/typings/
/app/.tmp/
```
## Step 3: transform existing .js files to .ts
change the file extension from .js to .ts (yes, thats it)
to get typing information add the following 'comment' to your files.
(beware to check the path, it should match the `typings` folder in the root)
```
/// <reference path="../typings/main.d.ts" />
```
changes to app.ts
```ts
/// <reference path="../typings/main.d.ts" />
'use strict';
angular.module('ToDo', [
  'ionic',
  'ngCordova',
  'ui.router',
  'main'
]);
```
changes to main.ts
```ts
/// <reference path="../../typings/main.d.ts" />
'use strict';

class Routes {
  constructor (
    private $stateProvider: angular.ui.IStateProvider,
    private $urlRouterProvider: angular.ui.IUrlRouterProvider
  ) {
    // ROUTING with ui.router
    this.$urlRouterProvider.otherwise('/main');

    this.$stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      template: '<ion-view view-title="main"></ion-view>',
      // templateUrl: 'main/templates/<someTemplate>.html',
      // controller: 'SomeCtrl as ctrl'
    });
  }
}

angular.module('main', [])
.config(($stateProvider, $urlRouterProvider) =>
  new Routes($stateProvider, $urlRouterProvider));
```
## Step 4: Implement the app (see sourcecode)

Links:
 - [ionic typescript blog](http://blog.ionic.io/ionic-and-typescript-part-1/)
 - [ionic typescript repo](https://github.com/driftyco/ionic-typescript-example)
 - [angularjs with typescript](https://angularjs.de/artikel/angularjs-und-typescript)
 - [more on components](https://toddmotto.com/exploring-the-angular-1-5-component-method/)
 - further reading (not covered by the POC)
  - [thoughtram on ES6 in angularjs](http://blog.thoughtram.io/angularjs/es6/2015/01/23/exploring-angular-1.3-using-es6.html)
  - [thoughtram on ng-upgrade](http://blog.thoughtram.io/angular/2015/10/24/upgrading-apps-to-angular-2-using-ngupgrade.html)
  - [ng-forward](https://github.com/ngUpgraders/ng-forward)
  - [ng-metadata](https://www.youtube.com/watch?v=fqWtyMEgtCc)

# Generator-M-Ionic v1.6.0

[![NPM version](http://img.shields.io/npm/v/generator-m-ionic.svg?style=flat-square)][npm-url]
[![Coverage Status](http://img.shields.io/coveralls/mwaylabs/generator-m-ionic/master.svg?style=flat-square)][coveralls-url]
[![Build Status](https://img.shields.io/travis/mwaylabs/generator-m-ionic/master.svg?style=flat-square)][travis-url]
[![Dependency Status](http://img.shields.io/david/mwaylabs/generator-m-ionic/master.svg?style=flat-square)][daviddm-url]
[![Download Month](http://img.shields.io/npm/dm/generator-m-ionic.svg?style=flat-square)][npm-url]

[npm-url]: https://npmjs.org/package/generator-m-ionic
[coveralls-url]: https://coveralls.io/r/mwaylabs/generator-m-ionic?branch=master
[travis-url]: https://travis-ci.org/mwaylabs/generator-m-ionic
[daviddm-url]: https://david-dm.org/mwaylabs/generator-m-ionic

Development:

[![Dev Coverage Status](http://img.shields.io/coveralls/mwaylabs/generator-m-ionic/dev.svg?style=flat-square)][coveralls-url]
[![Dev Build Status](https://img.shields.io/travis/mwaylabs/generator-m-ionic/dev.svg?style=flat-square)][travis-url]
[![Dev Dependency Status](http://img.shields.io/david/mwaylabs/generator-m-ionic/dev.svg?style=flat-square)](https://david-dm.org/mwaylabs/generator-m-ionic/dev)


## Why you need it
> Build mobile Cordova/PhoneGap apps quickly with the tools you love:
Yeoman, Gulp, Bower, AngularJS, Ionic & of course Cordova. All in one sexy generator.

### What's in the box

<p align="center">
  <a href="http://yeoman.io/" target="_blank" alt="yeoman" title="yeoman">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041228/c1f91cac-ac7a-11e4-9c85-1a5298e29067.png">
  </a>
  <a href="http://gulpjs.com/" target="_blank" alt="gulp" title="gulp">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9409728/c5332474-481c-11e5-9a6e-74641a0f1782.png">
  </a>
  <a href="http://bower.io/" target="_blank" alt="bower" title="bower">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041250/ef9a78b8-ac7a-11e4-9586-7e7e894e201e.png">
  </a>
  <a href="https://angularjs.org/" target="_blank" alt="angular" title="angular">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041199/5978cb96-ac7a-11e4-9568-829e2ea4312f.png">
  </a>
  <a href="http://ionicframework.com/" target="_blank" alt="ionic" title="ionic">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041296/59c5717a-ac7b-11e4-9d5d-9c5232aace64.png">
  </a>
  <a href="http://cordova.apache.org/" target="_blank" alt="cordova" title="cordova">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041269/20ed1196-ac7b-11e4-8707-68fa331f1aeb.png">
  </a>
  <br>
  <br>
  <a href="http://sass-lang.com/" target="_blank" alt="sass" title="sass">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410121/c330a3de-481e-11e5-8a69-ca0c56f6cabc.png">
  </a>
  <a href="http://karma-runner.github.io/" target="_blank" alt="karma" title="karma">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410216/44fef8fc-481f-11e5-8037-2f7f03678f4c.png">
  </a>
  <a href="http://jasmine.github.io/" target="_blank" alt="jasmine" title="jasmine">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410153/ebd46a00-481e-11e5-9864-f00fa8427d17.png">
  </a>
  <a href="https://angular.github.io/protractor/#/" target="_blank" alt="protractor" title="protractor">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410114/b99aaa9a-481e-11e5-8655-ebc1e324200d.png">
  </a>
</p>

## Introduction
- More on: [Why you need it](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/intro/why_you_need_it.md)
- More on: [What's in the box](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/intro/whats_in_the_box.md)

## Quick Start
- [Quick Start](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/intro/quick_start.md) for the experienced developer.
- [Try the demo](https://github.com/mwaylabs/generator-m-ionic-demo). Get a quick impression by cloning the sample project generated with the latest version of Generator-M-Ionic.

## Get started
- [Installation and Prerequisites](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/start/installation_prerequisites.md)
- [Development Introduction](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/start/development_intro.md)
- [File structure](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/start/file_structure.md)

## Guides

**Generation**
- Using Ionic's [CSS or SASS](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/ionic_css_or_sass.md)?
- [Sub-generators](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/sub_generators.md) for adding new components.

**App Development**
- [Developing on Windows](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/windows.md), what you need to know.
- [Git integration](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/git_integration.md), see how it's done.
- [SASS integration](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/sass_integration.md) in our module concept.
- [Bower Component Usage](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/bower_component_usage.md) in our module concept.
- [Gulp defaults](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/gulp_defaults.md), spare power users some tedious typing on the command line.

**Quality**
- [ESLint](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/eslint.md) code style checks and setting up your IDE/Editor.
- [Testing](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/testing.md) with our testing workflows.

**Continuous Integration and Delivery**
- [App Icons and splash screens](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/icons_splash_screens.md), a simple setup or different sets for different builds - all is possible.
- [Use Environments](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/environments.md) manage different API Endpoints and much more with just a single parameter.
- [Build Vars](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/build_vars.md), inject vars into your app at build time.
- [Programmatically change the `config.xml`](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/guides/programmatically_change_configxml.md), an essential part for a successful continuous integration setup. Add environments and build vars for a full blown continuous integration use case!

## Generator Insights
We've published 3 blog articles on our company blog delivering deep insights into the why and how of the generator:
- September 2015: [Generator-M-Ionic and the search for the holy grail](http://blog.mwaysolutions.com/2015/09/21/generator-m-ionic-and-the-search-for-the-holy-grail/)
  - rather **technical comparison** between the generator and similar tools as well as technical insights to the **decisions and motivation** behind the generator
- September 2015: [Generator-M-Ionic: HTML5 mobile app development evolved](http://blog.mwaysolutions.com/2015/09/10/generator-m-ionic-html5-mobile-app-development-evolved/)
    - provides insight to the **technology choices and ecosystem** and the **benefits of using the generator**
- March 2015: [Generator-M: the state of HTML5 mobile app development at M-Way](http://blog.mwaysolutions.com/2015/03/26/generator-m-the-state-of-html5-mobile-app-development-at-m-way/)
  - the **origins** of the generator development and **company strategy**


## Questions, Issues? Talk to us!
Do the following:
 1. check out our [FAQ](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/contribute/faq.md) and [issues](https://github.com/mwaylabs/generator-m-ionic/issues) see if there already is a solution or answer to that matter.
 2. [![Join the chat at https://gitter.im/mwaylabs/generator-m-ionic](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mwaylabs/generator-m-ionic?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  ask other developers and our core team on [gitter](https://gitter.im/mwaylabs/generator-m-ionic) if you're not sure how to proceed.
 3. If all fails create a [new issue](https://github.com/mwaylabs/generator-m-ionic/issues/new).
- **Important**: we and others can help you a lot quicker if you provide a sample repo that we can clone. With step by step instructions on how to reproduce your error.

## Want to contribute?
Start by reading our:

1. [Mission Statement](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/contribute/mission_statement.md)
2. [Contribution Guide](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/contribute/contribution_guide.md)


## License
Code licensed under MIT. Docs under Apache 2. PhoneGap is a trademark of Adobe.
