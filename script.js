(function () {
  'use strict';

  var arvore = document.querySelector('.arvore');
  var trilho = document.querySelector('.trilho');
  var body = document.body;
  var btnEditar = document.getElementById('btn-editar');
  var STORAGE_KEY = 'organograma-arvore-v1';

  // ---------- Persistência (localStorage) ----------
  function salvar() {
    try {
      localStorage.setItem(STORAGE_KEY, arvore.innerHTML);
    } catch (e) {
      console.warn('Não foi possível salvar localmente:', e);
    }
  }

  function carregar() {
    try {
      var salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) arvore.innerHTML = salvo;
    } catch (e) {
      console.warn('Não foi possível carregar dados salvos:', e);
    }
  }

  // ---------- Contagens automáticas ----------
  function atualizarContagens() {
    var cards = arvore.querySelectorAll('.card');

    cards.forEach(function (card) {
      var qtd = card.querySelectorAll('.nomes li').length;
      var badge = card.querySelector('.qtd');
      if (badge) badge.textContent = qtd;
    });

    var totalColaboradores = arvore.querySelectorAll('.nomes li').length;
    var totalCargos = cards.length;

    var elTotal = document.getElementById('total-colaboradores');
    var elCargos = document.getElementById('total-cargos');
    if (elTotal) elTotal.textContent = totalColaboradores;
    if (elCargos) elCargos.textContent = 'Cargos: ' + totalCargos;

    var totalBase = document.querySelectorAll('#n5 .nomes li').length;
    var rotuloBase = document.getElementById('rotulo-base');
    if (rotuloBase) rotuloBase.textContent = 'Equipes operacionais \u00B7 ' + totalBase + ' colaboradores';

    var totalTerceiro = document.querySelectorAll('#n6 .nomes li').length;
    var rotuloTerceiro = document.getElementById('rotulo-terceiro');
    if (rotuloTerceiro) rotuloTerceiro.textContent = 'Colaboradores terceirizados \u00B7 ' + totalTerceiro;

    var vazio = document.querySelector('#n6 .vazio');
    if (vazio) vazio.style.display = totalTerceiro > 0 ? 'none' : '';

    reposicionarMarcos();
  }

  // ---------- Alinhamento dos marcos N1–N6 (o conteúdo muda de altura ao editar) ----------
  function reposicionarMarcos() {
    if (!trilho) return;
    var trilhoTop = trilho.getBoundingClientRect().top;
    document.querySelectorAll('.marco[data-target]').forEach(function (marco) {
      var alvo = document.getElementById(marco.dataset.target);
      if (!alvo) return;
      var alvoRect = alvo.getBoundingClientRect();
      var top = (alvoRect.top - trilhoTop) + (alvoRect.height / 2) - 13;
      marco.style.top = Math.max(0, top) + 'px';
    });
  }

  // ---------- Injeção dos controles de edição ----------
  function garantirControles() {
    // botão "+" para adicionar colaborador em cada cargo
    arvore.querySelectorAll('.card').forEach(function (card) {
      var header = card.querySelector('header');
      if (header && !header.querySelector('.add-colaborador')) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'add-colaborador so-edicao no-print';
        btn.setAttribute('aria-label', 'Adicionar colaborador');
        btn.textContent = '+';
        header.appendChild(btn);
      }
    });
    // botão "×" para remover cada colaborador já existente
    arvore.querySelectorAll('.nomes li').forEach(function (li) {
      if (!li.querySelector('.del-colaborador')) {
        var del = document.createElement('button');
        del.type = 'button';
        del.className = 'del-colaborador so-edicao no-print';
        del.setAttribute('aria-label', 'Remover colaborador');
        del.textContent = '\u00D7';
        li.appendChild(del);
      }
    });
  }

  // ---------- Ações ----------
  function nomeDoLi(li) {
    return (li.childNodes[0] && li.childNodes[0].textContent || '').trim();
  }

  function adicionarColaborador(card) {
    var nome = window.prompt('Nome do novo colaborador:');
    if (!nome || !nome.trim()) return;
    var ul = card.querySelector('.nomes');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(nome.trim()));
    ul.appendChild(li);
    garantirControles();
    atualizarContagens();
    salvar();
  }

  function removerColaborador(li) {
    var nome = nomeDoLi(li) || 'este colaborador';
    if (!window.confirm('Remover ' + nome + '?')) return;
    li.remove();
    atualizarContagens();
    salvar();
  }

  function novoCargo(container, classe) {
    var cargo = window.prompt('Nome do novo cargo:');
    if (!cargo || !cargo.trim()) return;
    var nome = window.prompt('Nome do primeiro colaborador neste cargo:');
    if (!nome || !nome.trim()) return;

    var art = document.createElement('article');
    art.className = 'card ' + classe;
    art.innerHTML = '<header><h3>' + escapeHtml(cargo.trim()) + '</h3><span class="qtd">0</span></header><ul class="nomes"></ul>';
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(nome.trim()));
    art.querySelector('.nomes').appendChild(li);

    var btnAddCargo = container.querySelector('.add-cargo');
    if (btnAddCargo) {
      container.insertBefore(art, btnAddCargo);
    } else {
      container.appendChild(art);
    }
    garantirControles();
    atualizarContagens();
    salvar();
  }

  function escapeHtml(texto) {
    var div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  // ---------- Delegação de eventos ----------
  arvore.addEventListener('click', function (e) {
    if (!body.classList.contains('modo-edicao')) return;

    var delBtn = e.target.closest('.del-colaborador');
    if (delBtn) {
      removerColaborador(delBtn.closest('li'));
      return;
    }

    var addColabBtn = e.target.closest('.add-colaborador');
    if (addColabBtn) {
      adicionarColaborador(addColabBtn.closest('.card'));
      return;
    }

    var addCargoBtn = e.target.closest('.add-cargo');
    if (addCargoBtn) {
      var containerId = addCargoBtn.dataset.container === 'terceiro' ? 'n6' : 'n5';
      var container = document.getElementById(containerId);
      novoCargo(container, addCargoBtn.dataset.classe || 'card--base');
      return;
    }
  });

  if (btnEditar) {
    btnEditar.addEventListener('click', function () {
      var ativo = body.classList.toggle('modo-edicao');
      btnEditar.textContent = ativo ? 'Concluir edição' : 'Editar';
      btnEditar.classList.toggle('ativo', ativo);
      reposicionarMarcos();
    });
  }

  window.addEventListener('resize', reposicionarMarcos);

  // ---------- Inicialização ----------
  carregar();
  garantirControles();
  atualizarContagens();
})();
