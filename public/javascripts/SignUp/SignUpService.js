class SignUpService {

    constructor(){

    }

    async createUser(userData) {
        const body={...userData}
        let response;

        try {

          response = await fetch('http://localhost:3000/api/auth/signUp',{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
            "Content-Type": "application/json",
        },
        })

        } catch (error) {
          throw new Error(error)
        }

        if (!response.ok) {

          const data=await response.json()
          console.log(data)
          throw data.errors
        }


    }

    async loginUser(userName,password) {
        const body={userName,password}

        let response;

        try {
        response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      });

      } catch (error) {
      throw new Error(error)
      }

      if (!response.ok) {
      const dataResponse=await response.json()
        console.log(dataResponse.errors)
      throw dataResponse.errors

      }

      const token =dataResponse.data.accessToken;
      console.log(token)
      localStorage.setItem('token',token)

    }

    getLoggedUser(){
      console.log(localStorage.getItem("token"))
        return localStorage.getItem("token") || null
      }


}

export const signUpService=new SignUpService()
