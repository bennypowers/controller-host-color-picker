const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="color-picker.css">
        <div id="loupe"></div>
      `;

class ColorPicker extends HTMLElement {
  constructor() {
    super()
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
  }
}

customElements.define('color-picker', ColorPicker);
