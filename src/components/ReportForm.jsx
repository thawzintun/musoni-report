import { MD5 } from "crypto-js";
import React from "react";
import { CSVLink } from "react-csv";
import { Form, useLoaderData } from "react-router-dom";
import { checkEnv } from "../util/auth";

const ReportForm = ({ csvData }) => {
    const data = useLoaderData();
    console.log(data);
    return (
        <>
            <Form method="post" className="flex gap-x-5 py-3">
                <input
                    type="date"
                    name="date"
                    id="date"
                    className=" outline outline-1 px-3"
                />
                <select name="" id="">
                    {data &&
                        data.map((data) => {
                            return (
                                <option id={data.id} key={data.id}>
                                    {data.name}
                                </option>
                            );
                        })}
                </select>

                <select name="" id="">
                    {data &&
                        data.map((data) => {
                            return (
                                <option id={data.id} key={data.id}>
                                    {data.name}
                                </option>
                            );
                        })}
                </select>

                <button className=" border px-4 py-2 border-black hover:bg-gray-300 active:bg-gray-400 hover:border-gray-300 active:border-gray-400">
                    Run Report
                </button>
                {csvData && csvData.length > 2 && (
                    <CSVLink
                        className=" border px-4 py-2 border-black bg-black text-white hover:opacity-50 active:opacity-75 "
                        filename="report.csv"
                        data={csvData}
                    >
                        Export to CSV
                    </CSVLink>
                )}
            </Form>
        </>
    );
};

export default ReportForm;

export const action = async ({ request }) => {
    let token = localStorage.getItem("env");
    let url = `https://api.live.sing.musoniservices.com/v1/fixeddepositaccounts?tenantIdentifier=${token}`;
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);
    if (token === MD5("proximityfinance").toString()) {
        token = "proximityfinance";
        url = `https://api.live.sing.musoniservices.com/v1/fixeddepositaccounts?tenantIdentifier=${token}`;
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
    checkEnv();
    let token = localStorage.getItem("env");
    let url = `https://api.live.sing.musoniservices.com/v1/offices?tenantIdentifier=${token}`;
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);
    if (token === MD5("proximityfinance").toString()) {
        token = "proximityfinance";
        url = `https://api.live.sing.musoniservices.com/v1/offices?tenantIdentifier=${token}`;
    }
    const response = await fetch(url, {
        method: "GET", // You can specify the HTTP method (GET in this case)
        headers: {
            Authorization: "Basic " + basicAuth, // Note the space after "Basic"
            "Content-Type": "application/json",
            "x-api-key": api,
        },
    });
    const officeData = response.json();
    return officeData;
};
