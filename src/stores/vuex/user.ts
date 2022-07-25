import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

const ls = new SecureLS({isCompression: false})

export interface User {
  name: string | null,
  username: string | null,
  email: string | null,
  photo?: string | null,
  token: string | null
}

export const keyUserStore: InjectionKey<Store<User>> = Symbol()

export const userStore = createStore<User>({
  state: {
    name: null,
    username: null,
    email: null,
    photo: null,
    token: null
  },
  getters: {
    getUser(state) {
      return state
    }
  },
  actions: {
    openSesion({ commit }, data) {
      commit('openSesion', data)
    },
    closeSesion({ commit }) {
      commit('closeSesion')
    }
  },
  mutations: {
    openSesion(state, data) {
      state.name = data.name
      state.username = data.username
      state.email = data.email
      state.token = data.token
      state.token = data.token
    },
    closeSesion(state, data) {
      state.name = null
      state.username = null
      state.email = null
      state.token = null
      state.photo = null
    }
  },
  plugins: [createPersistedState({
    storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
    }
})
  ]
})

export function useStore () {
  return baseUseStore(keyUserStore)
}