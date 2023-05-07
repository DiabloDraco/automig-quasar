import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";
import { LocalStorage, SessionStorage } from "quasar";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const baseURL = process.env.API_URL;

const api = axios.create({ baseURL });

api.interceptors.request.use((cofing) => {
  const token = LocalStorage.getItem("token");

  if (token) {
    cofing.headers.Authorization = `Bearer ${token}`;
  }

  return cofing;
});

export default boot(({ app }) => {
  api.interceptors.response.use(
    (r) => r,
    (err) => {
      if (err.response.status == 401) {
        const a = document.createElement("a");
        LocalStorage.remove("token");
        a.href = "/login";
        a.click();
      }
      return Promise.reject(err);
    }
  );
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
