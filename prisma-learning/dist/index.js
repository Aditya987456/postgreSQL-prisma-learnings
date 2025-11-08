//-- importing prismaClient becz that is responsible for converting my simple syntax query into raw SQL queries.
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient(); //instance of the class.
async function CreateUser() {
    client.user.create({
        data: {
            username: "buttan sarkar",
            password: "123456",
            age: "21",
            city: "Prayagraj"
        }
    });
}
CreateUser();
//# sourceMappingURL=index.js.map