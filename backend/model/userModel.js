const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique:true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user"
        },
        address: {
            type: String,
            validate: {
                validator: function(value) {
                    if (this.role === "user" && !value) {
                        return false;
                    }
                    return true;
                },
                message: 'Address is required for users.'
            }
        },
        borrowedBook:[{
            type: String
        }],
        pic:{
            type:String,
            default:"https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-27.jpg"
        },
    },
    {
        timestamps: true
    }
);
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.comparePassword = async function(pass){
    return await bcrypt.compare(pass, this.password);
}
module.exports = mongoose.model("User", userSchema);