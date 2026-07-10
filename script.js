/*==================================================
 ADIXION RADIO
 SCRIPT.JS
 PARTE 1
==================================================*/

"use strict";

/*==================================================
ELEMENTOS DEL DOM
==================================================*/

const radioPlayer = document.getElementById("radioPlayer");

const playButton = document.getElementById("playButton");

const stopButton = document.getElementById("stopButton");

const volumeSlider = document.getElementById("volumeSlider");

const coverImage = document.getElementById("coverImage");

const songTitle = document.getElementById("songTitle");

const songArtist = document.getElementById("songArtist");

const streamStatus = document.getElementById("streamStatus");

const equalizer = document.getElementById("equalizer");

const favoriteButton = document.getElementById("favoriteButton");

const copyLinkButton = document.getElementById("copyLinkButton");

const shareButton = document.getElementById("shareButton");

const facebookButton = document.getElementById("facebookButton");

const instagramButton = document.getElementById("instagramButton");

const tiktokButton = document.getElementById("tiktokButton");

const whatsappButton = document.getElementById("whatsappButton");

const floatingWhatsapp = document.getElementById("floatingWhatsapp");

const backToTopButton = document.getElementById("backToTopButton");

const currentYear = document.getElementById("currentYear");


/*==================================================
ESTADO
==================================================*/

let isPlaying = false;

let reconnectTimer = null;


/*==================================================
CONFIGURACIÓN INICIAL
==================================================*/

document.title =
`${CONFIG.stationName} | ${CONFIG.slogan}`;

radioPlayer.src = CONFIG.streamURL;

radioPlayer.volume = CONFIG.player.volume;

coverImage.src = CONFIG.defaultCover;

songTitle.textContent = CONFIG.stationName;

songArtist.textContent = CONFIG.slogan;

currentYear.textContent = new Date().getFullYear();


/*==================================================
REDES SOCIALES
==================================================*/

facebookButton.href = CONFIG.facebook;

instagramButton.href = CONFIG.instagram;

tiktokButton.href = CONFIG.tiktok;

whatsappButton.href = CONFIG.whatsapp;

floatingWhatsapp.href = CONFIG.whatsapp;


/*==================================================
VOLUMEN
==================================================*/

if (CONFIG.player.rememberVolume) {

    const savedVolume = localStorage.getItem("radioVolume");

    if (savedVolume !== null) {

        radioPlayer.volume = Number(savedVolume);

        volumeSlider.value = savedVolume;

    }

}

volumeSlider.addEventListener("input", () => {

    radioPlayer.volume = volumeSlider.value;

    if (CONFIG.player.rememberVolume) {

        localStorage.setItem(
            "radioVolume",
            volumeSlider.value
        );

    }

});


/*==================================================
FUNCIÓN PLAY
==================================================*/

async function playRadio() {

    try {

        await radioPlayer.play();

    } catch (error) {

        console.error(error);

    }

}


/*==================================================
FUNCIÓN PAUSE
==================================================*/

function pauseRadio() {

    radioPlayer.pause();

}


/*==================================================
FUNCIÓN STOP
==================================================*/

function stopRadio() {

    radioPlayer.pause();

    radioPlayer.load();

}


/*==================================================
BOTONES
==================================================*/

playButton.addEventListener("click", () => {

    if (isPlaying) {

        pauseRadio();

    } else {

        playRadio();

    }

});

stopButton.addEventListener("click", stopRadio);

/*==================================================
 ADIXION RADIO
 SCRIPT.JS
 PARTE 2
==================================================*/

/*==================================================
ICONO PLAY
==================================================*/

const playButtonIcon =
playButton.querySelector("i");


/*==================================================
ACTUALIZAR INTERFAZ
==================================================*/

function updatePlayerUI() {

    if (isPlaying) {

        playButtonIcon.classList.remove("fa-play");
        playButtonIcon.classList.add("fa-pause");

        streamStatus.textContent =
        "Transmitiendo en vivo";

        equalizer.classList.add("playing");

    } else {

        playButtonIcon.classList.remove("fa-pause");
        playButtonIcon.classList.add("fa-play");

        streamStatus.textContent =
        "Pausado";

        equalizer.classList.remove("playing");

    }

}


/*==================================================
EVENTOS DEL AUDIO
==================================================*/

radioPlayer.addEventListener("playing", () => {

    isPlaying = true;

    updatePlayerUI();

});

radioPlayer.addEventListener("pause", () => {

    isPlaying = false;

    updatePlayerUI();

});

radioPlayer.addEventListener("waiting", () => {

    streamStatus.textContent =
    "Conectando...";

});

radioPlayer.addEventListener("loadstart", () => {

    streamStatus.textContent =
    "Cargando transmisión...";

});

radioPlayer.addEventListener("stalled", () => {

    streamStatus.textContent =
    "Reconectando...";

});

