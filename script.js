//import { defaultIp, apikey} from './variables.js';
var default_video = "videos/dogs.mp4";
var current = "dogs";
var cat_video = "videos/cats.mp4";
var default_region ="europe-north1";
var uswest1 = "us-west1";
var europe_north1 = "europe-north1";
var europe_south2 = "europe-south2";

var url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey;
function loadAnotherVideo(response) {

    var video = document.getElementsByTagName('video')[0];
    var sources = video.getElementsByTagName('source');
    if(sources[0].src.includes(default_video)){
    sources[0].src = cat_video;
    current ="cats";
    url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey+"&current="+current;
    }else{
    sources[0].src = default_video;
    current = "dogs";
    url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey+"&current="+current;
    }
    video.load();
    video.play();

}
function selectUrl(region){
    if (region == europe_north1){
        defaultIp = "34.149.217.17";
        url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey+"&current="+current;
    }else if (region == uswest1){
        defaultIp = "34.149.217.17";
        url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey+"&current="+current;
    }else{
        defaultIp = "34.149.217.17";
        url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey+"&current="+current;
    }
}

function changeChannel(){
    var t0 = performance.now();
    var t1 = 0;
        fetch(url,{
            method: "GET",
            mode: "no-cors"
        })
            .then(response => {
                response.text().then(function(result){                    
                    loadAnotherVideo(result);
                    t1 = performance.now();
                    console.log(t0);
                    console.log(t1);
                    $("#timer").text("Time roundtrip: " + (Math.round((t1-t0)))/1000 + " seconds.");
                    
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