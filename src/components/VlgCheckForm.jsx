import React from "react";
import {
    Link,
    redirect,
    useLoaderData,
    useNavigate,
    useNavigation,
} from "react-router-dom";
import { getEnv } from "../util/auth";
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Backdrop, CircularProgress } from "@mui/material";

const VlgCheckForm = () => {
    const navigate = useNavigate();
    const { state } = useNavigation();
    const selectVlg = (id) => {
        localStorage.setItem("vlgId", id);
        const expDate = new Date();
        expDate.setHours(expDate.getHours() + 1);
        localStorage.setItem("exp", expDate.toISOString());
        return navigate("/run-report");
    };
    const data = useLoaderData();
    let rows = [];
    const columns = [
        {
            field: "groupName",
            headerName: "Group Name",
            width: 250,
        },
        {
            field: "externalId",
            headerName: "External ID",
            width: 200,
        },
        {
            field: "branchName",
            headerName: "Branch Name",
            width: 200,
        },
        {
            field: "loanOfficer",
            headerName: "Loan Officer",
            width: 250,
        },
        {
            field: "view",
            type: "actions",
            width: 100,
            sortable: false,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <ArrowForwardIcon
                            sx={{ margin: "1rem 4rem", borderRadius: 0 }}
                        />
                    }
                    label="Select"
                    onClick={() => selectVlg(params.id)}
                />,
            ],
        },
    ];
    data &&
        data.map((data) => {
            if (data.status.value === "Active") {
                console.log(data);
                return rows.push({
                    id: data.id,
                    groupName: data.name,
                    externalId: data.accountNo,
                    branchName: data.officeName,
                    loanOfficer: data.staffName,
                });
            }
            return null;
        });
    // const [vlgId, setVlgId] = useState("");
    function CustomToolbar() {
        return (
            <GridToolbarContainer
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0 10px",
                }}
            >
                <h3 className="text-xl font-bold">Select VLG</h3>
                <GridToolbarQuickFilter
                    sx={{
                        margin: "20px 0",
                    }}
                />
            </GridToolbarContainer>
        );
    }

    // const handleChange = (e) => {
    //     setVlgId(e.target.value);
    // };
    return (
        <>
            <div className="bg-white border border-gray-200 p-10 space-y-3 rounded min-w-[20%]">
                <Link to={"/"} className="text-2xl">
                    &larr;
                </Link>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    slots={data ? { toolbar: CustomToolbar } : {}}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableColumnMenu
                />
                {/* <Form method="post" className="grid grid-flow-row gap-y-3">
                <FormControl fullWidth>
                    <InputLabel id="vlg">Select VLG</InputLabel>
                    <Select
                        labelId="vlg"
                        id="vlg"
                        label="Select VLG"
                        name="vlg"
                        value={vlgId}
                        onChange={handleChange}
                        required
                    >
                        {data.map((data) => {
                            console.log(data);
                            if (data.status.value === "Active") {
                                return (
                                    <MenuItem key={data.id} value={data.id}>
                                        {data.name}
                                    </MenuItem>
                                );
                            }
                            return null;
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
            </Form> */}
            </div>

            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: "100vh",
                }}
                open={state === "loading"}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default VlgCheckForm;

export const action = async ({ request, params }) => {};

export const loader = async ({ request, params }) => {
    let token = getEnv();
    if (!token) {
        return redirect("/env");
    }

    const branch = localStorage.getItem("officeId");
    if (!branch) {
        alert("Please select Branch first!");
        return redirect("/");
    }

    let groupUrl = `https://api.live.sing.musoniservices.com/v1/groups?tenantIdentifier=${token}&officeId=${branch}&sortBy=g.display_name ASC&limit=10000`;
    const api = "1P8Rsli9pO5cHoSpyDOeDCLH3nIQTIG85gMfxOXh";
    const username = "thawzintun";
    const password = "99999999";
    const basicAuth = btoa(`${username}:${password}`);

    if (
        token ===
        "6f503ae9985d5328ab59bf6e8bb1ebf96f3bda79586cd42a56a90bc7bcfa9797"
    ) {
        token = "proximityfinance";
        groupUrl = `https://api.live.sing.musoniservices.com/v1/groups?tenantIdentifier=${token}&officeId=${branch}&sortBy=g.display_name ASC&limit=10000`;
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
    return groupData;
};
