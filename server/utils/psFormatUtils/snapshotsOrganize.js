// Organize and reformat data
module.exports = function snapshotsOrganize(snapshots) {
  const organizedList = [];
  let newSnapshot = {};

  // Loop through List of Snapshots
  snapshots.forEach((snapshotData) => {
    newSnapshot.id = snapshotData.dataValues["snapshots.id"];
    newSnapshot.benchmark =
      snapshotData.dataValues["snapshots.portfolioBenchmark"];
    newSnapshot.title = snapshotData.dataValues["snapshots.title"];
    newSnapshot.notes = snapshotData.dataValues["snapshots.notes"];
    newSnapshot.date = snapshotData.dataValues["snapshots.date"];
    newSnapshot.total = (
      parseFloat(snapshotData.dataValues["snapshots.stockTotal"]) +
      parseFloat(snapshotData.dataValues["snapshots.fixedTotal"]) +
      parseFloat(snapshotData.dataValues["snapshots.realTotal"]) +
      parseFloat(snapshotData.dataValues["snapshots.cashTotal"])
    ).toFixed(2);

    // Add to Bottom of Stack (Beginning of List)
    organizedList.unshift(newSnapshot);

    // Reset Object
    newSnapshot = {};
  });

  return organizedList;
};
