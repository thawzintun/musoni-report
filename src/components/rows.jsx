const rows = (filteredData) => {
    var currentDate = new Date();
    let rowId = 0;
    let row = [];
    filteredData &&
        filteredData.map((data) => {
            if (
                (data.accountNo &&
                    data.clientId &&
                    // data.status.active &&
                    data.timeline.activatedOnDate &&
                    data.status.active) ||
                data.status.value === "Matured"
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
                const returnAmt =
                    Math.round(
                        parseInt(
                            data.summary.totalInterestEarned + futureInterest
                        ) / 50
                    ) * 50;

                row.push({
                    id: ++rowId,
                    clientId: data.clientId,
                    clientName: data.clientName,
                    accountNo: data.accountNo,
                    depositProductName: data.depositProductName,
                    // value: data.status.value,
                    activatedOnDate: new Date(
                        data.timeline.activatedOnDate
                    ).toLocaleDateString("en-GB"),
                    maturityDate: new Date(
                        data.maturityDate
                    ).toLocaleDateString("en-GB"),
                    totalDeposits: data.summary.totalDeposits,
                    returnAmt: returnAmt,
                    expSavReturnManual: expSavReturnManual
                        ? expSavReturnManual
                        : "-",
                    signature: "",
                });
            }
            return null;
        });
    return row;
};

export default rows;
