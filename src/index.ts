import { User } from './models/User';

const user = User.createUser({ id: 1, name: 'newer name', age: 9 });

user.on('save', () => console.log(`User was change, we probably need to update some html`, user));

user.save();
