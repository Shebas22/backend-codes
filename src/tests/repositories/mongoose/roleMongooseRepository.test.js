import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../../../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../../../data/repositories/mongoose/roleMongooseRepository.js";

describe("Testing role Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.roleRepository = new RoleMongooseRepository();
        this.role = {}
    });
    after(function () {
        // db.drop();
        db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El repositorio debe ser una instancia de roleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.roleRepository
            .paginate({limit:10, page:1})
            .then(result => {
                expect(Array.isArray(result.roles)).to.be.equals(false);
                expect(result.limit).to.be.equals(10);
            }
            );
    });
    it('El repositorio debe poder crear un role', function () {
        const role = {
            name: "guest",
            permissions: ["getProducts"]
        };

        return this.roleRepository
            .create(role)
            .then(result => {
                this.role = result;
                expect(result.name).to.be.equals(role.name);
                expect(Array.isArray(result.permissions)).to.be.equals(true);
            }
            );
    });
    it('El repositorio debe poder buscar un role por id', function () {
        return this.roleRepository
            .getOne(this.role.id)
            .then(result => {
                expect(result.firstName).to.be.equals(this.role.firstName);
                expect(result.email).to.be.equals(this.role.email);
            }
            );
    });
    it('El repositorio debe poder actualizar un role', function () {
        const role = {
            name: "admin",
            permissions: ["getProducts", "getProduct", "saveProduct", "updateProduct", "eleteProduct", "getCarts", "getCart",
                "saveCart", "updateCart", "deleteCart", "addProduct", "updateProduct",
                "deleteProduct", "getRoles", "getRole", "getUsers", "getUser"]
        };

        return this.roleRepository
            .updateOne(this.role.id, role)
            .then(result => {
                expect(result.firstName).to.be.equals(role.firstName);
                expect(result.email).to.be.equals(role.email);
            }
            );
    });
    it('El repositorio debe poder eliminar un role', function () {
        return this.roleRepository
            .deleteOne(this.role.id)
            .then(result => {
                expect(result.deletedCount).to.be.equals(1);
            }
            );
    });

});