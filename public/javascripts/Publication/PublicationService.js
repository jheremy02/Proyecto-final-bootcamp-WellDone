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

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        return publications
    } ,

    async getAdvertisement(advertisementId){
        const url=`http://localhost:8000/api/publications/${advertisementId}`
        let responseHttp;
        let advertisement;
        try {
            responseHttp=await fetch(url)
        } catch (error) {
            throw new Error("No he podido ir por el anuncio")
        }

        try {

            advertisement=await responseHttp.json()

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        if (!responseHttp.ok) {

            throw new Error("Anuncio no encontrado")
        }

        return advertisement
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

    async deleteAdvertisement (advertisementId) {
        const url=`http://localhost:8000/api/publications/${advertisementId}`
        let responseHttp;

        try {
            responseHttp=await fetch(url,{
                method:"DELETE",
                headers: {
                    Authorization: "Bearer "+ signUpService.getLoggedUser()
                }
                })
        } catch (error) {
            throw new Error("No he podido borrar por el anuncio")
        }

        if (!responseHttp.ok) {

            throw new Error("Anuncio no encontrado")
        }
    }
}