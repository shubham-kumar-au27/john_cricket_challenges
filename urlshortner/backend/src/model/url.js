
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const generateUrlSchema = new Schema({
    userId:{
        type:String,
        // required:true
    },
    urlId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    clicks: [
        { timeStamp: { type: Date, default: Date.now } }
    ]
});

const Url = mongoose.model('Url', generateUrlSchema);


export default Url