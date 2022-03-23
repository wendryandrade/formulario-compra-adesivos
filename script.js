$(document).ready(function() {
    
    // evento ao marcar ou desmarcar checkbox
    $(".check-adesivo").change(function(){
        
        // busca o tipo definido no atributo data-tipo da div pai
        var tipo = $(this).closest("[data-tipo]").data("tipo");
        var divContador = $("#contador-" + tipo);
        
        // retorna se existe algum checkbox selecionado
        var existeCheckboxSelecionado = $(document).find(".check-adesivo:checked").length > 0;

        if(this.checked){
            
            // se checkbox estiver checkado exibe o seletor de quantidade
            $("#div-quantidade").removeClass("d-none");
            divContador.removeClass("d-none");
        }
        else{
            
            // se checkbox nao estiver checkado esconde o seletor de quantidade
            if(!existeCheckboxSelecionado){
                $("#div-quantidade").addClass("d-none");
            }
            divContador.addClass("d-none");
        }
    });

    // eventos ao clicar no mais ou menos dos seletores de quantidade
    $(".botao-contador").click(function(){

        // retorna o tipo definido no atributo data-tipo da div pai
        var tipo = $(this).closest("[data-tipo]").data("tipo");

        // retorna a operacao do botao do contador (mais ou menos)
        var operacao = $(this).data("operacao");
        var inputQuantidade = $("#quantidade-" + tipo);

        // retorna o valor atual do input contador e converte para numero para realizar as operacoes
        var inputValor = Number(inputQuantidade.val());

        if(operacao == "mais"){
            inputQuantidade.val(inputValor + 1);
        }
        else if(operacao == "menos" && inputValor > 0){
            inputQuantidade.val(inputValor - 1);
        }
    });


    $("#form-adesivos").submit(function(e){

        // retorna todos os checkboxs selecionados
        var checkboxSelecionados = $(document).find(".check-adesivo:checked");
        var formCheckbox = [];
        var observacaoValor = $("#observacoes").val();
        var validacao = true;

        checkboxSelecionados.each(function(){
            
            // retorna o tipo definido no atributo data-tipo da div  pai
            var tipo = $(this).closest("[data-tipo]").data("tipo");
            
            // retorna a quantidade de adesivos do seletor de quantidade do checkbox selecionado
            var inputQuantidade = Number($("#quantidade-" + tipo).val());
            
            // valida se algum checkbox esta marcado e nao possui valor <= 0
            if(this.checked && inputQuantidade <= 0){
                validacao = false;
            }
            else{
                
                // adicionar nome e quantidade para variavel formCheckbox
                formCheckbox.push({
                    "nome": $(this).parent().text().trim(),
                    "quantidade": inputQuantidade
                })
            }
        });

        if(validacao && checkboxSelecionados.length > 0){
            var htmlItens = "";
            
            // preenche o modal com os itens comprados
            formCheckbox.forEach(function(checkbox){
                htmlItens += "<p>" + checkbox.quantidade + "x pacote(s) de adesivos " + checkbox.nome + "</p>"
            })
    
            // preenche o modal com a observacao caso exista
            if(observacaoValor != ""){
                htmlItens += "<p>Observações: " + observacaoValor + "</p>";
            }
    
            $("#itens-comprados").html("");
            $("#itens-comprados").append(htmlItens);
            $("#mensagem-sucesso").modal("show");
        }
        else{
            
            // exibir alerta de erro com limite de 4s
            $('.alert').removeClass("d-none");;
            setTimeout(function() { 
                $('.alert').addClass("d-none");; 
            }, 4000);
        }
        
        e.preventDefault();
    })

    // refresh na tela ao fechar modal de sucesso
    $("#mensagem-sucesso").on("hidden.bs.modal", function () {
        location.reload();
    })
});

