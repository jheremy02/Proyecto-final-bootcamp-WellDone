

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

  }

}
