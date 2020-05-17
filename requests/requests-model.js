const db = require("../data/dbConfig");

module.exports = {
  getRequests,
  getRequestsById,
  addRequest,
  deleteRequest,
};

function getRequests() {
  return db("contactRequests").select("*");
}

function getRequestsById(id) {
  return db("contactRequests")
    .select("id", "firstName", "message")
    .where({ id })
    .first();
}

async function addRequest(request) {
  return db("contactRequests").insert(request, "*");
}

function deleteRequest(id) {
  return db("contactRequests").where({ id: id }).del();
}
