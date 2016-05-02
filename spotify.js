$(document).ready(function(){
	
	var trackRanges = {};
	trackRanges['2000'] = "5XRHXcP9IhpggqWTJN0h6M";
 
    function getSpotifyData(albumId){
        var track = undefined;
		$("#trackContainer").html('');
        $.getJSON( "https://api.spotify.com/v1/album/"+albumId, {format: "jsonp"}, function( data ) {
            //console.log(data);
            var trackData = data.tracks.items;
            for (var trackInfo in trackData) { 
                $("#trackContainer").append('<div class="col-sm-6 col-md-4"><div class="thumbnail"><img data-value="'+trackData[trackInfo].id+'" src="" alt="..."><div class="caption"><h3>'+trackData[trackInfo].name+'</h3><p><span class="btn btn-primary" data-preview="'+trackData[trackInfo].preview_url+'" role="button">Preview</span></p></div></div></div>');
				getArtwork(trackData[trackInfo].id);
                //getArtwork(trackData[trackInfo].id);
            }
            playPreview(track);
        });
    }
	
    function getArtwork(trackid){
        $.getJSON("https://api.spotify.com/v1/tracks/"+trackid, function(res){
            $.getJSON("https://api.spotify.com/v1/artists/"+res.artists[0].id, function(artistData){
                var holder = $("[data-value='" + trackid +"']"); 
				holder.attr("src", artistData.images[0].url);
            });
           
        });
    }
 
 	var audio = new Audio();
	
    function playPreview(url){
		
		audio.pause();
        audio.setAttribute("src",url);
		
		audio.play();
    }
 
    getSpotifyData('5XRHXcP9IhpggqWTJN0h6M');
	
	$(document).on('click','.btn',function(){
    	playPreview($(this).attr("data-preview"));
	});
	
	$(document).keypress(function(e) {
    if(e.which == 13) {
		if(trackRanges[$("#inputbox").val()] != undefined){
			e.preventDefault();
        	getSpotifyData(trackRanges[$("#inputbox").val()]);
		}else
			alert("No data for this years");
    }
	});
});