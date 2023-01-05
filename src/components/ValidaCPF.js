export default class ValidaCPF {
    constructor(cpf){
        //Limpando CPF
        this.cpf = cpf.replace(/\D+/g,'')
    }
    
    valida(){
        if(typeof this.cpf === 'undefined') return false;
        
        //verificando se está com 11 de comprimento o cpf
        if(this.cpf.length !== 11) return false
        
        //verificando se é uma sequencia
        if(this.isSequencia()) return false

        //corta os dois últimos digitos do cpf
        const cpfParcial = this.cpf.slice(0,-2)
        //console.log(cpfParcial)
        const digito1 = this.criaDigito(cpfParcial)
        const digito2 = this.criaDigito(cpfParcial+digito1)        
        //console.log(digito1)

        //junta o cpfParcial cortado os últimos dois digitos,
        // e os digitos gerados através da função criaDIgito
        const novoCPF = cpfParcial + digito1 + digito2

        // se o CPF gerado e o cpf original forem iguais,
        // então retorna true, se não, retorna false
        return novoCPF == this.cpf
    }

    isSequencia() {
        const sequencia = this.cpf[0].repeat(this.cpf.length)
        return sequencia === this.cpf
    }

    criaDigito(cpfParcial) {
        //separando o cpf
        const cpfArray = Array.from(cpfParcial);
        
        let regressivo = cpfArray.length + 1;
        // faz uma função reducer para fazer a conta de validação
        // demonstrada no comentário no inicio do arquivo
        // descobrindo assim o próximo digito
        let total = cpfArray.reduce((ac,val) => {
            ac += (regressivo*Number(val))
            regressivo--
            return ac;
        }, 0);
        //digito é o dígito que foi descoberto
        const digito = 11- (total%11)
        //retorna uma string com o digito se for um número entre 0 e 9
        return digito > 9 ? 0 : String(digito)
    };
}

