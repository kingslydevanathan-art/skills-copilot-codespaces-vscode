const orders = [
  ["4500012841", "Northwind Components", "16 Nov 2026", "€12,480.00", "Open"],
  ["4500012837", "Alpine Office Supply", "15 Nov 2026", "€4,250.00", "Open"],
  ["4500012829", "Contoso Industrial", "14 Nov 2026", "€28,900.00", "Pending"],
  ["4500012816", "Fabrikam Services", "12 Nov 2026", "€1,875.00", "Open"],
];

const ordersBody = document.querySelector("#orders-body");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function renderOrders(rows = orders) {
  ordersBody.innerHTML = rows.map(([number, vendor, date, value, status]) => `
    <tr><td>${number}</td><td>${vendor}</td><td>${date}</td><td>${value}</td>
    <td><span class="badge${status === "Pending" ? " pending" : ""}">${status}</span></td></tr>
  `).join("");
  document.querySelector("#row-count").textContent = `Showing ${rows.length} of 24 orders`;
}

function runTransaction(value) {
  const transaction = value.trim().toUpperCase();
  const labels = { ME21N: "Create purchase order", ME23N: "Display purchase order", MM03: "Display material", VA03: "Display sales order", MIGO: "Goods movement" };
  if (!transaction) {
    showToast("Enter a transaction code, such as ME23N.");
    return;
  }
  if (labels[transaction]) {
    showToast(`${transaction} · ${labels[transaction]} opened in practice mode.`);
  } else {
    showToast(`${transaction} is not available in this practice system.`);
  }
}

document.querySelector("#run-transaction").addEventListener("click", () => runTransaction(document.querySelector("#transaction").value));
document.querySelector("#transaction").addEventListener("keydown", (event) => {
  if (event.key === "Enter") runTransaction(event.currentTarget.value);
});
document.querySelectorAll("[data-transaction]").forEach((button) => {
  button.addEventListener("click", () => {
    const transaction = button.dataset.transaction;
    document.querySelector("#transaction").value = transaction;
    runTransaction(transaction);
  });
});
document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const name = button.textContent.trim();
    document.querySelector("#breadcrumb-current").textContent = name;
    document.querySelector("#page-title").textContent = name === "Overview" ? "ERP command center" : `${name} workspace`;
    showToast(`${name} workspace selected.`);
  });
});
document.querySelector("#show-all").addEventListener("click", () => showToast("24 sample purchase orders are available in the practice dataset."));
document.querySelector("#help-button").addEventListener("click", () => showToast("Try ME23N, MM03, VA03, or MIGO in the command bar."));
document.querySelector("#start-scenario").addEventListener("click", () => showToast("Scenario started: create and receive a purchase order."));
document.querySelector("#clear-activity").addEventListener("click", (event) => {
  event.currentTarget.closest(".activity-panel").querySelector(".activity-list").innerHTML = '<li><span class="activity-icon blue">✓</span><div><strong>All caught up</strong><span>No recent activity</span></div></li>';
  showToast("Practice activity cleared.");
});

renderOrders();
