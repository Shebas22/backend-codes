const fs = require('fs');

class UsersManager{
    constructor(){
        this.#users = [];
        this.fileName = './users.json';
        loadData();
}

async loadData(){
    this.#users = await this.getUsers();
}

async addUser(user){
    this.#users.push(user);
    await fs.promises.writeFile(this.fileName, JSON.stringify(user))
}

async getUsers(){
    const users = fs.promises.readFile(this.fileName, 'utf-8')
    return JSON.parse(users);
}

}