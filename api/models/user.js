const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host     : '51.15.255.111',
  user     : 'root',
  password : 'root',
  database : 'db_codermaker889',
  //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();

// dummy function pour vérifier si la connectione à la base est bien établie
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('DATABASE SAYS => The solution is', results[0].solution);
});

const get = (clbk, id) => {
  var query;

  if (id) query = `SELECT id, email, avatar, about, is_admin FROM user WHERE id = ${connection.escape(id)}`;
  else query = 'SELECT id, mail, avatar, about, is_admin FROM users';

  connection.query(query, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    clbk(results); // on passe les résultats de la requête en argument de la fonction callback
  });
};

const checkMail = (clbk, email) => {
  const query = `SELECT COUNT(*) as count FROM user WHERE email = ${connection.escape(email)}`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    clbk(results); // passe les résultats de requête en arg du callback
  });
};

const register = (clbk, data) => {
  checkMail(res => {
    //console.log(res);
    if (res[0].count > 0) { // cette adresse mail est déjà en base
      return clbk({error: true, message: "un compte avec le même email existe déjà. veuillez saisir un email de compte différent"});
    }
    // la base ne contient pas encore cette adresse mail, poursuivons l'insertion
    const hash = bcrypt.hashSync(data.password, 10);
      let query = `INSERT INTO user (username, email, password) VALUES
      (${connection.escape(data.username)}, ${connection.escape(data.email)}, ${connection.escape(hash)})`;

      connection.query(query, (error, results, fields) => {
        if (error) throw error;
        results.error = false;
        results.message = "vous êtes bien enregistré, veuillez vous connecter.";
        clbk(results);
      });
  }, data.email);
};

const remove = (clbk, id) => {
  const query = `DELETE FROM user WHERE id = ${connection.escape(id)}`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    results.error = false;
    results.message = "L'utilisateur à été supprimé succès";
    clbk(results); // on passe les résultats de la requête en argument de la fonction callback
  });
};


// Helper method for validating user's password
const comparePassword = (email, clbk) => {
  const q = `SELECT * FROM user WHERE email = ${connection.escape(email)}`;
  connection.query(q, (error, results, fields) => {
    if (error) throw error;

    const tmp = results[0] || results;
    const resp = {};

    if (Array.isArray(tmp) && !tmp.length) {
      resp.error = true;
      resp.message = "Email ou mot de passe invalid";
    } else {
      resp.password = tmp.password;
      resp.error = true;
    }
    clbk(resp)
  })
};

const login = (clbk, data) => {
  comparePassword(data.email, res => {
    if (res.password) {
      bcrypt.compare(data.password, res.password, (error, result) => {
        if (result) {
          const q = `SELECT id, username, email, avatar, about, is_admin FROM user WHERE email = ${connection.escape(data.email)} AND password = ${connection.escape(res.password)} GROUP BY id`;
               // console.log(q);
            connection.query(q, (error, results, fields) => {

              if (error) throw error;

              const tmp = results[0] || results;

              res.user = tmp;
              res.error = false;
              res.password = null;
              res.message = "Vous êtes maintenant connecté";
              clbk(res)
           });
        } else {
          res.error = true;
          res.password = null;
          res.message = "Email ou mot de passe invalid";
          clbk(res)
        }
      });
    } else {
      clbk(res)
    }
  })
};

const patchAbout = (clbk, about, id) => {
  const q = `UPDATE user SET about = ${connection.escape(about)} WHERE id = ${connection.escape(id)}`;
  // console.log(q);
  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

const patchAvatar = (clbk, avatar, id) => {
  const q = `UPDATE user SET avatar = ${connection.escape(avatar)} WHERE id = ${connection.escape(id)}`;
  // console.log(q);
  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

module.exports = {
  register,
  get,
  login,
  patch: {
    about: patchAbout,
    avatar: patchAvatar,
  },
  remove: remove,
};
