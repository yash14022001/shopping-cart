import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const axiosMockInstance = axios.create();
const mockAdapter = new MockAdapter(axiosMockInstance, { delayResponse: 1000 });

mockAdapter.onPost("/verify-token").reply((config) => {
  const body = JSON.parse(config.data);
  // console.log(body);
  if (body.token === "correct-token") {
    return [200, { email: "admin@gmail.com", token: body.token }];
  }

  return [401];
});

mockAdapter.onPost("/login").reply((config) => {
  const body = JSON.parse(config.data);
  // console.log(body);
  if (body.email === "admin@gmail.com" && body.password === "Abcd@1234") {
    return [
      200,
      {
        email: "admin@gmail.com",
        name: "Admin",
        token: "correct-token",
      },
    ];
  }

  return [400];
});

export default axiosMockInstance;
