const express = require("express");
const router = express.Router();

const pets = require("../util/data");

router.get("/", function (req, res) {
	res.status(200).json(pets);
});

router.get("/:id", function (req, res) {
	let pet = pets.find(function (item) {
		return item.id == req.params.id;
	});

	pet ? res.status(200).json(pet) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { name_of_the_pet, name_of_the_owner, age ,type,gender} = req.body;

	let pet = {
		id: pets.length + 1,
		name_of_the_pet: name_of_the_pet,
		name_of_the_owner: name_of_the_owner,
		age: age,
		type: type,
		gender:gender,
	};

	pets.push(pet);

	res.status(201).json(pet);
});

router.put("/:id", function (req, res) {
	let pet = pets.find(function (item) {
		return item.id == req.params.id;
	});

	if (pet) {
		const { name_of_the_pet, name_of_the_owner, age ,type,gender} = req.body;

		let updated = {
			id: pet.id,
			name_of_the_pet: name_of_the_pet !== undefined ? name_of_the_pet : pet.name_of_the_pet,
			name_of_the_owner: name_of_the_owner !== undefined ? name_of_the_owner : pet.name_of_the_owner,
			age: age !== undefined ? age : pet.age,
			type: type !== undefined ? type : pet.type,
			gender: gender !== undefined ? gender : pet.gender,
		};

		pets.splice(pets.indexOf(pet), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let pet = pets.find(function (item) {
		return item.id == req.params.id;
	});

	if (pet) {
		pets.splice(pets.indexOf(pet), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
