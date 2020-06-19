import { User } from './models/User';
import { UserEdit } from './views/UserEdit';


const root = document.getElementById('root');
const user = User.createUser({name: 'Alex', age: 20});

if (root) {
  const userEdit = new UserEdit(root, user);

  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error('Root element not found');
}

 