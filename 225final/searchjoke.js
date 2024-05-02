document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchTermInput = document.getElementById("searchTerm");
    const jokesContainer = document.getElementById("jokesContainer");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchTerm = searchTermInput.value.trim();
        if (searchTerm !== "") {
            searchJokes(searchTerm);
        }
    });

    function searchJokes(searchTerm) {
        // Clear previous search results
        jokesContainer.innerHTML = "";

        // Fetch jokes based on search term
        fetch(`https://icanhazdadjoke.com/search?term=${encodeURIComponent(searchTerm)}`, {
            headers: { "Accept": "application/json" }
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function (data) {
            if (data.results.length === 0) {
                // Display message if no jokes found
                jokesContainer.innerHTML = "<p>No jokes found. Try a different search term.</p>";
            } else {
                // Display search results
                data.results.forEach(function (joke) {
                    const jokeElement = document.createElement("p");
                    jokeElement.textContent = joke.joke;
                    jokesContainer.appendChild(jokeElement);
                });
            }
        })
        .catch(function (error) {
            console.error("Error searching for jokes:", error);
            // Display error message
            jokesContainer.innerHTML = "<p>Failed to search for jokes. Please try again later.</p>";
        });
    }
});
