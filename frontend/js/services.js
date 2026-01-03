// ===============================
// 1. READ CATEGORY FROM URL
// ===============================
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

// Set page title
const titleEl = document.getElementById("serviceTitle");
titleEl.innerText = selectedCategory
  ? selectedCategory + " Services"
  : "Available Services";

// ===============================
// 2. DOM REFERENCES
// ===============================
const providerList = document.getElementById("providerList");
const modal = document.getElementById("bookingModal");
const modalProviderName = document.getElementById("modalProviderName");

let selectedProviderId = null;

// ===============================
// 3. FETCH REAL PROVIDERS FROM BACKEND
// ===============================
async function loadProviders() {
  try {
    providerList.innerHTML = `<p style="color:#aaa;text-align:center;">Loading providers...</p>`;

    const res = await fetch(
      `http://localhost:5000/api/providers?service=${encodeURIComponent(selectedCategory)}`
    );
    const providers = await res.json();

    providerList.innerHTML = "";

    if (!providers.length) {
      providerList.innerHTML = `
        <p style="color:#777; text-align:center; padding:20px;">
          No providers found for this category.
        </p>`;
      return;
    }

    providers.forEach(provider => {
      const card = document.createElement("div");
      card.className = "provider-card";

      card.innerHTML = `
        <div class="provider-info">
          <h3 style="color:white; font-size:20px;">${provider.name}</h3>

          <p style="color:#aaa; font-size:14px; margin-top:5px;">
            <i class="fa-solid fa-location-dot"></i> ${provider.area}
          </p>

          <p style="color:#a855f7; font-weight:bold; margin-top:5px;">
            ⭐ ${provider.rating} &nbsp; | &nbsp; ₹${provider.price}
          </p>
        </div>

        <button class="book-btn"
          onclick="bookProvider(${provider.id}, '${provider.name}')">
          Book Now
        </button>
      `;

      providerList.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    providerList.innerHTML = `
      <p style="color:red; text-align:center;">
        Failed to load providers.
      </p>`;
  }
}

// Load providers on page open
if (selectedCategory) loadProviders();

// ===============================
// 4. OPEN MODAL
// ===============================
function bookProvider(id, name) {
  selectedProviderId = id;
  modalProviderName.innerText = name;
  modal.style.display = "flex";
}

// ===============================
// 5. CLOSE MODAL
// ===============================
function closeModal() {
  modal.style.display = "none";
}

// Close modal on outside click
window.onclick = function (event) {
  if (event.target === modal) closeModal();
};

// ===============================
// 6. CONFIRM BOOKING (REAL API)
// ===============================
async function confirmBooking(event) {
  event.preventDefault();

  const address = document.getElementById("address").value;
  const date = document.getElementById("date").value;
  const timeSlot = document.getElementById("timeSlot").value;

  if (!address || !date || !timeSlot) {
    alert("❌ Please fill all booking details");
    return;
  }

  const btn = document.querySelector("#bookingForm button");
  const originalText = btn.innerText;

  btn.innerText = "Booking...";
  btn.disabled = true;
  btn.style.background = "#555";

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerId: selectedProviderId,
        address,
        date,
        timeSlot
      })
    });

    const data = await res.json();

    alert("✅ Booking Confirmed!\nProvider has been notified.");
    closeModal();
    document.getElementById("bookingForm").reset();

  } catch (error) {
    console.error(error);
    alert("❌ Booking failed. Try again.");
  }

  btn.innerText = originalText;
  btn.disabled = false;
  btn.style.background = "linear-gradient(135deg, #a855f7, #7c3aed)";
}
