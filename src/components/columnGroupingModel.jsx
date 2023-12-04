const columnGroupingModel = (groupName, staffName) => {
    const columnGrouping = [
        {
            groupId: "0",
            headerName: " ",
            children: [
                {
                    groupId: "00",
                    headerName: " ",
                    children: [
                        {
                            groupId: "000",
                            headerName: " ",
                            children: [
                                {
                                    groupId: "ကျေးရွာအုပ်စု",
                                    children: [
                                        {
                                            groupId: "ချေးငွေအရာရှိ",
                                            children: [
                                                {
                                                    groupId: "0000",
                                                    headerName:
                                                        "ငွေထုတ်သည့်နေ့",
                                                    children: [
                                                        { field: "clientId" },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            groupId: "1",
            headerName: " ",
            children: [
                {
                    groupId: "11",
                    headerName: " ",
                    children: [
                        {
                            groupId: "111",
                            headerName: " ",
                            children: [
                                {
                                    groupId: groupName,
                                    children: [
                                        {
                                            groupId: staffName,
                                            children: [
                                                {
                                                    groupId: "1111",
                                                    headerName: " ",
                                                    children: [
                                                        { field: "clientName" },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            groupId: "2",
            headerName: " ",
            children: [
                {
                    groupId: "22",
                    headerName: " ",
                    children: [
                        {
                            groupId: "222",
                            headerName: " ",
                            children: [
                                {
                                    groupId: "2222",
                                    headerName: " ",
                                    children: [
                                        {
                                            groupId: "22222",
                                            headerName: " ",
                                            children: [
                                                {
                                                    groupId: "222222",
                                                    headerName: " ",
                                                    children: [
                                                        { field: "accId" },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            groupId: "3",
            headerName: " ",
            children: [
                {
                    groupId: "33",
                    headerName: " ",
                    children: [
                        {
                            groupId: "333",
                            headerName: " ",
                            children: [
                                {
                                    groupId: "3333",
                                    headerName: " ",
                                    children: [
                                        {
                                            groupId: "33333",
                                            headerName: " ",
                                            children: [
                                                {
                                                    groupId: "333333",
                                                    headerName: " ",
                                                    children: [
                                                        { field: "accountNo" },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            groupId: "Proximity Finance Microfinance",
            children: [
                {
                    groupId: "SAVINGS RETURN FORM (VOLUNTARY SAVINGS)",
                    children: [
                        {
                            groupId: "4",
                            headerName: " ",
                            children: [
                                {
                                    groupId: "44",
                                    headerName:
                                        "ချေးငွေအရာရှိလက်မှတ် (LO's Signature)",
                                    children: [
                                        {
                                            groupId: "444",
                                            headerName:
                                                "အကူချေးငွေအရာရှိလက်မှတ် (Helper LO's signature)",
                                            children: [
                                                {
                                                    groupId: "4444",
                                                    headerName:
                                                        "ထုတ်ယူငွေစုစုပေါင်း",
                                                    children: [
                                                        {
                                                            field: "depositProductName",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            groupId: "6",
            headerName: " ",
            children: [
                {
                    groupId: "66",
                    headerName: " ",
                    children: [
                        {
                            groupId: "666",
                            headerName: " ",
                            children: [
                                {
                                    groupId: "6666",
                                    headerName: " ",
                                    children: [
                                        {
                                            groupId: "66666",
                                            headerName: " ",
                                            children: [
                                                {
                                                    groupId: "666666",
                                                    headerName: " ",
                                                    children: [
                                                        { field: "value" },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            groupId: "5",
            headerName: " ",
            children: [
                {
                    groupId: "55",
                    headerName: " ",
                    children: [
                        {
                            groupId: "555",
                            headerName: " ",
                            children: [
                                {
                                    groupId: "5555",
                                    headerName: " ",
                                    children: [
                                        {
                                            groupId: "55555",
                                            headerName: " ",
                                            children: [
                                                {
                                                    groupId: "555555",
                                                    headerName: " ",
                                                    children: [
                                                        {
                                                            field: "activatedOnDate",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
    return columnGrouping;
};

export default columnGroupingModel;
