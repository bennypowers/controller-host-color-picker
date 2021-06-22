import { ControllerHostMixin } from 'https://unpkg.com/@apollo-elements/mixins@next/controller-host-mixin.js?module';

const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="color-picker.css">
        <div id="loupe"></div>
      `;

class ColorPicker extends ControllerHostMixin(HTMLElement) {
  constructor() {
    super()
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
  }

  update() {
    super.update();
  }
}

customElements.define('color-picker', ColorPicker);
