export default {
 tasks: {
   send({api, store}, payload) {
     payload.refresh = store.state.token.refresh;
     return api.res('login', 'auth').post(payload).then(({data}) => {
       store.commit('token/save', data);
       return data;
     });
   },
 },
}
