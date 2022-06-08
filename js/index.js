const washCarBtn = document.getElementById("wash-car-btn");
const mowLawnBtn = document.getElementById("mow-lawn-btn");
const pullWeedsBtn = document.getElementById("pull-weeds-btn");
const buttonsContainer = document.getElementById("buttons-container");
const servicesContainer = document.getElementById("services-container");
const summary = document.getElementById("summary");
const total = document.getElementById("total");
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

const removeService = (service) => {
  console.log(`Remove ${service}`);
  totalCost -= services[service];
  total.textContent = `$${totalCost}`;
};

const renderService = (service) => {
  const serviceDiv = document.createElement("div");
  const serviceName = document.createElement("p");
  const removeBtn = document.createElement("button");
  const serviceCost = document.createElement("p");
  setAttributes(serviceDiv, {
    id: "added-service",
    class: "added-service",
  });
  setAttributes(removeBtn, {
    id: "remove-service-btn",
    class: "remove-service-btn",
  });
  serviceName.textContent = service;
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    removeService(service);
  });
  serviceCost.textContent = `$${services[service]}`;
  serviceDiv.appendChild(serviceName);
  serviceDiv.appendChild(removeBtn);
  serviceDiv.appendChild(serviceCost);
  servicesContainer.appendChild(serviceDiv);
};

// Loop over services object and create a button for each service
for (const service in services) {
  const button = document.createElement("button");
  button.textContent = `${service}: $${services[service]}`;
  // Set attributes on just-created button element
  setAttributes(button, {
    id: `${service.toLowerCase().replace(" ", "-")}-btn`,
  });
  button.addEventListener("click", () => {
    // If service isn't in array, add it...
    if (!servicesRequested.includes(service.toLowerCase())) {
      servicesRequested.push(service.toLowerCase());
      totalCost += services[service];
      // ... display the chosen service...
      renderService(service);
      // ... and update total cost
      total.textContent = `$${totalCost}`;
    }
  });
  buttonsContainer.appendChild(button);
}
