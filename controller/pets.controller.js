const PetsService = require("../services/pets.services");

class PetsControllers {
  async getPets() {
    let pets = await PetsService.getPets();
    return pets;
  }

  async createPets(pet) {
    let newPets = await PetsService.createPets(pet);
    return newPets;
  }

  async editPets(id, petData) {
    let editPets = await PetsService.editPets(id, petData);
    return editPets;
  }
  async updatedPets(id, petData) {
    let updatePets = await PetsService.updatedPets(id, petData);
    return updatePets;
  }

  async deletePets(id) {
    const updatedPets = await PetsService.deletePets(id);
    return updatedPets;
  }

  async foundPetsByGender(gender) {
    const filterPets = await PetsService.foundPetsByGender(gender);
    return filterPets;
  }
  async foundPetsByAge(min, max) {
    const filtredPets = await PetsService.foundPetsByAge(min, max);
    return filtredPets;
  }
}

module.exports = new PetsControllers();
