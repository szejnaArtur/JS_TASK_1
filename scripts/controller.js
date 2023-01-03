class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.attachEvents();

        this.handleRefreshUser().catch(err => console.log(err.message));

        this.model.bindUserListChanged(this.onUserListChanged);
        this.view.bindAddUser(this.handleAddUser);
        this.view.bindUpdateUser(this.handleUpdateUser);
        this.view.bindDeleteUser(this.handleDeleteUser);
        this.view.bindRefreshUserList(this.handleRefreshUser);
    }

    onUserListChanged = (users) => {
        this.view.displayUsers(users);
    }

    handleRefreshUser = async () => {
        this.onUserListChanged(await this.model.getUsers());
    }

    handleAddUser = (userDetails) => {
        this.model.createUser(userDetails).catch(err => console.log(err.message));
    }

    handleUpdateUser = (id, userDetails) => {
        this.model.updateUser(id, userDetails).catch(err => console.log(err.message));
    }

    handleDeleteUser = (id) => {
        this.model.deleteUser(id).catch(err => console.log(err.message));
    }
}

let app = new Controller(new Model(), new View());