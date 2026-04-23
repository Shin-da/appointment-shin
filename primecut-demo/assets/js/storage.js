(() => {
  const STORAGE_KEY = "primecut_bookings_v1";

  const SERVICE_PRICES = {
    "Classic Haircut": 20,
    "Skin Fade": 28,
    "Beard Shave + Line Up": 15,
    "Haircut + Beard Combo": 32,
  };

  function readBookings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeBookings(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }

  function createBooking(payload) {
    return {
      id: `bk_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
      name: payload.name.trim(),
      contactNumber: payload.contactNumber.trim(),
      service: payload.service,
      preferredDateTime: payload.preferredDateTime,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  }

  function addBooking(payload) {
    const bookings = readBookings();
    const booking = createBooking(payload);
    bookings.push(booking);
    writeBookings(bookings);
    return booking;
  }

  function updateBookingStatus(id, status) {
    const allowedStatuses = ["pending", "confirmed"];
    if (!allowedStatuses.includes(status)) {
      return null;
    }

    const bookings = readBookings();
    const index = bookings.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    bookings[index].status = status;
    writeBookings(bookings);
    return bookings[index];
  }

  function clearBookings() {
    writeBookings([]);
  }

  function isSameDay(dateInput, nowDate) {
    const date = new Date(dateInput);
    return (
      date.getFullYear() === nowDate.getFullYear() &&
      date.getMonth() === nowDate.getMonth() &&
      date.getDate() === nowDate.getDate()
    );
  }

  function getDailySummary(bookings) {
    const today = new Date();
    const todaysBookings = bookings.filter((item) => isSameDay(item.preferredDateTime, today));
    const pending = todaysBookings.filter((item) => item.status === "pending").length;
    const confirmedBookings = todaysBookings.filter((item) => item.status === "confirmed");
    const confirmed = confirmedBookings.length;
    const sales = confirmedBookings.reduce((total, item) => {
      const amount = SERVICE_PRICES[item.service] || 0;
      return total + amount;
    }, 0);

    return {
      total: todaysBookings.length,
      pending,
      confirmed,
      sales,
    };
  }

  window.PrimeCutStorage = {
    SERVICE_PRICES,
    readBookings,
    writeBookings,
    addBooking,
    updateBookingStatus,
    clearBookings,
    getDailySummary,
  };
})();
