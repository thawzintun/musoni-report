import { redirect } from "react-router-dom";
import { getToken } from "./auth";

export const loader = () => {
    const token = getToken();
    if (!token) {
        return redirect("/");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    return redirect("/");
};
