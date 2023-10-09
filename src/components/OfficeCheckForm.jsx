import React, { useState } from "react";
import { getEnv } from "../util/auth";
import { Form, redirect, useLoaderData } from "react-router-dom";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

const OfficeCheckForm = () => {
    const data = useLoaderData();
    const [officeId, setOfficeId] = useState("");

    const handleChange = (e) => {
        setOfficeId(e.target.value);
    };

    return (
        <div className="bg-white border border-gray-200 p-10 space-y-6 rounded min-w-[20%]">
            <h3 className="text-xl font-semibold">Please Select Your Branch</h3>
            <Form method="post" className="grid grid-flow-row gap-y-3">
                <FormControl fullWidth>
                    <InputLabel id="office">Select Branch</InputLabel>
                    <Select
                        labelId="office"
                        id="office"
                        label="Select Branch"
                        name="office"
                        value={officeId}
                        onChange={handleChange}
                        required
                    >
                        {data.map((data) => {
                            return (
                                <MenuItem key={data.id} value={data.id}>
                                    {data.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Button
                    sx={{ bgcolor: "black", color: "white" }}
                    type="submit"
                    variant="contained"
                >
                    Continue
                </Button>
                {/* <select
                    name="office"
                    id="office"
                    className="border rounded border-gray-400 mb-2 px-2 py-1"
                    required
                >
                    <option value="">Select Branch</option>
                    {data.map((data) => {
                        return (
                            <option key={data.id} value={data.id}>
                                {data.name}
                            </option>
                        );
                    })}
                </select> */}
                {/* <button className="border bg-black text-white rounded hover:opacity-50 active:opacity-75 py-1 px-2 mb-2">
                    Continue
                </button> */}
            </Form>
        </div>
    );
};

export default OfficeCheckForm;

export const action = async ({ request, params }) => {
    const officeData = await request.formData();
    const officeId = officeData.get("office");
    localStorage.setItem("officeId", officeId);
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    localStorage.setItem("exp", expDate.toISOString());
    return redirect("/vlg");
};

export const loader = async ({ request, params }) => {
    let token = getEnv();
    if (!token) {
        return redirect("/env");
    }

    let url = `https://api.live.sing.musoniservices.com/v1/offices?tenantIdentifier=${token}&orderBy=name`;
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);
    if (
        token ===
        "6f503ae9985d5328ab59bf6e8bb1ebf96f3bda79586cd42a56a90bc7bcfa9797"
    ) {
        token = "proximityfinance";
        url = `https://api.live.sing.musoniservices.com/v1/offices?tenantIdentifier=${token}&orderBy=name`;
    }
    const response = await fetch(url, {
        method: "GET", // You can specify the HTTP method (GET in this case)
        headers: {
            Authorization: "Basic " + basicAuth, // Note the space after "Basic"
            "Content-Type": "application/json",
            "x-api-key": api,
        },
    });
    const officeData = await response.json();
    return officeData;
};
