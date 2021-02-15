import { createStore } from 'vuex';

import CoachesModules from './modules/coaches/index.js';
import RequestsModules from './modules/requests/index.js';
import AuthModules from './modules/auth/index.js';

const store = createStore({
  modules: {
    coaches: CoachesModules,
    requests: RequestsModules,
    auth: AuthModules
  }
});

export default store;
