export const isSignedIn = () => {
    return localStorage.getItem("signedIn");
};

export const logIn = (token: string) => {
    localStorage.setItem("signedIn", "true");
    localStorage.setItem("accessToken", token);
};

export const logOut = () => {
    localStorage.removeItem("signedIn");
    localStorage.removeItem("accessToken");
    window.location.href='/login'
};

export const getAccessToken = ()=> {
    return localStorage.getItem("accessToken");
};
