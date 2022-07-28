
import { signUpService } from "../SignUp/SignUpService.js";


export const UserService = {

  async getUser(username)  {

    const url=`http://localhost:3000/api/user/${username}`
        let responseHttp;
        let userData;
        try {
            responseHttp=await fetch(url)
        } catch (error) {
            throw new Error("No he podido ir por el usuario")
        }

        try {

            userData=await responseHttp.json()

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        if (!responseHttp.ok) {

            throw new Error("Usuario no encontrado")
        }

        return userData

  },

  async updateUser(userData){

    const data={
      userName:userData.userName,
      name: userData.name,
      lastName: userData.lastName,
      image: userData.image,
      biography:userData.biography
  }

  const body=new FormData()
      body.append("userName",data.userName)
      body.append("name",data.name)
      body.append("lastName",data.lastName)
      body.append("image",data.image)
      body.append("biography",data.biography)

      let response;

      try {
        response = await fetch(`http://localhost:3000/api/user/edit/${data.userName}`,{
            method: "PUT",
            body: body,
            headers: {
            Authorization: "Bearer "+`${signUpService.getLoggedUser()}`
        }})

    } catch (error) {
        throw new Error("No he podido actualizar el usuario")
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

  }

}
