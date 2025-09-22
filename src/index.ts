import { Client } from "pg";    //Client is a class
import express from "express"

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const db_url=process.env.DB_URL
// console.log('db_url : '+db_url)
// console.log('DB_URL :'+ process.env.DB_URL)
app.use(express.json())

//## method-1 :  initialize instances of postgress Client that let me do crud.
const pgClient = new Client(db_url)


//## method-2 :  const pgClient2 = new Client({
//     user:"neondb_owner",
//     password: "axDdNT42jMVu",
//     port: 5432,
//     host: "ep-shiny-morning-a80g4onn-pooler.eastus2.azure.neon.tech",
//     database:"neondb"
// })



//wrap await in async 
async function main() {
    await pgClient.connect()
    console.log("connected to db")

    //const response = await pgClient.query("SELECT * FROM users")
    //console.log(response.rows)
}

main()















//----- signup point to test working with backend and also sql injection ----

app.post('/signup', async (req, res)=>{
    const {username, email, password }=req.body
    const {city, country, street, pincode }=req.body
    let insertQuery;
    let users2_query;
    let addresses2_query;

    try {

    // -----**** this way of writing sql is the reason of sql injection hacker easily apply sql injection here.   
        // insertQuery = `INSERT INTO users (username, email, password) VALUES (
        // '${username}', '${email}', '${password}'); `
        // const response = await pgClient.query(insertQuery)

    //----------------------this is the sql injection---> 
        // " 123456'); DELETE FROM users; INSERT INTO users (username, email, password) VALUES ('hacked' 'hacked@gmail.com' 'hacked123 " 






    // // ------------- updated code that remove sql injection vulnerabilities...-------------------
        // insertQuery=`INSERT INTO users (username, email, password) VALUES ($1, $2, $3)` //i.e value -1,2,3

        // const response = await pgClient.query(insertQuery, [username, email, password])
        // console.log('Response ---> '+response)


        // console.log(response.rows)
        // console.log('insertQuery : '+ insertQuery)



// ---------------- Relationship in sql -------------------

//------------------ Transaction in sql -------------------
    await pgClient.query('BEGIN')  //-----start of the transaction



    users2_query =`INSERT INTO users2 (username, email, password) 
        VALUES ($1, $2, $3) RETURNING id`
    const response1=await pgClient.query(users2_query, [username, email, password])    

    addresses2_query=`INSERT INTO addresses2 (user_id, city, country, street, pincode)
                         VALUES ($1,$2,$3,$4,$5)`
    const user_id=response1.rows[0].id
    const response2=await pgClient.query(addresses2_query, [user_id, city, country, street, pincode])




    await pgClient.query('COMMIT');  //----commit the transaction-





    





        res.status(200).json({
            message:"Successfully signed up"
        })
        
    }catch (error) {
        console.log('Error in signing in --> '+ error)
        res.status(403).json({
            message :"Error in signing up",
            Error:error
        })
    }

    console.log('user_query ---> ', users2_query)
    console.log('addresses query -----> ', addresses2_query)

})





//----------------------------------- JOINS in SQL  ------------------------------------------
app.get('/metadata', (req, res)=>{
const id=req.query.id


})
















app.listen(3000, ()=>{
    console.log('Your server running on port 3000')
})



