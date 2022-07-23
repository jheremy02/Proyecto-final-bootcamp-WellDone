import { navigationViews } from "./NavigationView.js";
import { NotificationController } from "../Notification/NotificationController.js";
import { SignUpController } from "../SignUp/SignUpController.js";
 import { signUpService } from "../SignUp/SignUpService.js";


 class NavigationController {
     constructor(navigationElement){
        this.navigationElement=navigationElement
        this.main()
     }

     main(){

      const navbarNode=this.navigationElement;

      navbarNode.querySelector(".navbar-burger").addEventListener("click",(event)=>{
      console.log("hellor wolrd")
      navbarNode.querySelector(".navbar-list-container").setAttribute("style","display:flex")
      })

      navbarNode.querySelector(".close-button").addEventListener("click",(event)=>{
        navbarNode.querySelector(".navbar-list-container").removeAttribute("style")
    })
     }

     async drawRegisterButton() {
        const buttonTemplate=navigationViews.buildRegisterButtonView()

        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=this.navigationElement.querySelector('.navbar-list')
        navbarElement.appendChild(buttonNode)
        const buttonElement=this.navigationElement.querySelector('.navbar-list-item')

    }

    async drawLoginButton() {
        const buttonTemplate=navigationViews.buildLoginButtonView()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=this.navigationElement.querySelector('.navbar-list')
        navbarElement.appendChild(buttonNode)
        const buttonElement=this.navigationElement.querySelector('.navbar-list-item')

    }

     drawCreateButton() {
        const buttonTemplate=navigationViews.buildCreateButtonView()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=document.querySelector('.navbar-list')
        navbarElement.appendChild(buttonNode)
        const buttonElement=document.querySelector('.navbar-list-item')

    }

    drawCloseSessionButton(){
        const buttonTemplate=navigationViews.buildCloseSession()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=document.querySelector('.navbar-list')
        navbarElement.appendChild(buttonNode)
        const buttonElement=document.querySelector('.navbar-list-item.close-session')
        console.log(buttonElement)
        buttonElement.addEventListener('click',()=>{
            SignUpController.closeSession()
            window.location.href="/"
        })

    }

    handleButton() {
        const loggedUserToken=signUpService.getLoggedUser()

        if (!loggedUserToken) {

            this.drawRegisterButton()
            this.drawLoginButton()

        } else {
            this.drawCreateButton()
            this.drawCloseSessionButton()
        }


    }
 }

export const navigationController = new NavigationController(document.querySelector('nav'))
