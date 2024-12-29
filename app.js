async function fetchMovies() {
    const searchQuery = document.getElementById("search-bar").value.trim();

    if (!searchQuery) {
        alert("Please enter a movie name!");
        return;
    }

    const apiKey = "b8f0b5e"; 
    const apiUrl = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            alert(`API Error: ${data.Error}`);
            document.getElementById("movie-list").innerHTML = ""; 
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        alert("Failed to fetch movies. Please check your API key or try again later.");
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = ""; 
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;

        movieList.appendChild(movieCard);
    });
}
