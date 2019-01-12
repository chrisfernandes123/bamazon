var inquirer = require("inquirer");
var mysql = require("mysql");

var itemIDs = [];
var price = 0;
var product_name;

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as threadId " + connection.threadId);
  
  });


  function selectItem() {

    sql = "SELECT item_id, product_name, price from products";
      
    connection.query(sql, function(err, res) {
        if (err) throw err;
        res.forEach(function(data){
            console.log('ItemID: ' + data.item_id + '\n' + 'Item Name: ' + data.product_name + '\n' + 'Price: $' + data.price + '\n');
           itemIDs.push (data.id);
        });
          //  connection.end();
          });

          promptUser();
        }




        function checkItemIDandQty(itemid, quantity) {
           
            sql = "SELECT stock_quantity, price, product_name from products WHERE item_id = " + itemid + " AND stock_quantity >= " + quantity + ";";
         
            connection.query(sql, function(err, res) {
                if (err) throw err;
              
               price = res[0].price;
               product_name = res[0].product_name;
             
              });
    

              return 'OK';
              
                }


                function updateItemQty(itemid, quantity) {
                   
                    sql = "update products set stock_quantity = stock_quantity - " + quantity + " where item_id = " + itemid + ";"
                    
                    connection.query(sql, function(err, res) {
                      if (err) throw err;
                     // console.log(res);
                    //  connection.end();
                    console.log("You have purchased " + quantity + " " + product_name + "(s)." );
                    console.log("The transaction cost you: $" + quantity * price);
                    });
                  }


        function promptUser() {

            inquirer
                .prompt([
        
                    {
                        type: "input",
                        message: "Please enter the ItemID of the item you would like to buy.",
                        name: "itemid"
                    }
        
                ])
                .then(function (inquireritem) {



                    inquirer
                .prompt([
        
                    {
                        type: "input",
                        message: "Please enter the quantity you would like to buy.",
                        name: "quantity"
                    }
        
                ])
                .then(function (inquireritemqty) {


                   var a =  checkItemIDandQty(inquireritem.itemid, inquireritemqty.quantity) 

                    //console.log(a);

                    if (a === 'OK'){
                        
                        updateItemQty(inquireritem.itemid, inquireritemqty.quantity);

                        

                    }




                }).catch(function(err){
                    console.log(err);

            
                   });





                }).catch(function(err){
                    console.log(err);

            
                   });
                }




        selectItem();
        