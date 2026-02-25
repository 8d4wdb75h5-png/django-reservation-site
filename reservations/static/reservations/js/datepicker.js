document.addEventListener("DOMContentLoaded", async function () {
  const input = document.getElementById("date-picker");
  if (!input) return;

  const year = new Date().getFullYear();
  let holidayData = {};

  try {
    const res = await fetch(`https://holidays-jp.github.io/api/v1/${year}/date.json`);
    holidayData = await res.json();
  } catch (e) {
    console.warn("祝日データ取得失敗", e);
  }

  flatpickr(input, {
    locale: "ja",
    dateFormat: "Y-m-d",

    onDayCreate: function (dObj, dStr, fp, dayElem) {
      const date = dayElem.dateObj;
      const dow = date.getDay();

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;

      if (dow === 0) dayElem.classList.add("is-sun");
      if (dow === 6) dayElem.classList.add("is-sat");
      if (holidayData[dateStr]) dayElem.classList.add("is-holiday");
    }
  });
});