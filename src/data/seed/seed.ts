import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";



(async () => {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })
    await main();


    await MongoDatabase.disconnect();

})();


const randomBetween0andX = (x: number) => {
    return Math.floor(Math.random() * x);
}


async function main() {

    // Borrar Todo
    await Promise.all([

        UserModel.deleteMany(), // 'truncate table'
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])


    // Crear Usuario
    const users = await UserModel.insertMany(seedData.users);
    console.log('SEEED');

    // Crear Categoria

    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            return {
                ...category,
                user: users[0]._id
            }
        })
    );

    // Crear Producto

    const products = await ProductModel.insertMany(
        seedData.products.map(product => {
            return {
                ...product,
                user: users[randomBetween0andX(seedData.users.length - 1 ) ]._id,
                category: categories[randomBetween0andX(seedData.users.length - 1) ]._id,
            }
        })
    )

}