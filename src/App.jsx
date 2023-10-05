import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import { action as formAction } from "./components/ReportForm";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
        children: [
            {
                index: true,
                element: <Home />,
                action: formAction,
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
