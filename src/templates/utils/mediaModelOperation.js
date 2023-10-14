const mongoose = require("mongoose");
const processDebugger = require("debug")("app:process");

module.exports = async function (file, operation = "add", run = "default") {
  processDebugger(run);
  try {
    let add = false;
    const Model = mongoose.model(file.schema);
    let row = await Model.findById(file.objectId);
    let objectId = null;
    if (operation === "add") {
      objectId = file._id;
    }
    if (row.schema.path("avatar") && file.fileType === "avatar") {
      add = true;
      row.avatar = objectId;
    } else if (row.schema.path("cover") && file.fileType === "cover") {
      add = true;
      row.cover = objectId;
    } else if (row.schema.path("gallery") && file.fileType === "gallery") {
      if (operation === "add") {
        add = true;
        row.gallery.push(objectId);
        if (row.schema.path("featured") && file.featured) {
          const FileModel = mongoose.model("File");
          await FileModel.updateMany(
            { objectId: row._id, _id: { $ne: file._id } },
            { $set: { featured: false } }
          );
          row.featured = objectId;
        }
      } else {
        await Model.findByIdAndUpdate(row._id, {
          $pull: { gallery: file._id },
        });
        if (row.schema.path("featured") && file.featured) {
          row.featured = null;
        }
      }
    }
    row.save();
    if (operation === "add" && add) {
      file.attach = true;
      file.skipPostSave = true;
      file.save();
    }
    return { success: true };
  } catch (error) {
    processDebugger(error);
    return { success: false, error };
  }
};
