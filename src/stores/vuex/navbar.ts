import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"

export interface  State {
  open: boolean
}

export const keyNavbarStore: InjectionKey<Store<State>> = Symbol()

export const navbarStore = createStore<State>({
  state: {
    open: false
  },
  getters: {
    open(state) {
      return state.open
    }
  },
  actions: {
    open({ commit }) {
      commit('openMenu', true)
    },
    close({ commit }) {
      commit('openMenu', false)
    },
    toggle({ commit, state }) {
      commit('openMenu', !state.open)
    }
  },
  mutations: {
    openMenu(state, data) {
      state.open = data 
    }
  }
})

export function useStore () {
  return baseUseStore(keyNavbarStore)
}