const state = {
  characters: [],
  current: null
};

const mutations = {
  ADD_CHARACTER: (state, character) =>
    (state.characters = [...state.characters, character]),
  SET_CHARACTER_SET: (state, set) => (state.characters = set),
  SET_CURRENT: (state, current) =>
    state.current == current
      ? (state.current = null)
      : (state.current = current)
};

const getters = {
  GET_TOTAL: state => {
    return state.characters.length;
  },
  GET_GROUPS: state => {
    let groups = [];
    state.characters.forEach(char => {
      if (!groups.includes(char.title)) groups.push(char.title);
    });
    return groups;
  },
  GET_CURRENT: state => {
    return state.current;
  },
  GET_CHARACTERS: state => {
    if (state.current)
      return state.characters.filter(set => set.title == state.current);
    else return state.characters;
  }
};

const actions = {
  addCharacter: ({ commit }, value) => commit("ADD_CHARACTER", value),
  setCurrent: ({ commit }, value) => commit("SET_CURRENT", value),
  saveCharacters({ commit }, obj) {
    let tempArray = [];
    Object.keys(obj).map(key => {
      tempArray.push({ title: key, chars: obj[key].split("") });
    });

    commit("SET_CHARACTER_SET", tempArray);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
