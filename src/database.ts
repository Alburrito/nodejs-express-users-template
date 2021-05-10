import mongoose from "mongoose";

import config from './config/config';

(async () => {
    try{
        const mongodb = await mongoose.connect(config.DB.URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected at ${mongodb.connection.host} (${config.DB.URI})`);
    } catch (error) {
        console.error(error);
    }
})();