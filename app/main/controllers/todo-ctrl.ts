/// <reference path="../../../typings/main.d.ts" />

class TodoCtrl {
  private todo: String;
  constructor(
    private $ionicLoading: ionic.loading.IonicLoadingService,
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private TodoService: TodoService
  ) {
    this.$scope.$on('$ionicView.afterEnter', () => {
      if (!this.TodoService.todos.length) {
        this.getTodos();
      }
    });
  }

  public getTodos () {
    this.$ionicLoading.show();
    this.TodoService.getTodos()
      .catch((error) => console.error(error))
      .finally(this.$ionicLoading.hide);
  }

  public addTodo (todo: string) {
    if (!todo || (todo && !todo.length)) {
      return;
    }
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
