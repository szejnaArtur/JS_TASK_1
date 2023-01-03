class Model {
    constructor() {
        this.users = this.asyncLocalStorage.getUsers('users')
            .then(response => {
                if (response) {
                    console.log("import users from local storage.")
                    return JSON.parse(response);
                } else {
                    console.log("create empty user list.")
                    return [];
                }
            });
    }

    asyncLocalStorage = {
        setUsers: async function (key, value) {
            return localStorage.setItem(key, JSON.stringify(value));
        },
        getUsers: async function (key) {
            return localStorage.getItem(key);
        }
    };

    async createUser(userDetails){

        let newUsers = await this.users;

        const newUser = {
            id: (newUsers.length > 0 ? newUsers[newUsers.length - 1].id + 1 : 1),
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            gender: userDetails.gender,
            dateOfBirth: userDetails.dateOfBirth,
            email: userDetails.email
        };

        newUsers.push(newUser);
        this.users = newUsers;
        this._commit(this.users);
    }

    async updateUser(id, userDetails) {

        let newUsers = await this.users;

        this.users = newUsers.map(user => user.id === id ? {
            id,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            gender: userDetails.gender,
            dateOfBirth: userDetails.dateOfBirth,
            email: userDetails.email
        } : user);
        this._commit(this.users);
    }

    async deleteUser(id) {
        let newUsers = await this.users;
        this.users = newUsers.filter(user => user.id !== id);
        this._commit(this.users);
    }

    bindUserListChanged(callback) {
        this.onUserListChanged = callback;
    }

    async getUsers() {
        return this.users;
    }

    //PRIVATE FUNCTION
    _commit(users) {
        this.onUserListChanged(users);
        this.asyncLocalStorage.setUsers("users", users)
            .then(() => console.log("User storage updated."))
            .catch(err => console.log(err.message));
    }

    // -- function to generate random user -- for developers -- (for use in the console)
    async generateUsers() {
        const users = await fetch('https://randomuser.me/api/?results=1')
            .then(response => response.json())
            .then(data => data.results)
            .catch(err => console.log(err.message));

        users.map(user => {
            const gender = user.gender === "male" ? "Mężczyzna" : "Kobieta";
            const dateOfBirth = user.dob.date.substring(0, 10);

            const newUser = {
                firstName: user.name.first,
                lastName: user.name.last,
                gender,
                dateOfBirth,
                email: user.email,
            }
            this.createUser(newUser);
        });
    }
}