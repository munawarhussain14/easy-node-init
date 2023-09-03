module.exports = async function ({ req, Model, searchColumn = [] }) {
  const page = req.query.page || 1;
  const resPerPage = req.query.resPerPage || 10;
  const offset = (page - 1) * resPerPage;
  const keyword = req.query.keyword || null;

  const conditions = filter(searchColumn, keyword);
  const data = await Model.find(conditions).skip(offset).limit(resPerPage);
  const count = await Model.countDocuments(conditions);
  const totalPages = Math.ceil(count / resPerPage);

  return {
    page,
    resPerPage,
    count,
    totalPages,
    data,
  };
};

function filter(searchColumn, keyword) {
  let conditions = [];
  if (searchColumn.length === 0 || !keyword) return {};
  searchColumn.map((e) => {
    conditions.push({ [e]: { $regex: keyword, $options: "i" } });
  });

  return {
    $or: conditions,
  };
}
