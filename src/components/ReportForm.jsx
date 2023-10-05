import React from "react";
import { CSVLink } from "react-csv";
import { Form } from "react-router-dom";

const ReportForm = ({ csvData }) => {
    return (
        <>
            <Form method="post" className="flex gap-x-5 px-1 py-5">
                <input
                    type="date"
                    name="date"
                    id="date"
                    className=" outline outline-1 px-3"
                />
                <button className=" border px-4 py-2 border-black hover:bg-gray-300 active:bg-gray-400 hover:border-gray-300 active:border-gray-400">
                    Run Report
                </button>
                {csvData && csvData.length > 1 && (
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
    const url =
        "https://api.live.sing.musoniservices.com/v1/fixeddepositaccounts?tenantIdentifier=proximityfinance";
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);
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
    } catch (error) {}
};
