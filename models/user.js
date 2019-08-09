const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Virtual property for password confirmation
UserSchema.virtual("passwordConfirmation")
    .get(() => this.passwordConfirmation)
    .set((value) => this.passwordConfirmation = value);

//Hook operation, called before operation defined occurs, in this case it's 'save'
UserSchema.pre("save", function(next) {
    const user = this;

    if (!user.isModified("password"))
        return next();
    
    if (user.password !== user.passwordConfirmation)
        throw new Error("Your passwords don't match!");

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err)
            return next(err);
        
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                next(err);

            user.password = hash;
            next();
        });
    });
});

//Hash Helper Method, allows comparison between plaintext and hash
UserSchema.methods.authenticate = function(plainPassword, callback) {
    //plaintext, hash, callback
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err)
            return callback(err);
        
        callback(null, isMatch);
    });
};

module.exports = mongoose.model("User", UserSchema);