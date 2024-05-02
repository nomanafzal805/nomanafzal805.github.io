document.addEventListener("DOMContentLoaded", function () {
    const newJokeBtn = document.getElementById("newJokeBtn");
    const jokesContainer = document.getElementById("jokesContainer");

    newJokeBtn.addEventListener("click", fetchRandomJoke);

    function fetchRandomJoke() {
        // Clear previous jokes
        jokesContainer.innerHTML = "";

        // Fetch a random joke from the API
        fetch("https://icanhazdadjoke.com/", {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch joke.");
                }
                return response.json();
            })
            .then(data => {
                // Display the fetched joke
                const jokeText = data.joke;
                jokesContainer.innerHTML = `<p>${jokeText}</p>`;
            })
            .catch(error => {
                console.error("Error fetching joke:", error);
                // Display an error message
                jokesContainer.innerHTML = `<p>Failed to fetch joke. Please try again later.</p>`;
            });
    }
});
