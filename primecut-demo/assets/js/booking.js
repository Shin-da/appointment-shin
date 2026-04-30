(() => {
  const form = document.querySelector("#booking-form");
  const feedback = document.querySelector("#booking-feedback");

  if (!form || !feedback || !window.PrimeCutStorage) {
    return;
  }

  function setFeedback(message, isError) {
    feedback.textContent = message;
    feedback.classList.toggle("error-text", Boolean(isError));
    feedback.classList.toggle("success-text", !isError && message.length > 0);
  }

  function getFormData() {
    const data = new FormData(form);
    return {
      name: String(data.get("name") || "").trim(),
      contactNumber: String(data.get("contactNumber") || "").trim(),
      service: String(data.get("service") || ""),
      preferredDateTime: String(data.get("preferredDateTime") || ""),
    };
  }

  function validate(data) {
    if (!data.name || !data.contactNumber || !data.service || !data.preferredDateTime) {
      return "Please complete all required fields.";
    }
    return "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setFeedback("", false);

    const payload = getFormData();
    const errorMessage = validate(payload);
    if (errorMessage) {
      setFeedback(errorMessage, true);
      return;
    }

    const booking = window.PrimeCutStorage.addBooking(payload);
    form.reset();
    setFeedback(
      `Thanks, ${booking.name}. Your ${booking.service} request is saved as pending.`,
      false
    );
  });
})();
