/// <reference path="../../../typings/main.d.ts" />

class TodoComponent {
  private todo: TodoModule.ITodo;

  public toggleTodo (event: TouchEvent) {
    event.stopImmediatePropagation();
    this.todo.done = !this.todo.done;
  }
};

angular.module('main')
.component('todoItem', {
  bindings: {
    todo: '='
  },
  controller: TodoComponent,
  controllerAs: 'todoC',
  template: `
    <button class="button button-clear icon"
      ng-class="{
        'ion-android-checkbox-outline': todoC.todo.done,
        'ion-android-checkbox-outline-blank': !todoC.todo.done
      }"
      ng-click="todoC.toggleTodo($event)">
    </button>
    {{todoC.todo.description}}
    <span class="item-note">
      {{todoC.todo.createDate|date:'shortDate'}}
    </span>
  `
});
