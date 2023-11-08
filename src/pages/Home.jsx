import React from "react";
import ReportForm from "../components/ReportForm";
import {
    Link,
    useActionData,
    useLoaderData,
    useNavigation,
} from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import CustomNoRowsOverlay from "../components/RowsOverlay";
import columnGroupingModel from "../components/columnGroupingModel";
import CustomToolbar from "../components/CustomToolbar";
import { column } from "../components/columns";
import rows from "../components/rows";

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

    const { state } = useNavigation();

    const row = filteredData && rows(filteredData);

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
                <Box>
                    <DataGrid
                        sx={{
                            height: row && row.length > 1 ? "auto" : 800,
                        }}
                        experimentalFeatures={{ columnGrouping: true }}
                        rows={rows(filteredData)}
                        columns={column}
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
                        columnGroupingModel={columnGroupingModel(
                            groupName,
                            staffName
                        )}
                    />
                </Box>
            </div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: "100vh",
                }}
                open={state === "submitting" || state === "loading"}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Home;
