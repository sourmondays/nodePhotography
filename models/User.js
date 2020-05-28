// MODEL USER
const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
    return bookshelf.model(
        "User",
        {
            tableName: "users",
            photos() {
                return this.belongsToMany("Photo");
            },
            albums() {
                return this.belongsToMany("Album");
            },
        },
        {
            hashSaltRounds: 10,


            async login(username, password) {
                // Look if user exists in DB.
                const user = await new this({ username }).fetch({ require: false });
                if (!user) {
                    return false;
                }

                // Checked if password is hashed from db.
                const hash = user.get("password");

                /**
                * Generate hash of cleartext password.
                Compare new hash with hash from db
                return user if hashes match, otherwise false. 
                */

                return (await bcrypt.compare(password, hash)) ? user : false;
            },
        }
    );
};