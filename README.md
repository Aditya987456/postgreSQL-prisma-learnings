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



