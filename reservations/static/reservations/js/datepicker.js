document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("date-picker");

  if (!input) return;

  flatpickr(input, {
    locale: "ja",
    dateFormat: "Y-m-d",

    onDayCreate: function(dObj, dStr, fp, dayElem) {
        const dow = dayElem.dateObj.getDay(); // 0=日, 6=土
        if (dow === 0) dayElem.classList.add("is-sun");
        if (dow === 6) dayElem.classList.add("is-sat");
      },

  });
});
