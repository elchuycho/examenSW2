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


  ////////////////////////POST ADD A TAG///////////////////////////////////////
 lib.addEmployeeATag = ( tag, id, handler) => {
   var query = {"_id": new ObjectID(id)};
   var postCommand = {
    "$push":{
      "tags": tag
    }
   };
   empColl.updateOne(query, postCommand, (err, doc)=>{
    if (err) {
      console.log(err);
      return handler(err, null);
    }
    return handler(null, doc);
   });
  }

  ////////////////////////DELETE POR ID/////////////////////////////////////
  lib.removeEmployee = (id, handler) => {
    var query = {"_id": new ObjectID(id)};
        empColl.deleteOne(
          query,
          (err, rslt)=>{
            if(err){
              return handler(err, null);
            }
            return handler(null, rslt.result);
          }
        );
  }


  ///////////////////////INCREMENTAR 1 ANIO A TODOS/////////////////////
  ///para modificar cuanros anios mas en postman en bidy editar el valor 1///////
  lib.increaseAgeToAll = (ageDelta, handler) => {
  var { ageToAdd } = ageDelta;
  var updateCommand = {
    "$inc":{
      "age":parseInt(ageToAdd)
    }
  };
  empColl.updateMany({},updateCommand, (err, updateResult)=>{
  if (err) {
    console.log(err);
    return handler(err, null);
  }
  return handler(null, updateResult);
});
  }



  return lib;
}

module.exports = employeeModel;
