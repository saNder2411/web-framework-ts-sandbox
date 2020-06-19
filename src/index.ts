import { User } from './models/User';


const collection = User.createUserCollection();

collection.on('change', () => console.log(collection));

collection.fetch();

