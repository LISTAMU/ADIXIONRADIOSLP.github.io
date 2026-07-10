/*==================================================
 ADIXION RADIO
 CONFIG.JS
==================================================*/

const CONFIG = {

    /*==================================
      INFORMACIÓN GENERAL
    ==================================*/

    stationName: "Adixion Radio",

    slogan: "La que te eleva",

    description:
        "La mejor música las 24 horas del día.",


    /*==================================
      STREAM
    ==================================*/

    streamURL:
        "https://stream.zeno.fm/wkvvwgdcnwqvv.m3u",


    /*==================================
      PORTADAS
    ==================================*/

    defaultCover:
        "assets/default-cover.png",

    logo:
        "assets/logo.png",

    favicon:
        "assets/favicon.png",


    /*==================================
      REDES SOCIALES
    ==================================*/

    facebook:
        "https://facebook.com/",

    instagram:
        "https://instagram.com/",

    tiktok:
        "https://tiktok.com/@",

    whatsapp:
        "https://wa.me/5210000000000",


    /*==================================
      CONTACTO
    ==================================*/

    email:
        "",

    website:
        "",


    /*==================================
      TEMA
    ==================================*/

    theme:{

        primary:"#00B8FF",

        secondary:"#007DFF",

        background:"#050816",

        success:"#25D366",

        danger:"#ff2f52",

        text:"#FFFFFF",

        textSecondary:"#B8DFFF"

    },


    /*==================================
      REPRODUCTOR
    ==================================*/

    player:{

        volume:1,

        autoPlay:false,

        rememberVolume:true,

        rememberFavorite:true,

        reconnect:true,

        reconnectDelay:5000

    },


    /*==================================
      AHORA SUENA
      (Lo activaremos después)
    ==================================*/

    nowPlaying:{

        enabled:false,

        endpoint:""

    },



    /*==================================
      PWA
    ==================================*/

    pwa:{

        enabled:true,

        appName:"Adixion Radio"

    }

};