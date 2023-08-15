const btnDeletar = $(".deletar")
const btnAtualizar = $(".atualizar")

btnDeletar.on("click", function(){
    const id = $(this).parent().parent()[0].id
    const inputDeletarHidden = document.getElementById("inputDeletarHidden")
    document.getElementById("deletarModalBtn").focus()
    inputDeletarHidden.setAttribute("value", id)
})

btnAtualizar.on("click", function(){
    const id = $(this).parent().parent()[0].id
    const inputAtualizarHidden = document.getElementById("inputAtualizarHidden")
    const inputsFormsAtualizar = $("#modalAtualizar form")
    inputAtualizarHidden.setAttribute("value", id)
})

// Função de Pesquisar
const pesquisar = $("#pesquisar")
pesquisar.on("keyup", function(){
    const tableRow = document.querySelectorAll("tr")
    const valorPesquisar = pesquisar.val().trim()
    for(let i =1; i<tableRow.length;i++){
        if(String(tableRow[i].children[0].innerHTML.toLowerCase()).includes(valorPesquisar.toLowerCase())){
            tableRow[i].style.display = "table-row"
        }
        else if(valorPesquisar.length == 0){
            tableRow[i].style.display = "table-row"
        }
        else{
            tableRow[i].style.display = "none"
        }
        
    }
})