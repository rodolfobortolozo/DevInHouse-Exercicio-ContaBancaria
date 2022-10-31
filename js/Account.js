export class Account {
    
    
    constructor(){ 
   
        this.accountObj = [];
        this.extractObj = [];

    }

//Cadastro de Clientes
    addClient(name, cpf, phone, password, confirmPassword){

        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.password = password;
        this.confirmPassword = confirmPassword;
        
        //Gera Numero da Conta
        const accountClient = this.generateNumberAccount();
          
        try{

            this.accountObj.push( {accountClient : accountClient, name : this.name, cpf: this.cpf, phone : this.phone, password : this.password , money : 0 });
            return `Conta criada com Sucesso. Conta ${accountClient}`;

        }catch (e){

            return `Erro ao criar a conta ${e}`;
            

        }

    }

//Depositar e Sacar   
    operations(account, value = 0, operation, password){

        this.account = account;
        this.value = value;
        this.operation = operation;
        this.password = password;
        let msgReturn = '';
               
        if(this.validAccount(this.account, this.password)){

                try{

                    const accountIndex = this.findAccountIndex(this.account);
                    const balance = this.accountObj[accountIndex].money;
                   
                   if(this.operation =='D'){ // Saque
                        
                    if(balance<this.value){
                            return `Saldo insuficiente saldo atual de R$ ${ this.formatCurrency(balance)}`;
                        }

                        this.value = this.value * -1;
                        msgReturn = 'Saldo debitado na conta! R$';
                        
                    }else if(this.operation =='C') { // Deposito

                        msgReturn = 'Saldo creditado na conta! R$';

                    }else{

                        return `Saldo atual de R$ ${ this.formatCurrency(balance)}`;
                    }
                    //salvo no extrado
                    //this.extractObj.push({accountClient : this.account, value : this.value, operation : this.operation })
                    const deposit = this.accountObj[accountIndex].money += this.value;
                    return `${msgReturn} ${this.formatCurrency(deposit)}`;

                }catch(e){

                    return `Erro ao atualizar o saldo do cliente error: ${e} `;

                }


    }
        return 'Dados da conta inválidos!';
    }
//Geração do numero da conta
    generateNumberAccount(){
        
        return Math.floor(1000 + Math.random() * 9000); 
    
    }

// Listar Todos Clientes
    findAllClient(){
        
        return this.accountObj;
    }

//Localizar Conta
    validAccount(account, password){

        this.account = account;
        this.password  = password;

        if( this.accountObj.find( element => element.accountClient == this.account ) ) {

            const accountIndex = this.findAccountIndex(this.account);
            const password = this.accountObj[accountIndex].password;

            if(this.password == password){

                return true;

            }

            return false;
            
        }

        return false;
    }

//Pega o Index da Conta
    findAccountIndex(account){

        this.account = account;

        return this.accountObj.findIndex( element => element.accountClient == this.account );

}

//Formatação de numeros 
    formatCurrency(value){
        this.value = value;

        return (this.value).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
                })
    }

}