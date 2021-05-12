export default {
    PORT: process.env.PORT || 4200,
    DB: {
        HOST: process.env.MONGO_HOST || 'localhost',
        PORT: process.env.MONGO_PORT || '27017',
        DBNAME: process.env.MONGO_DBNAME || 'sampleDB',
        URI: `mongodb://${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || '27017'}/${process.env.MONGO_DBNAME || 'sampleDB'}`,
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD
    }
};