$(function(){
    $('#searchForm #searchInput').on('keyup', function(ev){
        var searchText = $('#searchInput').val();
        getSearchMovies(searchText);
    });

    function getSearchMovies(searchText = "a"){
        $.ajax({
            url: " http://api.themoviedb.org/3/search/movie?api_key=373f333eb25d568d2a803ea7d3afb176&query=" + searchText, 
            type: "GET",
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
                  <a href="#" class="btn btn-primary btn-sm">More Details</a>
                </div>
                </div>
            </div>
            `;
        });

        $("#movies").html(output); 
        initPagination();
        console.log(searchRes);
    }  

});