const washCarBtn = document.getElementById("wash-car-btn");
const mowLawnBtn = document.getElementById("mow-lawn-btn");
const pullWeedsBtn = document.getElementById("pull-weeds-btn");
const servicesContainer = document.getElementById("services-container");
const summary = document.getElementById("summary");
const total = document.getElementById("total");
const servicesRequested = [];
const services = {
  washCar: 10,
  mowLawn: 20,
  pullWeeds: 30,
};
let totalCost = 0;

washCarBtn.addEventListener("click", () => {
  if (!servicesRequested.includes("wash car")) {
    servicesRequested.push("wash car");
    totalCost += services.washCar;
  }
  total.textContent = `$${totalCost}`;
});

mowLawnBtn.addEventListener("click", () => {
  if (!servicesRequested.includes("mow lawn")) {
    servicesRequested.push("mow lawn");
    totalCost += services.mowLawn;
  }
  total.textContent = `$${totalCost}`;
});

pullWeedsBtn.addEventListener("click", () => {
  if (!servicesRequested.includes("pull weeds")) {
    servicesRequested.push("pull weeds");
    totalCost += services.pullWeeds;
  }
  total.textContent = `$${totalCost}`;
});
