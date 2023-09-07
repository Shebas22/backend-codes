import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../../../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import UserMongooseRepository from "../../../data/repositories/mongoose/userMongooseRepository.js";

console.log("Userrepository");
describe("Testing User Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.userRepository = new UserMongooseRepository();
        this.userID= "";
    });
    after(function () {
        // db.drop();
        db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository
            .paginate({})
            .then(result =>
            {
                expect(Array.isArray(result.users)).to.be.equals(false);
                expect(result.limit).to.be.equals(10);
            }
        );
    });
    it('El repositorio debe poder crear un user', function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

        return this.userRepository
            .create(user)
            .then(result =>
            {
                this.user = result;
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
            }
        );
    });
    it('El repositorio debe poder buscar un user por id', function () {
        return this.userRepository
            .getOne(this.user.id)
            .then(result =>
            {
                expect(result.firstName).to.be.equals(this.user.firstName);
                expect(result.email).to.be.equals(this.user.email);
            }
        );
    });
    it('El repositorio debe poder buscar un user por email', function () {
        return this.userRepository
            .getOneByEmail(this.user.email)
            .then(result =>
            {
                expect(result.firstName).to.be.equals(this.user.firstName);
                expect(result.email).to.be.equals(this.user.email);
            }
        );
    });
    it('El repositorio debe poder actualizar un user', function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

        return this.userRepository
            .updateOne(this.user.id, user)
            .then(result =>
            {
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
            }
        );
    });
    it('El repositorio debe poder eliminar un user', function () {
        return this.userRepository
            .deleteOne(this.user.id)
            .then(result =>
            {
                expect(result.deletedCount).to.be.equals(1);
            }
        );
    });
});
