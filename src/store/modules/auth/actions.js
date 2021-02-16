let timer;

export default {
  // async login(context, payload) {
  //   const response = await fetch(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKxBveCDfwV4e3osfy82abNPX3UDAS8Ds',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         email: payload.email,
  //         password: payload.password,
  //         returnSecureToken: true
  //       })
  //     }
  //   );

  //   const responseData = await response.json();

  //   if (!response.ok) {

  //     const error = new Error(
  //       responseData.message ||
  //         'Failed to authenticate. Check your sign-in data'
  //     );
  //     throw error;
  //   }

  //   context.commit('setUser', {
  //     token: responseData.idToken,
  //     userId: responseData.localId,
  //     tokenExpiration: responseData.expiresIn
  //   });
  // },
  // async signup(context, payload) {
  //   const response = await fetch(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKxBveCDfwV4e3osfy82abNPX3UDAS8Ds',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         email: payload.email,
  //         password: payload.password,
  //         returnSecureToken: true
  //       })
  //     }
  //   );
  //   const responseData = await response.json();

  //   if (!response.ok) {

  //     const error = new Error(
  //       responseData.message ||
  //         'Failed to authenticate. Check your sign-up data'
  //     );
  //     throw error;
  //   }

  //   console.log(responseData);
  //   context.commit('setUser', {
  //     token: responseData.idToken,
  //     userId: responseData.localId,
  //     tokenExpiration: responseData.expiresIn
  //   });
  // },

  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKxBveCDfwV4e3osfy82abNPX3UDAS8Ds';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKxBveCDfwV4e3osfy82abNPX3UDAS8Ds';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    //+convert the string into a number
    const expiresIn = +responseData.expiresIn * 1000;
    //const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;
    //expirationDate is the date in the future when the token will be invalid

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
