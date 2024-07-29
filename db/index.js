const {Pool} = require('pg');


const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Timeflys1978',
    database: "employee_track",
})

const dbEmployeeTrack = {

    slectAllEmployees() {
        console.log('selecting employees...');
    },

    createEmployee(employee = {}) {
        console.log('creating employee...');
        let query = 'INSERT INTO employee ?'

        pool.query(query).then((result) => {
            console.log(result)
        })
    },
}


module.exports = dbEmployeeTrack

