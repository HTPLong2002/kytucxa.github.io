import mysql from 'mysql2/promise';
//connect database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'id20988664_quanlyktx',
    // password: 'Longgood123$'
});

//query data
// connection.query('SELECT * FROM `danhsachtksv`',
//     function(err, results, fields){
//         console.log('check mysql');
//         console.log(results);
//     }
// );
export default pool;
