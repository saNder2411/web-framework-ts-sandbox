import { User } from './models/User';

const user = User.createUser({ id: 2 });

user.on('change', () => console.log(`User was change, we probably need to update some html`, user));

user.fetch();
