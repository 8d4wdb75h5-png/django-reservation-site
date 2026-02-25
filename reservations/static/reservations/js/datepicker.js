document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("date-picker");
    if (!input) return;

    let holidayData = {};

    // ===== 祝日データ取得 =====
    fetch("https://holidays-jp.github.io/api/v1/2026/date.json")
        .then(res => res.json())
        .then(data => {
            holidayData = data;
        });

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

            // ===== API祝日判定 =====
            if (holidayData[dateStr]) {
                dayElem.classList.add("is-holiday");
            }
        }
    });
});