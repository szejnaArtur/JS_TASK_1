class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.attachEvents();
    }
}

let app = new Controller(new Model(), new View());