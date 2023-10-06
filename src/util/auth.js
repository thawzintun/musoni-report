import { redirect } from "react-router-dom";

export const getExpDuration = () => {
    const expDate = localStorage.getItem("exp");
    const expDateInMili = new Date(expDate);
    const currentDateInMilli = new Date();
    const duration = expDateInMili - currentDateInMilli;
    return duration;
};

export const getEnv = () => {
    const token = localStorage.getItem("env");
    if (!token) {
        return null;
    }
    const duration = getExpDuration();
    if (duration < 0) {
        localStorage.removeItem("env");
        localStorage.removeItem("exp");
        localStorage.removeItem("officeId");
        localStorage.removeItem("vlgId");
        alert("Token Expired!");
        return null;
    }
    return token;
};

export const loader = () => {
    return getEnv();
};

export const checkEnv = () => {
    const token = getEnv();
    if (!token) {
        return redirect("/env");
    }
    return null;
};

export const homeRouteEnv = () => {
    const token = getEnv();
    if (token) {
        return redirect("/");
    }
    return null;
};
