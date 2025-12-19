#  SEATLOCK  
### Concurrency-Safe Theater Ticket Booking Simulator

SEATLOCK is an interactive, front-end simulation of a real-world theater ticket booking system designed to demonstrate **race conditions**, **locking mechanisms**, and **queue-based concurrency control** using **HTML, CSS, and JavaScript**.

This project visually explains how concurrent users can cause overbooking issues and how proper synchronization techniques solve them.

---

##  Live Demo
👉 (Optional) Add GitHub Pages link here once enabled

---

##  Problem Statement

In real-world booking systems (movies, trains, events), multiple users may try to book the same seat at the same time.  
Without proper concurrency control, this leads to:
- Overbooking
- Inconsistent seat states
- Poor user experience

SEATLOCK simulates these scenarios and demonstrates **safe and unsafe booking strategies**.

---

 Features:

###  Interactive Seat Map
- Theater-style layout with rows and seat numbers
- **VIP seats** with special styling
- Real-time seat state updates



###  Booking Modes
-  **No Control (Race Condition Bug)**
-  **Mutex LoLock (Single-thread access)**
-  **Queue-Based Booking (Safe & Fair)**

###  User Experience
- Hover animations & tooltips
- Click interaction on seats
- Confetti animation on successful booking
- Live event log showing booking actions

---

##  Tech Stack

- **HTML5** – Structure
- **CSS3** – Styling, animations, gradients
- **JavaScript (ES6)** – Logic, concurrency simulation









