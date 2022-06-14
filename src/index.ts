import axios from 'axios';
import {User} from './models/User';

const user = new User({name: 'Picard', age: 234});

user.save();