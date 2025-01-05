export function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function setUser(user) {
    if (!user || typeof user !== 'object') {
        console.error('Invalid user')
    }

    localStorage.setItem('user', JSON.stringify(user));
}

export function getToken(token) {
    return localStorage.getItem('token');
}

export function setToken(token) {
  return localStorage.setItem('token', token);
}

export function clear() {
    localStorage.clear();
}

export function getDarkMode() {
    return localStorage.getItem("darkMode") === "true";
}

export function setDarkMode(darkMode) {
  localStorage.setItem("darkMode", darkMode); // Save mode in localStorage
}

export default {
    getUser,
    setUser,
    getToken,
    setToken,
    clear,
    getDarkMode,
    setDarkMode,
}