let tarefas = [];

function adicionarTarefa() {
  let tarefa = {
    id: getMaiorId() + 1,
    descricao: "",
    validado: false,
  };

  tarefa.descricao = document.querySelector(".entrada-dados").value;
  const tarefaAdicionada = document.querySelector(".tarefas-adicionadas");

  tarefaAdicionada.innerHTML += `<div class="item-adicionado" id='id_${tarefa.id}'>
  <span class="textotarefa">${tarefa.descricao}</span>
  <div class="botoes">
  <span class="material-symbols-outlined validar" onclick="validar()">
done
</span>
<span class="material-symbols-outlined fechar">
close
</span>

  </div>
  
</div>`;

  salvarTarefa(tarefa);
}
function salvarTarefa(tarefa) {
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function getMaiorId() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let maior = 0;
  tarefas.forEach((element) => {
    if (element.id > maior) {
      maior = element.id;
    }
  });
  return maior;
}

function validar() {}
