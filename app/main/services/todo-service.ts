/// <reference path="../../../typings/tsd.d.ts" />
module TodoService {

  export interface ITodo {
    id: string;
    description: string;
    createDate: number;
    done: boolean;
  }

  export class Todo {
    private $inject = ['$http', '$timeout', '$q'];
    private todos: Array<ITodo> = [];
    constructor (
      private $http: ng.IHttpService,
      private $timeout: ng.ITimeoutService,
      private $q: ng.IQService
    ) {
    }

    getTodos () {
      // add some delay to make it a more realistic http call
      return this.$http.get('main/assets/todos.json')
      .then((result:any) => this.$timeout(() => {
        result.data.forEach((item) => {
          this.todos.push(item);
        });
        return result.data;
      }, 1000));
    }

    getTodo (id) {
      return this.$q((resolve, reject) => {
        let _todos:any = this.todos;
        let result = _todos.find((element) => element.id === id);
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    }
  }

}

angular.module('main')
  .service('TodoService', TodoService.Todo);
