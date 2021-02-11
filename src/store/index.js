import { createStore } from 'vuex';

import CoachesModules from './modules/coaches/index.js';

const store = createStore({
  modules: {
    coaches: CoachesModules
  }
});

export default store;
