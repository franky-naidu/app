const pool = require('../db')


const creatNewUser = async (req,body) => {

    try {
    
     result = await pool.query("select * from users where email = $1",[body.email])
     if(result.rows.length > 1) {
        return {
            status:"Failure",
            msg:"User Already Exists"
        }
     }
    await pool.query("INSERT INTO USERS(name,email,password,phone_number,apt_no,street_name,pincode) VALUES ($1,$2,$3,$4,$5,$6,$7)",
            [body.name,body.email,body.password,body.phone_number,body.apt_no,body.street_name,body.pincode])
    result = await pool.query("select * from users where email = $1",[body.email])
    console.log(result)
     userCreated = result.rows[0]
     console.log(userCreated)
     return {
        status:"Success",
        data : userCreated
     }
    } catch (error) {
        console.error(error)
        return {
            status:"Failure",
            msg: error
        }
    }
}


const getReservationsByUser = async (user_id) => {
    try {
        result = await pool.query(`
        
            SELECT
            R.reservation_id,
            R.start_date,
            R.end_date,
            R.price_per_day,
            R.total,
            EXTRACT(DAY from end_date - start_date) no_of_days,
            P.name,
            p.room_type,
            P.property_id,
            p.description,
            CONCAT(p.apt_no,' , ',p.street_name,' , ',a.city,' , ',a.state,' , ',a.pincode) final_add
            FROM RESERVATIONS R
            LEFT JOIN USERS U ON R.USER_ID = U.USER_ID
            LEFT JOIN PROPERTY P ON P.property_id = R.room_id
            LEFT JOIN address A on A.pincode = P.pincode
            WHERE R.user_id = $1
            ORDER BY R.START_DATE DESC;

        `,[user_id])
        return {
            status:"Success",
            data : result.rows
        }
    } catch (error) {
        console.error(error)
        return {
            status:"Failure",
            msg: error
        }
    }
}


const authenticateUser = async (req,body) => {
    try {
    
        result = await pool.query("select * from users where email = $1 and password = $2",[body.email,body.password])
        if(result.rows.length < 1) {
           return {
               status:"Failure",
               msg:"Invalid Username/ password"
           }
        } else {
            return {
                status:"Success",
                data: result.rows[0]
            }
        }
       } catch (error) {
           console.error(error)
           return {
               status:"Failure",
               msg: error
           }
       }
}



module.exports = {
    creatNewUser,
    authenticateUser,
    getReservationsByUser

}