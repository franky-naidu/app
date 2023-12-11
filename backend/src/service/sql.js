const pool = require('../db')

const runSql = async(sql) => {

    try {
        console.log(sql)
        result = await pool.query(sql);

    if(result.rows.length > 0) {
        columns = Object.keys(result.rows[0]);

        return {
            columns,
            data : result.rows,
            status:"Success"
        }
     }
     return {
        status:"Success",
        data : [],
        msg:"Query run successfully"
     }
    } catch (error) {
        return {
            msg:error,
            status:"Failure"
        }
    }
}


module.exports = {
    runSql

}