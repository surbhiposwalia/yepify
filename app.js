$(function() {
    //console.log(OAuth);
    $('.Search_form').submit(function(event) {
        event.preventDefault();
        var location = $('#location_id').val();
        var cuisine = $('#cuisine_id').val();
        getRequestforlocation(location);

    })

    function getRequestforlocation(location) {
        
        var args = {            
        	dataType:"jsonp",
        	headers: {
        		'user-key': "543058ab4c5e66a635961bce8b4c2089"
        	}
        }
        var url = "https://developers.zomato.com/api/v2.1/locations?query=" + location;
        $.ajax(url, args, function(data) {
            console.log(data);
        })


    }
});
//?location=98052&category_filter=italian
//zomato:543058ab4c5e66a635961bce8b4c2089;

//nstraub