radioPlayer.addEventListener("error", () => {

    streamStatus.textContent =
    "Error de conexión";

    if (CONFIG.player.reconnect) {

        reconnectStream();

    }

});


/*==================================================
RECONEXIÓN
==================================================*/

function reconnectStream() {

    if (reconnectTimer !== null) {

        return;

    }

    reconnectTimer = setTimeout(() => {

        reconnectTimer = null;

        if (isPlaying) {

            radioPlayer.load();

            playRadio();

        }

    }, CONFIG.player.reconnectDelay);

}


/*==================================================
COPIAR ENLACE
==================================================*/

copyLinkButton.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            window.location.href
        );

        streamStatus.textContent =
        "Enlace copiado";

    } catch {

        streamStatus.textContent =
        "No se pudo copiar";

    }

});


/*==================================================
COMPARTIR
==================================================*/

shareButton.addEventListener("click", async () => {

    const data = {

        title: CONFIG.stationName,

        text: CONFIG.slogan,

        url: window.location.href

    };

    if (navigator.share) {

        try {

            await navigator.share(data);

        } catch {}

    } else {

        copyLinkButton.click();

    }

});


/*==================================================
FAVORITOS
==================================================*/

const favoriteIcon =
favoriteButton.querySelector("i");

function updateFavorite() {

    if (!CONFIG.player.rememberFavorite) {

        return;

    }

    const saved =
    localStorage.getItem("favoriteRadio");

    if (saved === "true") {

        favoriteIcon.classList.remove("fa-regular");
        favoriteIcon.classList.add("fa-solid");

        favoriteButton.classList.add("active");

    } else {

        favoriteIcon.classList.remove("fa-solid");
        favoriteIcon.classList.add("fa-regular");

        favoriteButton.classList.remove("active");

    }

}

updateFavorite();

favoriteButton.addEventListener("click", () => {

    if (!CONFIG.player.rememberFavorite) {

        return;

    }

    const state =
    localStorage.getItem("favoriteRadio") === "true";

    localStorage.setItem(
        "favoriteRadio",
        (!state).toString()
    );

    updateFavorite();

});

/*==================================================
 ADIXION RADIO
 SCRIPT.JS
 PARTE 3
==================================================*/


/*==================================================
 BOTÓN VOLVER ARRIBA
==================================================*/

function toggleBackToTop(){

    if(window.scrollY > 300){

        backToTopButton.classList.add("show");

    }else{

        backToTopButton.classList.remove("show");

    }

}

window.addEventListener("scroll",toggleBackToTop);

backToTopButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*==================================================
 ANIMACIÓN BOTÓN WHATSAPP
==================================================*/

setInterval(()=>{

    floatingWhatsapp.animate(

        [

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(1.15)"

            },

            {

                transform:"scale(1)"

            }

        ],

        {

            duration:900

        }

    );

},12000);


/*==================================================
 ESTADO DE INTERNET
==================================================*/

function updateConnectionStatus(){

    if(navigator.onLine){

        if(!isPlaying){

            streamStatus.textContent="Listo para reproducir";

        }

    }else{

        streamStatus.textContent="Sin conexión a Internet";

    }

}

window.addEventListener(

"online",

updateConnectionStatus

);

window.addEventListener(

"offline",

updateConnectionStatus

);

updateConnectionStatus();


/*==================================================
 ANIMACIÓN DE TARJETAS
==================================================*/

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},

{

threshold:.15

}

);

document.querySelectorAll(

".feature-card,.social-card,.player-card"

)

.forEach(item=>{

observer.observe(item);

});


/*==================================================
 AHORA SUENA
==================================================*/

async function updateNowPlaying(){

    if(!CONFIG.nowPlaying.enabled){

        return;

    }

    try{

        const response = await fetch(

            CONFIG.nowPlaying.endpoint,

            {

                cache:"no-cache"

            }

        );

        const data = await response.json();

        if(data.title){

            songTitle.textContent=data.title;

        }

        if(data.artist){

            songArtist.textContent=data.artist;

        }

        if(data.cover){

            coverImage.src=data.cover;

        }

    }

    catch(error){

        console.log(

            "Now Playing no disponible."

        );

    }

}

if(CONFIG.nowPlaying.enabled){

    updateNowPlaying();

    setInterval(

        updateNowPlaying,

        10000

    );

}


/*==================================================
 SERVICE WORKER
==================================================*/

if(

"serviceWorker" in navigator &&

CONFIG.pwa.enabled

){

window.addEventListener("load",()=>{

navigator.serviceWorker.register(

"./sw.js"

)

.then(()=>{

console.log(

"Service Worker registrado."

);

})

.catch(error=>{

console.error(error);

});

});

}


/*==================================================
 INICIALIZACIÓN
==================================================*/

updatePlayerUI();

console.log(

`${CONFIG.stationName} cargada correctamente.`

);