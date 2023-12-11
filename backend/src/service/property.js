const pool = require('../db')
const date = require('date-and-time') 


const getProperty = async (propertyId) => {
   
    try {       
        
        result = await pool.query("Select * from property where property_id =  $1",[propertyId])
        if(result.rows.length == 0) {
            return {
                status:"Failure",
                msg:"Property doesn't Exists"
            }
         }       
         property = result.rows[0]
         return {
            status:"Success",
            data : property
         }
        } catch (error) {
            console.error(error)
            return {
                status:"Failure",
                msg: error
            }
    }

}

const getPropertyInState = async(state,limit = 1000,skip = 0 ) => {
    try {       
        
        result = await pool.query(`select * from property p 
        INNER JOIN address a ON a.pincode = p.pincode
        LEFT JOIN users u ON u.user_id = p.owner_id
        where lower(a.state) = lower($1)
        limit $2
        offset $3;`,[owner_id,limit,offset])
             
         property = result.rows
         return {
            status:"Success",
            data : property
         }
        } catch (error) {
            console.error(error)
            return {
                status:"Failure",
                msg: error
            }
    }
}

const getPropertyOwnedByUser = async (owner_id) => {
   
    try {       
        
        result = await pool.query("Select * from property where owner_id =  $1",[owner_id])
             
         property = result.rows
         return {
            status:"Success",
            data : property
         }
        } catch (error) {
            console.error(error)
            return {
                status:"Failure",
                msg: error
            }
    }

}

const getPaymentsForOwner = async(owner_id) => {
    try {       
        
        result = await pool.query(` 
        select p.* from
        reservations r
        LEFT JOIN payment p on r.reservation_id = p.reservation_id
        where r.room_id in (select property_id from property where owner_id = $1)
        `,[owner_id])
             
         property = result.rows
         return {
            status:"Success",
            data : property
         }
        } catch (error) {
            console.error(error)
            return {
                status:"Failure",
                msg: error
            }
    }
}

const getPaymentsForProperty = async(owner_id,property_id) => {
    try {       
        
        result = await pool.query(` 
        select p.* from
        reservations r
        LEFT JOIN payment p on r.reservation_id = p.reservation_id
        where r.room_id in (select property_id from property where owner_id = $1 and property_id = $2)
        `,[owner_id,property_id])
             
         property = result.rows
         return {
            status:"Success",
            data : property
         }
        } catch (error) {
            console.error(error)
            return {
                status:"Failure",
                msg: error
            }
    }
}

const addServicesToProperty = async (property_id,service_id) => {
    try {
        await pool.query(`
        INSERT INTO PROPERTY_SERVICES VALUES ($1,$2);
        `,[property_id,service_id])
        return {
            status:"Success",
            data:"Service Added"
        }
    } catch (error) {
        
        console.error(error)
        return {
            status:"Failure",
            msg: error
        }
    }
}

const removeServicesToProperty = async (property_id,service_id) => {
    try {
        await pool.query(`
        DELETE FROM PROPERTY_SERVICES WHERE property_id = $1 AND service_id=$2;
        `,[property_id,service_id])
        return {
            status:"Success",
            data:"Service Removed"
        }
    } catch (error) {
        
        console.error(error)
        return {
            status:"Failure",
            msg: error
        }
    }
}
const createProperty = async (req,body) => {

    try {
    let {name,room_type,total_occupancy,total_bedrooms,total_bathrooms,description,price_per_day,published_at,owner_id,apt_no,street_name,pincode,is_listed} = req.body
    published_at = new Date(published_at)
    published_at = date.format(published_at,'YYYY-MM-DD');
    result = await pool.query("INSERT INTO PROPERTY(name,room_type,total_occupancy,total_bedrooms,total_bathrooms,description,price_per_day,published_at,owner_id,apt_no,street_name,pincode,is_listed) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING property_id",
            [name,room_type,total_occupancy,total_bedrooms,total_bathrooms,description,price_per_day,published_at,owner_id,apt_no,street_name,pincode,is_listed])
    
    result = await pool.query("Select * from property where property_id =  $1",[result.rows[0]["property_id"]])
    
    console.log(result.rows)
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





module.exports = {
    createProperty,
    addServicesToProperty,
    removeServicesToProperty,
    getPaymentsForOwner,
    getPaymentsForProperty,
    getPropertyOwnedByUser,
    getProperty,
    getPropertyInState

}