import { UserList } from './views/UserList';
import { User } from './models/User';
// import { UserEdit } from './views/UserEdit';


const root = document.getElementById('root');
// const user = User.createUser({name: 'Alex', age: 20});
const users = User.createUserCollection();

 users.on('change', () => {

  if (root) {
    new UserList(root, users).render();
  } else {
    throw new Error('Root element not found');
  }

 });

users.fetch();
 

// if (root) {
//   new UserEdit(root, user).render();
// } else {
//   throw new Error('Root element not found');
// }

  