/* --- Navigation Logic --- */

// Navigate to the services page with the category name
function openService(category) {
    window.location.href = `services.html?category=${encodeURIComponent(category)}`;
}

// Scroll smoothly to the categories section
function scrollToServices() {
    const section = document.getElementById('categories');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        // If we are not on the homepage, go there first
        window.location.href = "index.html#categories";
    }
}

/* --- Search Bar Logic (The Fix) --- */

/* --- Smart Search Logic --- */

function performSearch() {
    // 1. Get the text the user typed
    const searchBox = document.getElementById("searchInput");
    if (!searchBox) return; // Safety check

    const input = searchBox.value.toLowerCase().trim();

    // 2. CHECK KEYWORDS (Mapping words to Categories)

    // --- Appliances ---
    if (input.includes("ro") || input.includes("water") || input.includes("filter")) {
        window.location.href = "services.html?category=RO Repair";
    }
    else if (input.includes("ac") || input.includes("cool") || input.includes("condition")) {
        window.location.href = "services.html?category=AC Service";
    }
    else if (input.includes("wash") || input.includes("laundry")) {
        window.location.href = "services.html?category=Washing Machine";
    }

    // --- Repairs ---
    else if (input.includes("plumb") || input.includes("pipe") || input.includes("tap")) {
        window.location.href = "services.html?category=Plumber";
    }
    else if (input.includes("electr") || input.includes("light") || input.includes("fan")) {
        window.location.href = "services.html?category=Electrician";
    }
    else if (input.includes("carpent") || input.includes("wood") || input.includes("door")) {
        window.location.href = "services.html?category=Carpenter";
    }

    // --- Doorstep Services ---
    else if (input.includes("maid") || input.includes("house help") || input.includes("cook")) {
        window.location.href = "services.html?category=Maid";
    }
    else if (input.includes("milk") || input.includes("dairy")) {
        window.location.href = "services.html?category=Milkman";
    }
    else if (input.includes("iron") || input.includes("press")) {
        window.location.href = "services.html?category=Ironer";
    }

    // --- Salon & Grooming ---
    else if (input.includes("shave") || input.includes("beard") || input.includes("men")) {
        window.location.href = "services.html?category=Men's Haircut";
    }
    else if (input.includes("makeup") || input.includes("facial") || input.includes("women") || input.includes("lady")) {
        window.location.href = "services.html?category=Facials";
    }
    else if (input.includes("hair") || input.includes("cut") || input.includes("salon")) {
        // If they just type "hair", send them to general Men's cut (or you can pick one)
        window.location.href = "services.html?category=Men's Haircut";
    }

    // --- Cleaning & Paint ---
    else if (input.includes("paint") || input.includes("wall") || input.includes("color")) {
        window.location.href = "services.html?category=Painting";
    }
    else if (input.includes("clean") || input.includes("bath") || input.includes("garden")) {
        window.location.href = "services.html?category=Bathroom Cleaning";
    }

    // --- EMPTY INPUT CHECK ---
    else if (input === "") {
        alert("Please type a service name (e.g., RO, Maid, AC)");
    }

    // --- 3. FALLBACK: SERVICE NOT FOUND ---
    else {
        // This is the polite message you asked for
        alert(`⚠️ We don't have "${input}" yet.\n\nThis service will be added in the future!`);
    }
}
// Allow pressing "Enter" key to search
function handleEnter(event) {
    if (event.key === "Enter") {
        performSearch();
    }
}