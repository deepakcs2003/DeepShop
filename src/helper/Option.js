const productCategory = [
    { id: "1", label: "Airpods", value: "airpods" },
    { id: "2", label: "Camera", value: "camera" },
    { id: "3", label: "Earphones", value: "earphones" },
    { id: "4", label: "Mobile", value: "mobile" },
    { id: "5", label: "Mouse", value: "mouse" },
    { id: "6", label: "Printers", value: "printers" },
    { id: "7", label: "Processor", value: "processor" },
    { id: "8", label: "Refrigerator", value: "refrigerator" },
    { id: "9", label: "Trimmer", value: "trimmer" },
    { id: "10", label: "Televisions", value: "televisions" },
    { id: "11", label: "Watches", value: "watches" },
];
const brandCategory = [
    { id: "1", label: "Apple", value: "apple" },
    { id: "2", label: "Samsung", value: "samsung" },
    { id: "3", label: "JBL", value: "jbl" },
    { id: "4", label: "Canon", value: "canon" },
    { id: "5", label: "Nikon", value: "nikon" },
    { id: "6", label: "Sony", value: "sony" },
    { id: "7", label: "Bose", value: "bose" },
    { id: "8", label: "Sennheiser", value: "sennheiser" },
    { id: "9", label: "OnePlus", value: "oneplus" },
    { id: "10", label: "Logitech", value: "logitech" },
    { id: "11", label: "Razer", value: "razer" },
    { id: "12", label: "Corsair", value: "corsair" },
    { id: "13", label: "HP", value: "hp" },
    { id: "14", label: "Epson", value: "epson" },
    { id: "15", label: "Intel", value: "intel" },
    { id: "16", label: "AMD", value: "amd" },
    { id: "17", label: "Qualcomm", value: "qualcomm" },
    { id: "18", label: "LG", value: "lg" },
    { id: "19", label: "Whirlpool", value: "whirlpool" },
    { id: "20", label: "Philips", value: "philips" },
    { id: "21", label: "Braun", value: "braun" },
    { id: "22", label: "Panasonic", value: "panasonic" },
    { id: "23", label: "Rolex", value: "rolex" },
    { id: "24", label: "Casio", value: "casio" },
    { id: "25", label: "Fossil", value: "fossil" },
    { id: "26", label: "boAt", value: "boat" }, // Indian brand for earphones
    { id: "27", label: "Zebronics", value: "zebronics" }, // Indian brand for earphones
    { id: "28", label: "Noise", value: "noise" }, // Indian brand for earphones
    { id: "29", label: "Titan", value: "titan" }, // Indian watch brand
    { id: "30", label: "Fastrack", value: "fastrack" }, // Indian watch brand
    { id: "31", label: "Casio (India)", value: "casio-india" }, // Casio sold in India
    { id: "32", label: "Timex", value: "timex" }, // Timex watches
];
const commonFeatures = [
    { id: "1", label: "Bluetooth Connectivity", value: "bluetooth_connectivity" },
    { id: "2", label: "Wi-Fi Connectivity", value: "wifi_connectivity" },
    { id: "3", label: "Water Resistant", value: "water_resistant" },
    { id: "4", label: "Fast Charging", value: "fast_charging" },
    { id: "5", label: "Long Battery Life", value: "long_battery_life" },
    { id: "6", label: "HD Display", value: "hd_display" },
    { id: "7", label: "Touchscreen", value: "touchscreen" },
    { id: "8", label: "Voice Control", value: "voice_control" },
    { id: "9", label: "Noise Cancellation", value: "noise_cancellation" },
    { id: "10", label: "Built-in Microphone", value: "built_in_microphone" },
    { id: "11", label: "Remote Control", value: "remote_control" },
    { id: "12", label: "Smart Features", value: "smart_features" },
    { id: "13", label: "Compact Design", value: "compact_design" },
    { id: "14", label: "Energy Efficient", value: "energy_efficient" },
    { id: "15", label: "Multi-Device Pairing", value: "multi_device_pairing" },
    { id: "16", label: "Customizable Settings", value: "customizable_settings" },
    { id: "17", label: "Portable", value: "portable" },
    { id: "18", label: "Durable Build", value: "durable_build" },
];

