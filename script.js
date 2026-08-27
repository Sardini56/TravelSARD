// TravelSARD - Website Functions
// ================================


// -------------------------------
// LANGUAGE
// -------------------------------

let currentLanguage =
    localStorage.getItem("travelSARD_language") || "en";

const translations = {

    en: {
        searchPlaceholder: "Search country or destination...",
        searchButton: "Search",
        save: "♡ Save",
        saved: "♥ Saved",
        wishlistEmpty: "Your wishlist is empty.",
        amount: "Enter an amount",
        searchEmpty: "Please enter a country or destination.",
        nothingFound: "❌ No country or destination found.",
        searchResults: "🌍 Search results:",
        added: "has been added to your wishlist ❤️",
        alreadySaved: "is already in your wishlist.",
        feedbackEmpty: "Please write some feedback first.",
        feedbackThanks: "Thank you for your feedback! ❤️"
    },

    de: {
        searchPlaceholder: "Land oder Reiseziel suchen...",
        searchButton: "Suchen",
        save: "♡ Speichern",
        saved: "♥ Gespeichert",
        wishlistEmpty: "Deine Wunschliste ist leer.",
        amount: "Betrag eingeben",
        searchEmpty: "Bitte gib ein Land oder Reiseziel ein.",
        nothingFound: "❌ Kein Land oder Reiseziel gefunden.",
        searchResults: "🌍 Suchergebnisse:",
        added: "wurde zur Wunschliste hinzugefügt ❤️",
        alreadySaved: "ist bereits auf deiner Wunschliste.",
        feedbackEmpty: "Bitte schreibe zuerst ein Feedback.",
        feedbackThanks: "Danke für dein Feedback! ❤️"
    }

};

function t(key) {
    return translations[currentLanguage][key] || key;
}


// -------------------------------
// LANGUAGE SELECTOR
// -------------------------------

function setupLanguageSelector() {

    let selector =
        document.getElementById("languageSelector");

    if (!selector) {

        selector =
            document.createElement("select");

        selector.id = "languageSelector";

        selector.innerHTML = `
            <option value="en">🇬🇧 English</option>
            <option value="de">🇩🇪 Deutsch</option>
        `;

        selector.value = currentLanguage;

        selector.style.position = "fixed";
        selector.style.top = "20px";
        selector.style.right = "20px";
        selector.style.zIndex = "9999";
        selector.style.padding = "8px 12px";
        selector.style.borderRadius = "10px";
        selector.style.border = "1px solid #ddd";
        selector.style.background = "white";
        selector.style.cursor = "pointer";

        document.body.appendChild(selector);
    }

    selector.value = currentLanguage;

    selector.addEventListener("change", function() {

        currentLanguage = selector.value;

        localStorage.setItem(
            "travelSARD_language",
            currentLanguage
        );

        applyLanguage();

        displayCountries();
        updateWishlist();

    });
}


// -------------------------------
// APPLY LANGUAGE
// -------------------------------

function applyLanguage() {

    const search =
        document.getElementById("search");

    if (search) {
        search.placeholder =
            t("searchPlaceholder");
    }

    const searchButton =
        document.querySelector(
            '[onclick="searchDestination()"]'
        );

    if (searchButton) {
        searchButton.textContent =
            t("searchButton");
    }

    document.documentElement.lang =
        currentLanguage;
}


// -------------------------------
// CURRENCY CONVERTER
// -------------------------------

const rates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.86,
    TRY: 47.5,
    EGP: 56.5
};

function convertCurrency() {

    const amountInput =
        document.getElementById("amount");

    const fromInput =
        document.getElementById("from");

    const toInput =
        document.getElementById("to");

    const result =
        document.getElementById("result");

    if (
        !amountInput ||
        !fromInput ||
        !toInput ||
        !result
    ) return;

    const amount =
        Number(amountInput.value);

    const from =
        fromInput.value;

    const to =
        toInput.value;

    if (!amount || amount < 0) {

        result.textContent =
            currentLanguage === "de"
                ? "Betrag eingeben"
                : "Enter an amount";

        return;
    }

    const converted =
        amount / rates[from] * rates[to];

    result.textContent =
        converted.toLocaleString(undefined, {
            maximumFractionDigits: 2
        }) + " " + to;
}


function swapCurrency() {

    const from =
        document.getElementById("from");

    const to =
        document.getElementById("to");

    if (!from || !to) return;

    const temp =
        from.value;

    from.value =
        to.value;

    to.value =
        temp;

    convertCurrency();
}


// -------------------------------
// WISHLIST
// -------------------------------

