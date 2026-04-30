(() => {
  if (!window.PrimeCutStorage) {
    return;
  }

  const tableBody = document.querySelector("#bookings-body");
  const emptyState = document.querySelector("#empty-state");
  const clearButton = document.querySelector("#clear-bookings");
  const seedButton = document.querySelector("#seed-bookings");
  const metricTotal = document.querySelector("#metric-total");
  const metricPending = document.querySelector("#metric-pending");
  const metricConfirmed = document.querySelector("#metric-confirmed");
  const metricSales = document.querySelector("#metric-sales");

  if (!tableBody || !emptyState || !clearButton || !seedButton) {
    return;
  }

  function getDateTimeLocalValue(hoursFromNow) {
    const date = new Date();
    date.setHours(date.getHours() + hoursFromNow, 0, 0, 0);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function seedDemoBookings() {
    window.PrimeCutStorage.clearBookings();

    const sampleBookings = [
      {
        name: "Marco Santos",
        contactNumber: "0917 555 1280",
        service: "Classic Haircut",
        preferredDateTime: getDateTimeLocalValue(1),
      },
      {
        name: "Daniel Reyes",
        contactNumber: "0917 555 2391",
        service: "Skin Fade",
        preferredDateTime: getDateTimeLocalValue(2),
      },
      {
        name: "Joel Ramirez",
        contactNumber: "0917 555 4602",
        service: "Haircut + Beard Combo",
        preferredDateTime: getDateTimeLocalValue(3),
      },
      {
        name: "Arvin Cruz",
        contactNumber: "0917 555 9734",
        service: "Beard Shave + Line Up",
        preferredDateTime: getDateTimeLocalValue(4),
      },
    ];

    sampleBookings.forEach((booking, index) => {
      const created = window.PrimeCutStorage.addBooking(booking);
      if (index % 2 === 1) {
        window.PrimeCutStorage.updateBookingStatus(created.id, "confirmed");
      }
    });
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function renderMetrics(bookings) {
    const summary = window.PrimeCutStorage.getDailySummary(bookings);
    metricTotal.textContent = String(summary.total);
    metricPending.textContent = String(summary.pending);
    metricConfirmed.textContent = String(summary.confirmed);
    metricSales.textContent = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(summary.sales);
  }

  function createStatusBadge(status) {
    const badge = document.createElement("span");
    badge.className = `status-badge status-${status}`;
    badge.textContent = status;
    return badge;
  }

  function createActionButton(booking) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-small";
    if (booking.status === "pending") {
      button.textContent = "Confirm";
      button.addEventListener("click", () => {
        window.PrimeCutStorage.updateBookingStatus(booking.id, "confirmed");
        render();
      });
    } else {
      button.textContent = "Set pending";
      button.classList.add("btn-ghost");
      button.addEventListener("click", () => {
        window.PrimeCutStorage.updateBookingStatus(booking.id, "pending");
        render();
      });
    }
    return button;
  }

  function renderTableRows(bookings) {
    tableBody.innerHTML = "";

    bookings
      .slice()
      .sort((a, b) => new Date(a.preferredDateTime) - new Date(b.preferredDateTime))
      .forEach((booking) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = booking.name;

        const serviceCell = document.createElement("td");
        serviceCell.textContent = booking.service;

        const timeCell = document.createElement("td");
        timeCell.textContent = formatDateTime(booking.preferredDateTime);

        const statusCell = document.createElement("td");
        statusCell.appendChild(createStatusBadge(booking.status));

        const actionCell = document.createElement("td");
        actionCell.appendChild(createActionButton(booking));

        row.appendChild(nameCell);
        row.appendChild(serviceCell);
        row.appendChild(timeCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
      });
  }

  function render() {
    const bookings = window.PrimeCutStorage.readBookings();
    renderTableRows(bookings);
    emptyState.style.display = bookings.length ? "none" : "block";
    renderMetrics(bookings);
  }

  clearButton.addEventListener("click", () => {
    window.PrimeCutStorage.clearBookings();
    render();
  });

  seedButton.addEventListener("click", () => {
    seedDemoBookings();
    render();
  });

  render();
})();
