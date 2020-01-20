const state = {
  basket: []
};

const mutations = {
  ADD_TO_BASKET(state, value) {
    state.basket = [...state.basket, value];
  }
};

const getters = {
  amount: state => {
    return state.basket.length;
  }
};

const actions = {
  ADD_TO_BASKET({ commit }, value) {
    commit("ADD_TO_BASKET", value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
