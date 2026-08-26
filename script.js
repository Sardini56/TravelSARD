// ================================
// TravelSARD - Website Functions
// ================================


// -------------------------------
// CURRENCY CONVERTER
// -------------------------------

// Demo exchange rates.
// Later we can connect a real live exchange-rate API.

const rates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.86,
    TRY: 47.5,
    EGP: 56.5
};


function convertCurrency() {

    const amount = Number(
        document.getElementById("amount").value
    );

    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    if (!amount || amount < 0) {
        document.getElementById("result").textContent = "Enter an amount";
        return;
    }

    const result =
        amount / rates[from] * rates[to];

    document.getElementById("result").textContent =
        result.toLocaleString(undefined, {
            maximumFractionDigits: 2
        }) + " " + to;
}


// Swap currencies

function swapCurrency() {

    const from =
        document.getElementById("from");

    const to =
        document.getElementById("to");

    const temporary = from.value;

    from.value = to.value;
    to.value = temporary;

    convertCurrency();
}


// Automatically update converter

document.addEventListener("DOMContentLoaded", function () {

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

});



// -------------------------------
// WISHLIST
// -------------------------------

let wishlist =
    JSON.parse(
        localStorage.getItem("travelSARD_wishlist")
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
            place + " has been added to your wishlist ❤️"
        );

    } else {

        alert(
            place + " is already in your wishlist."
        );
    }
}


function updateWishlist() {

    const container =
        document.getElementById("wishlistContent");

    const savedCounter =
        document.getElementById("saved");

    if (!container) return;


    if (wishlist.length === 0) {

        container.innerHTML =
            "Your wishlist is empty.";

    } else {

        container.innerHTML = "";

        wishlist.forEach(function(place) {

            const item =
                document.createElement("div");

            item.style.padding = "10px";
            item.style.margin = "5px";

            item.innerHTML =
                "❤️ " + place;

            container.appendChild(item);

        });

    }


    if (savedCounter) {

        savedCounter.textContent =
            wishlist.length;

    }

}


document.addEventListener(
    "DOMContentLoaded",
    updateWishlist
);



// -------------------------------
// SEARCH
// -------------------------------

function searchDestination() {

    const input =
        document.getElementById("search");

    const search =
        input.value
            .trim()
            .toLowerCase();


    if (!search) {

        alert(
            "Please enter a country or destination."
        );

        return;
    }


    const destinations = [

        "istanbul",
        "paris",
        "rome",
        "tokyo",
        "berat",
        "kotor",
        "tbilisi"

    ];


    const found =
        destinations.find(function(destination) {

            return destination.includes(search);

        });


    if (found) {

        alert(
            "We found " +
            found.charAt(0).toUpperCase() +
            found.slice(1) +
            " 🌍"
        );

    } else {

        alert(
            "This destination isn't in our first collection yet. More destinations are coming soon!"
        );

    }

}



// -------------------------------
// DARK MODE
// -------------------------------

const darkButton =
    document.getElementById("darkMode");


if (darkButton) {

    darkButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark"
            );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                darkButton.textContent = "☀️";

            } else {

                darkButton.textContent = "🌙";

            }

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

    if (
        !visitedCountries.includes(
            country
        )
    ) {

        visitedCountries.push(
            country
        );

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
        document.getElementById(
            "visited"
        );

    if (counter) {

        counter.textContent =
            visitedCountries.length;

    }

}


document.addEventListener(
    "DOMContentLoaded",
    updateVisitedCounter
);



// -------------------------------
// FEEDBACK
// -------------------------------

