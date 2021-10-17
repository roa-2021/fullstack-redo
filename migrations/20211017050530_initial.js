exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary();
      table.string("email");
      table.string("pass_hash");
    })
    .then(() => {
        return knex.schema
          .createTable("tickers", (table) => {
            table.uuid("id").primary();
            table.string("ticker");
            table.string("price");
            table.string("user_id").references("users.id");
          })
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tickers').then((result) => knex.schema.dropTable("users"))
};
