import mongoose from 'mongoose';

async function connect() {
    await mongoose.connect("mongodb+srv://root:123@sachi-mern.bslbcbm.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("MongoDB connection is successful"))
        .catch((err) => console.error(err));
}

export default connect;