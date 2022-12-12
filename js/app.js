let movie
fetch("./backend/getMovie.php")
    .then(response => response.json())
    .then(data => {
        movie = data
        document.querySelector('#moviePlot').innerText = movie.plot
        document.querySelector('#movieGenres').innerText = movie.genres.join(', ')
        document.querySelector('#movieReleaseDate').innerText = movie.release_date
        document.querySelector('#movieProductionCompanies').innerText = movie.production_companies.join(', ')
        document.querySelector('#loadingGif').style.display = 'none'
    })
    .catch(error => console.log("Si è verificato un errore!"))

fetch("./backend/moviesList.php")
    .then(response => response.json())
    .then(data => {
        data.forEach(m => {
            var option = document.createElement('option')
            option.value = m;
            document.querySelector("#movies").appendChild(option)
        })
    })
    .catch(error => console.log("Si è verificato un errore!"))


document.querySelector('#attemptForm').onsubmit = (e) => {
    e.preventDefault()
    let msg
    const inputField = document.querySelector("#movieTitle")
    attempt = inputField.value.toLowerCase().trim()
    if (attempt === movie.title.toLowerCase()) {
        msg = "Indovinato"
        location.reload()
    } else {
        msg = "Sbagliato"
        inputField.value = ''
    }
    alert(msg)
}

document.querySelector('#skip').onclick = (e) => {
    e.preventDefault()
    window.location.reload() 
}

document.querySelector('#surrender').onclick = (e) => {
    e.preventDefault()
    alert(movie.title)
    window.location.reload()
}