export const navigationViews={
  buildNavigationBasic(){
      return
  },

  buildRegisterButtonView(){
      return `
      <li class="navbar-list-item"><a href="/auth/signUp">Registrarse</a></li>
      `
  },

  buildLoginButtonView(){
      return `
      <li class="navbar-list-item"><a href="/auth/login">Login</a></li>
      `
  },

  buildCreateButtonView() {
      return `
      <li class="navbar-list-item"> <a href="/publication/create">Crear Post</a></li>

      `
    },

  buildCloseSession(){
      return `
      <li class="navbar-list-item close-session"> <a href="#">Cerrar sesion</a></li>
      `
    }
  }
