var auth = {
    // Update with your auth tokens.
    //
    consumerKey: "U0Psqj5u7EEkFsnudiJ4YQ",
    consumerSecret: "r0jdXot1Zk4e5DJdM0oyHteehoM",
    accessToken: "vBOaROMUUiDe-CtiHxeZKcorsIJlhQ5N",
    accessTokenSecret: "YrFftp5gmkVHgGZL78o2dhAgNMo",
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
}

var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};

var parameters = [];
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


var loc;
var terms;

$(function() {
    $('.Search_form').submit(function(event) {
        event.preventDefault();
        loc = $('#location_id').val();
        terms = $('#cuisine_id').val();
       fetchResults(loc, terms);
    });
});


function fetchResults(loc, terms) {
    parameters.push(['terms', terms]);
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

function cb(data) {
    console.log(data.businesses);
    displayResults(data.businesses);
}
function displayResults(data){
  $.each(data,function(index,value){
    var name=value.name;
    var address=value.location.address[0];
    var review_count=value.review_count;
    var image=value.image_url;
    var rating_image=value.rating_img_url;
    $('#display').append("<p class=restauraunts> Name:<b>"+name+"</b><br><img src="+image+">Address: "+address+"<br>Review Count:"+review_count+"<img src="+rating_image+"> </p>")
  });



}


//value.location.name
//value.location.rating,review_count, 
//rating_img_url







