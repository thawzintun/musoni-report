const numberType = {
    type: "number",
    cellClassName: "font-tabular-nums",
};

export const column = [
    {
        field: "clientId",
        headerName: "Client ID",
        width: 130,
    },
    {
        field: "clientName",
        headerName: "အမည် (Name)",
        width: 250,
    },
    {
        field: "accountNo",
        headerName: "Savings ID",
        width: 150,
    },
    {
        field: "depositProductName",
        headerName: "Product Name",
        width: 350,
    },
    // {
    //     field: "value",
    //     headerName: "Account Status",
    //     width: 170,
    // },
    {
        field: "activatedOnDate",
        headerName: "စာရင်းဖွင့်သည့်နေ့ (Open Date)",
        width: 230,
        cellClassName: "MuiDataGrid-cell--textRight",
    },
    {
        field: "maturityDate",
        headerName: "သက်တမ်းပြည့်သည့်နေ့ (Maturity Date)",
        width: 270,
        cellClassName: "MuiDataGrid-cell--textRight",
    },
    {
        field: "totalDeposits",
        headerName: "ငွေရင်းပမာဏ (Deposit)",
        width: 200,
        ...numberType,
    },
    {
        field: "returnAmt",
        headerName: "အတိုး (Interest)",
        width: 150,
        ...numberType,
    },
    {
        field: "expSavReturnManual",
        headerName: "ထုတ်ပေးသည့်ပမာဏ (Total Return Amount)",
        width: 300,
        ...numberType,
    },
    {
        field: "signature",
        headerName: "ငွေထုတ်သူလက်မှတ် (Withdrawer's Signature)",
        width: 350,
    },
];
