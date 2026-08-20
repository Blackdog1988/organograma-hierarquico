"use strict";
// Organograma Hierárquico — lógica de edição (TypeScript sem framework)
// Compilar com: npm run build  (gera ./script.js a partir deste arquivo)
(function () {
    'use strict';
    const arvore = document.querySelector('.arvore');
    const trilho = document.querySelector('.trilho');
    const body = document.body;
    const btnEditar = document.getElementById('btn-editar');
    const STORAGE_KEY = 'organograma-arvore-v2';
    if (!arvore || !trilho) {
        console.error('Estrutura do organograma não encontrada (.arvore/.trilho ausentes).');
        return;
    }
    // ---------- Persistência (localStorage) ----------
    function salvar() {
        try {
            localStorage.setItem(STORAGE_KEY, arvore.innerHTML);
        }
        catch (e) {
            console.warn('Não foi possível salvar localmente:', e);
        }
    }
    function carregar() {
        try {
            const salvo = localStorage.getItem(STORAGE_KEY);
            if (salvo)
                arvore.innerHTML = salvo;
        }
        catch (e) {
            console.warn('Não foi possível carregar dados salvos:', e);
        }
    }
    // ---------- Contagens automáticas ----------
    function atualizarContagens() {
        const cards = arvore.querySelectorAll('.card');
        cards.forEach((card) => {
            const qtd = card.querySelectorAll('.nomes li').length;
            const badge = card.querySelector('.qtd');
            if (badge)
                badge.textContent = String(qtd);
        });
        const totalColaboradores = arvore.querySelectorAll('.nomes li').length;
        const totalCargos = cards.length;
        const elTotal = document.getElementById('total-colaboradores');
        const elCargos = document.getElementById('total-cargos');
        if (elTotal)
            elTotal.textContent = String(totalColaboradores);
        if (elCargos)
            elCargos.textContent = 'Cargos: ' + totalCargos;
        const totalBase = document.querySelectorAll('#n5 .nomes li').length;
        const rotuloBase = document.getElementById('rotulo-base');
        if (rotuloBase)
            rotuloBase.textContent = 'Equipes operacionais \u00B7 ' + totalBase + ' colaboradores';
        const totalTerceiro = document.querySelectorAll('#n6 .nomes li').length;
        const rotuloTerceiro = document.getElementById('rotulo-terceiro');
        if (rotuloTerceiro)
            rotuloTerceiro.textContent = 'Colaboradores terceirizados \u00B7 ' + totalTerceiro;
        const vazio = document.querySelector('#n6 .vazio');
        if (vazio)
            vazio.style.display = totalTerceiro > 0 ? 'none' : '';
        reposicionarMarcos();
    }
    // ---------- Alinhamento dos marcos N1–N6 ----------
    // Chamada toda vez que o conteúdo muda de altura: ao editar, ao trocar de fonte
    // (web fonts carregam de forma assíncrona e mudam a altura do texto) e ao redimensionar a janela.
    function reposicionarMarcos() {
        const trilhoTop = trilho.getBoundingClientRect().top;
        document.querySelectorAll('.marco[data-target]').forEach((marco) => {
            const alvoId = marco.dataset.target;
            if (!alvoId)
                return;
            const alvo = document.getElementById(alvoId);
            if (!alvo)
                return;
            const alvoRect = alvo.getBoundingClientRect();
            const top = (alvoRect.top - trilhoTop) + (alvoRect.height / 2) - 13;
            marco.style.top = Math.max(0, top) + 'px';
        });
    }
    // ---------- Injeção dos controles de edição ----------
    function garantirControles() {
        // botão "+" para adicionar colaborador em cada cargo
        arvore.querySelectorAll('.card').forEach((card) => {
            const header = card.querySelector('header');
            if (header && !header.querySelector('.add-colaborador')) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'add-colaborador so-edicao no-print';
                btn.setAttribute('aria-label', 'Adicionar colaborador');
                btn.textContent = '+';
                header.appendChild(btn);
            }
            // botão "Remover cargo" para excluir o card inteiro (necessário para
            // remover completamente um cargo/pessoa, e não só o nome dentro dele)
            if (!card.querySelector('.del-cargo')) {
                const delCargo = document.createElement('button');
                delCargo.type = 'button';
                delCargo.className = 'del-cargo so-edicao no-print';
                delCargo.setAttribute('aria-label', 'Remover cargo inteiro');
                delCargo.textContent = 'Remover cargo';
                card.appendChild(delCargo);
            }
        });
        // botão "×" para remover cada colaborador já existente
        arvore.querySelectorAll('.nomes li').forEach((li) => {
            if (!li.querySelector('.del-colaborador')) {
                const del = document.createElement('button');
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
        const nome = window.prompt('Nome do novo colaborador:');
        if (!nome || !nome.trim())
            return;
        const ul = card.querySelector('.nomes');
        if (!ul)
            return;
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(nome.trim()));
        ul.appendChild(li);
        garantirControles();
        atualizarContagens();
        salvar();
    }
    function removerColaborador(li) {
        const nome = nomeDoLi(li) || 'este colaborador';
        if (!window.confirm('Remover ' + nome + '?'))
            return;
        li.remove();
        atualizarContagens();
        salvar();
    }
    function removerCargo(card) {
        const titulo = card.querySelector('h3');
        const nomeCargo = titulo ? titulo.textContent : 'este cargo';
        if (!window.confirm('Remover o cargo "' + nomeCargo + '" e todos os colaboradores nele?'))
            return;
        card.remove();
        atualizarContagens();
        salvar();
    }
    function escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
    function novoCargo(container, classe) {
        const cargo = window.prompt('Nome do novo cargo:');
        if (!cargo || !cargo.trim())
            return;
        const nome = window.prompt('Nome do primeiro colaborador neste cargo:');
        if (!nome || !nome.trim())
            return;
        const art = document.createElement('article');
        art.className = 'card ' + classe;
        art.innerHTML = '<header><h3>' + escapeHtml(cargo.trim()) + '</h3><span class="qtd">0</span></header><ul class="nomes"></ul>';
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(nome.trim()));
        const ul = art.querySelector('.nomes');
        if (ul)
            ul.appendChild(li);
        const btnAddCargo = container.querySelector('.add-cargo');
        if (btnAddCargo) {
            container.insertBefore(art, btnAddCargo);
        }
        else {
            container.appendChild(art);
        }
        garantirControles();
        atualizarContagens();
        salvar();
    }
    // ---------- Delegação de eventos ----------
    arvore.addEventListener('click', (e) => {
        if (!body.classList.contains('modo-edicao'))
            return;
        const alvo = e.target;
        const delBtn = alvo.closest('.del-colaborador');
        if (delBtn) {
            const li = delBtn.closest('li');
            if (li)
                removerColaborador(li);
            return;
        }
        const delCargoBtn = alvo.closest('.del-cargo');
        if (delCargoBtn) {
            const card = delCargoBtn.closest('.card');
            if (card)
                removerCargo(card);
            return;
        }
        const addColabBtn = alvo.closest('.add-colaborador');
        if (addColabBtn) {
            const card = addColabBtn.closest('.card');
            if (card)
                adicionarColaborador(card);
            return;
        }
        const addCargoBtn = alvo.closest('.add-cargo');
        if (addCargoBtn) {
            const containerId = addCargoBtn.dataset.container === 'terceiro' ? 'n6' : 'n5';
            const container = document.getElementById(containerId);
            if (container)
                novoCargo(container, addCargoBtn.dataset.classe || 'card--base');
            return;
        }
    });
    if (btnEditar) {
        btnEditar.addEventListener('click', () => {
            const ativo = body.classList.toggle('modo-edicao');
            btnEditar.textContent = ativo ? 'Concluir edição' : 'Editar';
            btnEditar.classList.toggle('ativo', ativo);
            reposicionarMarcos();
        });
    }
    window.addEventListener('resize', reposicionarMarcos);
    window.addEventListener('load', reposicionarMarcos);
    // As fontes do Google Fonts carregam de forma assíncrona; quando terminam,
    // o texto reflui (tamanhos diferentes) e os marcos precisam ser recalculados.
    if ('fonts' in document) {
        document.fonts.ready.then(reposicionarMarcos).catch(() => {
            /* navegador sem suporte completo à Font Loading API — ignorar */
        });
    }
    // Reposiciona também se o conteúdo mudar de altura por qualquer outro motivo
    // (ex.: zoom do navegador, orientação do celular).
    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(() => reposicionarMarcos());
        const nivel = document.querySelector('.nivel');
        if (nivel)
            observer.observe(nivel);
    }
    // ---------- Inicialização ----------
    carregar();
    garantirControles();
    atualizarContagens();
})();
//# sourceMappingURL=script.js.map
