//valores setados
const dimensaoX = 12
const dimensaoY = 4
let matriz = Array.from({ length: dimensaoY }, () => Array.from({length: dimensaoX}, (_, i) => i + 1))
let jogo = criarDificuldade()

//constates de tela
const quadro = document.getElementById("quadro")
const dimensaoQuadro = quadro.getBoundingClientRect();
const acoes = document.getElementById("acoes")
const dimensaoAcoes = acoes.getBoundingClientRect()

function criarDificuldade(){
    return Array.from({length: 4}, (_, i) => i + 1)
}

function povoarQuadro(){
    let altura = dimensaoQuadro.height - 10
    let largura = dimensaoQuadro.width - 10
    
    let y = altura/matriz.length
    let x = largura/matriz[0].length
    

    let html = ""
    matriz.forEach((elemento) =>{
        html+=`<div class="linha">`
        elemento.forEach((valor) => {
            html+=`<div class="celula" style="width:${x}px;height:${y}px;">`
            html+=`<div class="grade" ondragstart="drag(event)" draggable="true">`
            html+=`<div class="img"`
            html+=` style="background: url('img/${valor}.png') no-repeat center;`
            html+=` background-size: 75%;"`
            //html += ` ondragstart="drag(event)"`
            //html += ` draggable="true"`
            html+=` >`
            html+=`</div>`
            html+=`</div>`
            html+=`</div>`
        })
        html+=`</div>`
    })
    
    return html
}

quadro.innerHTML = povoarQuadro()




function montarAcoes(){
    let html = ""


    jogo.forEach((valor)=>{
        html+=`<div class="quadrado" ondrop="drop(event)" ondragover="allowDrop(event)">`
        html+=`</div>`
    })
    return html;
}

acoes.innerHTML = montarAcoes()