let wishlist =
    JSON.parse(
        localStorage.getItem(
            "travelSARD_wishlist"
        )
    ) || [];


function savePlace(place) {

    if (!wishlist.includes(place)) {

        wishlist.push(place);

        localStorage.setItem(
            "travelSARD_wishlist",
            JSON.stringify(wishlist)
        );

        updateWishlist();

        alert(
            place +
            " " +
            t("added")
        );

    } else {

        alert(
            place +
            " " +
            t("alreadySaved")
        );
    }
}


function updateWishlist() {

    const container =
        document.getElementById(
            "wishlistContent"
        );

    const savedCounter =
        document.getElementById(
            "saved"
        );

    if (!container) return;

    if (wishlist.length === 0) {

        container.textContent =
            t("wishlistEmpty");

    } else {

        container.innerHTML = "";

        wishlist.forEach(function(place) {

            const item =
                document.createElement("div");

            item.style.padding = "10px";
            item.style.margin = "5px";

            item.textContent =
                "❤️ " + place;

            container.appendChild(item);
        });
    }

    if (savedCounter) {

        savedCounter.textContent =
            wishlist.length;
    }
}


// -------------------------------
// COUNTRIES
// -------------------------------

const countries = [

    {
        name: "Türkiye",
        english: "Türkiye",
        german: "Türkei",
        flag: "🇹🇷",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
        places: ["Istanbul", "Galata Tower", "Cappadocia"]
    },

    {
        name: "Syria",
        english: "Syria",
        german: "Syrien",
        flag: "🇸🇾",
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1000&q=80",
        places: ["Damascus", "Old Damascus", "Aleppo Citadel"]
    },

    {
        name: "Egypt",
        english: "Egypt",
        german: "Ägypten",
        flag: "🇪🇬",
        image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80",
        places: ["Cairo", "Pyramids of Giza", "Luxor"]
    },

    {
        name: "Jordan",
        english: "Jordan",
        german: "Jordanien",
        flag: "🇯🇴",
        image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1000&q=80",
        places: ["Petra", "Amman", "Wadi Rum"]
    },

    {
        name: "United Arab Emirates",
        english: "United Arab Emirates",
        german: "Vereinigte Arabische Emirate",
        flag: "🇦🇪",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
        places: ["Dubai", "Abu Dhabi", "Burj Khalifa"]
    },

    {
        name: "Saudi Arabia",
        english: "Saudi Arabia",
        german: "Saudi-Arabien",
        flag: "🇸🇦",
        image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=80",
        places: ["Riyadh", "Jeddah", "AlUla"]
    },

    {
        name: "Morocco",
        english: "Morocco",
        german: "Marokko",
        flag: "🇲🇦",
        image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
        places: ["Marrakesh", "Chefchaouen", "Casablanca"]
    },

    {
        name: "Tunisia",
        english: "Tunisia",
        german: "Tunesien",
        flag: "🇹🇳",
        image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=80",
        places: ["Tunis", "Sidi Bou Said", "Djerba"]
    },

    {
        name: "Germany",
        english: "Germany",
        german: "Deutschland",
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80",
        places: ["Berlin", "Munich", "Hamburg"]
    },

    {
        name: "France",
        english: "France",
        german: "Frankreich",
        flag: "🇫🇷",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
        places: ["Paris", "Nice", "Lyon"]
    },

    {
        name: "Italy",
        english: "Italy",
        german: "Italien",
        flag: "🇮🇹",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=80",
        places: ["Rome", "Venice", "Milan"]
    },

    {
        name: "Spain",
        english: "Spain",
        german: "Spanien",
        flag: "🇪🇸",
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80",
        places: ["Barcelona", "Madrid", "Seville"]
    },

    {
        name: "Greece",
        english: "Greece",
        german: "Griechenland",
        flag: "🇬🇷",
        image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1000&q=80",
        places: ["Athens", "Santorini", "Crete"]
    },

    {
        name: "Portugal",
        english: "Portugal",
        german: "Portugal",
        flag: "🇵🇹",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=80",
        places: ["Lisbon", "Porto", "Madeira"]
    },

    {
        name: "United Kingdom",
        english: "United Kingdom",
        german: "Vereinigtes Königreich",
        flag: "🇬🇧",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
        places: ["London", "Edinburgh", "Manchester"]
    },

    {
        name: "Netherlands",
        english: "Netherlands",
        german: "Niederlande",
        flag: "🇳🇱",
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1000&q=80",
        places: ["Amsterdam", "Rotterdam", "Utrecht"]
    },

    {
        name: "Switzerland",
        english: "Switzerland",
        german: "Schweiz",
        flag: "🇨🇭",
        image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1000&q=80",
        places: ["Zurich", "Geneva", "Interlaken"]
    },

    {
        name: "Austria",
        english: "Austria",
        german: "Österreich",
        flag: "🇦🇹",
        image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80",
        places: ["Vienna", "Salzburg", "Innsbruck"]
    },

    {
        name: "Norway",
        english: "Norway",
        german: "Norwegen",
        flag: "🇳🇴",
        image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1000&q=80",
        places: ["Oslo", "Bergen", "Tromsø"]
    },

    {
        name: "Sweden",
        english: "Sweden",
        german: "Schweden",
        flag: "🇸🇪",
        image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1000&q=80",
        places: ["Stockholm", "Gothenburg", "Malmö"]
    },

    {
        name: "Japan",
        english: "Japan",
        german: "Japan",
        flag: "🇯🇵",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
        places: ["Tokyo", "Kyoto", "Osaka"]
    },

    {
        name: "South Korea",
        english: "South Korea",
        german: "Südkorea",
        flag: "🇰🇷",
        image: "https://images.unsplash.com/photo-1538485399081-7c897c1d4f5c?auto=format&fit=crop&w=1000&q=80",
        places: ["Seoul", "Busan", "Jeju"]
    },

    {
        name: "China",
        english: "China",
        german: "China",
        flag: "🇨🇳",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80",
        places: ["Beijing", "Shanghai", "Xi'an"]
    },

    {
        name: "Thailand",
        english: "Thailand",
        german: "Thailand",
        flag: "🇹🇭",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80",
        places: ["Bangkok", "Phuket", "Chiang Mai"]
    },

    {
        name: "Indonesia",
        english: "Indonesia",
        german: "Indonesien",
        flag: "🇮🇩",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
        places: ["Bali", "Jakarta", "Lombok"]
    },

    {
        name: "Malaysia",
        english: "Malaysia",
        german: "Malaysia",
        flag: "🇲🇾",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
        places: ["Kuala Lumpur", "Penang", "Langkawi"]
    },

    {
        name: "Singapore",
        english: "Singapore",
        german: "Singapur",
        flag: "🇸🇬",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",
        places: ["Singapore", "Marina Bay", "Sentosa"]
    },

    {
        name: "Australia",
        english: "Australia",
        german: "Australien",
        flag: "🇦🇺",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d5?auto=format&fit=crop&w=1000&q=80",
        places: ["Sydney", "Melbourne", "Gold Coast"]
    },

    {
        name: "United States",
        english: "United States",
        german: "Vereinigte Staaten",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1000&q=80",
        places: ["New York", "Los Angeles", "Miami"]
    },

    {
        name: "Canada",
        english: "Canada",
        german: "Kanada",
        flag: "🇨🇦",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1000&q=80",
        places: ["Toronto", "Vancouver", "Montreal"]
    },

    {
        name: "Mexico",
        english: "Mexico",
        german: "Mexiko",
        flag: "🇲🇽",
        image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1000&q=80",
        places: ["Mexico City", "Cancún", "Tulum"]
    },

    {
        name: "Brazil",
        english: "Brazil",
        german: "Brasilien",
        flag: "🇧🇷",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80",
        places: ["Rio de Janeiro", "São Paulo", "Salvador"]
    },

    {
        name: "Argentina",
        english: "Argentina",
        german: "Argentinien",
        flag: "🇦🇷",
        image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1000&q=80",
        places: ["Buenos Aires", "Mendoza", "Bariloche"]
    },

    {
        name: "South Africa",
        english: "South Africa",
        german: "Südafrika",
        flag: "🇿🇦",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=80",
        places: ["Cape Town", "Johannesburg", "Durban"]
    },

    {
        name: "Kenya",
        english: "Kenya",
        german: "Kenia",
        flag: "🇰🇪",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
        places: ["Nairobi", "Mombasa", "Maasai Mara"]
    },

    {
        name: "Tanzania",
        english: "Tanzania",
        german: "Tansania",
        flag: "🇹🇿",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
        places: ["Zanzibar", "Arusha", "Serengeti"]
    },

    {
        name: "India",
        english: "India",
        german: "Indien",
        flag: "🇮🇳",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
        places: ["Mumbai", "Delhi", "Jaipur"]
    },

    {
        name: "Albania",
        english: "Albania",
        german: "Albanien",
        flag: "🇦🇱",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
        places: ["Tirana", "Berat", "Sarandë"]
    },

    {
        name: "Montenegro",
        english: "Montenegro",
        german: "Montenegro",
        flag: "🇲🇪",
        image: "https://images.unsplash.com/photo-1600850056064-a8b380df8395?auto=format&fit=crop&w=1000&q=80",
        places: ["Kotor", "Budva", "Podgorica"]
    },

    {
        name: "Georgia",
        english: "Georgia",
        german: "Georgien",
        flag: "🇬🇪",
        image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=1000&q=80",
        places: ["Tbilisi", "Batumi", "Kazbegi"]
    }

];


