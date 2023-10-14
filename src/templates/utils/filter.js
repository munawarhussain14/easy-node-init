module.exports = function (searchColumn, keyword) {
  let conditions = [];
  if (searchColumn.length === 0 || !keyword) return {};
  searchColumn.map((e) => {
    conditions.push({ [e]: { $regex: keyword, $options: "i" } });
  });

  return {
    $or: conditions,
  };
};
