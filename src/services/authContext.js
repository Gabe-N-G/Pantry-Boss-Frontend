// TODO: Put back end connections here:

// THIS IS FROM THE CAT COLLECTOR FRONTEND, WILL 99% MOST LIKELY HAVE TO RECONFIGURE FOR OUR FRONTEND ONCE WE GET THE BACK END RUNNING -GABE

import api from "./apiconfig.js";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/users/register/", credentials);
    console.log(resp);
    localStorage.setItem("token", resp.data.access);
    localStorage.setItem("userId", resp.data.user.id);
    localStorage.setItem("username", resp.data.user.username);
    return resp.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/users/login/", credentials);
    localStorage.setItem("token", resp.data.access);
    localStorage.setItem("userId", resp.data.user.id);
    localStorage.setItem("username", resp.data.user.username);
    return resp.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    return true;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const resp = await api.get("/users/token/refresh/");
    localStorage.setItem("token", resp.data.access);
    localStorage.setItem("userId", resp.data.user.id);
    return resp.data.user;
  }
  return false;
};