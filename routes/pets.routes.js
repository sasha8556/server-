const express = require("express");
const router = express.Router();
const PetsControllers = require("../controller/pets.controller");
const Sentry = require("@sentry/node");


/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Get a list of pets
 *     description: Retrieve a list of pets from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 * components:
 *   schemas:
 *     Pets:
 *       type: object
 *       properties:
 *         id: 
 *           type: number
 *           example: 1
 *         name: 
 *           type: string
 *           example: Rikki
 *         age: 
 *           type: number
 *           example: 3
 *         isMan: 
 *           type: boolean
 *           example: true
 */


router.get("/", async (req, res) => {
  try {
    const pets = await PetsControllers.getPets();
    res.send(pets);
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
  }
});

/**
 * @swagger
 * /api/pets/create:
 *    post:
 *      summary: Create new message
 *      description: Create new message
 *    parameters:
 *      - name: pet
 *        in: body
 *        required: false
 *        schema:
 *          type: object
 *          example: {"id": 1,"name": "Rikki", "age": 7,"isMAn": true}
 *    responses:
 *      '201':
 *        description: Successfully created message
 */


router.post("/create", async (req, res) => {
  try {
    const newPets = await PetsControllers.createPets(req.body);
    res.send(newPets);
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
  }
});


/**
 * @swagger
 * /api/pets/edit/{id}:
 *    put:
 *      summary: Create new message
 *      description: Create new message
 *    parameters:
 *      - name: message
 *        in: body
 *        required: false
 *        schema:
 *          type: object
 *          example: {"id": 1,"name": "Rikki", "age": 7,"isMAn": true}
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *       201:
 *        description: Successfully created message
 *       400:
 *         description: Bad request. Please check your input data.
 *       404:
 *         description: Message with the specified ID not found.
 *       500:
 *         description: Internal server error. Please try the request again later.
 */

router.put("/edit/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const editPets = await PetsControllers.editPets(id, req.body);
    res.send(editPets);
  } catch (error) {
    Sentry.captureException(error);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const idPet = +req.params.id;
    const newPet = await PetsControllers.updatedPets(idPet, req.body);
    res.send(newPet);
  } catch (error) {
    Sentry.captureException(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const updatedPets = await PetsControllers.deletePets(id);
    res.send(updatedPets);
  } catch (error) {
    Sentry.captureException(error);
  }
});

router.get("/filtredPets", async (req, res) => {
  try {
    let min = +req.query.min;
    let max = +req.query.max;
    const filtredPets = await PetsControllers.foundPetsByAge(min, max);
    res.send(filtredPets);
  } catch (error) {
    Sentry.captureException(error);
  }
});

router.get("/:gender", async (req, res) => {
  try {
    const gender = req.params.gender;
    const filterPets = await PetsControllers.foundPetsByGender(gender);
    res.send(filterPets);
  } catch (error) {
    Sentry.captureException(error);
  }
});

module.exports = router;
