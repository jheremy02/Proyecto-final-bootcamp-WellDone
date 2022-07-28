// Connection to DB

const dbConnection=require("./lib/connectMongoose.js")

dbConnection.once("open",()=>{
    console.log("db opened")
})

//cargar modelos

const Category =require("./models/Category");
const { json } = require("express");

// cargar datos de inicio
const categoriesData=require('./initCategories.json')



dbConnection.once('open',()=>{
    main().catch(err=>console.log(err))
})



async function main() {
    //inicializar categorias

    await initCategory()

    //desconectar la base datos

    dbConnection.close()

}


async function initCategory(){

    //borrar los documentos  que haya en la db
    //const deleted =await Advertisement.deleteMany()
    //console.log(`Deleted ${deleted.deletedCount} advertisements`)

    //crear categorias iniciales
    const categoriesLoaded=await Category.insertMany(categoriesData)
    console.log(`Created ${categoriesLoaded.length} categories`)
}
