 export const UserView= {




  buildAvatarView(firtsLetterName, lastnameFirtsLetter) {
    const colors=["skyBlue","orange","fuchsia","greeMarine","indigo"]

    const colorSelected=this.getRandomItem(colors)
    console.log(colorSelected)

    return `<div class="bg-avatar-${colorSelected} rounded-[50%] text-white w-full h-full flex justify-center items-center  align-middle"><h1 class="self-center font-bold text-lg">${firtsLetterName}${lastnameFirtsLetter}</h1></div>`
  },

  getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

 }


