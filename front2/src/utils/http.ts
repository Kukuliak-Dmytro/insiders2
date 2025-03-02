import axios from "axios";
import { getAccessToken, logIn, logOut } from "@/utils/storage";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Щоб відправляти cookies з refresh токеном на сервер
});

// Додаємо токен в кожен запит
axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обробка помилок 401
axiosClient.interceptors.response.use(
  (response) => response, // Пропускаємо успішні запити
  async (error) => {
    const originalRequest = error.config;

    // Якщо помилка 401 (Unauthorized) і ще не було спроби оновлення токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Запит на оновлення токена
        const refreshResponse = await axiosClient.post("/auth/refresh");
        const newAccessToken = refreshResponse.data.accessToken;

        // Оновлюємо локальний токен
        logIn(newAccessToken);

        // Повторюємо запит з новим токеном
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Якщо не вдалося оновити токен, видаляємо його і перенаправляємо на логін
        logOut();    
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
