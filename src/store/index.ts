import Vue from 'vue'
import Vuex from 'vuex'
import { Link } from '@/models/link'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'deep-links',
  storage: window.localStorage
})

Vue.use(Vuex)

export interface State {
  links: Link[]
}

const ADD_LINK = 'ADD_LINK'
const REMOVE_LINK = 'REMOVE_LINK'

export default new Vuex.Store<State>({
  state: {
    links: []
  },
  mutations: {
    [ADD_LINK]: (state, link: Link) => {
      const stateLinkIndex = state.links.findIndex(
        (l: Link) => l.name === link.name
      )
      if (stateLinkIndex > -1) {
        state.links[stateLinkIndex] = link
      } else {
        state.links.push(link)
      }
    },
    [REMOVE_LINK]: (state, slug: string) => {
      state.links = state.links.filter((link) => link.slug !== slug)
    }
  },
  actions: {
    addLink({ state, commit }, link: Link) {
      commit(ADD_LINK, link)
    },
    removeLink({ commit }, slug: string) {
      commit(REMOVE_LINK, slug)
    }
  },
  getters: {
    links: ({ links }) => links
  },
  plugins: [vuexLocal.plugin]
})
