const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/?directConnection=true"

const connectToMongo = async () => {
        await mongoose.connect(mongoURI)
        console.log(`MongoDB Connected`)
}
module.exports = connectToMongo;