


export class RandomCookie {
  top;
  left;
  right;
  bottom;
  visibleDuration;
  durationEffect;
  goldenCookieBoost;

  constructor(values) {
    this.top = values.top;
    this.left = values.left;
    this.right = values.right;
    this.bottom = values.bottom;
    this.visibleDuration = 5000;
    this.durationEffect = 2000;
    this.goldenCookieBoost = values.goldenCookieBoost;
  }

  render() {
    let cookieElement = document.createElement("div");
    cookieElement.id = "randomCookie";
    cookieElement.innerHTML = `
                <img id="randomCookieImg" class="randomCookieImg randomCookieImg-hidden" src="./src/assets/Bill.png" width="128px" height="128px" alt="A random cookie." />`;
    cookieElement.style.position = "absolute";
    cookieElement.style.top = this.top + "%";
    cookieElement.style.bottom = this.bottom + "%";
    cookieElement.style.right = this.right + "%";
    cookieElement.style.left = this.left + "%";
    this.displayCookie(cookieElement);
    let image = cookieElement.querySelector("#randomCookieImg");
    image.addEventListener("click", () => {
      this.goldenCookieBoost();
      cookieElement.remove();
    });
    return cookieElement;
  }


  displayCookie(cookieElement) {
    let image = cookieElement.querySelector("#randomCookieImg");
    
    setTimeout(() => {
        image.classList.remove("randomCookieImg-hidden");
        image.classList.add("randomCookieImg-visible");
        
        setTimeout(() => {
            image.classList.remove("randomCookieImg-visible");
            image.classList.add("randomCookieImg-hidden");
        
            setTimeout(() => {
                cookieElement.remove();
            }, this.durationEffect);
        }, this.visibleDuration);
        
    }, 50); 
  }
}