// -------------------------------
// DISPLAY COUNTRIES
// -------------------------------

function displayCountries() {

    const grid =
        document.getElementById("countryGrid");

    if (!grid) return;

    grid.innerHTML = "";

    countries.forEach(function(country) {

        const card =
            document.createElement("div");

        card.className =
            "destination-card";

        const countryName =
            currentLanguage === "de"
                ? country.german
                : country.english;

        card.innerHTML = `

            <img
                src="${country.image}"
                alt="${countryName}"
                loading="lazy"
                style="width:100%; height:220px; object-fit:cover; border-radius:16px 16px 0 0;"
            >

            <div class="card-content">

                <p>
                    ${country.flag}
                    ${countryName}
                </p>

                <h3>
                    ${country.places[0]}
                </h3>

                <p>
                    ${country.places.join(" • ")}
                </p>

                <button
                    onclick="savePlace('${countryName}')"
                >
                    ${t("save")}
                </button>

            </div>
        `;

        grid.appendChild(card);
    });
}


// -------------------------------
// SEARCH
// -------------------------------

function searchDestination() {

    const input =
        document.getElementById("search");

    if (!input) return;

    const search =
        input.value.trim().toLowerCase();

    if (search === "") {

        alert(t("searchEmpty"));

        return;
    }

    const results = [];

    countries.forEach(function(country) {

        const englishName =
            country.english.toLowerCase();

        const germanName =
            country.german.toLowerCase();

        if (
            englishName.includes(search) ||
            germanName.includes(search)
        ) {

            results.push(
                country.flag +
                " " +
                (currentLanguage === "de"
                    ? country.german
                    : country.english)
            );
        }

        country.places.forEach(function(place) {

            if (
                place.toLowerCase().includes(search)
            ) {

                results.push(
                    country.flag +
                    " " +
                    place +
                    " — " +
                    (currentLanguage === "de"
                        ? country.german
                        : country.english)
                );

            }

        });

    });

    if (results.length > 0) {

        alert(
            t("searchResults") +
            "\n\n" +
            results.slice(0, 10).join("\n")
        );

    } else {

        alert(t("nothingFound"));
    }
}


