import mongoose from "mongoose";




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true
    },
    emailValidated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        default: ['Admin_Rol'],
        enum: ['Admin_Rol', 'User_Rol']
    }

});


userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.password;
        delete ret.role;
    },
})




export const UserModel = mongoose.model('User', userSchema);