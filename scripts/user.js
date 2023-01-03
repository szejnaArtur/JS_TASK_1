class User {
    constructor(firstName, lastName, gender, dateOfBirth, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(newFirstName) {
        this.firstName = newFirstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(newLastName) {
        this.lastName = newLastName;
    }

    getGender() {
        return this.gender;
    }

    setGender(newGender) {
        this.gender = newGender;
    }

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    setDateOfBirth(newDateOfBirth) {
        this.dateOfBirth = newDateOfBirth;
    }

    getEmail() {
        return this.email;
    }

    setEmail(newEmail) {
        this.email = newEmail;
    }
}