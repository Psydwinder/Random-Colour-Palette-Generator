class Colour {
  //Creates the class colour
  constructor(hex, element) {
    //Creates and initialises an object instance of the class Colour.
    this.hex = hex;
    this.element = element;
    this.locked = false; //Ensures that the colours are not locked by default
  }

  setHex(hex) {
    //Creates a variable called setHex
    this.hex = hex;
    this.element.style.backgroundColor = hex; //Will set the background colour of the class colour to whatever the value of hex will be
    this.element.querySelector(".colour-input").value = hex; //Will set the text output of colour input to be whatever the hex will be
  }

  setLocked(locked) {
    //Creates a variable called setLocked
    this.locked = locked; //Sets the initial condition as true
    if (locked) {
      this.element.querySelector(".lock-toggle").classList.add("is-locked");
      this.element.querySelector("img").src = "icons/lock-closed.svg";
    } else {
      this.element.querySelector(".lock-toggle").classList.remove("is-locked");
      this.element.querySelector("img").src = "icons/lock-open.svg";
    }
  }

  toggleLocked() {
    this.setLocked(!this.locked); //This will refer to whatever the state of the lock is at the start of the setLocked variable looking at the condition to see if this.locked is NOT locked represented by the !
  }

  generateHex() {
    if (this.locked) {
      return; //Returns nothing if the condition is locked
    }

    const chars = "0123456789ABCDEF"; //A string of characters that are present in a HEX code
    let hex = "#"; //The initial value of hex is # but will later add on the string of 6 characters for a HEX code
    for (let i = 0; i < 6; i++) {
      //Checks to see if the length of the string is 6 characters long.
      hex += chars[Math.floor(Math.random() * 16)]; //Generates a random number between 0 and 0.99 multiplys that by 16. Math.floor then returns the largest integer less than or equal to any given number e.g. 0.99*16= 15.84 returning 15 which when compared to the characters would give you F. It then runs this a further 5 times to give you a string of 6 characters and adds that on to the value of hex.
    }

    this.setHex(hex); //This refers to the variable setHex, with its value now set as that of hex it will set the hex background colour and colour input value as that of the generated hex value.
  }

  copyToClipboard() {
    const input = this.element.querySelector(".colour-input");
    input.select(); //This method selects all the text within the text area of .colour-input
    document.execCommand("copy"); //This method runs the command "copy" and copies the contents of the previously selected text to the clipboard.
    input.blur(); //This method removes keyboard focus from the text area of .colour-input.

    this.element.classList.add("copied");
    setTimeout(() => {
      //This variable removes the class copied from the element after a duration 1000ms
      this.element.classList.remove("copied");
    }, 1000);
  }
}

const colour_elements = document.querySelectorAll(".colours .colour"); //Selects the classes .colours and .colour and assigns it to colour_elements
const colours = []; //Assigns an empty array to the constant colours

for (let i = 0; i < colour_elements.length; i++) {
  //Cycles through all of the colour elements one at a time
  const colour_element = colour_elements[i];
  const input = colour_element.querySelector(".colour-input");
  const lock_toggle = colour_element.querySelector(".lock-toggle");
  const copy_hex = colour_element.querySelector(".copy-hex");

  const hex = input.value;
  const colour = new Colour(hex, colour_element); //Calls the class Colour and all variables within it

  input.addEventListener("input", () => colour.setHex(e.target.value));
  lock_toggle.addEventListener("click", () => colour.toggleLocked());
  copy_hex.addEventListener("click", () => colour.copyToClipboard());

  colour.generateHex(); //Runs the function generateHex
  colours.push(colour); //Adds the value of colour into the empty array of colours
}

document.querySelector(".generator-btn").addEventListener("click", () => {
  for (let i = 0; i < colours.length; i++) {
    colours[i].generateHex(); //Runs the generateHex function for which of the four colour elements is currently not locked
  }
});

document.addEventListener("keypress", (e) => {
  if (e.code.toLowerCase() === "space") {
    for (let i = 0; i < colours.length; i++) {
      colours[i].generateHex();
    }
  }
});
