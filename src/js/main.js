$(function(){
    $('#searchForm #searchInput').on('keyup', function(ev){
        var searchText = $('#searchInput').val();
        getSearchMovies(searchText);
    });

    function getSearchMovies(searchText = "a"){
        $.ajax({
            url: "http://api.themoviedb.org/3/search/movie?api_key=373f333eb25d568d2a803ea7d3afb176&query=" + searchText, 
            type: "GET",
            beforeSend: function(){
                $("#movies").html('<div class="loader mr-auto ml-auto mb-5 spinner-border text-danger"></div>'); 
            },
            success: function(response){
                displayMovies(response);
            }
        }); 
        
    }

    getSearchMovies(); 

    function displayMovies(response){
        var searchRes = response.results;
        var output =  '';

        $.each(searchRes, function(index, movie){
            output += `
            <div class="col-md-3">
            <div class="card bg-dark mb-3 item">
                <img class="card-img-top" src=" http://image.tmdb.org/t/p/w185/${movie.poster_path}">
                <div class="card-body">
                  <h4 class="card-title text-white">${movie.title}</h4>
                  <a href="#" data-id="${movie.id}" class="btn btn-primary btn-sm btn-details">More Details</a>
                </div>
                </div>
            </div>
            `;
        });

        $("#movies").html(output); 
        initPagination();
      
        $('.btn-details').click(function(ev){ 
            ev.preventDefault();
            var movieId = $(this).attr("data-id");
            setMovieId(movieId);
        }); 
    }  

    function setMovieId(id){
        sessionStorage.setItem("movieId", id);
        window.location.href = "movie.html";
        return true;
    }

    function getMovie(){
        var movieID = sessionStorage.getItem("movieId");

        $.ajax({
            url: "http://api.themoviedb.org/3/movie/"+ movieID +"?api_key=373f333eb25d568d2a803ea7d3afb176&language=en-US",
            type: "GET",
            success: function(response){
                displaySpecificMovie(response);
            } 
        });
    }

    function displaySpecificMovie(movie){
        var genres = "";
    
        $.each(movie.genres, function(index, value){
            genres += value.name + ", ";
        })
        
        var template = `
        <div class="row mt-5">
            <div class="col-md-4">
                <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="movie" id="img-movie">
            </div>
            <div class="col-md-8">
                <h1 class="text-white mb-4">${movie.title}</h1>
                <ul class="list-group">
                    <li class="list-group-item mb-2 movie-details">Genres: <span>${genres}</span></li>
                    <li class="list-group-item mb-2 movie-details">Tagline: <span>${movie.tagline}</span></li>
                    <li class="list-group-item mb-2 movie-details">Status: <span>${movie.status}</span></li>
                    <li class="list-group-item mb-2 movie-details">Popularity: <span>${movie.popularity}</span></li>
                    <li class="list-group-item mb-2 movie-details">Vote Average: <span>${movie.vote_average}</span></li>
                    <li class="list-group-item mb-2 movie-details">Budget: <span>${movie.budget.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span></li>
                    <li class="list-group-item mb-2 movie-details">Revenue: <span>${movie.revenue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span></li>
                </ul>
            </div>
        </div>  

        <div class="row mt-4">
            <div class="col-md-4 pr-logo p-4">
                <h3 class="text-center text-white mb-4">${movie.production_companies[0].name}</h3>
                <img id="com-logo" alt="movie" id="img-movie">
            </div>
            <div class="col-md-8"> 
                <div class="overview"> 
                    <h3 class="text-white">Overview</h3>
                    <p class="muted-white">${movie.overview}</p>
                </div> 
            </div>
        </div>

        <div class="row mt-4">
            <button class="btn btn-warning btn-responsive" onclick="history.back()">Back to Search</button>
        </div>
        `;

        $(".movie").html(template);

        if(!movie.production_companies[0].logo_path === null){
            $('#com-logo').attr("src", `http://image.tmdb.org/t/p/w185/${movie.production_companies[0].logo_path}`);
        }else{
            $('#com-logo').attr("src", `build/images/no_image.png`); 
        }
    }    
    
    getMovie();

});