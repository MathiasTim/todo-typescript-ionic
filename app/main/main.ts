/// <reference path="../../typings/main.d.ts" />
'use strict';

class Routes {
  constructor (
    private $stateProvider: angular.ui.IStateProvider,
    private $urlRouterProvider: angular.ui.IUrlRouterProvider
  ) {
    // ROUTING with ui.router
    this.$urlRouterProvider.otherwise('/todos');

    this.$stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('todos', {
      url: '/todos',
      templateUrl: 'main/templates/todo-list.html',
      controller: 'TodoCtrl as todoC'
    })
    .state('todoDetail', {
      url: '/todos/:id',
      templateUrl: 'main/templates/todo-detail.html',
      controller: 'TodoDetailCtrl as todoDetailC'
    });
  }
}

angular.module('main', [])
.config(($stateProvider, $urlRouterProvider) =>
  new Routes($stateProvider, $urlRouterProvider))
.config(($ionicConfigProvider: ionic.utility.IonicConfigProvider) => {
  $ionicConfigProvider.scrolling.jsScrolling(false);
});
