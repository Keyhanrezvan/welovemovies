const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const criticDetails = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})

function list(){
    return knex("movies")
    .select("*")
}

function listShowing(){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.movie_id")
}

function read(movieId){
    return knex("movies as m")
    .select("*")
    .where({"m.movie_id": movieId})
    .first()
}

function readTheaters(movieId){
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id","m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"m.movie_id": movieId})
}

function readReviews(movieId){
    return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({"m.movie_id":movieId})
    .then(reviews=> reviews.map(criticDetails))
}

module.exports = {
list,
listShowing,
read,
readTheaters,
readReviews,
}