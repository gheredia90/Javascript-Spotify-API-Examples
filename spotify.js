var API_URL = 'https://api.spotify.com/v1/search?type=artist&query=';

$('.form-horizontal').on('submit', function(event){
	event.preventDefault();

	var data = $('.form-control.inputArtistText').val();
	var search_url = API_URL + data;

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
		+ image.url + ' height="70">' + " "
		+ (index+1) + ".- " + name
		+ '</li>');
	} else {
		$('.list-group').append('<li class="list-group-item">'
		+ (index+1) + ".- " + name
		+ '</li>');

	}	
}

$('.list-group.item').on('click', function(event){
	event.preventDefault();
	console.log('vamos a llamar de nuevo')

})