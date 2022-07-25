import { UserLogged, UserCreated, FormCreateUser, User as UserEntry, JSONResponse } from "../ts/interfaces";
import { FormLogin } from "../ts/types";
import { endpoint_api } from "../config/api";
import { userStore } from "../stores/vuex/user";

export default class User {

  public constructor () {
  }

  public async verifyToken(): Promise<boolean> {
    const response = await this.fetchToken();

    if (response.ok) {
      return true
    }else{
      return false;
    }
  }

  public async getAllUsers(): Promise<UserEntry[]> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/getAllUsers`, {headers: {
        "Content-Type": "application/json",
        "Authorization": userStore.getters.getUser.token
      }});
      const {data} = await response.json() as JSONResponse;
      return data
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  public async loginApi(form: FormLogin): Promise<UserLogged> {
    try {
      const response = await this.fetchUser(form);
      const {data, message} = await response.json() as JSONResponse;

      if (response.ok) {
        const userLogged: UserLogged = Object.assign(data, {
          loggedAt: new Date(),
        });

        return userLogged
      }else{
        return Promise.reject({message});
      }
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  public async createUser(form: FormCreateUser): Promise<UserCreated> {
    try {
      const response = await this.fetchCreateUser(form);
      const {data, message} = await response.json() as JSONResponse;

      if (response.ok) {
        const userCreated: UserCreated = Object.assign(data, {
          createdAt: new Date(),
        });

        return userCreated
      }else{
        return Promise.reject({message});
      }
    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  private async fetchToken(): Promise<JSONResponse> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/verifyToken/`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
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

  private async fetchUser({email, password}: FormLogin): Promise<JSONResponse> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/login/`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
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

  private async fetchCreateUser(userCreate: FormLogin): Promise<JSONResponse> {
    try {
      const response: JSONResponse = await fetch(`${endpoint_api}/users/create/`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userCreate),
        cache: "no-cache",
        credentials: "same-origin",
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