
var loc;
var terms;
var resloc = [];

var auth = {
    consumerKey: "yZMgw_ThLcLxA-BgPk050g",
    consumerSecret: "CToTvHpVsBM68s23cwnRjA8r_Ik",
    accessToken: "XrYZbw2x2Mn-dR5UDxHSyppPjt-8WMYX",
    accessTokenSecret: "x6k0k9x2VxqztHyYzKKvf3t1Ecw",
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
}

var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};

$(function() {
    $('.Search_form').submit(function(event) {
        event.preventDefault();
        loc = $('#location_id').val();
        terms = $('#cuisine_id').val();
        fetchResults(loc, terms);
        $('#map').hide();
    });
    $('#cuisine_id').change(function(event) {
        event.preventDefault();
        loc = $('#location_id').val();
        terms = $('#cuisine_id').val();
        $('#map').hide();
        if(loc != ""){
            fetchResults(loc, terms);
        }
    })
    
});

$('#map').hide();
function fetchResults(loc, terms) {
    var parameters = [];
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
    parameters.push(['category_filter', terms]);
    parameters.push(['location', loc]);

    var message = {
        'action': 'https://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'cache': true
    })
}

function res_loc(latitude, longitude,name) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
}

function cb(data) {
    displayResults(data.businesses);
}


function displayResults(data) {
    $('#display').empty();
    resloc.length = 0;
    $.each(data, function(index, value) {
        var lat = value.location.coordinate.latitude;
        var long = value.location.coordinate.longitude;
        var name = value.name;
        var tempLocation = new res_loc(lat, long,name);
        resloc.push(tempLocation);
        var address = value.location.address[0];
        var review_count = value.review_count;
        var image = value.image_url;
        var rating_image = value.rating_img_url;
        $('#display').append("<p class='restaurants'><img class='restaurantImg' src=" + image + "><br> Name:  " + name + "<br>Address:  " + address + "<br>Review Count:  " + review_count + "    <img src=" + rating_image + "></p>")
    });
}

$(document).on('mouseenter','p',function(){
    var i = $('.restaurants').index(this);
    $('#map').show();
    initMap(resloc[i].latitude,resloc[i].longitude,resloc[i].name);    
})
var map;

function initMap(lat,lng,name) {
    var myLatLng = { lat, lng };
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 13
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: name
    });
}

