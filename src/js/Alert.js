export default class Alert {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  async getData() {
    const response = await fetch(this.jsonPath);
    return await response.json();
  }

  async init() {
    const alerts = await this.getData();

    if (!alerts.length) return;

    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;

      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;

      p.style.padding = "1rem";
      p.style.margin = "0";

      alertSection.appendChild(p);
    });

    const main = document.querySelector("main");

    if (main) {
      main.prepend(alertSection);
    }
  }
}