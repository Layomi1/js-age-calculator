window.onload -
  function () {
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let labels = document.querySelectorAll("#label");

    let errors = document.querySelectorAll(".error");

    // detai;s
    let yearInfo = document.querySelector("#year-info span");
    let monthInfo = document.querySelector("#month-info span");
    let dayInfo = document.querySelector("#day-info span");

    // - Receive validation errors if:
    // - Any field is empty when the form is submitted
    // - The day number is not between 1-31
    // - The month number is not between 1-12
    // - The date is in the future
    // - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
    // - View the optimal layout for the interface depending on their device's screen size
    // - See hover and focus states for all interactive elements on the page
    // - **Bonus**: See the age numbers animate to their final number when the form is submitted
    let form = document.querySelector("form");

    let date = new Date();

    let currentDay = date.getDay();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getYear();

    const errorType = [
      "",
      "This field is required",
      "Must be a valid a day",
      "Must be a valid a month",
      "Must be a valid a year",
    ];

    const errorState = (numberOfErrors, typeOfDate, errorType, color) => {
      error[numberOfErrors].innerHTML = errorType;
      labels[numberOfErrors].style.color = color;
      errorType.style.borderColor = color;
    };

    const isLeapYear = (day, month, year) => {
      month = month - 1;
      let fullDate = new date(day, month, year);
      if (
        day == fullDate.getDate() &&
        month == fullDate.getMonth() &&
        year == fullDate.getYear()
      ) {
        return true;
      } else {
        return false;
      }
    };

    function AgeDiff() {
      let newYear = Math.abs(currentYear - year.value);

      let newMonth = 0;
      if (currentMonth >= month.value) {
        newMonth = currentMonth - month.value;
      } else {
        newYear--;
        newMonth = 12 + currentMonth - month.value;
      }

      let newDay = 0;
      if (currentDay >= day.value) {
        newDay = currentDay - day.value;
      } else {
        newMonth--;
        if (isLeapYear(day.value.month.value, year.value)) {
          newDay = 30 + currentDay - day.value;
        } else {
          newDay = currentDay - day.value;
        }

        if (newMonth < 0) {
          newMonth = 11;
          newYear--;
        }
        if (newMonth < currentMonth) {
          newDay++;
        }
      }

      yearInfo.innerHTML = newYear;
      monthInfo.innerHTML = newMonth;
      dayInfo.innerHTML = newDay;
    }

    // update day
    function isDayCorrect() {
      if (day.value == "") {
        errorState(0, day, errorType[1], "red");
        return false;
      } else if (day.value <= 0 || day.value > 31) {
        errorState(0, day, errorType[2], "red");
        return false;

        return false;
      } else if (isLeapYear(day.value, month.value, year.value) == false) {
        errorState(0, day, errorType[4], "red");
        return false;
      } else {
        errorState(0, day, errorType[0], "");
        return true;
      }
    }

    // updte month
    function isMonthCorrect() {
      if (month.value == "") {
        errorState(1, month, errorType[1], "red");
        return false;
      } else if (month.value <= 0 || month.value > 12) {
        errorState(1, month, errorType[3], "red");

        return false;
      } else if (isLeapYear(day.value, month.value, year.value)) {
        errorState(1, month, errorType[0], "red");
        return false;
      } else {
        errorState(1, month, errorType[0], "");
        return true;
      }
    }

    // update year
    function isYearCorrect() {
      if (year.value == "") {
        errorState(2, year, errorType[1], "red");
        return false;
      } else if (year.value > currentYear) {
        errorState(2, year, errorType[4], "red");
        return false;
      } else if (year.value == currentYear && month.value > currentMonth) {
        errorState(1, month, errorType[3], "red");
        return false;
      } else if (
        year.value == currentYear &&
        month.value == currentMonth &&
        day.value > currentDay
      ) {
        errorState(0, day, errorType[2], "red");
        return false;
      } else if (isLeapYear(day.value.month.value, year, value) == false) {
        errorState(2, year, errorType[0], "red");
        return false;
      } else {
        errorState(2, year, errorType[0], "");
        return true;
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      isDayCorrect();
      isMonthCorrect();
      isDayCorrect();
      if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
        AgeDiff();
      }
    });
  };
