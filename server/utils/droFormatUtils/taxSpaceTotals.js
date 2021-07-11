module.exports = function taxSpaceTotals(accounts) {
  let taxable = 0;
  let traditional = 0;
  let roth = 0;
  let netWorth = 0;

  // Sum Totals
  accounts.forEach((data) => {
    // Categorize account totals
    if (data.dataValues.accountType === "Taxable") {
      taxable += parseFloat(data.dataValues.total);
    } else if (data.dataValues.accountType === "Roth") {
      roth += parseFloat(data.dataValues.total);
    } else if (data.dataValues.accountType === "Traditional") {
      traditional += parseFloat(data.dataValues.total);
    }
  });

  netWorth = taxable + roth + traditional;

  return [
    parseFloat(taxable).toFixed(2),
    parseFloat(traditional).toFixed(2),
    parseFloat(roth).toFixed(2),
    parseFloat(netWorth).toFixed(2),
  ];
};
