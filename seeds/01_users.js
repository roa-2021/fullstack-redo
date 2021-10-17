const uuidv4 = require("uuid").v4;
const bcrypt = require('bcrypt');

exports.seed = async (knex) => {
  const salt = await bcrypt.genSalt(10);
  const pass_hash = await bcrypt.hash("password", salt);

  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users")
        .insert([
          { id: uuidv4(), email: "alexthomsonnz@gmail.com", pass_hash },
          { id: uuidv4(), email: "alex@axiomdigital.nz", pass_hash },
        ]);
    });
};
