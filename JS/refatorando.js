const tarefafeita = document.querySelector(".tarefas-concluidas");
let tarefas = [];
let tarefa = {
  id: 0,
  descricao: "",
  status: "false",
};

function adicionarTarefa() {
  const divtarefaadicionada = document.querySelector(".tarefas-adicionadas");
  tarefa.descricao = document.querySelector(".entrada-dados").value;
  divtarefaadicionada.innerHTML += `<div class="item-adicionado" id='${tarefa.id}'>
    <input type="checkbox" class="check" id="checkbox${tarefa.id}">
    <span>${tarefa.descricao}</span>
    <button type="button" id="botao-editar" onclick="editar()">editar</button>
    <button type="button" id="botao-excluir" onclick="excluir()">excluir</button>
  </div>`;

  tarefas.push(tarefa);

  validandoTarefa();

  console.log(tarefa);
}

function validandoTarefa() {
  document
    .querySelector(`#checkbox${tarefa.id}`)
    .addEventListener("change", (e) => {
      if (e.target.checked) {
        tarefa.status = "concluida";
        console.log(tarefa);
      } else {
        tarefa.status = "não concluida";
      }
    });
}
