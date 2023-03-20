const service = require("./reviews.service")
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary")

async function reviewExists(req, res,next){

    const reviewId = req.params.reviewId
    const review = await service.read(reviewId)

    if (review){
        res.locals.review = review
        return next()
    }
    next({
        status: 404,
        message: 'Review cannot be found'
    })
}
async function update(req, res){
    const updatedReview = {...req.body.data, review_id: res.locals.review.review_id}
    const putData = await service.update(updatedReview)
    res.json({data: putData})
}

async function destroy(req, res){
    const reviewId = res.locals.review.review_id
    await service.delete(reviewId)
    res.sendStatus(204)

}


module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}