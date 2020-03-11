var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

/////////////////////// GET /ALL/////////////////////////////////
// http://localhost:3000/api/employee/all
  router.get('/all', (req, res)=>{
    empModel.getEmployees((err, dat)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"no se pudo obtener srry"});
      }
      return res.status(200).json(dat);
    });
} );

//////////////////////BY ID/////////////////////////////////////
 // http://localhost:3000/api/employee/byid/:id
   router.get('/byid/:id',(req, res)=>{
    var id =  req.params.id ;
    empModel.getEmployeesById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
});


///////////////////////GET BY COMPANY/////////////////////////////
// http://localhost:3000/api/employee/bycompany/:company
router.get('/bycompany/:company',(req, res)=>{
  var company =  req.params.company ;
  empModel.getEmployeesByCompany(company, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(doc);
  });
});

/////////////////////GET BY TAG///////////////////////////////  
// http://localhost:3000/api/employee/bytag/:tag
router.get('/bytag/:tag',(req, res)=>{
  var tag =  req.params.tag ;
  empModel.getEmployeesByTag(tag, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(doc);
  });
});

////////////////////////POST ADD TAG////////////////////////////////////
// http://localhost:3000/api/employee/addtag/:id
router.post('/addtag/:id', (req, res, next)=>{
  var id = req.params.id;
  var tag = req.body.tag;

  empModel.addEmployeeATag(tag,id, (err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(result);
});
});


///////////////////////DELETE POR ID////////////////////////////////
//http://localhost:3000/api/employee/delete/:id
router.delete('/delete/:id', (req, res)=>{
  var id = req.params.id;
  empModel.removeEmployee(id, (err, deletedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(deletedDoc);
  });
});

/////////////////////////PUT MAKEOLDER 1 ANIO/////////////////////////
//http://localhost:3000/api/employee/makeolder
router.put('/makeolder', (req, res, next)=>{
  var data = req.body;
  empModel.increaseAgeToAll(data, (err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(result);
  });
});



  return router;
}

module.exports = initEmployee;
