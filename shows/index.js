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

let k=document.getElementById
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
        console.log(movie);
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <div class="main">
               <a href='show.html' target='_blank'><img class="image" src="${movie.show.image.original}" alt="Movie Poster"></a>
                <a href="show.html"><div class="infodiv">
                    <h4>Title: <span class="info">${movie.show.genres}</span></h4>
                    <h4>Type: <span class="info">${movie.show.type}</span></h4>
                    <h4>Type: <span class="info">${movie.show.language}</span></h4>
                    <h4>Publish Summary: <span class="info">${movie.show.summary}</span></h4>
                </div></a>
            </div>
            <h3>Title: <span>${movie.show.name}</span></h3>
        `;
        // add click event listener to each movie div
        movieDiv.addEventListener('click', () => {
            localStorage.setItem('seriesName', movie.show.name);
        });
        movies.appendChild(movieDiv);
    });
}







// window.location.href = 'show.html';
// it used to rediract to new page 