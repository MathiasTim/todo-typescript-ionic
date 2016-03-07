/// <reference path="../../../typings/tsd.d.ts" />

class TodoDetailCtrl {
  public $inject = ['$ionicLoading', '$timeout', 'TodoService', '$scope'];
  todo: TodoService.ITodo;
  public service: any;
  constructor(
    private $ionicLoading: ionic.loading.IonicLoadingService,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $scope: ng.IScope,
    private $state: angular.ui.IStateService,
    public TodoService
  ) {
    this.$scope.$on('$ionicView.beforeEnter', () => {
      this.$ionicLoading.show();
      this.TodoService.getTodo(this.$state.params['id'])
      .then((todo) => this.todo = todo)
      .catch(() => {
        this.$ionicHistory.nextViewOptions({
          disableAnimate: true,
          historyRoot: true
        });
        this.$state.go('todos');
      })
      .finally(this.$ionicLoading.hide);
    });
    this.service = TodoService;
  }

  toggleTodo (todo) {
    todo.done = !todo.done;
  }
}

angular.module('main')
  .controller('TodoDetailCtrl', TodoDetailCtrl);
