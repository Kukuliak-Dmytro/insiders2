export const isSignedIn = () => {
    const signedIn = localStorage.getItem("signedIn");
    console.log("isSignedIn:", signedIn);
    return signedIn;
};

export const logIn = (token: string) => {
    console.log("logIn: setting signedIn to true and accessToken");
    localStorage.setItem("signedIn", "true");
    localStorage.setItem("accessToken", token);
};

export const logOut = () => {
    console.log("logOut: removing signedIn and accessToken");
    localStorage.removeItem("signedIn");
    localStorage.removeItem("accessToken");
    window.location.href = '/login';
};

export const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("getAccessToken:", accessToken);
    return accessToken;
};

export const setCurrentUserId = (id: string) => {
    console.log("setCurrentUserId: setting userId to", id);
    localStorage.setItem('userId', id);
};

export const getCurrentUserId = () => {
    const userId = localStorage.getItem('userId');
    console.log("getCurrentUserId:", userId);
    return userId;
};