/// <reference path="../../typings/tsd.d.ts" />
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
