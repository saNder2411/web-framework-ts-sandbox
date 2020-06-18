import { User } from './models/User';

const user = new User({ name: 'Sasha', age: 32});

user.set({name: 'vera'});
console.log(user.get('name'));
console.log(user.get('age'));