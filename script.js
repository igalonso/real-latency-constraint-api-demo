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
        fetch(url,{
            method: "GET",
            mode: "cors"
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