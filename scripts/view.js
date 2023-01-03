class View {
    constructor() {
        console.log("view")
        this.userList = document.getElementById("user-list");

        this.saveBtn = document.getElementById('save');
        this.editBtn = document.getElementById('edit');
        this.deleteBtn = document.getElementById('delete');
        this.cancelBtn = document.getElementById('cancel');
        this.addBtn = document.getElementById('add');
        this.refreshBtn = document.getElementById('refresh');

        this.name = document.getElementById('name');
        this.surname = document.getElementById('surname');
        this.sex = document.getElementById('sex');
        this.dateOfBirth = document.getElementById('date-of-birth');
        this.email = document.getElementById('email');
    }

    attachEvents() {
        this.cancelBtn.addEventListener('click', this._closeUserForm);
        this.addBtn.addEventListener('click', () => this._showUserForm(null));
    }

    displayUsers(users) {
        this._clearList();
        this._closeUserForm();
        if (users.length !== 0) {
            users.forEach(user => {
                const li = this._createElement('li');
                li.id = user.id;
                li.textContent = user.name + " " + user.surname;
                li.addEventListener('click', () => this._showUserForm(user));
                this.userList.append(li);
            })
        } else {
            const span = this._createElement('p');
            span.textContent = "Brak użytkowników.";
            this.userList.append(span);
        }
        console.log("User list refreshed.");
    }


    /*
    * // -- PRIVATE METHODS -- //
    *
    * - Private methods start with "_" so that it is easy to distinguish between them.
    * */

    _resetInputs() {
        this.name.value = "";
        this.surname.value = "";
        this.sex.value = "Kobieta";
        this.dateOfBirth.value = "";
        this.email.value = "";
    }

    _fillInputs(user) {
        this.name.value = user.name;
        this.surname.value = user.surname;
        this.sex.value = user.sex;
        this.dateOfBirth.value = user.dateOfBirth;
        this.email.value = user.email;
    }

    _showUserForm(user) {
        const userForm = document.querySelector('.display-none');

        if (user) {
            this._fillInputs(user);

            this.saveBtn.classList.add('display-none');
            this.editBtn.classList.remove('display-none');
            this.deleteBtn.classList.remove('display-none');

            this.saveBtn.name = user.id;
            this.deleteBtn.name = user.id;
        } else {
            this._resetInputs();
            this.saveBtn.classList.remove('display-none');
            this.editBtn.classList.add('display-none');
            this.deleteBtn.classList.add('display-none');
        }

        userForm.classList.remove('display-none');
        userForm.classList.add('display-flex');
    }

    _closeUserForm() {
        const userForm = document.querySelector('.display-flex');

        if (userForm) {
            userForm.classList.remove('display-flex');
            userForm.classList.add('display-none');
        }
    }

    _clearList() {
        let range = document.createRange();
        range.selectNodeContents(this.userList);
        range.deleteContents();
    }

    _createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

}