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
    var projection = {"name":1, "email":1, "age":1, "phone":1};
    empColl.find(query,{"projection":projection}).toArray(handler);
  }
//L PHONE

  ////////////////////////////////////GET BY COMPANY/////////////////////////
  lib.getEmployeesByCompany = (company, handler) => {
    var query = { "company": company };
    var projection = {"name":1, "email":1, "company":1};
    empColl.find(query,{"projection":projection}).toArray(handler);
  }

  //////////////////////////////GET BY TAG//////////////////////////////////////
  lib.getEmployeesByTag = (tag, handler) => {
    var query = { "tags": tag };
    var projection = {"name":1, "email":1, "tags":1};
    empColl.find(query,{"projection":projection}).toArray(handler);
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


////////////////////EXTRA MAKEOLDER POR ID///////////////////////////////
lib.increaseageporid = ( dataToUpdate , handler )=>{
  var { _id} = dataToUpdate;
  var query = { "_id": new ObjectID(_id)};
  var updateCommad = {
    "$inc" :{
      "age": 1
    }
  };
  empColl.updateOne(
    query,
    updateCommad,
    (err, rslt)=>{
      if(err){
        return handler(err, null);
      }
      return handler(null, rslt.result);
    }
  );
}

//////////////////EXTRA FILTRO POR ANIO/////////////////////////////
lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
  //implementar
  var query = {$and : [
    {"age":{$lte:ageHighLimit}},
    {"age":{$gte:ageLowLimit}} ]};
    var projection = {"name":1, "email":1, "age":1};
  empColl.find(query,{"projection":projection}).toArray(handler);
  // solo mostrar name, age, email de todas las personas entre esos rangos
}



  return lib;
}

module.exports = employeeModel;
