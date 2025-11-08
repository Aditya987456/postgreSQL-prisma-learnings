
//-- importing prismaClient becz that is responsible for converting my simple syntax query into raw SQL queries.

import { PrismaClient } from "@prisma/client"

const client = new PrismaClient();   //instance of the class.


async function CreateUser() {

//----create user------

//     await client.user.create({
//     data:{
//         username:"buttan sarkar",
//         password:"123456",
//         age:"21",
//         city:"Prayagraj"
//     }
// })

//-----delete user -----

//     await client.user.delete({
//     where: {
//         id:1
//     }
// })


//-----update user -----

//     await client.user.update({
//     where: {
//         id:2
//     }, 
//     data:{
//         username:'aman sarkar'
//     }
// })

//---read the data---

   const userData= await client.user.findFirst({
    where: {
        id:2
    },
    // select:{
    //     username:true   //only need user name.
    // }
})


console.log('data from db ----- ', userData?.password)


    
}

CreateUser();


