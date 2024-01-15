
class SideNav extends HTMLElement {
  constructor() {
    super(); // Always call super first in constructor
    this.attachShadow({ mode: 'open' }); // Attach a shadow root to the element.

    // Add the CSS styles to the shadow root
    const style = document.createElement('style');
    style.textContent = `
      .sidenav {
        height: 100%;
        width: 250px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 20px;
      }
      .sidenav a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
      }
      .sidenav a:hover {
        color: #f1f1f1;
      }
      .accordion {
        background-color: #eee;
        color: #444;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        transition: 0.4s;
      }
      .active, .accordion:hover {
        background-color: #ccc;
      }
      .panel {
        padding: 0 18px;
        background-color: white;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
      }
    `;
const accordionItems = [
  {
    title: 'Accordion 1',
    children: ['Random Child 1', 'Random Child 2', 'Random Child 3', 'Random Child 4']
  },
  {
    title: 'Accordion 2',
    children: ['Random Child 1', 'Random Child 2', 'Random Child 3', 'Random Child 4']
  },
  {
    title: 'Accordion 3',
    children: ['Random Child 1', 'Random Child 2', 'Random Child 3', 'Random Child 4']
  }
];
    // Add the HTML structure to the shadow root
    const container = document.createElement('div');
    container.setAttribute('class', 'sidenav');
  container.innerHTML = accordionItems.map(item => `
    <button class="accordion">${item.title}</button>
    <div class="panel">
      ${item.children.map(child => `<a href="#">${child}</a>`).join('')}
    </div>
  `).join('');

    // Append the style and container to the shadow root
    this.shadowRoot.append(style, container);

    // Add the accordion functionality
    const acc = container.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
}

// Define the 'side-nav' custom element
customElements.define('side-nav', SideNav);
