// 1) GET /users
// (возвращает массив всех пользователей)

app.get("/pets", function (req, res) {
    res.send(pets);
  });
  
  // 2) POST /pets
  // *(добавляет нового пользователя в массив. Возвращает нового пользователя)*
  
  app.post("/pets", function (req, res) {
    pets.push(req.body);
    res.status(201);
    res.send(req.body);
  });
  
  // 3) PUT /pets/:id
  // (изменяет пользователя по id. Возвращает обновленного пользователя)
  
  app.put("/pets/:id", function (req, res) {
    const idPet = +req.params.id;
    const indPet = pets.findIndex((pet) => pet.id === idPet);
    const newPet = { ...pets[indPet], ...req.body };
    pets.splice(indPet,1,newPet);
    res.send(newPet);
  
  });
  
  
  // 4) PATCH /pets/:id
  // (изменяет поле пользователя по id. Возвращает обновленного пользователя)
  
  app.patch("/pets/:id", function (req, res) {
    const idPet = +req.params.id;
    const indPet = pets.findIndex((pet) => pet.id === idPet);
    const newPet = { ...pets[indPet], ...req.body };
    pets.splice(indPet,1,newPet);
    res.send(newPet);
  });
  
  // 5) DELETE /pets/:id
  // ( удаляет пользователя по id. Возвращает boolean)
  
  app.delete("/pets/:id", function (req, res) {
    const id = pets.findIndex((i) => i.id == req.params.id);
    pets.splice(id, 1);
    res.send(true);
  });
  
  // 6) GET /pets/:gender** (M || F)
  // ( возвращает всех мужчин или женщин )
  
  app.get("/pets/:gender", function (req, res) {
    const gender = req.params.gender;
    const filterPets = pets.filter(pets=> (pets.isMan&&gender=== "M") || (!pets.isMan && gender==="F"));
    res.send(filterPets);
  });
  
  
  
  // 7) GET /filtredPets?min=1&max=10
  // ( возвращает всех пользователей чей возраст попадает в диапaзон)
  
  app.get("/filtredPets",function(req,res){
    let min=+req.query.min;
    let max=+req.query.max;
    console.log(min,max);
    const filtredPets=pets.filter(pet=>pet.age>min&&pet.age<max);
    console.log(filtredPets);
    res.send(filtredPets);
  });
  