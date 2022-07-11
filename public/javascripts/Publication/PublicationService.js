import { signUpService } from "../SignUp/SignUpService.js";

export default {
    async getAdvertisements(){


        let responseHttp;
        let advertisements;
        try {
            responseHttp=await fetch('http://localhost:8000/api/advertisements')
        } catch (error) {
            throw new Error("No he podido ir por los anuncios")
        }

        try {

            advertisements=await responseHttp.json()

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        return advertisements
    } ,

    async getAdvertisement(advertisementId){
        const url=`http://localhost:8000/api/advertisements/${advertisementId}`
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

    async createAdvertisement(publicationData){
        const body={
            title: publicationData.title,
            content: publicationData.content,
            category: publicationData.category,
            image: publicationData.image
        }

        let response;

        try {
            response = await fetch('http://localhost:3000/api/publication',{
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer "+`${signUpService.getLoggedUser()}`
            }})

        } catch (error) {
            throw new Error("No he podido crear el anuncio")
        }

        try {
            const data=await response.json()
        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

    },

    async deleteAdvertisement (advertisementId) {
        const url=`http://localhost:8000/api/advertisements/${advertisementId}`
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
