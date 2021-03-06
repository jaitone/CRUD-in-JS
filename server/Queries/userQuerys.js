const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Llatrese34",
  port: 5432
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY uid ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  console.log(request);
  const id = parseInt(request.params.id);
  pool.query("SELECT * FROM users WHERE uid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const findUserByUsername = username => {
  return pool.query("SELECT * FROM users WHERE username = $1", [username]);
};

const findUserByEmail = email => {
  // send just email instead
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

const createUser = (request, response) => {
  const date_created = new Date();
  const { username, email, password } = request;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      pool.query(
        `INSERT INTO users (username, email, password, date_created) VALUES ($1, $2, $3, $4 )`,
        [username, email, hash, date_created],
        (error, results) => {
          if (error) {
            response.status(500).send("Username in use");
          } else {
            response.status(201).send(`User added`);
          }
        }
      );
    });
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { username, email } = request.body;

  pool.query(
    "UPDATE users SET username = $1, email = $2 WHERE uid = $3",
    [username, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM users WHERE uid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  findUserByUsername
};
