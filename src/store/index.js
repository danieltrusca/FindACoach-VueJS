import { createStore } from 'vuex';

import CoachesModules from './modules/coaches/index.js';
import RequestsModules from './modules/requests/index.js';

const store = createStore({
  modules: {
    coaches: CoachesModules,
    requests: RequestsModules
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;
