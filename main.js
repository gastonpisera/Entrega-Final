let resultados = [];

// Storage

let resultadosStorage = localStorage.getItem("resultados") === null ? [] : JSON.parse(localStorage.getItem("resultados"))

const inputJugador1 = document.getElementById("jugador1");
const inputJugador2 = document.getElementById("jugador2");

const jugarBtn = document.getElementById("btnJugar");
const terminarBtn = document.getElementById("btnTerminar");


const select1 = document.getElementById("seleccionJugador1");
const select2 = document.getElementById("seleccionJugador2");

const feedbackMessage = document.getElementById("feedbackMessage");
const podioContainer = document.getElementById("podio");

const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const getPodio = () => {
   const podio = {}
    resultadosStorage.forEach((resultado) => {
        const resultadoParseado = resultado.toLowerCase();
        if(podio[resultadoParseado]){
            podio[resultadoParseado] = podio[resultadoParseado] + 1
        } else {
            podio[resultadoParseado] = 1
        }
    })

    const arrayPodio = Object.entries(podio);

    arrayPodio.sort((a, b) => b[1] - a[1]);

    podioContainer.innerHTML = arrayPodio.map((resultado, index) => `<li> ${index + 1} - ${capitalizeWord(resultado[0])} (${resultado[1]})</li>`).join("");
}

getPodio();

const validateInputs = () => {
    if(inputJugador1.value === "") {
        feedbackMessage.textContent = "Debe ingresar un nombre para jugador1"
        feedbackMessage.style.color = "red"
        return false
    }
    if(inputJugador2.value === "") {
        feedbackMessage.textContent = "Debe ingresar un nombre para jugador2"
        feedbackMessage.style.color = "red"
        return false
    }
    if(seleccionJugador1.value === "") {
        feedbackMessage.textContent = `Debe seleccionar una opción para ${inputJugador1.value}`
        feedbackMessage.style.color = "red"
        return false
    }
    if(seleccionJugador2.value === "") {
        feedbackMessage.textContent = `Debe seleccionar una opción para ${inputJugador2.value}`
        feedbackMessage.style.color = "red"
        return false
    }
    feedbackMessage.textContent = ""
    return true
}

const determinarGanador = (seleccionJugador1, seleccionJugador2) => {
    if (seleccionJugador1 === seleccionJugador2){
        return "Empate";
    } else if (
        (seleccionJugador1 === "1" && seleccionJugador2 === "3") ||
        (seleccionJugador1 === "2" && seleccionJugador2 === "1") ||
        (seleccionJugador1 === "3" && seleccionJugador2 === "2")
    ){
        return inputJugador1.value;
    }else {
        return inputJugador2.value;
    }
}

const obtenerGanador = () =>{
    const ganaJugador1 = resultados.filter(resultado => resultado === inputJugador1.value).length > resultados.filter(resultado => resultado === inputJugador2.value).length  
    const empate = resultados.filter(resultado => resultado === inputJugador1.value).length === resultados.filter(resultado => resultado === inputJugador2.value).length  
    if (empate) return "La partida es un empate"
    if (ganaJugador1){
        return `El ganador es ${inputJugador1.value}!`

    } else {
        return `El ganador es ${inputJugador2.value}!`
    } 
    
}

// Eventos

jugarBtn.addEventListener("click", () => {
    if(!validateInputs()) return
    
    const ganador = determinarGanador(select1.value, select2.value)
    
    if(ganador !== "Empate"){
        resultados.push(ganador)
    }
});

terminarBtn.addEventListener("click", () => {
    if(resultados.length === 0) {
        feedbackMessage.textContent = "Debe jugar al menos una vez"
        feedbackMessage.style.color = "red"
        return
    }

    resultadosStorage = [...resultadosStorage, ...resultados];
    // Storage
    localStorage.setItem("resultados", JSON.stringify(resultadosStorage))
   
    const ganador = obtenerGanador()

    getPodio();

    feedbackMessage.textContent = ganador
    feedbackMessage.style.color = "green"
    resultados = []
    inputJugador1.value = ""
    inputJugador2.value = ""
    select1.value = ""
    select2.value = ""
});

const app = document.getElementById('app');

fetch('/lista.json').then((response) => {
    console.log(response)
    return response.json()
}).then((data) => {
    console.log([...data, ...array]);
})
.catch((error) => {
    console.log(error)
});

// const getData = async () => {
//     try {
//         const response = await fetch('./lista.json');
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }

// getData();

array.forEach((item) => {
  const div = document.createElement('div');
  div.innerHTML = item;
  app.appendChild(div);
});