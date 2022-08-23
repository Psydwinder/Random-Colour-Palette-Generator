class Colour {
  constructor(hex, element) {
    this.hex = hex;
    this.element = element;
    this.locked = false;
  }

  setHex(hex) {
    this.hex = hex;
    this.element.style.backgroundColor = hex;
    this.element.querySelector(".colour-input").value = hex;
  }

  setLocked(locked) {
    this.locked = locked;
    if (locked) {
      this.element.querySelector(".lock-toggle").classList.add("is-locked");
      this.element.querySelector("img").src = "icons/lock-closed.svg";
    } else {
      this.element.querySelector(".lock-toggle").classList.remove("is-locked");
      this.element.querySelector("img").src = "icons/lock-open.svg";
    }
  }

  toggleLocked() {
    this.setLocked(!this.locked);
  }

  generateHex() {
    if (this.locked) {
      return;
    }

    const chars = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }

    this.setHex(color);
  }

  copyToClipboard() {
    const input = this.element.querySelector(".colour-input");
    input.select();
    document.execCommand("copy");
    input.blur();

    this.element.classList.add("copied");
    setTimeout(() => {
      this.element.classList.remove("copied");
    }, 1000);
  }
}

const colour_elements = document.querySelectorAll(".colours .colour");
const colours = [];

for (let i = 0; i < colour_elements.length; i++) {
  const colour_element = colour_elements[i];
  const input = colour_element.querySelector(".colour-input");
  const lock_toggle = colour_element.querySelector(".lock-toggle");
  const copy_hex = colour_element.querySelector(".copy-hex");

  const hex = input.value;
  const colour = new Colour(hex, colour_element);

  input.addEventListener("input", () => colour.setHex(e.target.value));
  lock_toggle.addEventListener("click", () => colour.toggleLocked());
  copy_hex.addEventListener("click", () => colour.copyToClipboard());

  colour.generateHex();
  colours.push(colour);
}

document.querySelector(".generator-btn").addEventListener("click", () => {
  for (let i = 0; i < colours.length; i++) {
    colours[i].generateHex();
  }
});

document.addEventListener("keypress", (e) => {
  if (e.code.toLowerCase() === "space") {
    for (let i = 0; i < colours.length; i++) {
      colours[i].generateHex();
    }
  }
});
