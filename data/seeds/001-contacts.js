exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("contactRequests")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("contactRequests").insert([
        {
          id: 1,
          firstName: "Tony",
          lastName: "Stark",
          email: "tstark@stark.com",
          phoneNumber: "123456789",
          message: "hello from seeds",
        },
        {
          id: 2,
          firstName: "Steve",
          email: "steve@stark.com",
          message: "hello from seeds",
        },
        {
          id: 3,
          firstName: "Bruce",
          email: "bruce@stark.com",
          message: "hello from seeds",
        },
      ]);
    });
};
