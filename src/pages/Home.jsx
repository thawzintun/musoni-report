import React from "react";
import ReportForm from "../components/ReportForm";
import { Link, useActionData, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
    const actionData = useActionData();
    var currentDate = new Date();
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
    const csvData = [
        [
            `FTD Accounts generated on ${currentDate.toLocaleString()} from Proximity Finance`,
        ],
        tableHead,
    ];
    const { state } = useNavigation();
    return (
        <>
            <div className="px-3 pt-3 my-3">
                <Link
                    to={"/vlg"}
                    className="bg-black text-white hover:opacity-50 active:opacity-75 px-4 py-2"
                >
                    Back
                </Link>
            </div>
            <div className="px-3">
                <div className="flex justify-between mb-3 py-3">
                    <h3 className="text-3xl">
                        FTD Accounts generated on {currentDate.toLocaleString()}{" "}
                        from Proximity Finance
                    </h3>
                    <ReportForm csvData={csvData} />
                </div>
                {state === "submitting" ? (
                    <Loading />
                ) : (
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
                                            data.summary.totalInterestEarned
                                                ? data.summary
                                                      .totalInterestEarned
                                                : "-",
                                            data.summary.totalInterestPosted
                                                ? data.summary
                                                      .totalInterestPosted
                                                : "-",
                                            diffDays,
                                            expSavReturnManual
                                                ? expSavReturnManual
                                                : "-",
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
                                                    {
                                                        data.nominalAnnualInterestRate
                                                    }
                                                </td>
                                                <td className="border-r border-b border-black p-2">
                                                    {
                                                        data.summary
                                                            .accountBalance
                                                    }
                                                </td>
                                                <td className="border-r border-b border-black p-2">
                                                    {data.summary.totalDeposits}
                                                </td>
                                                <td className="border-r border-b border-black p-2">
                                                    {data.summary
                                                        .totalInterestEarned
                                                        ? data.summary
                                                              .totalInterestEarned
                                                        : "-"}
                                                </td>
                                                <td className="border-r border-b border-black p-2">
                                                    {data.summary
                                                        .totalInterestPosted
                                                        ? data.summary
                                                              .totalInterestPosted
                                                        : "-"}
                                                </td>
                                                <td className="border-r border-b border-black p-2">
                                                    {diffDays}
                                                </td>
                                                <td className="border-r border-b border-black p-2">
                                                    {expSavReturnManual
                                                        ? expSavReturnManual
                                                        : "-"}
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Home;
