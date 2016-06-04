  console.log("Start");
  //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
  var db = openDatabase("mydb", "0.1", "Some description", 1024 * 1024 * 10);
  if(!db)
    console.log("Error with db");
  else {
    db.transaction(function(tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS Persons(name varchar(40) NOT NULL, date REAL)", [],
      function(result) {
        console.log(result);
      },
      function(tx, err) {
        console.log(err);
      })
    });
  }

function addPerson() {
  
  if(db) {
    var name = document.getElementById("name").value;
    if(name != "") {
      db.transaction(function(tx) {
        tx.executeSql("INSERT INTO Persons (name, date) values ( ?, ? )", [name, new Date().getTime()], null,
        function(tx, err) {
          console.log(err);
        });
      });
    }
  }

}

//CREATE TABLE Persons (uid int NOT NULL AUTO_INCREMENT, name varchar(40) NOT NULL, surname varchar(40), date REAL, PRIMARY KEY (uid))
// if(!db)
//   console.log("Error with connection to database");
// db.transaction(function(tx) {
//   tx.executeSql("SELECT COUNT(*) FROM myTable", [],
//   function (result) { //success
//     console.log(result);
//   },
//   function (tx, error) { //error
//     tx.executeSql("CREATE TABLE myTable (id REAL UNIQUE, label TEXT, timestamp REAL)", [], null, null);
//   }
// )});
// db.transaction(function(tx) {
//   tx.executeSql("INSERT INTO myTable (label, timestamp) values(?, ?)", ["Купить iPad или HP Slate", new Date().getTime()], null, null);
// });
// db.transaction(function(tx) {
//   tx.executeSql("SELECT * FROM myTable", [], function(tx, result) {
//     for(var i = 0; i < result.rows.length; i++) {
//         document.write('<b>' + result.rows.item(i)['id'] + '</b><br />');
//     }
// }, null)});
