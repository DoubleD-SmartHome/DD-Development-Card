class CustomButtonCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Create container
    const container = document.createElement("div");
    container.classList.add("container");

    // Create button
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerText = "Shutdown";

    // Add button click event
    button.addEventListener("click", () => this.showDialog());

    // Create confirmation dialog (hidden by default)
    const dialog = document.createElement("div");
    dialog.classList.add("dialog", "hidden");

    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog-content");

    const dialogText = document.createElement("p");
    dialogText.innerText = "Are you sure you want to perform this action?";

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm");
    confirmButton.innerText = "Yes";
    confirmButton.addEventListener("click", () => this.confirmAction());

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.innerText = "No";
    cancelButton.addEventListener("click", () => this.hideDialog());

    // Append dialog elements
    dialogContent.appendChild(dialogText);
    dialogContent.appendChild(confirmButton);
    dialogContent.appendChild(cancelButton);
    dialog.appendChild(dialogContent);

    // Append elements to container
    container.appendChild(button);
    container.appendChild(dialog);

    // Append styles
    const style = document.createElement("style");
    style.textContent = `
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
      .dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .dialog.hidden {
        display: none;
      }
      .dialog-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .confirm {
        background-color: #27ae60;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
        margin: 5px;
      }
      .confirm:hover {
        background-color: #1e8449;
      }
      .cancel {
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
        margin: 5px;
      }
      .cancel:hover {
        background-color: #c0392b;
      }
    `;

    // Append container and styles to shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);

    // Store references to dialog elements
    this.dialog = dialog;
  }

  showDialog() {
    this.dialog.classList.remove("hidden");
  }

  hideDialog() {
    this.dialog.classList.add("hidden");
  }

  confirmAction() {
    const entityId = this.getAttribute("entity");
    if (entityId && window.hass) {
      window.hass.callService("button", "press", {
        entity_id: entityId,
      });
    }
    this.hideDialog();
  }
}

customElements.define("custom-button-card", CustomButtonCard);
