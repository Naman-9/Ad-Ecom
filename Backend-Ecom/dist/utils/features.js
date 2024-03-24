import mongoose from 'mongoose';
export const connectDB = async () => {
    console.log("connectiog to Db...");
    await mongoose
        .connect('mongodb+srv://namanpr7:AhFyGiiJhYLEMgmj@6pack-ecom.hme6sne.mongodb.net/?retryWrites=true&w=majority&appName=6Pack-Ecom', {
        dbName: 'Ecom24',
    })
        .then((c) => console.log(`DB connected to ${c.connection.host}`));
};
