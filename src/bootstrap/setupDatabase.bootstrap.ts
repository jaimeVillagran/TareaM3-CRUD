import mongoose from 'mongoose';
import { config } from 'src/config';


export default () => {
    const connect = ()=> {
        mongoose.connect(`${config.DATABASE_URL}`)
        .then(() => {
            console.log('Succesfully connected to Database');
        })
        .catch((error) => {
            console.log('Error connecting to database', error);
            return process.exit(1);
        })
    };
};
