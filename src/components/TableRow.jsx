import React from "react";

const TableRow = (data, diffDays, futureInterest) => {
    return (
        <>
            <td className="border-r border-b border-black p-2">
                {data.clientId}
            </td>
            <td className="border-r border-b border-black p-2">
                {data.clientName}
            </td>
            <td className="border-r border-b border-black p-2">{data.id}</td>
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
                {new Date(data.timeline.activatedOnDate).toLocaleString(
                    "en-US"
                )}
            </td>
            <td className="border-r border-b border-black p-2">
                {new Date(data.maturityDate).toLocaleString("en-US")}
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
                {data.summary.totalInterestEarned}
            </td>
            <td className="border-r border-b border-black p-2">
                {data.summary.totalInterestPosted}
            </td>
            <td className="border-r border-b border-black p-2">{diffDays}</td>
            <td className="border-r border-b border-black p-2">
                {Math.round(
                    parseInt(
                        data.summary.totalDeposits +
                            data.summary.totalInterestEarned +
                            futureInterest
                    ) / 50
                ) * 50}
            </td>
        </>
    );
};

export default TableRow;
