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
  {
    name: "Türkiye",
    flag: "🇹🇷",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
    places: ["Istanbul", "Galata Tower", "Cappadocia"]
  },
  {
    name: "Syria",
    flag: "🇸🇾",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1000&q=80",
    places: ["Damascus", "Old Damascus", "Aleppo Citadel"]
  },
  {
    name: "Egypt",
    flag: "🇪🇬",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80",
    places: ["Cairo", "Pyramids of Giza", "Luxor"]
  },
  {
    name: "Jordan",
    flag: "🇯🇴",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1000&q=80",
    places: ["Petra", "Amman", "Wadi Rum"]
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    places: ["Dubai", "Abu Dhabi", "Burj Khalifa"]
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=80",
    places: ["Riyadh", "Jeddah", "AlUla"]
  },
  {
    name: "Morocco",
    flag: "🇲🇦",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
    places: ["Marrakesh", "Chefchaouen", "Casablanca"]
  },
  {
    name: "Tunisia",
    flag: "🇹🇳",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=80",
    places: ["Tunis", "Sidi Bou Said", "Djerba"]
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80",
    places: ["Berlin", "Munich", "Hamburg"]
  },
  {
    name: "France",
    flag: "🇫🇷",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    places: ["Paris", "Nice", "Lyon"]
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=80",
    places: ["Rome", "Venice", "Milan"]
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80",
    places: ["Barcelona", "Madrid", "Seville"]
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1000&q=80",
    places: ["Athens", "Santorini", "Crete"]
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=80",
    places: ["Lisbon", "Porto", "Madeira"]
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
    places: ["London", "Edinburgh", "Manchester"]
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1000&q=80",
    places: ["Amsterdam", "Rotterdam", "Utrecht"]
  },
  {
    name: "Switzerland",
    flag: "🇨🇭",
    image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1000&q=80",
    places: ["Zurich", "Geneva", "Interlaken"]
  },
  {
    name: "Austria",
    flag: "🇦🇹",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80",
    places: ["Vienna", "Salzburg", "Innsbruck"]
  },
  {
    name: "Norway",
    flag: "🇳🇴",
    image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1000&q=80",
    places: ["Oslo", "Bergen", "Tromsø"]
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1000&q=80",
    places: ["Stockholm", "Gothenburg", "Malmö"]
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    places: ["Tokyo", "Kyoto", "Osaka"]
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    image: "https://images.unsplash.com/photo-1538485399081-7c897c1d4f5c?auto=format&fit=crop&w=1000&q=80",
    places: ["Seoul", "Busan", "Jeju"]
  },
  {
    name: "China",
    flag: "🇨🇳",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80",
    places: ["Beijing", "Shanghai", "Xi'an"]
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80",
    places: ["Bangkok", "Phuket", "Chiang Mai"]
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    places: ["Bali", "Jakarta", "Lombok"]
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
    places: ["Kuala Lumpur", "Penang", "Langkawi"]
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",
    places: ["Singapore", "Marina Bay", "Sentosa"]
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d5?auto=format&fit=crop&w=1000&q=80",
    places: ["Sydney", "Melbourne", "Gold Coast"]
  },
  {
    name: "United States",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1000&q=80",
    places: ["New York", "Los Angeles", "Miami"]
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1000&q=80",
    places: ["Toronto", "Vancouver", "Montreal"]
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1000&q=80",
    places: ["Mexico City", "Cancún", "Tulum"]
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80",
    places: ["Rio de Janeiro", "São Paulo", "Salvador"]
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1000&q=80",
    places: ["Buenos Aires", "Mendoza", "Bariloche"]
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=80",
    places: ["Cape Town", "Johannesburg", "Durban"]
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
    places: ["Nairobi", "Mombasa", "Maasai Mara"]
  },
  {
    name: "Tanzania",
    flag: "🇹🇿",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
    places: ["Zanzibar", "Arusha", "Serengeti"]
  },
  {
    name: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
    places: ["Mumbai", "Delhi", "Jaipur"]
  },
  {
    name: "Albania",
    flag: "🇦🇱",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    places: ["Tirana", "Berat", "Sarandë"]
  },
  {
    name: "Montenegro",
    flag: "🇲🇪",
    image: "https://images.unsplash.com/photo-1600850056064-a8b380df8395?auto=format&fit=crop&w=1000&q=80",
    places: ["Kotor", "Budva", "Podgorica"]
  },
  {
    name: "Georgia",
    flag: "🇬🇪",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=1000&q=80",
    places: ["Tbilisi", "Batumi", "Kazbegi"]
  }
];

function displayCountries() {
  const grid = document.getElementById("countryGrid");

  if (!grid) return;

  grid.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");

    card.className = "destination-card";

    card.innerHTML = `
      <img
        src="${country.image}"
        alt="${country.name}"
        loading="lazy"
        style="width:100%; height:220px; object-fit:cover; border-radius:16px 16px 0 0;"
      >

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
