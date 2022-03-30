// Required by Webpack - do not touch
require.context('../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import 'bootstrap'

import { movies } from './movies'

for (let m of movies) {
    let m_thumb = document.getElementById('m' + m.id)
    m_thumb.innerHTML = `
        <img src="${m.poster}" alt="${m.tilte}" class="img-thumbnail"/>
     `
    m_thumb.onclick = function () {
        displayMovie(m)
    }

    let featured_movie = document.querySelector(".featured")
    function displayMovie(movie){
        featured_movie.innerHTML = `
        <div class="card">
          <div class="card-header">${movie.title}</div>
          <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title"><small>${movie.year}, ${movie.genre}</small></h5>
            <p class="card-text">${movie.plot}</p>
          </div>
          <div class="card-footer text-muted">
            <div class="row row-col-3">
              <div class="col"><strong>${movie.rating}</strong></div>
              <div class="col"><strong>${movie.rated}</strong></div>
              <div class="col"><strong>${movie.votes}</strong></div>
            </div>
          </div>
        </div>
        `
        function searchMovies(event){
            event.preventDefault()

            let input = document.querySelector('[type="search"]').value || ""
            let count = 0 
            for(let m of movies){
                if(m.title.toUpperCase().indexOf(input.toUpperCase()) == -1){
                    document.querySelector(`#m${m.id}`).classList.add('d-none')
                } else{
                    document.querySelector(`#m${m.id}`).classList.remove('d-none')
                    count++
                }
            }

            featured_movie.innerHTML = count == 0 ? 'Nothing was found' : ''
        }
        
        document.querySelector("button").onclick = searchMovies
        document.querySelector('[type="search"]').onclick = searchMovies
        document.querySelector("form").onsubmit = searchMovies

    }

}
