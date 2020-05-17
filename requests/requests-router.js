const router = require("express").Router();
const Requests = require("./requests-model.js");

router.get("/", (req, res) => {
  Requests.getRequests()
    .then((requests) => {
      res.status(200).json(requests);
    })
    .catch((err) => {
      res.status(500).json({
        message: "there was an error getting the requests",
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Requests.getRequestsById(id).then((request) => {
    if (request) {
      req.request = request;
      next();
    } else {
      res.status(404).json({
        message: "there is no quest with the given id",
      });
    }
  });
});

router.post("/", (req, res) => {
  const requestInfo = { ...req.body };
  Requests.addRequest(requestInfo)
    .then((request) => {
      res.status(201).json(request);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "there was an error adding the request",
      });
    });
});

router.delete("/:id", (req, res) => {
  Requests.deleteRequest(req.params.id).then((count) => {
    if (count > 0) {
      res.send(200).json({
        message: "Christmas was successfully cancelled on the request",
      });
    } else {
      res.status(500).json({
        message: "the request will still have Christmas",
      });
    }
  });
});

module.exports = router;
