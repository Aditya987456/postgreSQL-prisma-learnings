import { Client } from "pg";    //Client is a class
import express from "express"

const app = express()
app.use(express.json())

//## method-1 :  initialize instances of postgress Client that let me do crud.
const pgClient = new Client("postgresql://neondb_owner:npg_axDdNT42jMVu@ep-shiny-morning-a80g4onn-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require")


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

    try {

     // -----**** this way of writing sql is the reason of sql injection hacker easily apply sql injection here.   
        const insertQuery = `INSERT INTO users (username, email, password) VALUES (
        '${username}', '${email}', '${password}'); `
        const response = await pgClient.query(insertQuery)

        console.log(response.rows)
        res.status(200).json({
            message:"Successfully signed up"
        })
        
    } catch (error) {
        console.log('Error in signing in --> '+ error)
        res.status(401).json({
            message :"Error in signing up"
        })
    }


})


app.listen(3000, ()=>{
    console.log('Your server running on port 3000')
})



