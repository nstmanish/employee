const fs = require('fs');




exports.add_employee = (req, res) => {

    let rawData = fs.readFileSync( '.' + '/employee.json' );
    let employees   = JSON.parse(rawData);
    let employeeIds = [];
  
    for (let employeeNumber in employees){
      
      if ( employees[employeeNumber].email == req.body.email )
      {
        res.end( "Employee Exist" )
      }
  
      employeeIds.push(employees[employeeNumber].empId);
      
    }
    
    employeeIds.sort().reverse();
  
    employees.push({
      "empId"   : (employeeIds[0] != null ? parseInt(employeeIds[0]) : 0 ) + 1, 
      "empName" : req.body.empName,  
      "empdept" : req.body.empdept,
      "mobile"  : req.body.mobile,
      "email"   : req.body.email , 
      "role"    : req.body.role,
      "Salary"  : req.body.Salary
    });
  
    let data = JSON.stringify(employees);
    fs.writeFileSync( '.' + '/employee.json', data );
  
    res.send( "New Employee Added" )
  
};


exports.List_employee = (req, res) => {

    let rawData = fs.readFileSync( './employee.json' );
    let employees = JSON.parse(rawData);
    res.send(employees);

}


exports.view_employee = (req, res) => {
    let rawData = fs.readFileSync( '.' + '/employee.json' );
    let employees = JSON.parse(rawData);

    for (let employeeNumber in employees)
    {
        if (employees[employeeNumber].empId == req.params.employeeId)
        {
        res.send(employees[employeeNumber]);
        }
    }

    res.send("No data Found");
}



exports.update_employee  = (req, res) => {
    let rawData = fs.readFileSync( '.' + '/employee.json' );
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
    
            let updatedData = JSON.stringify(employees);
            fs.writeFileSync( '.'  + '/employee.json', updatedData );
        
            res.send("record Updated");
    
        }
  
    }
  
    res.send("record No Found !");

}



exports.delete_employee = (req, res) => {
    let rawData = fs.readFileSync( '.' + '/employee.json' );
    let dataArray = [];
    let employees = JSON.parse(rawData);
  
    for (let employeeNumber in employees)
    {
        if (employees[employeeNumber].empId != req.params.employeeId)
        {
            dataArray.push(employees[employeeNumber]);
        }
    }
  
    let data = JSON.stringify(dataArray);
    fs.writeFileSync( '.'  + '/employee.json', data );
  
    if (dataArray.length != Object.keys(employees).length)
    {
        res.send("record deleted");
    }

    res.send("record Not Found");

}



exports.salary_lt_employee  = (req, res) => {
    let rawData = fs.readFileSync( '.' + '/employee.json' );
    let employees = JSON.parse(rawData);

    let dataArray = [];

    for (let employeeNumber in employees)
    {
        if (employees[employeeNumber].Salary < req.params.lessThan)
        {
        dataArray.push(employees[employeeNumber]);
        }
    }

    if (dataArray.length > 0)
    {
        res.send(dataArray);
    }

    res.send({ "message" : "No Data Found"});

}