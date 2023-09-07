import { Command } from 'commander';
import UserManager from '../../domain/managers/userManager.js';

const AddUserCommand = new Command('addUser');

AddUserCommand
    .version('0.0.1')
    .description('Add user')
    .option('-e, --email <email>', 'User`s email')
    .option('-fn, --firstName <firstName>', 'User`s first name')
    .option('-ln, --lastName <lastName>', 'User`s last name')
    .option('-p, --password <password>', 'User`s password')
    .option('-a, --age <age>', 'User`s age')
    .option('-ia, --isRoot <isRoot>', 'User`s isRoot')
    .action(async (env) => {
        const payload = {
            ...env,
            age: +env.age,
            isAdmin: env.isRoot === 'true',
        };

        const manager = new UserManager();
        const user = await manager.create(payload);

        if (user) {
            console.log('User created successfully');
        }
    });

export default AddUserCommand;