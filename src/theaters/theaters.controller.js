const service = require("./theaters.service")
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary")

async function list(req, res){

    const allTheaters = await service.list()
    res.json({data: allTheaters})
}

module.exports = {
list: asyncErrorBoundary(list)
}
