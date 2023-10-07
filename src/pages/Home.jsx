import React from "react";
import ReportForm from "../components/ReportForm";
import { Link, useActionData, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";

const Home = () => {
    const actionData = useActionData();
    var currentDate = new Date();

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport
                    csvOptions={{
                        fileName: "FTD Report",
                        utf8WithBom: true,
                    }}
                />
            </GridToolbarContainer>
        );
    }

    let rows = [];
    let rowId = 0;
    actionData &&
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
                        (new Date(data.maturityDate) - currentDate) / oneDay
                    )
                );
                const futureInterest =
                    (((data.nominalAnnualInterestRate / 100) *
                        data.summary.accountBalance) /
                        365) *
                    diffDays;
                const expSavReturnManual =
                    Math.round(
                        parseInt(
                            data.summary.totalDeposits +
                                data.summary.totalInterestEarned +
                                futureInterest
                        ) / 50
                    ) * 50;

                rows.push({
                    id: rowId++,
                    clientId: data.clientId,
                    clientName: data.clientName,
                    accId: data.id,
                    accountNo: data.accountNo,
                    depositProductName: data.depositProductName,
                    value: data.status.value,
                    activatedOnDate: new Date(
                        data.timeline.activatedOnDate
                    ).toLocaleString(),
                    maturityDate: new Date(data.maturityDate).toLocaleString(),
                    nominalAnnualInterestRate: data.nominalAnnualInterestRate,
                    accountBalance: data.summary.accountBalance,
                    totalDeposits: data.summary.totalDeposits,
                    totalInterestEarned: data.summary.totalInterestEarned
                        ? data.summary.totalInterestEarned
                        : "-",
                    totalInterestPosted: data.summary.totalInterestPosted
                        ? data.summary.totalInterestPosted
                        : "-",
                    diffDays: diffDays,
                    expSavReturnManual: expSavReturnManual
                        ? expSavReturnManual
                        : "-",
                });
            }
            return null;
        });

    const columns = [
        {
            field: "clientId",
            headerName: "Client ID",
            width: 130,
        },
        {
            field: "clientName",
            headerName: "Client Name",
            width: 250,
        },
        {
            field: "accId",
            headerName: "Account ID",
            width: 150,
        },
        {
            field: "accountNo",
            headerName: "Account No",
            width: 150,
        },
        {
            field: "depositProductName",
            headerName: "Product Name",
            width: 350,
        },
        {
            field: "value",
            headerName: "Account Status",
            width: 170,
        },
        {
            field: "activatedOnDate",
            headerName: "Activation Date/Approved Date",
            width: 270,
        },
        {
            field: "maturityDate",
            headerName: "Expected Maturity Date",
            width: 270,
        },
        {
            field: "nominalAnnualInterestRate",
            headerName: "Interest Rate",
            width: 150,
        },
        { field: "accountBalance", headerName: "Account Balance", width: 180 },
        { field: "totalDeposits", headerName: "Total Deposit", width: 170 },
        {
            field: "totalInterestEarned",
            headerName: "Total Interest Earned",
            width: 170,
        },
        {
            field: "totalInterestPosted",
            headerName: "Total Interest Posted",
            width: 170,
        },
        {
            field: "diffDays",
            headerName: "Will be matrued in (days)",
            width: 180,
        },
        {
            field: "expSavReturnManual",
            headerName: "Expected Savings Return Manual",
            width: 270,
        },
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
                    <ReportForm />
                </div>
                {state === "submitting" ? (
                    <Loading />
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        showCellVerticalBorder
                        showColumnVerticalBorder
                        slots={actionData ? { toolbar: CustomToolbar } : ""}
                    />
                )}
            </div>
        </>
    );
};

export default Home;
