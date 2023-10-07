import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";

const Main = () => {
    const { state } = useNavigation();
    return <>{state === "loading" ? <Loading /> : <Outlet />}</>;
};

export default Main;
