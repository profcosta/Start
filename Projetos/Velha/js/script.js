jogador = 0;
tabuleiro = ["X","O","X","O","X","O","X","O","X"];
jogadas=0;
theEnd=-1;
const simbolos = ["X","O"];
const defVitoria = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

function start(){
	tabuleiro = ["","","","","","","","",""];
	jogadas=0;
	theEnd=-1;
	final = document.getElementById("final");
	final.style = "display:none;";
	paint();
}

function marcar(valor){
	if(isEmpty(tabuleiro[valor])){
		tabuleiro[valor] = simbolos[jogador];
		vefVitoria();
		(jogador === 0)?jogador=1:jogador=0;
		paint();
	}
}

function paint(){
	resultado = "";
	output = document.getElementById("output");
	statusJogador = document.getElementById("status");

	resultado+="<div class='estrutural tabuleiro'>"
	for (var valor in tabuleiro){
		resultado+=viewDiv(valor);
	}
    resultado+="</div>";

    statusJogador.innerHTML = "Jogador " + simbolos[jogador] + "!";
	output.innerHTML = resultado;
}

function vefVitoria(){
	for (var i = 0; i < defVitoria.length; i++) {
		if(tabuleiro[defVitoria[i][0]] === simbolos[jogador] &&
			tabuleiro[defVitoria[i][1]] === simbolos[jogador] &&
			tabuleiro[defVitoria[i][2]] === simbolos[jogador]){
			finalizar(0,i);
			return;
		}
	}
	jogadas++;
	if (jogadas===9){
		finalizar(1,0);
	}
}

function finalizar(fim,index){
	final = document.getElementById("final");

	if(fim===0){
		theEnd = index;
		final.style = "display:flex;";
		final.innerHTML = "Game Over <br><br> O jogador " + simbolos[jogador] + " venceu!";
		(jogador === 0)?jogador=1:jogador=0;
	}
	if(fim===1){
		theEnd = -2;
		final.style = "display:flex;";
		final.innerHTML = "Game Over <br><br> Deu Véia!";
	}
}

function viewDiv(valor){
	html= "<div ";
	
	if(theEnd === -1){
		click = "marcar(" + valor + ");";
		html+= "onclick='" + click + "'";
	}else if(theEnd >= 0){
		if(defVitoria[theEnd][0] == valor ||
		   defVitoria[theEnd][1] == valor ||
		   defVitoria[theEnd][2] == valor){
		   	html+= "style='color:darkred;background-color: coral;'";
		}
	}
	html+=">";
	html+= tabuleiro[valor];
	html+="</div>";
	return html;
}

function isEmpty(x)
{
   return ( 
        (typeof x == 'undefined')
                    ||
        (x == null) 
                    ||
        (x == false)  //same as: !x
                    ||
        (x.length == 0)
                    ||
        (x == "")
                    ||
        //(x.replace(/\s/g,"") == "")
        //            ||
        (!/[^\s]/.test(x))
                    ||
        (/^\s*$/.test(x))
  );
}