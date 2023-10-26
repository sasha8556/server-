const { rejects } = require("assert");
const { error } = require("console");
const fs = require("fs");

class PetsServices {
  getPets() {
    return new Promise((resolve, reject) => {
      fs.readFile("data.json", "utf8", function (error, data) {
        if (error) {
          reject(error);
        } else {
          const obj = JSON.parse(data);
          resolve(obj);
        }
      });
    });
  }

  createPets(newPet) {
    return new Promise((resolve, reject) => {
      let data = fs.readFile("data.json", "utf8", function (error, data) {
        console.log(data);
        if (error) {
          reject(error);
        } else {
          const obj = JSON.parse(data);
          console.log(obj);
          obj.push(newPet);
          fs.writeFile(
            "data.json",
            JSON.stringify(obj, null, 3),
            function (error, data) {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            }
          );
        }
      });
    });
  }

  editPets(id, petData) {
    return new Promise((resolve, reject) => {
      fs.readFile("data.json", "utf8", (error, data) => {
        if (error) {
          reject(error);
        } else {
          const obj = JSON.parse(data);
          const index = obj.findIndex((pet) => pet.id === id);
          if (index === -1) {
            reject("Индекс не найден");
          } else {
            const updatedPets = { ...obj[index], ...petData };
            obj[index] = updatedPets;

            fs.writeFile(
              "data.json",
              JSON.stringify(obj, null, 3),
              "utf8",
              (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(updatedPets);
                }
              }
            );
          }
        }
      });
    });
  }

  updatedPets(id, petData) {
    return new Promise((resolve, reject) => {
      fs.readFile("data.json", "utf8", (error, data) => {
        console.log("1");
        if (error) {
          reject(error);
        } else {
          const obj = JSON.parse(data);
          console.log(obj);
          const index = obj.findIndex((pet) => pet.id === id);
          if (index === -1) {
            reject("Индекс не найден");
          } else {
            const updatedPets = { ...obj[index], ...petData };
            obj[index] = updatedPets;

            fs.writeFile(
              "data.json",
              JSON.stringify(obj, null, 3),
              "utf8",
              (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(updatedPets);
                }
              }
            );
          }
        }
      });
    });
  }

  deletePets(id) {
    return new Promise((resolve, rejects) => {
      fs.readFile("data.json", "utf8", (error, data) => {
        if (error) {
          rejects(error);
        } else {
          const obj = JSON.parse(data);
          const index = obj.findIndex((i) => i.id === id);
          obj.splice(index, 1);
          fs.writeFile(
            "data.json",
            JSON.stringify(obj, null, 3),
            "utf8",
            (error) => {
              if (error) {
                rejects(error);
              } else {
                resolve(obj);
              }
            }
          );
        }
      });
    });
  }

  foundPetsByGender(gender){
    return new Promise((resolve,reject)=>{
      fs.readFile("data.json","utf8",(error,data)=>{
        if (error) {
          reject(error)
        }else{
          const obj=JSON.parse(data);
          console.log(data);
         const filtredPets= obj.filter(pets=> (pets.isMan&&gender=== "M") || (!pets.isMan && gender==="F"));
         console.log(filtredPets);
         if(filtredPets.length===0){
          reject("Массив пустой")
         }else{
          resolve(filtredPets)
         }
        }
      })
    })
  }
}

module.exports = new PetsServices();
