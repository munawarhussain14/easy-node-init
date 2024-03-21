module.exports = function (
  searchColumn,
  keyword,
  exactSearchColumn = [],
  params = null
) {
  let condition = {};
  let orConditions = [];
  let andConditions = [];
  keyword = escapeRegExp(keyword);
  if (searchColumn.length > 0 && keyword) {
    searchColumn.map((e) => {
      orConditions.push({ [e]: { $regex: keyword, $options: "i" } });
    });
    if (orConditions.length > 0) {
      condition["$or"] = orConditions;
    }
  }

  if (params && exactSearchColumn.length > 0) {
    exactSearchColumn.map((e) => {
      if (params[e]) {
        andConditions.push({ [e]: params[e] });
      }
    });
    if (andConditions.length > 0) {
      condition["$and"] = andConditions;
    }
  }
  return condition;
};

function escapeRegExp(string) {
  if (!string || !string === "") return string;
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
}