function sendFeedback() {

    const feedback =
        document.getElementById(
            "feedback"
        );


    if (!feedback) return;


    const message =
        feedback.value.trim();


    if (!message) {

        alert(
            "Please write some feedback first."
        );

        return;

    }


    alert(
        "Thank you for your feedback! ❤️"
    );


    feedback.value = "";

}
const countries = [
  { name: "Türkiye", flag: "🇹🇷", places: ["Istanbul", "Galata Tower", "Cappadocia"] },
  { name: "Syria", flag: "🇸🇾", places: ["Damascus", "Old Damascus", "Aleppo Citadel"] },
  { name: "Egypt", flag: "🇪🇬", places: ["Cairo", "Pyramids of Giza", "Luxor"] },
  { name: "Jordan", flag: "🇯🇴", places: ["Amman", "Petra", "Wadi Rum"] },
  { name: "United Arab Emirates", flag: "🇦🇪", places: ["Dubai", "Abu Dhabi", "Burj Khalifa"] },
  { name: "Saudi Arabia", flag: "🇸🇦", places: ["Riyadh", "Jeddah", "AlUla"] },
  { name: "Morocco", flag: "🇲🇦", places: ["Marrakesh", "Casablanca", "Chefchaouen"] },
  { name: "Tunisia", flag: "🇹🇳", places: ["Tunis", "Sidi Bou Said", "Djerba"] },
  { name: "Germany", flag: "🇩🇪", places: ["Berlin", "Munich", "Hamburg"] },
  { name: "France", flag: "🇫🇷", places: ["Paris", "Nice", "Lyon"] },
  { name: "Italy", flag: "🇮🇹", places: ["Rome", "Venice", "Milan"] },
  { name: "Spain", flag: "🇪🇸", places: ["Barcelona", "Madrid", "Seville"] },
  { name: "Greece", flag: "🇬🇷", places: ["Athens", "Santorini", "Crete"] },
  { name: "Portugal", flag: "🇵🇹", places: ["Lisbon", "Porto", "Madeira"] },
  { name: "United Kingdom", flag: "🇬🇧", places: ["London", "Edinburgh", "Manchester"] },
  { name: "Netherlands", flag: "🇳🇱", places: ["Amsterdam", "Rotterdam", "Utrecht"] },
  { name: "Switzerland", flag: "🇨🇭", places: ["Zurich", "Geneva", "Interlaken"] },
  { name: "Austria", flag: "🇦🇹", places: ["Vienna", "Salzburg", "Innsbruck"] },
  { name: "Norway", flag: "🇳🇴", places: ["Oslo", "Bergen", "Tromsø"] },
  { name: "Sweden", flag: "🇸🇪", places: ["Stockholm", "Gothenburg", "Malmö"] },
  { name: "Japan", flag: "🇯🇵", places: ["Tokyo", "Kyoto", "Osaka"] },
  { name: "South Korea", flag: "🇰🇷", places: ["Seoul", "Busan", "Jeju"] },
  { name: "China", flag: "🇨🇳", places: ["Beijing", "Shanghai", "Xi'an"] },
  { name: "Thailand", flag: "🇹🇭", places: ["Bangkok", "Phuket", "Chiang Mai"] },
  { name: "Indonesia", flag: "🇮🇩", places: ["Bali", "Jakarta", "Lombok"] },
  { name: "Malaysia", flag: "🇲🇾", places: ["Kuala Lumpur", "Penang", "Langkawi"] },
  { name: "Singapore", flag: "🇸🇬", places: ["Singapore", "Marina Bay", "Sentosa"] },
  { name: "Australia", flag: "🇦🇺", places: ["Sydney", "Melbourne", "Gold Coast"] },
  { name: "United States", flag: "🇺🇸", places: ["New York", "Los Angeles", "Miami"] },
  { name: "Canada", flag: "🇨🇦", places: ["Toronto", "Vancouver", "Montreal"] },
  { name: "Mexico", flag: "🇲🇽", places: ["Mexico City", "Cancún", "Tulum"] },
  { name: "Brazil", flag: "🇧🇷", places: ["Rio de Janeiro", "São Paulo", "Salvador"] },
  { name: "Argentina", flag: "🇦🇷", places: ["Buenos Aires", "Mendoza", "Bariloche"] },
  { name: "South Africa", flag: "🇿🇦", places: ["Cape Town", "Johannesburg", "Durban"] },
  { name: "Kenya", flag: "🇰🇪", places: ["Nairobi", "Mombasa", "Maasai Mara"] },
  { name: "Tanzania", flag: "🇹🇿", places: ["Zanzibar", "Arusha", "Serengeti"] },
  { name: "India", flag: "🇮🇳", places: ["Mumbai", "Delhi", "Jaipur"] },
  { name: "Albania", flag: "🇦🇱", places: ["Tirana", "Berat", "Sarandë"] },
  { name: "Montenegro", flag: "🇲🇪", places: ["Kotor", "Budva", "Podgorica"] },
  { name: "Georgia", flag: "🇬🇪", places: ["Tbilisi", "Batumi", "Kazbegi"] }
];

function displayCountries() {
  const grid = document.getElementById("countryGrid");

  if (!grid) return;

  grid.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");

    card.className = "destination-card";

    card.innerHTML = `
      <div class="card-content">
        <p>${country.flag} ${country.name}</p>
        <h3>${country.places[0]}</h3>
        <p>${country.places.join(" • ")}</p>
        <button onclick="savePlace('${country.name}')">
          ♡ Save
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", displayCountries);
