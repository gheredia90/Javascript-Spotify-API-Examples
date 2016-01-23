var API_BASE_URL = 'https://api.spotify.com'

$('.form-horizontal').on('submit', function(event){
	event.preventDefault();

	var data = $('.form-control.inputArtistText').val();
	var search_url = API_BASE_URL + '/v1/search?type=artist&query='
	+ data;

	$.ajax({
        type: "GET",
        url: search_url,
        data: '',
        success: showSearchResults,
        error: handleError,
        dataType: "json"
    });   
});

function showSearchResults (response) {
    var artists = response.artists.items;

    $('.list-group').empty();

    artists.forEach(function(artist, index){
    	addArtist(artist, index);
    });        
}

function handleError (error) {
    console.log(error);
}

function addArtist(artist, index){
	var name = artist.name;
	var image = artist.images[2];
	var id = artist.id;

	if(image){
		$('.list-group').append('<li class="list-group-item"><img src='
		+ image.url + ' height="70">' 
		+ '<p class="artist" data-toggle="modal" id="'
		+ id + '"' + '>'
		+ (index+1) 
		+ ".- " + name	
		+ '</p>'	
		+ '</li>');
	} else {
		$('.list-group').append('<li class="list-group-item">'
		+ '<p class="artist" data-toggle="modal" id="'
		+ id + '"' + '>'
		+ (index+1) + ".- " + name
		+ '</li>');

	}	
}


$( "body" ).on( "click", "p", function() {
    
	var id = $(this).attr('id');
	var albums_url = API_BASE_URL + "/v1/artists/"
	+ id + "/albums";

	$.ajax({
	    type: "GET",
	    url: albums_url,
	    data: '',
	    success: showAlbums,
	    error: handleError,
	    dataType: "json"
	});
});	

function showAlbums (response) {
    var albums =  response.items;
    $('.album-list').empty();

    albums.forEach(function(album, index){
    	addAlbum(album);
    });
    $("#albumsModal").modal();
}

function addAlbum(album){
	var name = album.name;
	$('.album-list').append('<li class="list-album-item" id="'
	+ album.id + '"' + '>'
	+ name + '</li>');		
}

$( "body" ).on( "click", ".list-album-item", function() {
    
	var id = $(this).attr('id');
	var tracks_url = API_BASE_URL + "/v1/albums/"
	+ id + "/tracks";

	$.ajax({
	    type: "GET",
	    url: tracks_url,
	    data: '',
	    success: showTracks,
	    error: handleError,
	    dataType: "json"
	});
});	

function showTracks (response) {
    var tracks =  response.items;
    $('.tracklist').empty();

    tracks.forEach(function(track, index){
    	addTrack(track);
    });
    $("#tracksModal").modal();
}

function addTrack(track){
	var name = track.name;
	$('.tracklist').append('<li class="list-track-item" id="'
	+ track.id + '"' + '>'
	+ name + '</li>');		
}


