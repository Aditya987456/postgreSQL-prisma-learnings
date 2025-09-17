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
    let insertQuery;

    try {

    // -----**** this way of writing sql is the reason of sql injection hacker easily apply sql injection here.   
        // insertQuery = `INSERT INTO users (username, email, password) VALUES (
        // '${username}', '${email}', '${password}'); `
        // const response = await pgClient.query(insertQuery)

    //----------------------this is the sql injection---> 
        // " 123456'); DELETE FROM users; INSERT INTO users (username, email, password) VALUES ('hacked' 'hacked@gmail.com' 'hacked123 " 

    //updated code that remove sql injection vulnerabilities...
        insertQuery=`INSERT INTO users (username, email, password) VALUES ($1, $2, $3)` //i.e value -1,2,3

        const response = await pgClient.query(insertQuery, [username, email, password])
        console.log('Response ---> '+response)




        console.log(response.rows)
        console.log('insertQuery : '+ insertQuery)
        res.status(200).json({
            message:"Successfully signed up"
        })
        
    } catch (error) {
        console.log('Error in signing in --> '+ error)
        res.status(403).json({
            message :"Error in signing up",
            Error:error
        })
    }

    console.log(insertQuery)



})


app.listen(3000, ()=>{
    console.log('Your server running on port 3000')
})



