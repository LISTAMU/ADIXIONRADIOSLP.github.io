/*======================================
 ADIXION RADIO
 NOW PLAYING
======================================*/

const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const albumCover = document.getElementById("album-cover");

/*
 Cambia esta URL cuando tengas el endpoint
 de tu estación de Zeno.

 Ejemplo:
 https://zenoplay.zenomedia.com/api/zenofm/nowplaying/XXXXXXXX
*/

const NOW_PLAYING_URL = "";


/*==========================
Actualizar información
==========================*/

async function updateNowPlaying(){

    if(NOW_PLAYING_URL === ""){

        songTitle.textContent = "Adixion Radio";

        songArtist.textContent = "La que te eleva";

        return;

    }

    try{

        const response = await fetch(NOW_PLAYING_URL);

        const data = await response.json();

        if(data){

            songTitle.textContent =
            data.title || "Adixion Radio";

            songArtist.textContent =
            data.artist || "En Vivo";

            if(data.art){

                albumCover.src = data.art;

            }

        }

    }catch(e){

        console.log(e);

    }

}

updateNowPlaying();

setInterval(updateNowPlaying,10000);