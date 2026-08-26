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
