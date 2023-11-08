const rows = (filteredData) => {
    var currentDate = new Date();
    let row = [];
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

                row.push({
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
                    signature: "",
                });
            }
            return null;
        });
    return row;
};

export default rows;
