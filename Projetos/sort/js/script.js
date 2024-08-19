valores = [];
atual = -1;
ativo = -1;
time = 0;

function createArray(){
	tamanho = document.getElementById("tamanho").value;
	
	atual = -1;
	ativo = -1;
	valores = [];

	if (tamanho < 3){
		output.innerHTML=msgError();
		return;	
	}

	for (var i = 0; i < tamanho; i++){
        valores.push(Math.floor(Math.random() * (tamanho * 2)));
    }

	paint();
}

function paint(){
	tamanho = valores.length;
	width = 1098/tamanho;
	resultado = "";
	output = document.getElementById("output");
	mostrar = document.getElementById("mostrar");

	for (var i = 0; i < tamanho; i++){
		height = (498 * valores[i])/(tamanho*2);
		margin_top = 498 - height;
       	resultado+=viewDiv(i,mostrar.checked);
    } 

    output.innerHTML = resultado;   
}

function sort(){
	time = document.getElementById("tempo").value;
	ativo=0;
	atual = 0;
	intervaloAtivo = setInterval(iteracaoAtivo, time);
}

function iteracaoAtivo(){
	if (ativo < valores.length){
		iteracaoAtual();
	} else {
		clearInterval(intervaloAtivo);
	}
}

function iteracaoAtual(){
	if (atual < valores.length){
		if(valores[atual] < valores[ativo]){
			aux = valores[ativo];
			valores[ativo] = valores[atual];
			valores[atual] = aux;
		}
		paint();
		atual++;
	}else{
		ativo++;
		atual = ativo;
	}
}

function msgError(){
	html= "<div class='msg'>";
	html+="<h1> O tamanho do Array é muito pequeno para ser ordenado</h1>";
	html+="</div>";
	return html;
}

function viewDiv(i,mostrarValor=false){
	html= "<div class='grafico'";
	html+= "style='width:" + width + "px;";
    html+= "height: " + height + "px;";
    html+= "margin-top: " + margin_top + "px;";
    if(i === ativo){
    	html+= "background-color: gray;";
    }
    if(i === atual){
    	html+= "background-color: red;";
    }
	html+="'>";
	if(mostrarValor){
		html+=valores[i];
	}
	html+="</div>";
	return html;
}