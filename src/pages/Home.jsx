import React from "react";
import ReportForm from "../components/ReportForm";
import { useActionData } from "react-router-dom";

const Home = () => {
    const actionData = useActionData();
    var currentDate = new Date(Date.now());
    const tableHead = [
        "Client ID",
        "Client Name",
        "Account ID",
        "Account No",
        "Product Name",
        "Account Status",
        "Activation Date/Approved Date",
        "Expected Maturity Date",
        "Interest Rate",
        "Account Balance",
        "Total Deposit",
        "Total Interest Earned",
        "Total Interest Posted",
        "Will be matrued in (days)",
        "Expected Savings Return Manual",
    ];
    const csvData = [tableHead];
    return (
        <>
            <div>
                <ReportForm csvData={csvData} />
            </div>
            <div>
                <h3 className=" text-3xl mb-3">FTD Accounts generated on</h3>
                <table className="border border-collapsec border-solid border-black min-w-max">
                    <thead>
                        <tr>
                            {tableHead.map((name, index) => {
                                return (
                                    <th
                                        key={index}
                                        className="border-r border-b border-black p-3"
                                    >
                                        {name}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {actionData &&
                            actionData.map((data) => {
                                if (
                                    data.accountNo &&
                                    data.clientId &&
                                    data.status.active &&
                                    data.timeline.activatedOnDate
                                ) {
                                    const oneDay = 24 * 60 * 60 * 1000;
                                    const diffDays = Math.round(
                                        Math.abs(
                                            (new Date(data.maturityDate) -
                                                currentDate) /
                                                oneDay
                                        )
                                    );
                                    const futureInterest =
                                        (((data.nominalAnnualInterestRate /
                                            100) *
                                            data.summary.accountBalance) /
                                            365) *
                                        diffDays;
                                    const expSavReturnManual =
                                        Math.round(
                                            parseInt(
                                                data.summary.totalDeposits +
                                                    data.summary
                                                        .totalInterestEarned +
                                                    futureInterest
                                            ) / 50
                                        ) * 50;

                                    csvData.push([
                                        data.clientId,
                                        data.clientName,
                                        data.id,
                                        data.accountNo,
                                        data.depositProductName,
                                        data.status.value,
                                        new Date(
                                            data.timeline.activatedOnDate
                                        ).toLocaleString(),
                                        new Date(
                                            data.maturityDate
                                        ).toLocaleString(),
                                        data.nominalAnnualInterestRate,
                                        data.summary.accountBalance,
                                        data.summary.totalDeposits,
                                        data.summary.totalInterestEarned,
                                        data.summary.totalInterestPosted,
                                        diffDays,
                                        expSavReturnManual,
                                    ]);
                                    return (
                                        <tr
                                            key={data.id}
                                            className="border border-black"
                                        >
                                            <td className="border-r border-b border-black p-2">
                                                {data.clientId}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.clientName}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.id}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.accountNo}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.depositProductName}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.status.value}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {new Date(
                                                    data.timeline.activatedOnDate
                                                ).toLocaleString("en-US")}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {new Date(
                                                    data.maturityDate
                                                ).toLocaleString("en-US")}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.nominalAnnualInterestRate}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.summary.accountBalance}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {data.summary.totalDeposits}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {
                                                    data.summary
                                                        .totalInterestEarned
                                                }
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {
                                                    data.summary
                                                        .totalInterestPosted
                                                }
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {diffDays}
                                            </td>
                                            <td className="border-r border-b border-black p-2">
                                                {expSavReturnManual}
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;
