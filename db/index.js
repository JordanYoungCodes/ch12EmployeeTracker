const {Pool} = require('pg');

// wE iNTIALIZE A iNSTANCE OF OUR db
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'jordan',
    database: "employee_track",
});
// we MAKE THE CONNECTION
pool.connect()


module.exports = pool;

