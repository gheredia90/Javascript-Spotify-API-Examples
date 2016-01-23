var API_BASE_URL = 'https://api.spotify.com'

$('.form-horizontal').on('submit', function(event){
	event.preventDefault();

	var data = $('.form-control.inputArtistText').val();
	var searchUrl = API_BASE_URL + '/v1/search?type=artist&query='
	+ data;

	$.ajax({
        type: "GET",
        url: searchUrl,
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
	var albumsUrl = API_BASE_URL + "/v1/artists/"
	+ id + "/albums";

	$.ajax({
	    type: "GET",
	    url: albumsUrl,
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
	var tracksUrl = API_BASE_URL + "/v1/albums/"
	+ id + "/tracks";

	$.ajax({
	    type: "GET",
	    url: tracksUrl,
	    data: '',
	    success: showTracks,
	    error: handleError,
	    dataType: "json"
	});
});	

function showTracks (response) {
    var tracks =  response.items;
    $('.tracklist').empty();
    $

    tracks.forEach(function(track, index){
    	addTrack(track);
    });
    $("#tracksModal").modal();
}

function addTrack(track){
	var name = track.name;
	var trackUrl = track.preview_url;
	$('.tracklist').append('<li class="list-track-item" id="'
	+ track.id + '"' + '>'
	+ '<a href="' + trackUrl 
	+ 'target="blank"' + '>'	
	+ name + '</a>' + '</li>');		
}


