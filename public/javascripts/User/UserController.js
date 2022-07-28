
import { UserView } from "./UserView.js";
import { signUpService } from "../SignUp/SignUpService.js";
import { pubSub } from "../pubSub.js";
import { UserService } from "./UserService.js";


export class UserController {
  constructor (editUserElement) {
    this.editUserElement=editUserElement

  }



  main () {
      if (signUpService.getLoggedUser()) {
         this.onAnyInputChanged()
         this.onsubmitEditUser()
      }else {
          pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"Debe loguearse primero")
          window.location.href="/"
      }

  }



 static generateAvatar(author) {
    const firtsLetterName=author.name.split("")[0].toUpperCase()

    const lastnameFirtsLetter=author.lastName.split("")[0].toUpperCase()

    const templateAvatar=UserView.buildAvatarView(firtsLetterName,lastnameFirtsLetter)

    return templateAvatar
  }

  onAnyInputChanged () {
    const inputElements=Array.from(document.querySelectorAll('input , textarea'))
    inputElements.forEach(element=>{
        element.addEventListener('input',()=>{
            this.checkIfAllInputsAreFilled(inputElements)
        })
    })
 }

 checkIfAllInputsAreFilled(inputElements){
    const areAllInputsFilled = inputElements.every(element=>element.value)

    if (areAllInputsFilled) {
        this.editUserElement.querySelector("button").removeAttribute("disabled");

    } else {
        this.editUserElement.querySelector("button").setAttribute("disabled",'');
    }
 }

 onsubmitEditUser(){
  const updateFormElement=this.editUserElement
  updateFormElement.addEventListener("submit",(event)=>{
    event.preventDefault()
    const inputElements=new FormData(updateFormElement)
             const userName=updateFormElement.id
             const name= inputElements.get('inputUserName') ;
             const lastName= inputElements.get('inputLastName') ;
             const image=inputElements.get('file_input') || null ;
             const biography=inputElements.get('inputBiography')
             const userNewData={userName,name,lastName,image,biography}

             this.updateUser(userNewData)
  })
 }
  async updateUser(userNewData) {

    try {
      await UserService.updateUser(userNewData)
      pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Publicacion actualizada con exito")
    } catch (error) {
    pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
      }
  }
 }



