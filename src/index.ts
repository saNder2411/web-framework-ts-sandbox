import { User } from './models/User';

const user = new User({ name: 'Sasha', age: 32});

user.on('click', () => console.log('click 1'));
user.on('change', () => console.log('change 1'));
user.on('click', () => console.log('click 2'));
user.trigger('click');
user.trigger('change');

console.log(user);