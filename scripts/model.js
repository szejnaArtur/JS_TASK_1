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
                    return [{
                        name: "Artur",
                        surname: "Szejna",
                        sex: "Meżczyzna",
                        date: "",
                        email: "szejnaartur@gmail.com"
                    }];
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

    async getUsers() {
        return await this.users.then(result => result);
    }
}