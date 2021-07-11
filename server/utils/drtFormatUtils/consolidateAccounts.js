// Consolidates totals into each account and returns back as an alphabetized array
module.exports = function consolidateAccounts(accountArray) {
  var financialAccounts = {};
  var listOfAccounts = [];
  var sum = 0;

  // Cycle through all accounts
  accountArray.forEach((account) => {
    // If account exists, add to total, else instantiate new institution
    if (financialAccounts.hasOwnProperty(account.location)) {
      financialAccounts[account.location] += parseFloat(account.total);
    } else {
      financialAccounts[account.location] = parseFloat(account.total);
    }

    sum += parseFloat(account.total);
  });

  for (let properties in financialAccounts) {
    listOfAccounts.push(properties);

    financialAccounts[properties] = (
      (financialAccounts[properties] / sum) *
      100
    ).toFixed(2);
  }

  listOfAccounts.sort();

  financialAccounts.list = listOfAccounts;

  return financialAccounts;
};
