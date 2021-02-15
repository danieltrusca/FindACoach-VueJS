export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      //   id: new Date().toISOString(),
      // id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate
    };

    const response = await fetch(
      `https://vue-hhtp-demo-9b5cb-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    //const responseData=await response.json();

    if (!response.ok) {
      //error message
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  }
};
