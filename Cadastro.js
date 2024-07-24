bancoDeDados = [];
var formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(event){
        //recuperando os campos do formulário
        let campos = [
            document.querySelector('#identificador'),
            document.querySelector('#data'),
            document.querySelector('#nome'),
            document.querySelector('#quantidade'),
            document.querySelector('#valor')
        ]
        event.preventDefault();


        //verificando se os campos estão preenchidos
        for(let i= 0; i < campos.length; i++){
            if(campos[i].value == ''){
                alert('Preencha todos os campos');
                return;
            }
        }

        //verificar se o identificador ja existe no banco de dados
        let identificador = campos[0].value;
        let registroExistente = bancoDeDados.find(function(item){
            return item.identificador == identificador;
        })

        if(registroExistente){
            //atualiza o registro existente
            registroExistente.data = campos[1].value;
            registroExistente.nome = campos[2].value;
            registroExistente.quantidade = campos[3].value;
            registroExistente.valor = campos[4].value;
        }else{
            //cria um novo registro
            let registro = {
                identificador: campos[0].value,
                data: campos[1].value,
                nome: campos[2].value,
                quantidade: campos[3].value,
                valor: campos[4].value
            }
            bancoDeDados.push(registro);
        }
        atualizaTabelaDeRegistros();
        formulario.reset();


    })

    function carregaFormulario(identificador){
        //recuperar o registro do banco de dados
        let registro = bancoDeDados.find(function(item){
            return item.identificador == identificador;
        })

        document.querySelector('#identificador').value = registro.identificador;
        document.querySelector('#data').value = registro.data;
        document.querySelector('#nome').value = registro.nome;
        document.querySelector('#quantidade').value = registro.quantidade;
        document.querySelector('#valor').value = registro.valor;


        //alterar o botão de submit para alterar
        let botao = document.querySelector('#btnSalvar');
        botao.textContent = 'Alterar';

    }

    function excluirRegistro(identificador){
        let registro = bancoDeDados.find(function(item){
            return item.identificador == identificador;
        })

        let indice = bancoDeDados.indexOf(registro);
        bancoDeDados.splice(indice, 1);

        //percorrer a tabela e remover a linha onde esta o identificador
        let linhas = document.querySelectorAll('tbody tr'); //recupera as tr dentro do tbody
        for(let i = 0; i < linhas.length; i++) {
            let colunas = linhas[i].querySelectorAll('td');
            if (colunas[0].textContent == identificador) {
                linhas[i].remove();
                break;
            }
        }
    }

    function atualizaTabelaDeRegistros(){
        //atualiza a tabela conforme o banco de dados
        let tbody = document.querySelector('#corpoDaTable');
        tbody.innerHTML = '';
        for(let i = 0; i < bancoDeDados.length; i++){
            let registro = bancoDeDados[i];
            let linha = document.createElement('tr');
            for(let propriedade in registro){
                let coluna = document.createElement('td');
                coluna.textContent = registro[propriedade];
                linha.appendChild(coluna);
            }

            //adicionando a coluna acoes
            let coluna = document.createElement('td');
            let linkaCarregar = document.createElement('a');
            linkaCarregar.href = '#';
            linkaCarregar.textContent = 'Alterar';
            linkaCarregar.onclick = function(event){
                event.preventDefault();
                carregaFormulario(registro.identificador);
            }

            let linkExcluir = document.createElement('a');
            linkExcluir.href = '#';
            linkExcluir.textContent = 'Excluir';
            linkExcluir.onclick = function(event){
                event.preventDefault();
                excluirRegistro(registro.identificador);
            }

            coluna.appendChild(linkaCarregar);
            coluna.appendChild(linkExcluir);
            linha.appendChild(coluna);

            tbody.appendChild(linha);
            }

    }