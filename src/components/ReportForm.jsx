import React from "react";
import { Form, redirect } from "react-router-dom";
import { getEnv } from "../util/auth";
import { Button, TextField } from "@mui/material";

const ReportForm = () => {
    return (
        <>
            <Form method="post" className="flex gap-x-5">
                <TextField type="date" name="date" id="date" />

                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        bgcolor: "black",
                        color: "white",
                        ":hover": {
                            bgcolor: "gray",
                        },
                    }}
                >
                    Run Report
                </Button>
            </Form>
        </>
    );
};

export default ReportForm;

export const action = async ({ request }) => {
    let token = localStorage.getItem("env");
    let url = `https://api.live.sing.musoniservices.com/v1/fixeddepositaccounts?tenantIdentifier=${token}&limit=20000&offset=0&status=300`;
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);
    if (
        token ===
        "6f503ae9985d5328ab59bf6e8bb1ebf96f3bda79586cd42a56a90bc7bcfa9797"
    ) {
        token = "proximityfinance";
        url = `https://api.live.sing.musoniservices.com/v1/fixeddepositaccounts?tenantIdentifier=${token}&limit=20000&offset=0&status=300`;
    }
    try {
        const response = await fetch(url, {
            method: "GET", // You can specify the HTTP method (GET in this case)
            headers: {
                Authorization: "Basic " + basicAuth, // Note the space after "Basic"
                "Content-Type": "application/json",
                "x-api-key": api,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};

export const loader = async () => {
    let token = getEnv();
    if (!token) {
        return redirect("/env");
    }

    const vlg = localStorage.getItem("vlgId");
    if (!vlg) {
        alert("Please select VLG first!");
        return redirect("/vlg");
    }

    let groupUrl = `https://api.live.sing.musoniservices.com/v1/groups/${vlg}?tenantIdentifier=${token}`;
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);

    if (
        token ===
        "6f503ae9985d5328ab59bf6e8bb1ebf96f3bda79586cd42a56a90bc7bcfa9797"
    ) {
        token = "proximityfinance";
        groupUrl = `https://api.live.sing.musoniservices.com/v1/groups/${vlg}?tenantIdentifier=${token}`;
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
    const groupName = groupData.name;

    let url = `https://api.live.sing.musoniservices.com/v1/clients?tenantIdentifier=${token}&search=${groupName}`;

    const response = await fetch(url, {
        method: "GET", // You can specify the HTTP method (GET in this case)
        headers: {
            Authorization: "Basic " + basicAuth, // Note the space after "Basic"
            "Content-Type": "application/json",
            "x-api-key": api,
        },
    });

    const data = await response.json();

    // const clientData = data.pageItems;

    // const finalData = clientData.filter((data) => {
    //     return data.id > 10000;
    // });
    return {
        clients: data.pageItems,
        groupName: groupData.name,
        staffName: groupData.staffName,
    };
};
