import { signUpService } from "../SignUp/SignUpService.js";
import { CreatePublication } from "./CreatePublicationController.js";

export default {
    async getPublications(){


        let responseHttp;
        let publications;
        try {
            responseHttp=await fetch('http://localhost:3000/api/publication')
        } catch (error) {
            throw new Error("No he podido ir por las publicaciones")
        }

        try {


          publications=await responseHttp.json()
          console.log(publications)

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        return publications
    } ,

    async getPublication(publicationId){
        const url=`http://localhost:3000/api/publication/${publicationId}`
        let responseHttp;
        let publication;
        try {
            responseHttp=await fetch(url)
        } catch (error) {
            throw new Error("No he podido ir por el anuncio")
        }

        try {

            publication=await responseHttp.json()

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        if (!responseHttp.ok) {

            throw new Error("Anuncio no encontrado")
        }

        return publication
    },

    async createPublication(publicationData){
        const data={
            title: publicationData.title,
            content: publicationData.content,
            categories: publicationData.categories,
            image: publicationData.image
        }

        const body=new FormData()

        body.append("title",data.title)
        body.append("content",data.content)
        body.append("categories",data.categories)
        body.append("image",data.image)

        let response;

        //TODO :revisar porque en el campo categorias se estan uniendo los valores como un solo elemento de array
        console.log(body.categories)

        try {
            response = await fetch('http://localhost:3000/api/publication/create',{
                method: "POST",
                body: body,
                headers: {
                Authorization: "Bearer "+`${signUpService.getLoggedUser()}`
            }})

        } catch (error) {
            throw new Error("No he podido crear el anuncio")
        }

        if (!response.ok) {

          const data=await response.json()
          console.log(data)
          throw data.errors
        }

        try {
            const data=await response.json()
        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }




    },

    async deletePublication (publicationId) {
        const url=`http://localhost:3000/api/publication/${publicationId}`
        let responseHttp;
        console.log(signUpService.getLoggedUser())
        try {
            responseHttp=await fetch(url,{
                method:"DELETE",
                headers: {
                    Authorization: "Bearer "+ `${signUpService.getLoggedUser()}`
                }
                })
        } catch (error) {
            throw new Error("No he podido borrar por el anuncio")
        }
        const responsedata=await responseHttp.json()
        if (!responseHttp.ok) {
              if (responsedata.errors) {
                  throw new Error(responsedata.errors)
              } else {
                throw new Error("Anuncio no encontrado")
              }

        }
    }
}
