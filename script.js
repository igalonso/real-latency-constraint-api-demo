//import { defaultIp, apikey} from './variables.js';
var default_video = "videos/dogs.mp4";
var cat_video = "videos/cats.mp4";
var default_region ="europe-north1";
var uswest1 = "us-west1";
var europe_north1 = "europe-north1";
var europe_south2 = "europe-south2";

var url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey;
function loadAnotherVideo() {
    var video = document.getElementsByTagName('video')[0];
    var sources = video.getElementsByTagName('source');
    if(sources[0].src.includes(default_video)){
        sources[0].src = cat_video;
    }else{
        sources[0].src = default_video;
    }
    video.load();
    video.play();

}
function selectUrl(region){
    if (region == europe_north1){
        defaultIp = "34.149.217.17";
        url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey;
    }else if (region == uswest1){
        defaultIp = "34.149.217.17";
        url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey;
    }else{
        defaultIp = "34.149.217.17";
        url = "https://"+defaultIp+".nip.io/v1/channel?apikey="+apikey;
    }
}

function changeChannel(){
        fetch(url,{
            mode: 'no-cors'
        })
            .then(response => {
                if(response){
                    loadAnotherVideo();
                }else{
                    throw "Invalid response "+response.status;
                }
            })
            .catch(error => {
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