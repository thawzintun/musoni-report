import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

const Main = () => {
    const { state } = useNavigation();
    return (
        <>
            <Outlet />
        </>
    );
};

export default Main;
