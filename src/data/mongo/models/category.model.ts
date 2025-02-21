import mongoose, { Schema } from "mongoose";




const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
        unique: true
    },
    available: {
        type: String,
        default: Boolean       
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

});


categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
})

export const CategoryModel = mongoose.model('Category', categorySchema);
