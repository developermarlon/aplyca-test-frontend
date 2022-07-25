import { Todo as TodoEntry, User as UserEntry, FormCreateTodo, FormEditTodo, JSONResponse } from "../ts/interfaces";
import { FormLogin } from "../ts/types";
import { endpoint_api } from "../config/api";
import { userStore } from "../stores/vuex/user";

export default class Todo {

  public constructor () {
  }


  public async getTodosByUser(id: number): Promise<TodoEntry[]> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/${id}/todos/`, {headers: {
        "Content-Type": "application/json",
        "Authorization": userStore.getters.getUser.token
      }});
      return await response.json() as TodoEntry[];
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  public async deleteTodo(userId: number, id: number ): Promise<TodoEntry[]> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/${userId}/todos/${id}`, {method: "DELETE", headers: {
        "Content-Type": "application/json",
        "Authorization": userStore.getters.getUser.token
      }});
      const {data, message} = await response.json() as JSONResponse;

      if (response.ok) {
        return data as TodoEntry[]
      }else{
        return Promise.reject({message});
      }
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  public async getTodosById(userId: number, id: number): Promise<TodoEntry[]> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/${userId}/todos/${id}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": userStore.getters.getUser.token
      }});
      return await response.json() as TodoEntry[];
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  public async createTodo(form: FormCreateTodo): Promise<TodoEntry>{
    try {
      const response = await this.fetchCreateTodo(form);
      const {data, message} = await response.json() as JSONResponse;

      if (response.ok) {
        return data
      }else{
        return Promise.reject({message});
      }
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  public async updateTodo(form: FormEditTodo): Promise<TodoEntry> {
    try {
      const response = await this.fetchUpdateTodo(form);
      const {data, message} = await response.json() as JSONResponse;

      if (response.ok) {
        return data as TodoEntry
      }else{
        return Promise.reject({message});
      }
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  private async fetchUpdateTodo(form: FormCreateTodo): Promise<JSONResponse> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/${form.userId}/todos/${form.id}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify({
          title: form.title,
          userId: form.userId,
          id: form.id
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": userStore.getters.getUser.token
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      return response;
    }catch(e: any) {
      console.log(e)
      throw new Error(e.message);
    }
  }

  private async fetchCreateTodo(form: FormCreateTodo): Promise<JSONResponse> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/${form.userId}/todos/create`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify({
          title: form.title
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": userStore.getters.getUser.token
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      return response;
    }catch(e: any) {
      console.log(e)
      throw new Error(e.message);
    }
  }
}