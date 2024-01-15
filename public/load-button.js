

class LoadButton extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = '<div> Loaded in through htmx! </div>'  
}
}
customElements.define('load-button', LoadButton);
