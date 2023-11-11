const express = require("express");
const router = express.Router();
const PetsControllers = require("../controller/pets.controller");
const Sentry = require("@sentry/node");
const { body, param, query, validationResult } = require("express-validator");

const validateDataBody = [
  body("id").isInt().withMessage("ID must be an integer"),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name must be a string with a minimum length of 2 characters"),
  body("age").isInt().withMessage("Age must be an integer"),
  body("isMan").isBoolean().withMessage("isMan must be a boolean"),
];
const validateDataId = [param("id").isInt().toInt()];
const validateDataParam = [
  param("gender").isIn(["M", "F"]).withMessage("Gender should be 'M' or 'F'"),
];

const validateDataQuery = [
  query("min")
    .isInt()
    .withMessage("Минимальный возраст должен быть целым числом."),
  query("max")
    .isInt()
    .withMessage("Максимальный возраст должен быть целым числом."),
];

/**
 * @swagger
 * /api/pets/create:
 *    post:
 *      summary: Create a new pet
 *      description: Create a new pet.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {"id": 1, "name": "Rikki", "age": 7, "isMan": true}
 *      responses:
 *        '201':
 *          description: Successfully created pet
 */

router.post("/create", validateDataBody, async (req, res) => {
  try {
    const newPets = await PetsControllers.createPets(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.send("New pet has been created");
    }
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
  }
});

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
    console.log("Error: ", error);
    Sentry.captureException(error);
  }
});

/**
 * @swagger
 * /api/pets/filtredPets:
 *   get:
 *     summary: Get pets filtered by age
 *     description: Retrieve a list of pets filtered by age range from the database.
 *     parameters:
 *       - in: query
 *         name: min
 *         required: true
 *         schema:
 *           type: number
 *         description: Minimum age for filtering.
 *       - in: query
 *         name: max
 *         required: true
 *         schema:
 *           type: number
 *         description: Maximum age for filtering.
 *     responses:
 *       200:
 *         description: A list of pets filtered by age.
 *       400:
 *         description: Bad request. Please check your input data.
 *       500:
 *         description: Internal server error. Please try the request again later.
 */

router.get("/filtredPets", validateDataQuery, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    let min = +req.query.min;
    let max = +req.query.max;

    if (min >= max) {
      res.status(400).json({
        error: "Минимальный возраст должен быть меньше максимального возраста.",
      });
    }
    const filtredPets = await PetsControllers.foundPetsByAge(min, max);
    res.send(filtredPets);
  } catch (error) {
    console.log("Error:", error);
    Sentry.captureException(error);
    res.status(500).send("Внутренняя ошибка сервера");
  }
});

/**
 * @swagger
 * /api/pets/{gender}:
 *   get:
 *     summary: Get pets filtered by gender
 *     description: Retrieve a list of pets filtered by gender from the database.
 *     parameters:
 *       - in: path
 *         name: gender
 *         required: true
 *         schema:
 *           type: string
 *         description: Gender for filtering (e.g., "M" for male, "F" for female).
 *     responses:
 *       200:
 *         description: A list of pets filtered by gender.
 *       400:
 *         description: Bad request. Please check your input data.
 *       500:
 *         description: Internal server error. Please try the request again later.
 */

router.get("/:gender", validateDataParam, async (req, res) => {
  try {
    const gender = req.params.gender;
    const filterPets = await PetsControllers.foundPetsByGender(gender);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.send(filterPets);
    }
  } catch (error) {
    console.log("Error:", error);
    Sentry.captureException(error);
    res.status(500).send("Внутренняя ошибка сервера");
  }
});

/**
 * @swagger
 * /api/pets/edit/{id}:
 *    put:
 *      summary: Update a pet
 *      description: Update an existing pet by it's ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {"id": 1, "name": "UpdatedName", "age": 8, "isMan": false}
 *      responses:
 *        '201':
 *          description: Successfully updated pet
 *        '400':
 *          description: Bad request. Please check your input data.
 *        '404':
 *          description: Pet with the specified ID not found.
 *        '500':
 *          description: Internal server error. Please try the request again later.
 */

router.put(
  "/edit/:id",
  validateDataBody,
  validateDataId,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const editPets = await PetsControllers.editPets(id, req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        res.send(editPets);
      }
    } catch (error) {
      console.log("Error:", error);
      Sentry.captureException(error);
      res.status(500).send("Внутренняя ошибка сервера");
    }
  }
);

/**
 * @swagger
 * /api/pets/update/{id}:
 *    patch:
 *      summary: Update a pet
 *      description: Update an existing pet by it's ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {"id": 1, "name": "UpdatedName", "age": 8, "isMan": false}
 *      responses:
 *        '201':
 *          description: Successfully updated pet
 *        '400':
 *          description: Bad request. Please check your input data.
 *        '404':
 *          description: Pet with the specified ID not found.
 *        '500':
 *          description: Internal server error. Please try the request again later.
 */

router.patch(
  "/update/:id",
  validateDataBody,
  validateDataId,
  async (req, res) => {
    try {
      const idPet = +req.params.id;
      const newPet = await PetsControllers.updatedPets(idPet, req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        res.send(newPet);
      }
    } catch (error) {
      console.log("Error:", error);
      Sentry.captureException(error);
      res.status(500).send("Внутренняя ошибка сервера");
    }
  }
);

/**
 * @swagger
 * /api/pets/delete/{id}:
 *   delete:
 *     summary: Delete a pet
 *     description: Delete a pet by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pet's identifier.
 *     responses:
 *       200:
 *         description: Pet successfully deleted.
 *       404:
 *         description: Pet with the specified ID not found.
 *       500:
 *         description: Internal server error. Please try the request again later.
 */

router.delete("/delete/:id", validateDataId, async (req, res) => {
  try {
    const id = +req.params.id;
    const updatedPets = await PetsControllers.deletePets(id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.status(200).send("Pet removed");
    }
  } catch (error) {
    console.log("Error:", error);
    Sentry.captureException(error);
    res.status(500).send("Внутренняя ошибка сервера");
  }
});

module.exports = router;
