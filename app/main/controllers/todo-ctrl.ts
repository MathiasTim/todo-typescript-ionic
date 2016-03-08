/// <reference path="../../../typings/tsd.d.ts" />

class TodoCtrl {
  public $inject = ['$ionicLoading', '$timeout', 'TodoService', '$scope'];
  todo: String;
  public service: any;
  constructor(
    private $ionicLoading: ionic.loading.IonicLoadingService,
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private TodoService: TodoService.Todo
  ) {
    this.$scope.$on('$ionicView.afterEnter', () => {
      if (!this.TodoService.todos.length) {
        this.getTodos();
      }
    });
  }

  getTodos () {
    this.$ionicLoading.show();
    this.TodoService.getTodos()
      .catch((error) => console.error(error))
      .finally(() => this.$ionicLoading.hide());
  }

  addTodo (todo) {
    this.TodoService.todos.push({
      id: Date.now().toString(),
      description: todo,
      createDate: Date.now(),
      done: false
    });
    this.todo = '';
  }
}

angular.module('main')
  .controller('TodoCtrl', TodoCtrl);
