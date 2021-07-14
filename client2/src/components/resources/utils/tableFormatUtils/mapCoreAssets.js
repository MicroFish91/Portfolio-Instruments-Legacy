function mapCoreAssets(coreAssets, benchmarkTitles) {
  const mappedCoreAssets = coreAssets.map((account) => {
    const newArray = [];

    // Object: {location, type, amountOne, amountTwo, amountThree, amountFour, amountFive, amountSix}

    newArray.push(account.location);
    newArray.push(account.type);

    // amountOne
    if (account.amountOne) {
      newArray.push(parseFloat(account.amountOne).toFixed(2));
    } else {
      newArray.push("");
    }

    // amountTwo
    if (benchmarkTitles.length > 1) {
      if (account.amountTwo) {
        newArray.push(parseFloat(account.amountTwo).toFixed(2));
      } else {
        newArray.push("");
      }
    }

    // amountThree
    if (benchmarkTitles.length > 2) {
      if (account.amountThree) {
        newArray.push(parseFloat(account.amountThree).toFixed(2));
      } else {
        newArray.push("");
      }
    }

    // amountFour
    if (benchmarkTitles.length > 3) {
      if (account.amountFour) {
        newArray.push(parseFloat(account.amountFour).toFixed(2));
      } else {
        newArray.push("");
      }
    }

    // amountFive
    if (benchmarkTitles.length > 4) {
      if (account.amountFive) {
        newArray.push(parseFloat(account.amountFive).toFixed(2));
      } else {
        newArray.push("");
      }
    }

    // amountSix
    if (benchmarkTitles.length > 5) {
      if (account.amountSix) {
        newArray.push(parseFloat(account.amountSix).toFixed(2));
      } else {
        newArray.push("");
      }
    }

    // Other
    if (account.hasOwnProperty("other")) {
      let otherTotal = 0;

      account["other"].forEach((other) => {
        otherTotal += parseFloat(other.amount);
      });

      newArray.push(parseFloat(otherTotal).toFixed(2));
    } else {
      newArray.push("");
    }

    newArray.push(parseFloat(account.total).toFixed(2));

    return newArray;
  });

  return mappedCoreAssets;
}

export default mapCoreAssets;
