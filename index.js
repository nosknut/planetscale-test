const mysql = require('mysql2/promise');
require('dotenv').config({override: true})

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: {
            rejectUnauthorized: Boolean(process.env.SSL_REJECT_UNAUTHORIZED),
        },
    })
    const [rows, fields] = await connection.execute('SELECT * FROM `people` WHERE `name` REGEXP ? AND `age` > ?', ['.', 14]);

    console.table(rows)

    connection.end();
}

main()