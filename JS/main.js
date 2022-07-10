let tarefas = [];
const tarefasAdicionadas = document.querySelector(".tarefas-adicionadas");
//localStorage.setItem("tarefas", "[]");

function adicionarTarefa() {
  let tarefa = {
    id: getMaiorId() + 1,
    descricao: "",
    validado: false,
  };

  tarefa.descricao = document.querySelector(".entrada-dados").value;
  tarefasAdicionadas.innerHTML += `<div class="item-adicionado" id='${tarefa.id}'>
    <input type="checkbox" class="check" id="checkbox${tarefa.id}">
    <span>${tarefa.descricao}</span>
    <span class="material-symbols-outlined lixeira">
delete
</span><hr>
  </div>`;

  document
    .querySelector(`#checkbox${tarefa.id}`)
    .addEventListener("change", (e) => {
      validandoTarefa(tarefa.id, e.target.checked);
    });

  salvarTarefa(tarefa);
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

function salvarTarefa(tarefa) {
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

console.log(tarefas);

function recuperarDados() {
  const tarefasConcluidas = document.querySelector(".tarefas-concluidas");
  let dadosRecuperados = [];
  dadosRecuperados = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefasConcluidas.innerHTML = "";
  tarefasAdicionadas.innerHTML = "";

  dadosRecuperados.forEach((tarefa, index) => {
    if (tarefa.validado) {
      tarefasConcluidas.innerHTML += `<div class="item-adicionado" id='${tarefa.id}'>
      <input type="checkbox" class="check" id="checkbox${tarefa.id}" checked>
      <span>${tarefa.descricao}</span>
      <span class="material-symbols-outlined lixeira">
      delete
      </span><hr>
    </div>`;
    } else {
      tarefasAdicionadas.innerHTML += `<div class="item-adicionado" id='${tarefa.id}'>
      <input type="checkbox" class="check" id="checkbox${tarefa.id}">
      <span>${tarefa.descricao}</span>
      <span class="material-symbols-outlined lixeira">
      delete
      </span><hr>
    </div>`;
    }
    console.log("adicionando listen em #checkbox" + tarefa.id);
    document
      .querySelector(`#checkbox${tarefa.id}`)
      .addEventListener("change", (e) => {
        validandoTarefa(tarefa.id, e.target.checked);
      });
  });

  tarefas = dadosRecuperados;
}

function validandoTarefa(idTarefa, validada) {
  tarefas.forEach((tarefa) => {
    if (tarefa.id === idTarefa) {
      tarefa.validado = validada;
    }
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  recuperarDados();

  console.log("tarefas em validando tarefas", tarefas);
}

recuperarDados();
