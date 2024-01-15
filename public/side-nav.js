
class SideNav extends HTMLElement {
  constructor() {
    super();

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

    this.innerHTML = accordionItems.map(item => `
      <details>
        <summary>${item.title}</summary>
        <div>
          ${item.children.map(child => `<a href="http://google.com">${child}</a>`).join('')}
        </div>
      </details>
    `).join('');
  }
}

customElements.define('side-nav', SideNav);
