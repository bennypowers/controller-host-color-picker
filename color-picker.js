import { ControllerHostMixin } from 'https://unpkg.com/@apollo-elements/mixins@next/controller-host-mixin.js?module';

import { MouseController } from './mouse-controller.js';

const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="color-picker.css">
        <div id="loupe"></div>
      `;

class ColorPicker extends ControllerHostMixin(HTMLElement) {
  mouse = new MouseController(this);

  constructor() {
    super()
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
    this.addEventListener('click', () => this.#pick());
  }

  update() {
    const x = this.mouse.pos.x - this.clientLeft;
    const y = this.mouse.pos.y - this.clientTop;
    if (x > this.clientWidth || y > this.clientHeight) return;
    const hue = Math.floor((x / this.clientWidth) * 360);
    const saturation = 100 - Math.floor((y / this.clientHeight) * 100);
    this.style.setProperty('--x', `${x}px`);
    this.style.setProperty('--y', `${y}px`);
    this.style.setProperty('--hue', hue);
    this.style.setProperty('--saturation', `${saturation}%`);
    this.style.setProperty('--loupe-border-color', this.mouse.down ? 'white' : 'black');
    if (this.mouse.down)
      this.#pick();
    super.update();
  }

  #pick() {
    this.color = getComputedStyle(this.loupe).getPropertyValue('background-color');
    this.dispatchEvent(new CustomEvent('pick'));
  }
}

customElements.define('color-picker', ColorPicker);
