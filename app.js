//$(function() {
//    //console.log(OAuth);
//    $('.Search_form').submit(function(event) {
//        event.preventDefault();
//        var location = $('#location_id').val();
//        var cuisine = $('#cuisine_id').val();
//        getRequestforlocation(location);
//
//    })
//
//    function getRequestforlocation(location) {
//        
//        var args = {            
//        	dataType:"jsonp",
//        	headers: {
//        		'user-key': "543058ab4c5e66a635961bce8b4c2089"
//        	}
//        }
//        var url = "https://developers.zomato.com/api/v2.1/locations?query=" + location;
//        $.ajax(url, args, function(data) {
//            console.log(data);
//        })
//
//
//    }
//});
//?location=98052&category_filter=italian
//zomato:543058ab4c5e66a635961bce8b4c2089;

//nstraub
//Rich's below
function cb(data) {        

}

var auth = {
  // Update with your auth tokens.
  //
  consumerKey : "U0Psqj5u7EEkFsnudiJ4YQ",
  consumerSecret : "r0jdXot1Zk4e5DJdM0oyHteehoM",
  accessToken : "vBOaROMUUiDe-CtiHxeZKcorsIJlhQ5N",
  accessTokenSecret : "YrFftp5gmkVHgGZL78o2dhAgNMo",
  serviceProvider : {
      signatureMethod : "HMAC-SHA1"
  }
};

var terms = 'food';
var near = 'San+Francisco,CA';

var accessor = {
  consumerSecret : auth.consumerSecret,
  tokenSecret : auth.accessTokenSecret
};

var parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
  'action' : 'https://api.yelp.com/v2/search',
  'method' : 'GET',
  'parameters' : parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
        
$.ajax({
  'url' : message.action,
  'data' : parameterMap,
  'dataType' : 'jsonp',
  'jsonpCallback' : 'cb',
  'cache': true
})
  .done(function(data, textStatus, jqXHR) {
    console.dir(data);
  })

  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
  }
);
