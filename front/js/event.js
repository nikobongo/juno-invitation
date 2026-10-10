// Event section: countdown to November 28, 2026.

export function initCountdown() {
  var target = new Date("2026-11-28T00:00:00");
  var daysEl = document.getElementById("cd-days");
  var hoursEl = document.getElementById("cd-hours");
  var minutesEl = document.getElementById("cd-minutes");

  if (!daysEl || !hoursEl || !minutesEl) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function update() {
    var diff = target.getTime() - Date.now();

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      return;
    }

    var totalMinutes = Math.floor(diff / 60000);
    var days = Math.floor(totalMinutes / (60 * 24));
    var hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    var minutes = totalMinutes % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
  }

  update();
  setInterval(update, 1000 * 30); // refresh twice a minute, plenty for a minutes-level countdown
}
