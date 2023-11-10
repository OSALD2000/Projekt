export const storeToken = (token, expirationTime) => {
    const time = expirationTime || 1;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + time);
    localStorage.setItem("expiration", expiration.toISOString());
};
