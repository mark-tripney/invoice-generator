const washCarBtn = document.getElementById("wash-car-btn");
const mowLawnBtn = document.getElementById("mow-lawn-btn");
const pullWeedsBtn = document.getElementById("pull-weeds-btn");
const buttonsContainer = document.getElementById("buttons-container");
const servicesContainer = document.getElementById("services-container");
const summary = document.getElementById("summary");
const notes = document.getElementById("notes");
const total = document.getElementById("total");
const sendInvoiceBtn = document.getElementById("send-invoice-btn");
const servicesRequested = [];
const services = {
  "Wash Car": 10,
  "Mow Lawn": 20,
  "Pull Weeds": 30,
};
let totalCost = 0;

// Programmatically add attributes to buttons
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const toggleNotesField = () => {
  if (totalCost > 0) {
    notes.textContent = "We accept cash, credit card, or PayPal";
  } else {
    notes.textContent = "";
  }
};

const toggleInvoiceBtn = () => {
  if (totalCost > 0) {
    sendInvoiceBtn.disabled = false;
  } else {
    sendInvoiceBtn.disabled = true;
  }
};

const removeService = (e, service) => {
  // Find the enclosing div of the just-clicked 'Remove' button...
  const parent = e.target.closest("div");
  // ... and remove it from the DOM
  parent.remove();
  // Remove that service from the array...
  servicesRequested.splice(servicesRequested.indexOf(service), 1);
  // ... and re-render the list of chosen services `and updated cost
  renderService();
  totalCost -= services[service];
  total.textContent = `$${totalCost}`;
  toggleInvoiceBtn();
  toggleNotesField();
};

const renderService = () => {
  servicesContainer.innerHTML = "";
  servicesRequested.forEach((service) => {
    const serviceDiv = document.createElement("div");
    const serviceName = document.createElement("p");
    const removeBtn = document.createElement("button");
    const serviceCostDiv = document.createElement("div");
    const currencySpan = document.createElement("span");
    const serviceCost = document.createElement("span");
    setAttributes(serviceDiv, {
      id: "added-service",
      class: "added-service",
    });
    setAttributes(serviceName, {
      class: "service-name",
    });
    setAttributes(removeBtn, {
      id: "remove-service-btn",
      class: "remove-service-btn",
    });
    setAttributes(currencySpan, {
      class: "currency",
    });
    setAttributes(serviceCostDiv, {
      class: "service-cost",
    });
    serviceName.textContent = service;
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", (e) => {
      removeService(e, service);
    });
    currencySpan.textContent = "$";
    serviceCost.textContent = `${services[service]}`;
    serviceCostDiv.appendChild(currencySpan);
    serviceCostDiv.appendChild(serviceCost);
    serviceDiv.appendChild(serviceName);
    serviceDiv.appendChild(removeBtn);
    serviceDiv.appendChild(serviceCostDiv);
    servicesContainer.appendChild(serviceDiv);
  });
  toggleInvoiceBtn();
  toggleNotesField();
};

// Loop over services object and create a button for each service
for (const service in services) {
  const button = document.createElement("button");
  button.textContent = `${service}: $${services[service]}`;
  // Set attributes on just-created button element
  setAttributes(button, {
    id: `${service.toLowerCase().replace(" ", "-")}-btn`,
    class: "add-service-btn btn",
  });
  total.textContent = `$${totalCost}`;
  button.addEventListener("click", () => {
    // If service isn't in array, add it...
    if (!servicesRequested.includes(service)) {
      servicesRequested.push(service);
      totalCost += services[service];
      // ... display the chosen service...
      renderService();
      // ... and update total cost
      total.textContent = `$${totalCost}`;
    }
  });
  buttonsContainer.appendChild(button);
}

sendInvoiceBtn.addEventListener("click", () => {
  servicesRequested.length = 0;
  renderService();
  totalCost = 0;
  total.textContent = `$${totalCost}`;
  toggleInvoiceBtn();
  toggleNotesField();
});
