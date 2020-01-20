import Vue from "vue";
import Vuex from "vuex";
import basket from "./basket";
import characters from "./characters";
import dialog from "./dialog";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    basket,
    characters,
    dialog
  }
});
