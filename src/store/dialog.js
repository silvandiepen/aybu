const state = {
  active: false,
  value: null
};

const mutations = {
  SET_ACTIVE(state, bool) {
    state.active = bool;
    setTimeout(() => {
      state.active = false;
    }, 2000);
  },
  SET_VALUE(state, value) {
    state.value = value;
    setTimeout(() => {
      state.value = null;
    }, 2500);
  }
};

const getters = {
  GET_ACTIVE(state) {
    return state.active;
  }
};

const actions = {
  SET_ACTIVE({ commit }, obj) {
    commit("SET_ACTIVE", obj.active);
    commit("SET_VALUE", obj.value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
