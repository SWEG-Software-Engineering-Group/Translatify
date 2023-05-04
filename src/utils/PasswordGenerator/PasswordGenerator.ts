export default function generateRandomPassword() {
    const length = Math.floor(Math.random() * (16 - 8 + 1) + 8); // generate random password length between 8 and 16 characters
    const uppercaseChars : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars : string = "abcdefghijklmnopqrstuvwxyz";
    const numberChars : string = "0123456789";
    const symbolChars : string = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  
    let password : string = "";
    let charSet : string = ""; // string containing characters to choose from
  
    charSet += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]; // add random uppercase letter
    charSet += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]; // add random lowercase letter
    charSet += numberChars[Math.floor(Math.random() * numberChars.length)]; // add random number
    charSet += symbolChars[Math.floor(Math.random() * symbolChars.length)]; // add random symbol
  
    for (let i = 4; i < length; i++) {
      // add random characters from all character sets until password length is reached
      if(i === 4) password += charSet;  //ensures that there is AT LEAST one chararcter for each type required
      charSet += uppercaseChars + lowercaseChars + numberChars + symbolChars;
      password += charSet[Math.floor(Math.random() * charSet.length)];      
    }
    return password;
  }