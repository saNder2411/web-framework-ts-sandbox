import { UserForm } from './views/UserForm';
import { User } from './models/User';

const root = document.getElementById('root');
const user = User.createUser({name: 'Alex', age: 20});

if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error('Root element not found');
}

