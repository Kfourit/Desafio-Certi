/**
* @author     Tiago Kfouri
* @version    1.0
*/

/* 
funcao que recebe uma string que representa um numero entre
[-99999,99999] e retorna uma string com o numero por extenso
@param  num     string que representa um numero
@return         string com numero de entrada por extenso. retorna 1, 
                caso a entrada esteja errada e 2 caso o tamanho da 
                entrada seja maior que o esperado.
*/
function extenso(num){
	var saida = "";
	var tamanho = num.length; //tamanho da string de entrada
	var flagE = 0; //para saber se a proxima palavra necessita de "e "
	var ex = [
        ["", "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
    ];

    //tratamentos de entradas invalidas
    var i = 0;
    if (num[i] == '-') {
        i++        
    }
    while (i < tamanho) {
        var numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        
        for (var j = 0; j < 10; j++) {
            if (num[i] == numeros[j]) {
                break;
            }
        }
        if (j>9) {
            return 1;
        }
        i++;
    }
    if ((tamanho>6 && num[0]=='-') || (tamanho>5 && num[0]!='-')) {
        return 2;
    }

    //tratamento do "zero"
    if (num=="0" || num=="00" || num=="000" || num=="0000" || num=="00000"
        || num=="-0" || num=="-00" || num=="-000" || num=="-0000" 
        || num=="-00000") {
        return "zero";
    }

    //tratamento do "menos"
    if (num[0] == '-') {
    	saida = saida + "menos ";
    	num = num.substring(1);
    	tamanho -= 1;
    }
    //tratamento para caso a string de entrada tenha tamanho 5
	if (tamanho == 5) {
		//adicionando de vinte a noventa
		if(num[0] != '1' && num[0] != '0'){
			saida = saida + ex[1][Number(num[0]) - 1] + " ";
			//adicionando "e um" ate "e nove"
			if (num[1] != '0') {
				saida = saida + "e " + ex[0][Number(num[1])] + " ";  
			}
            saida = saida + "mil";
            flagE = 1;
		}
		//adicionando de onze a dezenove
		else if(num[0] != '0'){
			saida = saida + ex[0][Number(num[1]) + 10] + " ";
            saida = saida + "mil";
            flagE = 1;
		}
		//se primeiro digito for zero
		else {
            //se o segundo digito for diferente de zero
            if (num[1] != '0') {
                saida = saida + ex[0][Number(num[1])] + " ";
                saida = saida + "mil";
                flagE = 1;
            }
		}
		
		tamanho = 3;
		num = num.substring(2);
	}
    //tratamento para caso a string de entrada tenha tamanho 4
	else if (tamanho == 4) {
		if (num[0]!='0' && num[0]!='1') {
			saida = saida + ex[0][Number(num[0])] + " ";
			saida = saida + "mil";
			flagE = 1;
		}
        else if (num[0]=='1') {
            saida = saida + "mil";
            flagE = 1;
        }
		num = num.substring(1);
    	tamanho = 3;
    }

    //tratamento para caso a string de entrada tenha tamanho 3
    if (tamanho == 3) {
    	if (flagE==1 && num!="000") {
    		saida = saida + " e ";
    		flagE = 0;
    	}
    	if (num == "100"){
    		saida = saida + "cem";
    	}
        else if(num[1]=='0' && num[2]=='0'){
            saida = saida + ex[2][Number(num[0])];
        }
    	else{
    		saida = saida + ex[2][Number(num[0])];
    		if(num[0]!='0'){
                flagE = 1;
            }
    		num = num.substring(1);
    		tamanho = 2;
    	}

    }
    //tratamento para caso a string de entrada tenha tamanho 2
    if (tamanho == 2) {
    	if (flagE==1 && num!="00") {
    		saida = saida + " e ";
    		flagE = 0;
    	}
        if(num[0] == '0'){
            num = num.substring(1);
            tamanho = 1;
        }
    	//adicionando de vinte a noventa
    	else if(num[0] != '1' && num[0] != '0'){
    		saida = saida + ex[1][Number(num[0]) - 1];
            flagE = 1;
            num = num.substring(1);
            tamanho = 1;
    	}
    	//adicionando de onze a dezenove
    	else if(num[0] != '0'){
    		saida = saida + ex[0][Number(num[1]) + 10];
    	}
    }

    //tratamento para caso a string de entrada tenha tamanho 1
    if (tamanho == 1) {
        if (flagE==1 && num!="0") {
            saida = saida + " e ";
            flagE = 0;
        }
    	saida = saida + ex[0][Number(num[0])];
    }

    return saida;

}


/* 
funcao que prepara o JSON de resposta, com a chave "extenso"
e seu valor, recebido por parametro
@param  extenso string que representa um numero por extenso
@return         JSON com a chave "extenso" e o valor, recebido como parametro
*/
function preparaJSON(extenso){
    return '{ \"extenso\": \"' + extenso + '\" }';
}


/*
servidor HTTP que recebe uma requisicao GET e retorna um JSON
com uma chave "extenso", que eh a versao por extenso de um 
numero inteiro enviado no path.
*/
const http = require('http')
const port = 3000
const ip = 'localhost'

const server = http.createServer((req, res) => {
  	ext = extenso(req.url.substring(1));
    if(ext == 1){
        res.end("path com formato errado");
    }
    else if (ext == 2) {
        res.end("numero de path muito grande");
    }
    else{
        res.end(preparaJSON(ext));
    }

})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
})