import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import { action as formAction } from "./components/ReportForm";
import Home from "./pages/Home";
import EnvCheck from "./pages/EnvCheck";
import { action as envCheckAction } from "./components/EnvCheckForm";
import { checkEnv, loader as envLoader, homeRouteEnv } from "./util/auth";

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
        loader: envLoader,
        children: [
            {
                index: true,
                element: <Home />,
                action: formAction,
                loader: checkEnv,
            },
            {
                path: "/env",
                element: <EnvCheck />,
                action: envCheckAction,
                loader: homeRouteEnv,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
