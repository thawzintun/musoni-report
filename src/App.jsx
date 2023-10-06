import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import {
    action as formAction,
    loader as ReportLoader,
} from "./components/ReportForm";
import Home from "./pages/Home";
import EnvCheck from "./pages/EnvCheck";
import { action as envCheckAction } from "./components/EnvCheckForm";
import { homeRouteEnv, loader as Envloader } from "./util/auth";
import OfficeCheck from "./pages/OfficeCheck";
import {
    action as officeAction,
    loader as OfficeLoader,
} from "./components/OfficeCheckForm";
import VlgCheck from "./pages/VlgCheck";
import {
    action as VlgAction,
    loader as vlgLoader,
} from "./components/VlgCheckForm";

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
        loader: Envloader,
        children: [
            {
                index: true,
                element: <OfficeCheck />,
                loader: OfficeLoader,
                action: officeAction,
            },
            {
                path: "/vlg",
                element: <VlgCheck />,
                loader: vlgLoader,
                action: VlgAction,
            },
            {
                path: "/run-report",
                element: <Home />,
                action: formAction,
                loader: ReportLoader,
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
