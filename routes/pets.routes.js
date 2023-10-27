const express = require("express");
const router = express.Router();
const PetsControllers = require("../controller/pets.controller");

router.get("/", async (req, res) => {
  try {
    const pets = await PetsControllers.getPets();
    res.send(pets);
  } catch (error) {
    console.log("Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const newPets = await PetsControllers.createPets(req.body);
    res.send(newPets);
  } catch (error) {
    console.log("Error");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const editPets = await PetsControllers.editPets(id, req.body);
    res.send(editPets);
  } catch (error) {
    console.log("Error");
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const idPet = +req.params.id;
    const newPet = await PetsControllers.updatedPets(idPet, req.body);
    res.send(newPet);
  } catch (error) {
    console.log("Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const updatedPets = await PetsControllers.deletePets(id);
    res.send(updatedPets);
  } catch (error) {
    console.log("Error");
  }
});

router.get("/filtredPets", async (req, res) => {
  try {
    let min = +req.query.min;
    let max = +req.query.max;
    const filtredPets = await PetsControllers.foundPetsByAge(min, max);
    res.send(filtredPets);
  } catch (error) {
    console.log("Error");
  }
});

router.get("/:gender", async (req, res) => {
  try {
    const gender = req.params.gender;
    const filterPets = await PetsControllers.foundPetsByGender(gender);
    res.send(filterPets);
  } catch (error) {
    console.log("Error");
  }
});



module.exports = router;
