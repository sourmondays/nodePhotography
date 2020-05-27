// User Model

const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
    return bookshelf.model('User', {
        tableName: 'users',
        books() {
            return this.belongsToMany('Photo');
        }
    }, {
        hashSaltRounds: 10,

        fetchById(id, fetchOptions = {}) {
            return new this({ id }).fetch(fetchOptions);
        },

        async login(username, password) {
            // Check if user exist 
            const user = await new this({ username }).fetch({ require: false });
            if (!user) {
                return false;
            }

            // Get hashed password from db
            const hash = user.get('password');

            /**
             * 1. Generate hash of cleartext password
               2. Compare new hash with hash from db
               3. Return user if hashes match, otherwise false
             */
            return (await bcrypt.compare(password, hash))
                ? user
                : false;
        },
    });
};
