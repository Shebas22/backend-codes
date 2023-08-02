
class User {
    constructor(props) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName?? undefined;
        this.email = props.email;
        this.age = props.age;
        this.password = props.password?? undefined;
        this.isAdmin = props.isAdmin;
        this.role = props.role;
    }
}

export default User;