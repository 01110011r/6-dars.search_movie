const block = document.querySelector('.block');

const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');

console.log(searchInput.value);

const myKey = '23f5bd2c22d9227192b02969c459d0fa';



const imgStart = 'https://image.tmdb.org/t/p/w500';


let url = 'https://api.themoviedb.org/3/discover/movie?api_key=23f5bd2c22d9227192b02969c459d0fa';


const fragment = document.createDocumentFragment();


async function fetchData() {



    if (!searchInput.value) {
        url = 'https://api.themoviedb.org/3/discover/movie?api_key=23f5bd2c22d9227192b02969c459d0fa';
    } else {
        url = `https://api.themoviedb.org/3/search/movie?api_key=23f5bd2c22d9227192b02969c459d0fa&query=${searchInput.value}`;

    }
    block.innerHTML = '';

    try {
        const response = await fetch(url);
        const data = await response.json();

        data.results.map((movie) => {


            const item = document.createElement('div');
            item.classList.add('block__item');
            fragment.appendChild(item);



            const img = document.createElement('img');
            img.classList.add('item__img')
            img.src = `${imgStart}${movie.backdrop_path}`
            item.appendChild(img);


            const Name = document.createElement('h2');
            Name.classList.add('item__name');
            item.appendChild(Name);
            Name.textContent = movie.title;


            const textBox = document.createElement('div');
            textBox.classList.add('text-box');
            item.appendChild(textBox);

            console.log(movie);



            const date = document.createElement('span');
            textBox.appendChild(date);
            date.textContent = 'Date: ' + movie.release_date + ';';


            const lenguage = document.createElement('span');
            textBox.appendChild(lenguage);
            lenguage.textContent = 'Lenguage: ' + movie.original_language + ';';

            const voteAverage = document.createElement('span');
            textBox.appendChild(voteAverage);
            voteAverage.textContent = 'Average: ' + movie.vote_average + ';';


            if (movie.vote_average <= 5) {
                voteAverage.style.color = 'red';
            } else if (movie.vote_average <= 8) { voteAverage.style.color = 'indigo'; } else { voteAverage.style.color = 'blue'; }



            const overview = document.createElement('div');
            overview.classList.add('view-text');
            item.appendChild(overview);
            overview.innerHTML = `<p>${movie.overview}</p>`



            const openBtn = document.createElement('button');
            openBtn.textContent = 'Overview';
            openBtn.style.background = 'black';
            openBtn.style.color = 'white';
            openBtn.style.cursor = 'pointer';
            openBtn.style.padding = '2px 7px';
            openBtn.style.zIndex = '2';
            openBtn.style.margin = '20px';
            item.appendChild(openBtn);


            openBtn.addEventListener('click', () => {
                overview.classList.toggle('view-for');
            })








        })

    } catch (error) {
        console.log(error);
    }
    block.appendChild(fragment);
}

fetchData();

searchBtn.addEventListener('click', () => {
    fetchData();
})