import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";

const EnvCheckForm = () => {
    const message = useActionData();
    return (
        <div>
            <h3 className="text-xl font-medium">
                Please Enter Environment Variable
            </h3>
            <Form method="post" className="grid grid-flow-row mt-3">
                <input
                    type="text"
                    name="env"
                    id="env"
                    className="border rounded border-gray-400 mb-2 px-2 py-1"
                />
                <button className="border bg-black text-white rounded hover:opacity-50 active:opacity-75 py-1 px-2 mb-2">
                    Continue
                </button>
                {message && <small className="text-red-500">{message}</small>}
            </Form>
        </div>
    );
};

export default EnvCheckForm;

export const action = async ({ request, params }) => {
    const data = await request.formData();
    const env = data.get("env");
    if (env === "proximityfinance") {
        localStorage.setItem("env", env);
        const expDate = new Date();
        expDate.setHours(expDate.getHours() + 1);
        localStorage.setItem("exp", expDate.toISOString());
        return redirect("/");
    }
    return "The variable is not valid. Please Try Again!";
};
