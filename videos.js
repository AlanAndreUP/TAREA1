
import { createClient } from 'pexels';

const client = createClient('dyAhsVvYIcZ4oF4ZbuK2j8yNKkCN6S7IQXlByfbUhXEJ7oGt7oQnFWjg'); 

const params = {
    per_page: 10, 
};


const allVideos = [];


client.videos.popular(params)
    .then(videos => {
        // Verifica si se encontraron videos populares
        if (videos.length > 0) {
            const video = videos[0]; // Obtiene el primer video popular
            const videoUrl = video.video_files[0].link; // Obtiene la URL del video

            // Crea un elemento de video y lo agrega al contenedor
            const videoElement = document.createElement('video');
            videoElement.controls = true;
            const sourceElement = document.createElement('source');
            sourceElement.src = videoUrl;
            sourceElement.type = 'video/mp4';
            videoElement.appendChild(sourceElement);

            videoContainer.appendChild(videoElement);
        } else {
            console.error('No se encontraron videos populares.');
        }
    })
    .catch(error => {
        console.error('Error al obtener videos populares:', error);
    });

function loadMoreVideos() {
    const videoContainer = document.getElementById('video-container');
    const allVideosCombined = [...allVideos];

    allVideosCombined.forEach(videoData => {
        const newVideo = document.createElement('div');
        newVideo.className = 'post';
        newVideo.innerHTML = `
            <!-- Código HTML para mostrar un video -->
            <h3>${videoData.title}</h3>
            <video controls>
                <source src="${videoData.videoUrl}" type="video/mp4">
            </video>
            <div class="video-info">
                <span>Likes: ${videoData.likes}</span>
                <span>Comments: ${videoData.comments}</span>
            </div>
        `;
        videoContainer.appendChild(newVideo);
    });
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100) {
        loadMoreVideos();
    }
});
