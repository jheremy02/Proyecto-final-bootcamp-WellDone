class SignUpService {

    constructor(){

    }

    async createUser(userData) {
        const body={...userData}

        const response = await fetch('http://localhost:3000/api/auth/signUp',{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
            "Content-Type": "application/json",
        },
        })

        const data= await response.json()
        console.log(data)
    }

    async loginUser(username,password) {
        const body={username,password}

        const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data=await response.json()

      if (!response.ok) {
          console.log("hubo un error al loguear usuario")
      }

      console.log(data)

      const token =data.accessToken;

      localStorage.setItem('token',token)

    }

    getLoggedUser(){
        return localStorage.getItem("token") || null
      }


}

export const signUpService=new SignUpService()
