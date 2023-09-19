let video = document.querySelectorAll("video")
video.forEach(video => {
    let playPromise = video.play()
    if(playPromise !== undefined) {
        playPromise.then(() => {
            let observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    video.muted = false
                    if(entry.intersectionRatio !== 1 && !video.paused){
                        video.pause()
                    } else if (entry.intersectionRatio > 0.4 && video.paused) {
                        video.play()
                    }
                })
            }, {threshold: 0.5})
            observer.observe(video)
        })
    }
})


function toggleLinks() {
    var links = document.querySelectorAll('.linkss');
    links.forEach(function(link) {
        link.classList.toggle('show');
    });
    var buttons = document.querySelectorAll('.botoness');
    buttons.forEach(function(button) {
        button.style.display = 'none';
    });
}