
import { UserView } from "./UserView.js";

export class UserController {
  constructor () {

  }

 static generateAvatar(author) {
    const firtsLetterName=author.name.split("")[0].toUpperCase()
    console.log(firtsLetterName)
    const lastnameFirtsLetter=author.lastName.split("")[0].toUpperCase()

    const templateAvatar=UserView.buildAvatarView(firtsLetterName,lastnameFirtsLetter)

    return templateAvatar
  }
}
