export class RandomCookie {
  top;
  left;
  right;
  bottom;

  constructor(values) {
    this.top = values.top;
    this.left = values.left;
    this.right = values.right;
    this.bottom = values.bottom;
  }

  render() {
    let cookieElement = document.createElement("div");
    cookieElement.id = "randomCookie";
    cookieElement.innerHTML = `
                <img id="randomCookieImg" src="./src/assets/goldenCookie.png" width="128px" height="128px" alt="A random cookie." />`;
    cookieElement.style.position = "absolute";
    cookieElement.style.top = this.top + "%";
    cookieElement.style.bottom = this.bottom + "%";
    cookieElement.style.right = this.right + "%";
    cookieElement.style.left = this.left + "%";
    return cookieElement;
  }
}
