export default {
  tasks: {
    async send({api, store}, payload) {
      payload.refresh = store.state.token.refresh;
      let {data} = await api.res('login', 'auth').post(payload);
      store.commit('token/save', data);
      return data;
    },
  },
}
