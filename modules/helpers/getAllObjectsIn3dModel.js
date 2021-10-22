function getAllObjectsIn3dModel(model, loggingModeOn) {
  var ObjArray = [];
  ObjArray.push(model);
  if (loggingModeOn) console.log(model.name, model.type, model.layers, model);

  model.children.forEach((m) =>
    ObjArray.push(getAllObjectsIn3dModel(m, loggingModeOn))
  );
  return ObjArray.flat();
}

export { getAllObjectsIn3dModel };
