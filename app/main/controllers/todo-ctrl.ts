/// <reference path="../../../typings/tsd.d.ts" />

class TodoCtrl {
  public $inject = ['$ionicLoading', '$timeout', 'TodoService', '$scope'];
  todo: String;
  public service: any;
  constructor(
    private $ionicLoading: ionic.loading.IonicLoadingService,
    private $scope: ng.IScope,
    public TodoService
  ) {
    this.$scope.$on('$ionicView.afterEnter', () => {
      if (!this.TodoService.todos.length) {
        this.getTodos();
      }
    });
    this.service = TodoService;
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

  toggleTodo (todo, event: TouchEvent) {
    event.stopImmediatePropagation();
    todo.done = !todo.done;
  }
}

angular.module('main')
  .controller('TodoCtrl', TodoCtrl);