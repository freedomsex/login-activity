export default {
  tasks: {
    send({api, store}, payload) {
      payload.refresh = store.state.token.refresh;
      return api.res('login', 'auth').post(payload).then(({data}) => {
        if (data && !data.error) {
          store.commit('token/save', data);
        } else {
          let {error, say, strict} = data;
          throw {error, say, strict} || "empty";
        }
        return data;
      });
    },
  },
}