// -------------------------------
// DARK MODE
// -------------------------------

function setupDarkMode() {

    const darkButton =
        document.getElementById("darkMode");

    if (!darkButton) return;

    darkButton.addEventListener(
        "click",
        function() {

            document.body.classList.toggle("dark");

            darkButton.textContent =
                document.body.classList.contains("dark")
                    ? "☀️"
                    : "🌙";

        }
    );
}


// -------------------------------
// MY TRAVELS
// -------------------------------

let visitedCountries =
    JSON.parse(
        localStorage.getItem(
            "travelSARD_visited"
        )
    ) || [];


function addVisitedCountry(country) {

    if (!visitedCountries.includes(country)) {

        visitedCountries.push(country);

        localStorage.setItem(
            "travelSARD_visited",
            JSON.stringify(
                visitedCountries
            )
        );

        updateVisitedCounter();
    }
}


function updateVisitedCounter() {

    const counter =
        document.getElementById("visited");

    if (counter) {

        counter.textContent =
            visitedCountries.length;
    }
}


// -------------------------------
// FEEDBACK
// -------------------------------

function sendFeedback() {

    const feedback =
        document.getElementById("feedback");

    if (!feedback) return;

    const message =
        feedback.value.trim();

    if (!message) {

        alert(t("feedbackEmpty"));

        return;
    }

    alert(t("feedbackThanks"));

    feedback.value = "";
}


// -------------------------------
// START WEBSITE
// -------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupLanguageSelector();

        applyLanguage();

        displayCountries();

        updateWishlist();

        updateVisitedCounter();

        setupDarkMode();


        const amount =
            document.getElementById("amount");

        const from =
            document.getElementById("from");

        const to =
            document.getElementById("to");


        if (amount && from && to) {

            amount.addEventListener(
                "input",
                convertCurrency
            );

            from.addEventListener(
                "change",
                convertCurrency
            );

            to.addEventListener(
                "change",
                convertCurrency
            );

            convertCurrency();
        }

    }
);
