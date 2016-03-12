/// <reference path="../../../typings/main.d.ts" />
module TodoModule {
  'use strict';
  export interface ITodo {
    id: string;
    description: string;
    createDate: number;
    done: boolean;
  }
}

class TodoService {
  public todos: Array<TodoModule.ITodo> = [];
  constructor (
    private $http: ng.IHttpService,
    private $timeout: ng.ITimeoutService,
    private $q: ng.IQService,
    private Config: any
  ) {}

  public getTodos () {
    let url: string = this.Config.ENV.SERVER_URL;
    // add some delay to make it a more realistic http call
    return this.$http.get(`${url}todos.json`)
    .then((result: any) => this.$timeout(() => {
      result.data.forEach((item) => {
        this.todos.push(item);
      });
      return result.data;
    }, 1000));
  }

  public getTodo (id: string) {
    return this.$q((resolve, reject) => {
      let todo: TodoModule.ITodo = this.todos.find((element) => element.id === id);
      if (todo) {
        resolve(todo);
      } else {
        reject(todo);
      }
    });
  }
}

angular.module('main')
  .service('TodoService', TodoService);