const commonMaterials = [
    { id: "1", label: "Plastic", value: "plastic" },
    { id: "2", label: "Metal", value: "metal" },
    { id: "3", label: "Glass", value: "glass" },
    { id: "4", label: "Silicone", value: "silicone" },
    { id: "5", label: "Aluminum", value: "aluminum" },
    { id: "6", label: "Rubber", value: "rubber" },
    { id: "7", label: "Wood", value: "wood" },
    { id: "8", label: "Fabric", value: "fabric" },
    { id: "9", label: "Ceramic", value: "ceramic" },
    { id: "10", label: "Composite", value: "composite" },
    { id: "11", label: "Carbon Fiber", value: "carbon_fiber" },
    { id: "12", label: "PVC", value: "pvc" },
];
const commonCountries = [
    { id: "1", label: "India", value: "india" },
    { id: "2", label: "United States", value: "united_states" },
    { id: "3", label: "China", value: "china" },
    { id: "4", label: "Japan", value: "japan" },
    { id: "5", label: "Germany", value: "germany" },
    { id: "6", label: "South Korea", value: "south_korea" },
    { id: "7", label: "Taiwan", value: "taiwan" },
    { id: "8", label: "Singapore", value: "singapore" },
    { id: "9", label: "Malaysia", value: "malaysia" },
    { id: "10", label: "United Kingdom", value: "united_kingdom" },
    { id: "11", label: "Canada", value: "canada" },
    { id: "12", label: "France", value: "france" },
    { id: "13", label: "Italy", value: "italy" },
    { id: "14", label: "Sweden", value: "sweden" },
    { id: "15", label: "Brazil", value: "brazil" },
];

const performanceCategories = [
    { id: "1", label: "Very High", value: "very_high" },
    { id: "2", label: "High", value: "high" },
    { id: "3", label: "Medium", value: "medium" },
    { id: "4", label: "Low", value: "low" },
    { id: "5", label: "Standard", value: "standard" },
    { id: "6", label: "Optimized", value: "optimized" },
    { id: "7", label: "Basic", value: "basic" },
    { id: "8", label: "Advanced", value: "advanced" },
    { id: "9", label: "Premium", value: "premium" },
    { id: "10", label: "Enhanced", value: "enhanced" },
];

const waterResistanceCategories = [
    { id: "1", label: "IP68", value: "ip68" }, // Dust tight and protected against submersion in water beyond 1 meter
    { id: "2", label: "IP67", value: "ip67" }, // Dust tight and protected against submersion in water up to 1 meter
    { id: "3", label: "IP66", value: "ip66" }, // Dust tight and protected against powerful water jets
    { id: "4", label: "IP65", value: "ip65" }, // Dust tight and protected against water jets
    { id: "5", label: "IP54", value: "ip54" }, // Dust protected and protected against splashing water
    { id: "6", label: "Water Resistant", value: "water_resistant" }, // General term for resistance to water, but not specified by a rating
    { id: "7", label: "Not Water Resistant", value: "not_water_resistant" }, // Indicates the product is not water resistant
];

const warrantyPeriods = [
    { id: "1", label: "6 Months", value: "6_months" },         // 6 months warranty
    { id: "2", label: "1 Year", value: "1_year" },             // 1 year warranty
    { id: "3", label: "2 Years", value: "2_years" },           // 2 years warranty
    { id: "4", label: "3 Years", value: "3_years" },           // 3 years warranty
    { id: "5", label: "5 Years", value: "5_years" },           // 5 years warranty
    { id: "6", label: "Lifetime Warranty", value: "lifetime" }, // Lifetime warranty
    { id: "7", label: "No Warranty", value: "no_warranty" }     // No warranty offered
];

// Option.js
const productColors = [
    { id: 1, value: "red", label: "Red" },
    { id: 2, value: "blue", label: "Blue" },
    { id: 3, value: "green", label: "Green" },
    { id: 4, value: "yellow", label: "Yellow" },
    { id: 5, value: "black", label: "Black" },
    { id: 6, value: "white", label: "White" },
];


export {productColors,productCategory,brandCategory,commonFeatures, commonMaterials,commonCountries,performanceCategories,waterResistanceCategories,warrantyPeriods};

