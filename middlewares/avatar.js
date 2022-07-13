const AvatarGenerator = require('initials-avatar-generator').AvatarGenerator;

const option = {
    width: 100,
    text: 'JL',
    color: '#FF0000'
  };

let res;
  const avatarGenerator = new AvatarGenerator();

  avatarGenerator.generate(option, function (image) {
    image //image is ImageMagick object - you can do whatever you want with it!
      .stream('png') // make a stream out of it
      .pipe(res); //pipe it to output, or maybe a file?
  });

 
