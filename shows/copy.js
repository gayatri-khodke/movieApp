const arr = ['images/bg1.jpg', 'images/bg2.avif', 'images/bg3.jpg'];
let wrapper1 = document.querySelector('.wraper1');
let i = 0;

setInterval(() => {
    if (i == arr.length) {
        i = 0;
    }
    wrapper1.style.backgroundImage = `url(${arr[i]})`;
    i++;
}, 5000);

let input = document.querySelector('#userinput');
let movies = document.querySelector('.container2');
input.addEventListener('input', getmovie);
let searchimg = document.querySelector('#searchimg');

function getmovie() {
    if (input.value == '') {
        movies.innerHTML = '';
        searchimg.style.display = 'block';
        return;
    }
    fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`)
        .then((result) => result.json())
        .then((result) => {
            searchimg.style.display = 'none';
            showmovies(result);
        })
        .catch((error) => console.error('Error fetching movie data:', error));
}

function showmovies(arr) {
    movies.innerHTML = '';
    arr.forEach((movie) => {
        movies.innerHTML += `
        <div class="movie">
            <div class="main">
                <img class="image" src="${movie.show.image.original}" alt="Movie Poster">
                <div class="infodiv">
                    <h4>Title: <span class="info">${movie.show.genres}</span></h4>
                    <h4>Publish Year: <span class="info">${movie.show.summary}</span></h4>
                </div>
            </div>
            <h3>Title: <span>${movie.show.name}</span></h3>
        </div>`;
    });

    // Add click event listener to each movie item
    document.querySelectorAll('.movie').forEach((item, index) => {
        item.addEventListener('click', () => {
            // Get the selected movie object
            const selectedMovie = arr[index].show;

            // Store the selected movie object in localStorage
            localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));

            // Redirect to show.html
            window.location.href = 'show.html';
        });
    });
}
