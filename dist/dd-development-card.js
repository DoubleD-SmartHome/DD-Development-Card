import { LitElement, html, css } from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class CustomButtonCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("Invalid configuration");
    }
    this.config = config;
  }

  handleClick() {
    if (this.hass && this.config.entity) {
      this.hass.callService("button", "press", {
        entity_id: this.config.entity,
      });
    }
  }

  render() {
    return html`
      <button class="button" @click=${this.handleClick}>
        ${this.config.label || "Shutdown"}
      </button>
    `;
  }

  static get styles() {
    return css`
      .button {
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .button:hover {
        background-color: #c0392b;
      }
    `;
  }
}

customElements.define("custom-button-card", CustomButtonCard);
