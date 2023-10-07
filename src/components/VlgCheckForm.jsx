import React from "react";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { getEnv } from "../util/auth";

const VlgCheckForm = () => {
    const data = useLoaderData();
    return (
        <div className="bg-white border border-gray-200 p-10 space-y-3 rounded">
            <Link to={"/"} className="text-2xl">
                &larr;
            </Link>
            <h3 className="text-xl font-semibold">Please Select VLG</h3>
            <Form method="post" className="grid grid-flow-row">
                <select
                    name="vlg"
                    id="vlg"
                    className="border rounded border-gray-400 mb-2 px-2 py-1"
                    required
                >
                    <option value="">Select VLG</option>
                    {data.map((data) => {
                        if (data.status.value === "Active") {
                            return (
                                <option key={data.id} value={data.id}>
                                    {data.name}
                                </option>
                            );
                        }
                        return null;
                    })}
                </select>
                <button className="border bg-black text-white rounded hover:opacity-50 active:opacity-75 py-1 px-2 mb-2">
                    Continue
                </button>
            </Form>
        </div>
    );
};

export default VlgCheckForm;

export const action = async ({ request, params }) => {
    const vlgData = await request.formData();
    const vlgId = vlgData.get("vlg");
    localStorage.setItem("vlgId", vlgId);
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    localStorage.setItem("exp", expDate.toISOString());
    return redirect("/run-report");
};

export const loader = async ({ request, params }) => {
    let token = getEnv();
    if (!token) {
        return redirect("/env");
    }

    const branch = localStorage.getItem("officeId");
    if (!branch) {
        alert("Please select Branch first!");
        return redirect("/");
    }

    let groupUrl = `https://api.live.sing.musoniservices.com/v1/groups?tenantIdentifier=${token}&officeId=${branch}&sortBy=g.display_name ASC&limit=10000`;
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);

    if (
        token ===
        "6f503ae9985d5328ab59bf6e8bb1ebf96f3bda79586cd42a56a90bc7bcfa9797"
    ) {
        token = "proximityfinance";
        groupUrl = `https://api.live.sing.musoniservices.com/v1/groups?tenantIdentifier=${token}&officeId=${branch}&sortBy=g.display_name ASC&limit=10000`;
    }
    const groupResponse = await fetch(groupUrl, {
        method: "GET", // You can specify the HTTP method (GET in this case)
        headers: {
            Authorization: "Basic " + basicAuth, // Note the space after "Basic"
            "Content-Type": "application/json",
            "x-api-key": api,
        },
    });

    const groupData = await groupResponse.json();
    return groupData;
};
