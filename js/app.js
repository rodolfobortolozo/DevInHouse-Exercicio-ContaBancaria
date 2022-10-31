import { Account } from "./Account.js";

const account = new Account();

//Ações dos Botões
const bSubmit = document.getElementById('btnSubmit');
const bFindall = document.getElementById('btnFindAll');
const bDeposity = document.getElementById('btnDeposit');
const bClear = document.getElementById('btnClear');


bSubmit.addEventListener('click', () => saveClient() );
bFindall.addEventListener('click', () => findAll() );
bDeposity.addEventListener('click', () => deposit() );
bClear.addEventListener('click', ()=> clearAddClient());

//Cadastro de Cliente
function saveClient(){

    const name = document.getElementById('name').value;
    const cpf  = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmepassword').value;

    if(!validFields(name,cpf,phone,password,confirmPassword)){
        return renderizeMensage('returnoadd', 'Campos Obrigatórios por favor preencha todos!');
    }

    if(validPassword(password, confirmPassword)){

        const returnAccont = account.addClient(name, cpf, phone, password, confirmPassword);

            clearAddClient();   
            return renderizeMensage('returnoadd', returnAccont);
            
        }
    
    return renderizeMensage('returnoadd', 'Senhas não são iguais');

}


//Deposit
function deposit(){
    
    let value = 0;
    
    const accounts = document.getElementById('account').value;
    const password = document.getElementById('passworddeposit').value;
    const operation = getRadioValue('operation');
    value = parseFloat(document.getElementById('value').value);
    
    if( value <= 0 ){
        
        return renderizeMensage('returnoperation', 'Valor Inválido');
        
    }

    const returnn = account.operations(accounts, value, operation, password);
    
    return renderizeMensage('returnoperation', returnn);
    
}

//Validação da Senha
function validPassword(password, confirmPassword){
    
    return password == confirmPassword ? true : false;
    
}

//Listar Todos Clientes
function findAll(){
    if ( account.findAllClient()==0 ){

        return renderizeMensage('returnoaccounts', 'Nenhuma Conta Cadastrada');
    
    }
    renderizeMensage('returnoaccounts', '');

    const ul = document.getElementById('allaccounts');
    ul.removeChild(li);

    const allAcounts = account.findAllClient().forEach(element => {

        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = `Nome:${element.name} conta: ${element.accountClient} saldo: ${element.money} `;

    });
    
}

//Pego o RadionButton Selecionado
function getRadioValue(theRadioGroup){
    
    const elements = document.getElementsByName(theRadioGroup);
    
    for (let i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            return elements[i].value;
        }
    }
}

//Renderizacao mensagem
function renderizeMensage(idclass, message){
    
    return document.getElementById(idclass).innerHTML = message;
    
}

function clearAddClient(){
    
    document.getElementById('name').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmepassword').value = '';
    
}

function validFields(){

    if(document.getElementById('name').value ==''){
        return false;
    }
    if(document.getElementById('cpf').value ==''){
        return false;
    }
    if(document.getElementById('phone').value ==''){
        return false;
    }
    if(document.getElementById('password').value ==''){
        return false;
    }
    if(document.getElementById('confirmepassword').value ==''){
        return false;
    }
    

    return true;
}