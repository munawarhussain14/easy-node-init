const filter = require("./filter");
// const populate = require("./populate");

module.exports = async function ({
  req,
  Model,
  searchColumn = [],
  exactSearchColumn = [],
}) {
  let params = req.query;
  const page = req.query.page || 1;
  delete params.page;
  const resPerPage = req.query.resPerPage || 10;
  delete params.resPerPage;
  const offset = (page - 1) * resPerPage;
  let keyword = req.query.keyword || null;
  delete params.keyword;
  if (keyword === "") keyword = null;

  const conditions = filter(searchColumn, keyword, exactSearchColumn, params);
  const data = await Model.find(conditions)
    .skip(offset)
    .limit(resPerPage)
    .sort({ createdAt: -1 });
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
