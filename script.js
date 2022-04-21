var default_video = "videos/dogs.mp4";
var current = "dogs";
var cat_video = "videos/cats.mp4";
var default_region ="europe-north1";
var uswest1 = "us-west1";
var europe_north1 = "europe-north1";
var europe_south2 = "europe-south2";

var url = original_url + "&current=" + current;
function loadAnotherVideo(response) {
    var context_change = response['broadcast'];
    console.log("Backend response took: " +response["backend_took"]);
    var video = document.getElementsByTagName('video')[0];
    var sources = video.getElementsByTagName('source');
    sources[0].src = "videos/"+context_change+".mp4";
    current = context_change;
    url = original_url + "&current=" + context_change;
    video.load();
    video.play();
}
function selectUrl(region){
    if (region == europe_north1){
        original_url = region_north;
        url = original_url + "&current=" + current;
    }else if (region == uswest1){
        original_url = region_us;
        url = original_url + "&current=" + current;
    }else{
        original_url = region_south;
        url = original_url + "&current=" + current;
    }
}

function changeChannel(){
    var t0 = performance.now();
    var t1 = 0;
    var details = {
        'client_id': apikey,
        'client_secret': apisecret
    }
    var oauth_body = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        oauth_body.push(encodedKey + "=" + encodedValue);
    }
    oauth_body = oauth_body.join("&");
    
    fetch(url_oauth,{
        method: "POST",
        // mode: "no-cors",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        body: oauth_body
    })
    .then(response => response.json())
    .then(result => { 
        console.log('Success:', result['access_token']);
        fetch(url,{
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": "Bearer "+ result['access_token']
            }
        })
            .then(response => response.json())
            .then(data => {             
                    loadAnotherVideo(data);
                    t1 = performance.now();
                    console.log(t0);
                    console.log(t1);
                    if((Math.round((t1-t0)))/1000 > 0.5){
                        $("#timer").text("⏱️ Time roundtrip: " + (Math.round((t1-t0)))/1000 + " seconds.");
                        document.getElementById("timer").style.color = "red";
                    }else{
                        $("#timer").text("⏱️ Time roundtrip: " + (Math.round((t1-t0)))/1000 + " seconds.");
                    }
                    
                })                  
            .catch(function(error) {
                alert(error);
            });
    })
    .catch(function(error) {
        alert(error);
    });
    
}

$(document).ready(function() {
    $("#channel-up").click(function(){
        changeChannel();
    })
    $("#channel-down").click(function(){
        changeChannel();
    })
    $(".dropdown-menu").on("click", "li",function(event){
        $("#region-header").text(event.target.text);
        $("#region-ex-header").text(event.target.getAttribute("region"));
        selectUrl(event.target.getAttribute("region"));       

    })
})