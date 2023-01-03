class Controller {
    constructor(model, view) {
        console.log("controller")
        this.model = model;
        this.view = view;

        this.view.attachEvents();

        this.handleRefreshUser().catch(err => console.log(err.message));

        this.model.bindUserListChanged(this.onUserListChanged);
    }

    onUserListChanged = (users) => {
        console.log("On user list changed.")
        console.log(users);
        this.view.displayUsers(users);
    }

    handleRefreshUser = async () => {
        console.log("User refresher.")
        this.onUserListChanged(await this.model.getUsers());
    }
}

let app = new Controller(new Model(), new View());