var default_video = "videos/dogs.mp4";
var cat_video = "videos/cats.mp4";

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
    video.autoplay();
    video.muted();

}

function changeChannel(){
    loadAnotherVideo();
}


$( document ).ready(function() {
    $("#channel-up").click(function(){
        changeChannel();
    })
    $("#channel-down").click(function(){
        changeChannel();
    })
})