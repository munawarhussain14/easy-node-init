const fileFields = "_id url featured";

function populateFile(Model) {
  const populateField = ["avatar", "cover", "featured", "gallery"];
  const fields = [];

  populateField.map((field) => {
    if (Model.schema.path(field)) {
      fields.push(field);
    }
  });

  return fields.join(" ");
}

module.exports.populateFile = populateFile;
module.exports.fileFields = fileFields;
