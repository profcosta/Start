const objetosBons  = [
    "peixe1.webp","peixe2.webp","peixe3.webp"   
]
const objetosMaus = [
    "lixo.webp","saco.png"
]

const jogo = document.getElementById("jogo");
const placar = document.getElementById("placar");
const area = jogo.getBoundingClientRect();
const qtda = 6;
let aresta = 0;
let acertos = 0;

function getObjeto(img,nome,top,left){
    let html="";
    html += `<div class="objeto" id="${nome}"`
    html += `style="`
    html += `top:${top}px;`
    html += `left:${left}px;`
    html += `width:${aresta}px;`
    html += `height:${aresta}px;`
    html += `background: url('img/${img}') no-repeat center;`
    html += `background-size: 100%;`
    html += `" ondragstart="drag(event)"`
    html += `draggable="true">`
    //html += `<img src="img/${img}">`
    html += `</div>`
    return html;
}

function addObjeto (){
    let html="";
    let img= "";
    let nome="";
    let top = 0;
    let left = 0;
    let posicao = Array.from(Array(qtda).keys())
    for (let index = 0; index < qtda; index++) {
        //calulcar o tamanha da imagem
        aresta =  ((area.right - area.left)/qtda)-10
        //código para colocar cada imagem em uma rota
        random = Math.floor(Math.random() * posicao.length);
        left = (posicao[random] * (aresta+10)) + area.left + 5
        posicao.splice(random,1);
        //código para calcular a altura da imagem
        do {
            top = area.top + Math.floor(Math.random() * (area.bottom - area.top - aresta));
        } while (top<area.top && top>=(area.bottom - area.top - aresta));
        //Definir objetos
        if(index>0){
            img = objetosBons[Math.floor(Math.random() * objetosBons.length)] 
            nome="bom"+index
        }else{
            img = objetosMaus[Math.floor(Math.random() * objetosMaus.length)]
            nome="mau"
        }
        html += getObjeto(img,nome,top,left)  
    }
    return html;
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    let data = ev.dataTransfer.getData("Text");
    jogo.removeChild(document.getElementById(data));
    if(data === "mau"){      
        acertos++
        placar.innerHTML = `Acertos: ${acertos}`
        jogo.innerHTML = addObjeto()
    }
    ev.preventDefault();
}

function reset(){
    acertos = 0
    jogo.innerHTML = addObjeto()
    placar.innerHTML = `Acertos: ${acertos}`
}

jogo.innerHTML = addObjeto()
placar.innerHTML = `Acertos: ${acertos}`