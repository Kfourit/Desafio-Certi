
function extenso(num){
	var saida = "";
	var tamanho = num.length;
	var flagE = 0;
	var ex = [
        ["zero", "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
    ];
    if (num[0] == '-') {
    	saida = saida + "menos ";
    	num = num.substring(1);
    	tamanho -= 1;
    }
    //codigo das casas decimais 4 e 5
    if(tamanho > 3){
    	if (tamanho == 5) {
    		//adicionando de vinte a noventa
    		if(num[0] != '1' && num[0] != '0'){
    			saida = saida + ex[1][Number(num[0]) - 1] + " ";
    			//adicionando "e um" ate "e nove"
    			if (num[1] != '0') {
    				saida = saida + "e " + ex[0][Number(num[1])] + " ";
    			}
    		}
    		//adicionando de onze a dezenove
    		else if(num[0] != '0'){
    			saida = saida + ex[0][Number(num[1]) + 10] + " ";
    		}
    		//se primeiro digito for zero
    		else {
    			saida = saida + ex[0][Number(num[1])] + " ";
    		}
    		saida = saida + "mil ";
    		flagE = 1;
    		tamanho = 3;
    		num = num.substring(2);
    	}
    	else if (tamanho == 4) {
    		if (num[0] != '0') {
    			saida = saida + ex[0][Number(num[0])] + " ";
    			saida = saida + "mil ";
    			flagE = 1;
    		}
    		num = num.substring(1);
    		tamanho = 3;
    	}

    }
    if (tamanho == 3) {
    	if (flagE == 1) {
    		saida = saida + "e ";
    		flagE = 0;
    	}
    	if (num == "100"){
    		saida = saida + ex[2][0];
    	}
    	else{
    		saida = saida + ex[2][Number(num[0])] + " ";
    		flagE = 1;
    		num = num.substring(1);
    		tamanho = 2;
    	}

    }
    if (tamanho == 2) {
    	if (flagE == 1) {
    		saida = saida + "e ";
    		flagE = 0;
    	}
    	//adicionando de vinte a noventa
    	if(num[0] != '1' && num[0] != '0'){
    		saida = saida + ex[1][Number(num[0]) - 1] + " ";
    		//adicionando "e um" ate "e nove"
    		if (num[1] != '0') {
    			saida = saida + "e " + ex[0][Number(num[1])] + " ";
    		}
    	}
    	//adicionando de onze a dezenove
    	else if(num[0] != '0'){
    		saida = saida + ex[0][Number(num[1]) + 10] + " ";
    	}
    	//se primeiro digito for zero
    	else {
    		saida = saida + ex[0][Number(num[1])] + " ";
    	}
    }
    if (tamanho == 1) {
    	saida = saida + ex[0][Number(num[0])];
    }

    return saida;

}

const http = require('http')
const port = 3000
const ip = 'localhost'

const server = http.createServer((req, res) => {
  	ext = extenso(req.url.substring(1));
  	//console.log(ext);
  	res.end(ext);

})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
  console.log('Para derrubar o servidor: ctrl + c');
  
})