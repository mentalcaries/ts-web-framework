import { User } from './models/User';
import { UserForm } from './views/UserForm';

const userForm = new UserForm(document.getElementById('root')!, User.buildUser({name: 'Norm', age: 25}));

userForm.render();
