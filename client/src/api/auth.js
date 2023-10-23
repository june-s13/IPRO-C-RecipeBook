import axios from "./constants";

export async function login(email, password) {
  const res = await axios.request({
    url: "/auth/login",
    method: "POST",
    data: {
      email,
      password,
    },
  });
  return res.data
}

export async function register(email, password) {
  const res = await axios.request({
    url: "/auth/register",
    method: "POST",
    data: { email, password },
  });
  return res.data
}

export async function logout() {
  const res = await axios.register({
    url: "/auth/logout",
    method: "POST",
  });
}
