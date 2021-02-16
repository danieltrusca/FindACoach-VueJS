export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    //   if(state.token){
    //       return true;
    //   } else{
    //       return false;
    //   }
    return !!state.token;
    // !!transform data in boolean: true if it is a value, false fornot value or null
  }
};
