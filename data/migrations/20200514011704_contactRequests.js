exports.up = function (knex) {
  return knex.schema.createTable("contactRequests", (contactRequests) => {
    contactRequests.increments();
    contactRequests.string("firstName", 128).notNullable();
    contactRequests.string("lastName", 128);
    contactRequests.string("email", 256).notNullable();
    contactRequests.integer("phoneNumber", 11);
    contactRequests.string("message", 2000).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropIfTableExists("contactRequests");
};
