const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : '51.15.255.111',
  user     : 'root',
  password : 'root',
  database : 'db_codermaker889',
  //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();

// get one tuto
const getTutoriel = (clbk, data) => {
  const q = `SELECT * FROM tutoriel WHERE id=${connection.escape(data.id)} ORDER BY id`;

  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

// get 3 last tutoriel
const getLastTutoriel = (clbk, data) => {
  const q = `SELECT * FROM tutoriel ORDER BY id DESC LIMIT 3`;

  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  })
}

// get user getTutoriels
const getUserTutoriels = (clbk, data) => {
  const q = `SELECT s.* FROM user p INNER JOIN tutoriel s ON s.user_id = p.id WHERE p.id = ${connection.escape(data.id)} AND s.user_id = ${connection.escape(data.id)}`;
  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  })
}

// get all tuto
const getTutoriels = (clbk) => {
  const q = "SELECT * FROM tutoriel ORDER BY id";

  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

// post one tuto
const postTutoriels = (clbk, data) => {
  const q = `INSERT INTO tutoriel (title, author, image, description, post_date, content, user_id) VALUES (${connection.escape(data.title)}, ${connection.escape(data.author)}, ${connection.escape(data.image)}, ${connection.escape(data.description)}, NOW(), ${connection.escape(data.content)}, ${connection.escape(data.userId)})`;
  const q2 = `INSERT INTO tag (tag_name) VALUES ('${data.tags}')`;
  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
  connection.query(q2, (error, results, fields) => {
    if (error) throw error;
    //console.log(results)
  });
};

// update one tuto
const updateTutoriel = (clbk, data, id) => {
  const q = `UPDATE tutoriel SET title = ${connection.escape(data.title)}, author = ${connection.escape(data.author)}, image = ${connection.escape(data.image)}, description = ${connection.escape(data.description)}, post_date = NOW(), content = ${connection.escape(data.content)}, user_id = ${connection.escape(data.user_id)} WHERE id = ${connection.escape(id)}`;

  connection.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

module.exports = {
  getTutoriel,
  getTutoriels,
  postTutoriels,
  updateTutoriel,
  getLastTutoriel,
  getUserTutoriels,
};
