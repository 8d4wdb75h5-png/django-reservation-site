document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("date-picker");

    if (!input) return;

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

            const holidays = [
                "2026-01-01",
                "2026-02-11",
                "2026-02-23",
            ];

            if (dow === 0) dayElem.classList.add("is-sun");
            if (dow === 6) dayElem.classList.add("is-sat");

            if (holidays.includes(dateStr)) {
                dayElem.classList.add("is-holiday");
            }
        }
    });
});