const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/Rkbits"

const connectToMongo = () => {
        mongoose.connect(mongoURI)
        .then(()=>{
                console.log("connecteddddd");
        })       
        
}
module.exports = connectToMongo;