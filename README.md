## ORM - 
ORM is Object Relational Mapping it let us interact with database without worrying about the underlying syntax like for eg- SQL language.

> Why ORM ?
- simple syntax : convert object to SQL queries under the hood.

- Type safety , auto completion.

- Automatic migration

- let us flip the database that using . Unified API irrespective of the DB.


<br>
<br>
<br>
<br>



## PRISMA -
>GPT explanation 

We use Prisma because it’s a modern ORM built for TypeScript, offering type safety, auto-completion, easy migrations, and cleaner syntax — all of which make development faster, safer, and less error-prone than older ORMs.

Prisma is an ORM — but specifically designed for Node.js + TypeScript.
If you use a different stack (like Python, Go, or Java), you’ll use that ecosystem’s ORM.
Every stack has its own ORM tools — all do the same job: connecting your code ↔️ database easily.

<br>
<br>

---
### Without ORM or With ORM codes- 
>Without ORM - 
```
const result = await db.query("SELECT * FROM users WHERE id = 1");
```
<br>

>With ORM - 
```
const user = await prisma.user.findUnique({ where: { id: 1 } });
```

<br>
<br>
<br>

### Generating the prisma client.
```
npx prisma generate
```

> GPT 
🔍 Under the Hood:

* Loads config: Reads .env and prisma/schema.prisma.

* Validates schema: Checks your models, relations, and datasource for errors.

* Processes generator: Finds generator client { provider = "prisma-client-js" }.

* Generates client: Builds a type-safe ORM (Prisma Client) inside node_modules/@prisma/client.

* Links database models: Converts each model (e.g., User, Post) into query functions like

* prisma.user.findMany(), prisma.post.create()


✅ Result: You get a ready-to-use, type-safe database client for your app.


---



### Relationships in prisma-

> GPT explanation-

Relationships define how models connect to each other — similar to foreign keys in SQL.

In Prisma, there are 3 main types:


1️⃣ One-to-One	One record relates to exactly one other record	User ↔ Profile

2️⃣ One-to-Many	One record relates to multiple others	User → many Posts

3️⃣ Many-to-Many	Many records relate to many others	Students ↔ Courses

```
🧩 1. One-to-One (1:1)
Example:
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  profile  Profile?
}

model Profile {
  id      Int    @id @default(autoincrement())
  bio     String
  userId  Int    @unique
  user    User   @relation(fields: [userId], references: [id])
}

```




One user has one profile.

Profile has a userId foreign key.



```
🧩 2. One-to-Many (1:N)
Example:
model User {
  id     Int     @id @default(autoincrement())
  name   String
  posts  Post[]
}

model Post {
  id      Int    @id @default(autoincrement())
  title   String
  userId  Int
  user    User   @relation(fields: [userId], references: [id])
}
```

✅ Meaning:

One user → many posts

Each post → one user (userId foreign key)



```
🧩 3. Many-to-Many (M:N)
Example:
model Student {
  id       Int        @id @default(autoincrement())
  name     String
  courses  Course[]   @relation("StudentCourses")
}

model Course {
  id        Int        @id @default(autoincrement())
  title     String
  students  Student[]  @relation("StudentCourses")
}
```

✅ Meaning:

A student can enroll in many courses

A course can have many students


<br>


Prisma automatically creates a join table behind the scenes.

* How Prisma Handles Relationships in Code

After generating the Prisma Client, you can query relations easily:

```
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
})

```
Or nested writes:
```
await prisma.user.create({
  data: {
    name: 'Aditya',
    posts: {
      create: { title: 'My first post' }
    }
  }
})
```