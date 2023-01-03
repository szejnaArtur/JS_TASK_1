class Model {
    constructor() {
        console.log("model")
        this.users = this.asyncLocalStorage.getUsers('users')
            .then(response => {
                if (response) {
                    console.log("import users from local storage.")
                    return JSON.parse(response);
                } else {
                    console.log("create user.")
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

    bindUserListChanged(callback) {
        this.onUserListChanged = callback;
    }

    async getUsers() {
        return await this.users.then(result => result);
    }

    async addUser(userDetails) {

        let newUsers = await this.users;

        const userToAdd = {
            id: newUsers.length > 0 ? newUsers[newUsers.length - 1].id + 1 : 1,
            name: userDetails.name,
            surname: userDetails.surname,
            sex: userDetails.sex,
            dateOfBirth: userDetails.dateOfBirth,
            email: userDetails.email
        };
        newUsers.push(userToAdd);
        this.users = newUsers;
        this._commit(this.users);
    }

    _commit(users) {
        this.onUserListChanged(users);
        this.asyncLocalStorage.setUsers("users", users)
            .then(() => console.log("User storage updated."))
            .catch(err => console.log(err.message));
    }

    // -- function to generate users -- for developers -- (for use in the console)
    async generateUsers() {
        const users = await fetch('https://randomuser.me/api/?results=5')
            .then(response => response.json())
            .then(data => data.results)
            .catch(err => console.log(err.message));

        users.map(user => {
            const sex = user.gender === "male" ? "Mężczyzna" : "Kobieta";
            const dateOfBirth = user.dob.date.substring(0, 10);

            const newUser = {
                name: user.name.first,
                surname: user.name.last,
                sex,
                dateOfBirth,
                email: user.email,
            }
            this.addUser(newUser);
        });
    }
}