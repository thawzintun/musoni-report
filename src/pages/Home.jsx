import React from "react";
import ReportForm from "../components/ReportForm";
import {
    Link,
    useActionData,
    useLoaderData,
    useNavigation,
} from "react-router-dom";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import CustomNoRowsOverlay from "../components/RowsOverlay";

const Home = () => {
    const { clients, groupName, staffName } = useLoaderData();

    const actionData = useActionData();
    var currentDate = new Date();

    const filteredData =
        actionData &&
        actionData.filter((data) => {
            const newData = clients.find((d) => {
                return data.clientId === d.id;
            });
            // console.log(newData);
            return newData;
        });

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ margin: "10px" }}>
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
    filteredData &&
        filteredData.map((data) => {
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
                    id: ++rowId,
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
            width: 200,
        },
        {
            field: "expSavReturnManual",
            headerName: "Expected Savings Return Manual",
            width: 270,
        },
    ];

    const columnGroupingModel = [
        {
            groupId: "ကျေးရွာအုပ်စု",
            description: "",
            children: [
                {
                    groupId: "ချေးငွေအရာရှိ",
                    children: [
                        {
                            groupId: " ",
                            children: [{ field: "clientId" }],
                        },
                    ],
                },
            ],
        },
        {
            groupId: groupName,
            description: "",
            children: [
                {
                    groupId: staffName,
                    children: [
                        {
                            groupId: "  ",
                            children: [{ field: "clientName" }],
                        },
                    ],
                },
            ],
        },
    ];

    const { state } = useNavigation();

    return (
        <>
            <div className="px-3 pt-3 my-3">
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "black",
                        padding: "10px 25px",
                        color: "white",
                        ":hover": {
                            bgcolor: "gray",
                        },
                    }}
                >
                    <Link to={"/vlg"}>Back</Link>
                </Button>
            </div>
            <div className="px-3 pb-5">
                <div className="flex justify-between items-end mb-3 py-3">
                    <Typography variant="h5" fontWeight={"bold"}>
                        FTD Accounts generated on {currentDate.toLocaleString()}{" "}
                        from Proximity Finance
                    </Typography>
                    <ReportForm />
                </div>
                <div>
                    <DataGrid
                        sx={{ height: rows.length < 1 ? 500 : "auto" }}
                        experimentalFeatures={{ columnGrouping: true }}
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        disableRowSelectionOnClick
                        showCellVerticalBorder
                        showColumnVerticalBorder
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}
                        slots={
                            actionData
                                ? {
                                      toolbar: CustomToolbar,
                                      noRowsOverlay: CustomNoRowsOverlay,
                                  }
                                : {
                                      noRowsOverlay: CustomNoRowsOverlay,
                                  }
                        }
                        columnGroupingModel={columnGroupingModel}
                    />
                </div>
            </div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: "100vh",
                }}
                open={state === "submitting"}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Home;
