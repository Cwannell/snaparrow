import { useEffect, useMemo, useState } from "react";
import "./appointments.css";

export default function Appointments() {
  // Config — adjust as needed
  const tz = "Europe/London";                    // display timezone
  const workingDays = [1, 2, 3, 4, 5];           // Mon–Fri
  const startHour = 9;                           // 09:00
  const endHour = 17;                            // 17:00 (last slot starts 16:30 if 30-min slots)
  const slotMinutes = 30;                        // 30-min slots
  const unavailable = useMemo(() => new Set([]), []); // add 'YYYY-MM-DDTHH:mm' strings to block

  // State
  const today = toLocalDate(new Date(), tz);
  const [monthCursor, setMonthCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

const [errors, setErrors] = useState({});

function validateForm() {
  const e = {};
  if (!name.trim()) e.name = "Please enter your name.";
  if (!email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email.";
  if (!phone.trim()) e.phone = "Please enter your phone number.";
  setErrors(e);
  return Object.keys(e).length === 0;
}

  // Derived
  const days = useMemo(() => buildCalendar(monthCursor), [monthCursor]);
  const timeSlots = useMemo(
    () => buildSlotsForDate(selectedDate, { startHour, endHour, slotMinutes, workingDays, tz, unavailable }),
    [selectedDate, startHour, endHour, slotMinutes, workingDays, tz, unavailable]
  );

  // Reset time when date changes
  useEffect(() => setSelectedTime(null), [selectedDate]);

  // Actions
  const prevMonth = () => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1));
  const nextMonth = () => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1));

  const jumpToNextAvailable = () => {
    const next = findNextAvailable({ from: new Date(), workingDays, startHour, endHour, slotMinutes, tz, unavailable });
    if (next) {
      setMonthCursor(new Date(next.getFullYear(), next.getMonth(), 1));
      setSelectedDate(new Date(next.getFullYear(), next.getMonth(), next.getDate()));
      setSelectedTime(formatHM(next, tz));
    }
  };

  const confirmText = useMemo(() => {
    if (!selectedTime) return "No time selected";
    return `${formatLongDate(selectedDate, tz)} at ${selectedTime} (${tzShort(tz)})`;
  }, [selectedDate, selectedTime, tz]);

  return (
    <div className="appt-page">
      <h1>Book an Appointment</h1>

      <div className="appt-layout">
        {/* Calendar */}
        <div className="calendar-card">
          <div className="calendar-header">
            <button onClick={prevMonth} aria-label="Previous month">‹</button>
            <div className="month-title">
              {monthCursor.toLocaleString("en-GB", { month: "long", year: "numeric" })}
            </div>
            <button onClick={nextMonth} aria-label="Next month">›</button>
          </div>

          <div className="calendar-grid">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
              <div key={d} className="dow">{d}</div>
            ))}
            {days.map(({ date, inMonth, isPast, isDisabled }) => {
              const isSelected =
                inMonth &&
                date.getFullYear() === selectedDate.getFullYear() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getDate() === selectedDate.getDate();

              const cls = [
                "day",
                inMonth ? "" : "muted",
                isPast ? "disabled" : "",
                isDisabled ? "disabled" : "",
                isSelected ? "selected" : ""
              ].join(" ");

              return (
                <button
                  key={date.toISOString()}
                  className={cls}
                  disabled={isPast || isDisabled}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slots + Summary */}
        <div className="slots-card">
          <div className="slots-header">
            <h3>Available times</h3>
            <button className="next-btn" onClick={jumpToNextAvailable}>Next available</button>
          </div>

          <div className="slots-list">
            {timeSlots.length === 0 && (
              <div className="no-slots">No slots for this date.</div>
            )}
            {timeSlots.map(({ label, iso }) => {
              const active = selectedTime === label;
              return (
                <button
                  key={iso}
                  className={`slot ${active ? "active" : ""}`}
                  onClick={() => setSelectedTime(label)}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="summary">
  <h4>Selected appointment</h4>
  <p className="summary-text">
    {selectedTime ? confirmText : "Choose a date and time."}
  </p>

  {/* Contact details */}
  <div className="appt-form">
    <div className="row">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Jane Smith"
        className={errors.name ? "invalid" : ""}
      />
      {errors.name && <div className="err">{errors.name}</div>}
    </div>

    <div className="row">
      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+44 20 7946 0958"
        className={errors.phone ? "invalid" : ""}
      />
      {errors.phone && <div className="err">{errors.phone}</div>}
    </div>

    <div className="row">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="jane@example.com"
        className={errors.email ? "invalid" : ""}
      />
      {errors.email && <div className="err">{errors.email}</div>}
    </div>
  </div>

  <button
    className="confirm-btn"
    disabled={!selectedTime}
    onClick={() => {
      if (!selectedTime) return;
      if (!validateForm()) return;
      alert(
        `Booked:\n${confirmText}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`
      );
      // TODO: submit to backend here
    }}
  >
    Confirm booking
  </button>
</div>


          <div className="summary">
            <h4>Selected appointment</h4>
            <p className="summary-text">
              {selectedTime ? confirmText : "Choose a date and time."}
            </p>
            {/* <button
              className="confirm-btn"
              disabled={!selectedTime}
              onClick={() => alert(`Booked: ${confirmText}`)}
            >
              Confirm booking
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Helpers -------- */

function toLocalDate(d, tz) {
  // Strip time; return local date in tz at 00:00
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(d).reduce((a, p) => ({ ...a, [p.type]: p.value }), {});
  return new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00`);
}

function buildCalendar(anchor) {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startIdx = (firstOfMonth.getDay() + 6) % 7; // 0=Mon ... 6=Sun
  const days = [];
  const startDate = new Date(year, month, 1 - startIdx);

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const inMonth = date.getMonth() === month;
    const today = toLocalDate(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London");
    const isPast = toLocalDate(date, "Europe/London") < today;
    const isDisabled = false; // hook for holidays, etc.
    days.push({ date, inMonth, isPast, isDisabled });
  }
  return days;
}

function buildSlotsForDate(date, cfg) {
  const { startHour, endHour, slotMinutes, workingDays, tz, unavailable } = cfg;
  const weekday = (date.getDay() + 6) % 7; // 0 Mon ... 6 Sun
  if (!workingDays.includes(weekday)) return [];

  const base = new Date(date);
  base.setHours(0, 0, 0, 0);

  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += slotMinutes) {
      const dt = new Date(base);
      dt.setHours(h, m, 0, 0);

      // Don’t show past times for today
      const now = new Date();
      if (toLocalDate(date, tz).getTime() === toLocalDate(now, tz).getTime() && dt <= now) continue;

      const iso = toISO(dt, tz);
      if (unavailable.has(iso)) continue;

      slots.push({ label: formatHM(dt, tz), iso });
    }
  }
  return slots;
}

function findNextAvailable({ from, workingDays, startHour, endHour, slotMinutes, tz, unavailable }) {
  // search next 60 days
  for (let d = 0; d < 60; d++) {
    const date = toLocalDate(new Date(from.getTime() + d * 86400000), tz);
    const dayIdx = (date.getDay() + 6) % 7;
    if (!workingDays.includes(dayIdx)) continue;

    const slots = buildSlotsForDate(date, { startHour, endHour, slotMinutes, workingDays, tz, unavailable });
    if (slots.length > 0) {
      // return first slot Date
      const first = parseHM(slots[0].label, date, tz);
      return first;
    }
  }
  return null;
}

function toISO(d, tz) {
  // Return local ISO (YYYY-MM-DDTHH:mm) in tz
  const date = d.toLocaleString("en-GB", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
  // Convert "27/05/2026, 09:30" to "2026-05-27T09:30"
  const [dd, mm, yyyy, hh, min] = date.match(/\d+/g);
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

function formatHM(d, tz) {
  return d.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
}

function parseHM(label, baseDate, tz) {
  const [hh, mm] = label.split(":").map(Number);
  const dt = new Date(baseDate);
  dt.setHours(hh, mm, 0, 0);
  return dt;
}

function formatLongDate(d, tz) {
  return d.toLocaleDateString("en-GB", { timeZone: tz, weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

function tzShort(tz) {
  try {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: tz, timeZoneName: "short" });
    const parts = fmt.formatToParts(new Date());
    return parts.find(p => p.type === "timeZoneName")?.value || tz;
  } catch {
    return tz;
  }
}
