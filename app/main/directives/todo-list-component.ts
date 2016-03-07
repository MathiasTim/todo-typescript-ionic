/// <reference path="../../../typings/tsd.d.ts" />

class TodoComponent {
  private item: any;
  constructor () {}

  toggleTodo (todo, event: TouchEvent) {
    event.stopImmediatePropagation();
    todo.done = !todo.done;
  }
};

angular.module('main')
.component('todoItem', {
  bindings: {
    item: '='
  },
  controller: TodoComponent,
  controllerAs: 'todoC',
  template: `
    <button class="button button-clear icon"
      ng-class="{
        'ion-android-checkbox-outline': todoC.item.done,
        'ion-android-checkbox-outline-blank': !todoC.item.done
      }"
      ng-click="todoC.toggleTodo(todoC.item, $event)">
    </button>
    {{todoC.item.description}}
    <span class="item-note">
      {{todoC.item.createDate|date:'shortDate'}}
    </span>
  `
});
