const html = document.querySelector("html")
const enfoque = document.querySelector(".app__card-button--enfoque")
const descansoCorto = document.querySelector(".app__card-button--corto")
const descansoLargo = document.querySelector(".app__card-button--largo")
const titulo = document.querySelector(".app__title")
const imagen = document.querySelector(".app__image")
const botones = document.querySelectorAll(".app__card-button")
const InputEnfoqueMusica  = document.querySelector("#alternar-musica")
const btnIniciarPausar = document.querySelector("#start-pause")
const txtIniciarPausar = document.querySelector("#start-pause span")
const imgIniciarPausar = document.querySelector(".app__card-primary-butto-icon")
const musica = new Audio("./sonidos/luna-rise-part-one.mp3")
const sonPlay = new Audio("./sonidos/play.wav")
const pause = new Audio("./sonidos/pause.mp3")
const beep = new Audio("./sonidos/beep.mp3")
const tiempoEnPantalla = document.querySelector("#timer")
musica.loop = true
let segundos = 1500
let idInterval = null


InputEnfoqueMusica.addEventListener("change",function(){
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})


enfoque.addEventListener("click",function(){
    cambiarContexto("enfoque")
    enfoque.classList.add("active")
    segundos = 1500
    mostrarTiempoEnPantalla()
})

descansoCorto.addEventListener("click",function(){
    cambiarContexto("descanso-corto")
    descansoCorto.classList.add("active")
    segundos = 900
    mostrarTiempoEnPantalla()
})

descansoLargo.addEventListener("click",function(){
    cambiarContexto("descanso-largo")
    descansoLargo.classList.add("active")
    segundos = 300
    mostrarTiempoEnPantalla()
})





//Funciones para cambio de imagenes y colores en la interfaz
function cambiarContexto(contexto){
    botones.forEach((boton)=>{
        boton.classList.remove("active")
    })

    html.setAttribute("data-contexto",contexto)
    switch(contexto){
        case "enfoque":
            titulo.innerHTML= `<h1 class="app__title">
                Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            </h1>`
        break; 

        case "descanso-corto":
            titulo.innerHTML= `<h1 class="app__title">
                Que tal tomar un respiro,<br>
                <strong class="app__title-strong">Haz una pausa corta.</strong>
            </h1>`
        break;

        case "descanso-largo":
            titulo.innerHTML= `<h1 class="app__title">
                Hora de volver a la superficie<br>
                <strong class="app__title-strong">Haz una pausa larga.</strong>
            </h1>` 
        break; 

        default:
            titulo.innerHTML= `<h1 class="app__title">
                Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            </h1>`
    }

    imagen.setAttribute("src",`/imagenes/${contexto}.png`)
}


//Funciones para el cronometro
btnIniciarPausar.addEventListener("click", IniciarPausar)

function IniciarPausar(){
    if(idInterval){
        pause.play()
        reiniciar()
        txtIniciarPausar.textContent = "comenzar"
        imgIniciarPausar.setAttribute("src","/imagenes/play_arrow.png")
    }else{
        sonPlay.play()
        idInterval = setInterval(cuentaRegresiva,1000)
        txtIniciarPausar.textContent = "pausar"
        imgIniciarPausar.setAttribute("src","/imagenes/pause.png")
    }
}

function cuentaRegresiva(){
    segundos --
    mostrarTiempoEnPantalla()
    if(segundos <= 0){
        reiniciar()
        console.log("Intervalo detenido")
        beep.play()
        segundos = 5
        return
    }
}

function reiniciar(){
    clearInterval(idInterval)
    idInterval = null 
}

function mostrarTiempoEnPantalla(){
    const tiempo = new Date(segundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempoEnPantalla()
