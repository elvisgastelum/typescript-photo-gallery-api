import {connect} from 'mongoose';
import {mongodb} from './keys'

export async function startConnection() {
    await connect(mongodb.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}