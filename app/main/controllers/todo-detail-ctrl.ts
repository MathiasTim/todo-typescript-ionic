/// <reference path="../../../typings/main.d.ts" />

class TodoDetailCtrl {
  private todo: any;
  constructor(
    private $ionicLoading: ionic.loading.IonicLoadingService,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $scope: ng.IScope,
    private $state: angular.ui.IStateService,
    private TodoService: TodoService
  ) {
    this.$scope.$on('$ionicView.beforeEnter', () => this.getTodo(this.$state.params));
  }

  public getTodo (params: any) {
    this.$ionicLoading.show();
    this.TodoService.getTodo(params.id)
    .then((todo) => this.todo = todo)
    .catch(() => {
      this.$ionicHistory.nextViewOptions({
        disableAnimate: true,
        historyRoot: true
      });
      this.$state.go('todos');
    })
    .finally(this.$ionicLoading.hide);
  }

  public toggleTodo (todo: TodoModule.ITodo) {
    todo.done = !todo.done;
  }
}

angular.module('main')
  .controller('TodoDetailCtrl', TodoDetailCtrl);
