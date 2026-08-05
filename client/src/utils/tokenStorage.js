/** Single place that owns how the JWT is persisted on the client. */
const TOKEN_KEY = 'quiz_platform_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
