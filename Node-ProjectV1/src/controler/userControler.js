//objet controler
const controlador = {};

//function to call pages /////////////////////////////////////////
controlador.index = ('/', (req, res) => {
  res.render('index');
});

controlador.about_Us = ('/', (req, res) => {
  res.render('about_Us');
});

controlador.RU = ('/', (req, res) => {
  res.render('check_in');
});

controlador.contact = ('/', (req, res) => {
  res.render('contact');
});

controlador.help = ('/', (req, res) => {
  res.render('help');
});

controlador.login = ('/', (req, res) => {
  res.render('login');
});

controlador.restaurants = ('/', (req, res) => {
  res.render('restaurants');
});

controlador.RR = ('/', (req, res) => {
  res.render('crudRestaurant');
});
/////////////////////////////////////////////////////////////////////////////////////

//no se ocupa aun 
controlador.listUser = ('/', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select * from usuario', (err, rows) => {
      if(err){
        res.json(err);
      }else {
        console.log(rows);
        res.render('crudUser', {
          data: rows
        });
      }
    });
  });
});

//funcion para autenticar usuarios
controlador.authenticate = ('/', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select * from usuario where email = ? and contrasenna = ?', [req.body.email, req.body.contrasenna], (err, rows) => {
      if(err){
        res.json(err); 
      }else {
       if(rows[0] === undefined){
          res.render('index');
        }
        else if(rows[0].roll === 'Administrador'){
          req.getConnection((err, conn) => {
            conn.query('select * from usuario', (err, rows) => {
              if(err){
                res.json(err);
              }else {
                console.log(rows);
                res.redirect('/userR');
              }
            });
          }); 

        }else if(rows[0].roll === 'Cliente'){
          res.redirect('/restaurants');
        }

        else{
          res.redirect('/login');
        }
      }
    });
  });
});
        

     

//function to save users other than admin
controlador.addUser = ((req, res) =>{
  req.getConnection((err, conn) => {
    conn.query('insert into usuario set cedula = ?, nombreCompleto = ?, email = ?,contrasenna = ?, telefono = ?, provincia = ?, roll = ?',  [req.body.cedula, req.body.nombreCompleto, req.body.email,req.body.contrasenna, req.body.telefono, req.body.provincia, req.body.check], ( err, rows) => {
        if(err){
          res.json( err );
        }else {
          console.log(rows);
          res.redirect('/userR');
          }
        });
    });
  });

  //function to save users
controlador.new_check = ((req, res) =>{
  req.getConnection((err, conn) => {
    conn.query('insert into usuario set cedula = ?, nombreCompleto = ?, email = ?,contrasenna = ?, telefono = ?, provincia = ?, roll = ?',  [req.body.cedula, req.body.nombreCompleto, req.body.email,req.body.contrasenna, req.body.telefono, req.body.provincia, req.body.check], ( err, rows) => {
        if(err){
          res.json( err );
        }else {
          console.log(rows);
          res.redirect('/');
          }
        });
    });
  });

  //function to delete users
  controlador.delete = ((req, res) =>{
      req.getConnection((err, conn) => {
        conn.query('delete from usuario where cedula = ?', [req.params.cedula], ( err, rows) => {
            if(err){
              res.json( err );
            }else {
              console.log(rows);
              res.redirect('/userR');
              }
            });
        });
      });

      //function to search for users
  controlador.dataUpdate = ((req, res) =>{
      req.getConnection((err, conn) => {
        conn.query('select * from usuario where cedula = ?', [req.params.cedula], ( err, rows) => {
              console.log(rows);
              res.render('updateUser', {data: rows[0] });
            });
        });
      });

      //function to update user
  controlador.update = ((req, res) =>{
      req.getConnection((err, conn) => {
        conn.query('update usuario set nombreCompleto = ?, email = ?, contrasenna = ?, telefono = ?, provincia = ?, roll = ? where cedula = ?', [req.body.nombreCompleto, req.body.email, req.body.contrasenna, req.body.telefono, req.body.provincia, req.body.check, req.params.cedula], (err, rows) => {
          if(err){
            res.json(err);
          }else {
            console.log(rows);
            res.redirect('/userR');
          }
        });
      });
  });
//export modulr
module.exports = controlador;
