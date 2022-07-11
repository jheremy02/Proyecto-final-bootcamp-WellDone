import publicationService from "../Publication/PublicationService.js";
 import { pubSub } from "../pubSub.js";
 //import { buildAdvertisementsSpinnerView } from "./AdvertisementsView.js";
import { signUpService } from "../SignUp/SignUpService.js";
 export class CreatePublication {
     constructor (createFormElement) {

        this.createFormElement=createFormElement;
        this.createFormElementClone=this.createFormElement.cloneNode(true)
        this.main()

     }

     main () {
         if (signUpService.getLoggedUser()) {
            this.onAnyInputChanged()
            this.onSubmitForm()
         }else {
             pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"Debe loguearse primero")
             window.location.href="/"
         }

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
            this.createFormElement.querySelector("button").removeAttribute("disabled");

        } else {
            this.createFormElement.querySelector("button").setAttribute("disabled",'');
        }
     }

     onSubmitForm() {
         this.createFormElement.addEventListener('submit',(event)=>{
             event.preventDefault()
             const inputElements=new FormData(this.createFormElement)
             const title= inputElements.get('inputTitle') ;
             const content=inputElements.get('inputContent') ;
             const category=inputElements.get('categories') ;
             const image=inputElements.get('inputImage') ;

             const publicationData={title,content,category,image}
             console.log(publicationData)
             this.createAdvertisement(publicationData)

         })
     }

     async createAdvertisement(publicationData){
        //const spinnerTemplate = buildAdvertisementsSpinnerView()

        //this.createFormElement.innerHTML=spinnerTemplate

        try {
            await publicationService.createAdvertisement(publicationData)
            this.createFormElement.replaceWith(this.createFormElementClone)
            pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Anuncio creado con éxito")


        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
        }


     }
 }

 // el formulario deben estar los campos completos
 //al enviar guardar los datos y enviarlos al sevidor
