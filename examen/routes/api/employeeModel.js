var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('employees');


  //////////////////////GET EMPLOYESSS ALL///////////////////////////////
  lib.getEmployees = (handler)=>{
    empColl.find({}).toArray(handler);
  }
////////////////////////////////////GET BY ID//////////////////////////////////////
  lib.getEmployeesById = (id, handler) => {
    var query = { "_id": new ObjectID(id) };
    empColl.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    );
  }


  ////////////////////////////////////GET BY COMPANY/////////////////////////
  lib.getEmployeesByCompany = (company, handler) => {
    var query = { "company": company };
    empColl.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    );
  }

  //////////////////////////////GET BY TAG//////////////////////////////////////
  lib.getEmployeesByTag = (tag, handler) => {
    var query = { "tags": tag };
    empColl.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    );
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    return handler(new Error("No Implementado"), null);
  }

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
