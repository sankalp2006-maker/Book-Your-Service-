// 1. Get the Group Name from the URL
const params = new URLSearchParams(window.location.search);
const group = params.get("group");

// Set the Title
if (group) {
    document.getElementById("groupTitle").innerText = group + " Services";
}

const grid = document.getElementById("subGrid");

// 2. Define the Lists (Updated Icons)
const data = {
    "Repairs": [
        { name: "Electrician", icon: "fa-bolt" },
        { name: "Plumber", icon: "fa-faucet" },
        { name: "Carpenter", icon: "fa-hammer" }
    ],
    "Appliances": [
        { name: "AC Service", icon: "fa-fan" },
        { name: "Washing Machine", icon: "fa-soap" },
        { name: "RO Repair", icon: "fa-filter" }
    ],
    "Doorstep": [
        { name: "Maid", icon: "fa-user-nurse" },
        // Changed icon to 'wine-bottle' because it looks like a glass milk bottle
        { name: "Milkman", icon: "fa-wine-bottle" },
        { name: "Ironer", icon: "fa-shirt" },
        { name: "Dry Cleaner", icon: "fa-vest" }
    ],
    "Salon": [
        { name: "Hair Cutting", icon: "fa-scissors" },
        { name: "Makeup", icon: "fa-eye" },
        { name: "Facials", icon: "fa-face-smile-beam" }
    ],
    "MensSalon": [
        { name: "Men's Haircut", icon: "fa-scissors" },
        { name: "Shaving & Beard", icon: "fa-face-smile" },
        { name: "Face Massage", icon: "fa-hand-sparkles" }
    ],
    "Cleaning": [
        { name: "Bathroom Cleaning", icon: "fa-bath" },
        { name: "Garden Cleaning", icon: "fa-leaf" },
        { name: "House Cleaning", icon: "fa-house-chimney" }
    ],
    "Specialized": [
        { name: "Painting", icon: "fa-paint-roller" },
        { name: "Waterproofing", icon: "fa-droplet" },
        { name: "Wall Makeover", icon: "fa-border-all" }
    ]
};

// 3. Show the correct list with NEW "Service Tile" design
const items = data[group] || [];

if (items.length > 0) {
    items.forEach(item => {
        const div = document.createElement("div");
        // We use a NEW class here: 'service-tile'
        div.className = "service-tile"; 
        div.onclick = () => {
            window.location.href = `services.html?category=${encodeURIComponent(item.name)}`;
        };
        
        div.innerHTML = `
            <div class="icon-box">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <h3>${item.name}</h3>
            <div class="arrow-icon">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        `;
        grid.appendChild(div);
    });
} else {
    grid.innerHTML = "<p style='color:white; text-align:center;'>No services found.</p>";
}