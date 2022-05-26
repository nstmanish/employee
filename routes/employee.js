var express = require('express');
var router = express.Router();


const fs = require('fs');

/* POST Add Employee | Done */
router.post('/new', function(req, res, next) {
 
  let rawData = fs.readFileSync('./employee.json');
  let employees = JSON.parse(rawData);
  let updateRecord = true;
  let employeeIds = [];

  for (let employeeNumber in employees){
    
    if ( employees[employeeNumber].email == req.body.email )
    {
      res.end( "Employee Exist" )
    }

    employeeIds.push(employees[employeeNumber].empId);
    
  }
  
  employeeIds.sort().reverse();

  console.log(employeeIds);

  employees.push({
    "empId"   : (employeeIds[0] != null ? employeeIds[0] : 0 ) + 1, 
    "empName" : req.body.empName,  
    "empdept" : req.body.empdept,
    "mobile"  : req.body.mobile,
    "email"   : req.body.email , 
    "role"    : req.body.role,
    "Salary"  : req.body.Salary
  });

  let data = JSON.stringify(employees);
  fs.writeFileSync('./employee.json', data);

  res.send( employees )

});

/* GET All Employee | Done */
router.get('/employeeList', function(req, res, next) {

  let rawData = fs.readFileSync('./employee.json');
  let employees = JSON.parse(rawData);

  res.send(employees);

});

/* GET Employee by Id. | Done */
router.get('/detail/:employeeId', function(req, res, next) {

  let rawData = fs.readFileSync('./employee.json');
  let employees = JSON.parse(rawData);

  for (let employeeNumber in employees)
  {
    if (employees[employeeNumber].empId == req.params.employeeId)
    {
      res.send(employees[employeeNumber]);
    }
  }

  res.send("No data Found");

});

/* UPATE Employee Detail. | Partial Done*/
router.put('/update/:employeeId', function(req, res, next) {
  
  let rawData = fs.readFileSync('./employee.json');
  let employees = JSON.parse(rawData);

  for (let employeeNumber in employees)
  {
    if (employees[employeeNumber].empId == req.params.employeeId)
    {
      employees[employeeNumber].empId   = req.params.employeeId;
      employees[employeeNumber].empName = req.body.empName;
      employees[employeeNumber].empdept = req.body.empdept;
      employees[employeeNumber].mobile  = req.body.mobile;
      employees[employeeNumber].email   = req.body.email;
      employees[employeeNumber].role    = req.body.role;
      employees[employeeNumber].Salary  = req.body.Salary;
    }
  }

  let updatedData = JSON.stringify(employees);
  fs.writeFileSync('./employee.json', updatedData);

  res.send("record Updated");

});

/* DELETE Employee BY ID. | Done */
router.delete('/delete/:employeeId', function(req, res, next) {

  let dataArray = [];
  let rawData = fs.readFileSync('./employee.json');
  let employees = JSON.parse(rawData);

  for (let employeeNumber in employees)
  {
    if (employees[employeeNumber].empId != req.params.employeeId)
    {
      dataArray.push(employees[employeeNumber]);
    }
  }

  let data = JSON.stringify(dataArray);
  fs.writeFileSync('./employee.json', data);

  res.send("record deleted");

});

/* FETCH fetch employees whos salary is less than 5000 | Done */
router.get('/salary/:lessThan', function(req, res, next) {
 
  let rawData = fs.readFileSync('./employee.json');
  let employees = JSON.parse(rawData);

  let dataArray = [];

  for (let employeeNumber in employees)
  {
    if (employees[employeeNumber].Salary < req.params.lessThan)
    {
      dataArray.push(employees[employeeNumber]);
    }
  }

  res.send(dataArray);

});

module.exports = router;