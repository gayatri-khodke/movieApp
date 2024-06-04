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


let array = [];
let input = document.querySelector('#userinput');
let wraper2 = document.querySelector('.wraper2');
input.addEventListener('input', getmovie);
let moviesli = document.querySelector('.moviesli');
let home = document.querySelector('.home');
let searchdiv = document.querySelector('.searchdiv');
let searchimg = document.querySelector('#searchimg');
let movies = document.querySelector('.container2');

moviesli.addEventListener('click', showsearch);
home.addEventListener('click', showhome);

function showsearch() {
    searchdiv.style.display = 'block';
    searchimg.style.display = 'block';
}

function showhome() {
    searchdiv.style.display = 'none';
    searchimg.style.display = 'none';
}
function getmovie() {
    if (input.value == '') {
        wraper2.innerHTML = '';
        searchimg.style.display = 'block';
        return;
    }
    fetch(`http://www.omdbapi.com/?t=${input.value}&apikey=cfb385fe`)
        .then((result) => result.json())
        .then((result) => {
            if (result.Title) {
                searchimg.style.display = 'none';
                let obj = {
                    poster: result.Poster,
                    title: result.Title,
                    writer: result.Writer,
                    publish: result.Year,
                    language: result.Language,
                };
                array.push(obj);
                displayMovie(result);
                showmovies(array);
                console.log(array);
            } else {
                searchimg.style.display = 'block';
                wraper2.innerHTML = '';
            }
        })
        .catch((error) => console.error('Error fetching movie data:', error));
}

function displayMovie(movie) {
    wraper2.innerHTML = `
    <div class='displaymovie'>
        <div class="movieimg">
            <img src="${movie.Poster}" alt="Movie Poster">
        </div>
        <div class="movieinfo">
            <h3>Title: ${movie.Title}</h3>
            <h4>Writer: ${movie.Writer}</h4>
            <h4>Publish Year: ${movie.Year}</h4>
            <h4>Language: ${movie.Language}</h4>
        </div>
    </div>`;
}

function showmovies(arr){
    movies.innerHTML = ''; 
    arr.forEach((movie) =>{
        movies.innerHTML += `
        <div class="movie">
            <div class="main">
                <img class="image" src="${movie.poster} " alt="Movie Poster">
                <div class="infodiv">
                    <h4>Title: <span class="info">${movie.title}</span></h4>
                    <h4>Director: <span class="info">${movie.writer}</span></h4>
                    <h4>Publish Year: <span class="info">${movie.publish}</span></h4>
                    <h4>Language: <span class="info">${movie.language}</span></h4>
                </div>
            </div>
            <h3>Title: <span>${movie.title}</span></h3>
        </div>`;
    });
}
