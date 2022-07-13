import publicationService from "../Publication/PublicationService.js";
 import { pubSub } from "../pubSub.js";
 //import { buildAdvertisementsSpinnerView } from "./AdvertisementsView.js";
import { signUpService } from "../SignUp/SignUpService.js";
 export class CreatePublication {
     constructor (createFormElement) {

        this.createFormElement=createFormElement;
        this.createFormElementClone=this.createFormElement.cloneNode(true)
        this.main()
        this.handleButtonCategories()
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
             let categories=[];
             this.listItemsNode.querySelectorAll(".item.checked").forEach((item)=>{
                categories.push(item.querySelector(".item-text").textContent)
             })
             const image=inputElements.get('file_input') ;

             const publicationData={title,content,categories,image}

             this.createPublication(publicationData)

         })
     }

     handleButtonCategories(){
      const selectBtn = this.createFormElement.querySelector(".select-btn")
       this.listItemsNode=this.createFormElement.querySelector(".list-items")
      const items = this.listItemsNode.querySelectorAll(".item");

      selectBtn.addEventListener("click", () => {
      selectBtn.classList.toggle("open");
      });

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        console.log(item.querySelector(".item-text").textContent)
        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");

            if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} Selected`;
            }else{
                btnText.innerText = "Select Language";
            }
    });
})

     }

     async createPublication(publicationData){
        //const spinnerTemplate = buildAdvertisementsSpinnerView()

        //this.createFormElement.innerHTML=spinnerTemplate

        try {
            await publicationService.createPublication(publicationData)
            //this.createFormElement.replaceWith(this.createFormElementClone)

              pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Publicacion creado con exito")

        } catch (error) {

            pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,error)

        }


     }
 }

 // el formulario deben estar los campos completos
 //al enviar guardar los datos y enviarlos al sevidor
