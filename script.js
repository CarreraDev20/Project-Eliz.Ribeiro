const secoes = {
    "Hortifruti - Frutas": ["Banana", "Maçã", "Laranja", "Limão", "Mamão", "Melancia", "Melão", "Uva", "Pera", "Abacaxi", "Manga", "Kiwi", "Morango", "Abacate", "Coco"],
    "Hortifruti - Verduras e Hortaliças": ["Alface", "Rúcula", "Agrião", "Espinafre", "Couve", "Acelga", "Escarola", "Chicória", "Repolho"],
    "Hortifruti - Legumes": ["Tomate", "Cebola", "Alho", "Batata", "Batata-doce", "Cenoura", "Beterraba", "Abobrinha", "Berinjela", "Chuchu", "Inhame", "Mandioca", "Pimentão", "Vagem", "Quiabo", "Milho verde", "Gengibre"],
    "Açougue e Peixaria - Carnes": ["Carne moída", "Bife", "Músculo", "Costela", "Picanha", "Filé mignon", "Fraldinha", "Linguiça de carne"],
    "Açougue E Peixaria - Frangos e Suínos": ["Peito de frango", "Coxa", "Asa", "Filé de frango", "Frango inteiro", "Linguiça de frango", "Lombo suíno", "Pernil", "Costelinha", "Bisteca"],
    "Açougue E Peixaria - Peixes e Frutos do Mar": ["Salmão", "Tilápia", "Merluza", "Atum fresco", "Camarão", "Lula", "Mariscos", "Bacalhau"],
    "Frios e Laticínios": ["Leite", "Iogurte", "Requeijão", "Manteiga", "Margarina", "Queijo prato", "Mussarela", "Queijo minas", "Presunto", "Peito de peru", "Salame", "Ricota", "Creme de leite", "Leite condensado", "Chantilly", "Ovo"],
    "Despensa": ["Arroz", "Feijão", "Lentilha", "Grão-de-bico", "Farinha de trigo", "Tapioca", "Macarrão", "Café", "Achocolatado", "Cereal", "Biscoitos", "Granola", "Milho enlatado", "Ervilha", "Palmito", "Azeitona", "Extrato de tomate", "Ketchup", "Shoyu", "Sal", "Açúcar", "Pimenta-do-reino", "Tempero pronto"],
    "Bebidas": ["Água mineral", "Água com gás", "Sucos", "Cerveja", "Vinho", "Água de coco", "Chá"],
    "Higiene e Uso Pessoal": ["Papel higiênico", "Sabonete", "Shampoo", "Condicionador", "Creme dental", "Escova de dentes", "Desodorante", "Absorventes"],
    "Limpeza e Lavanderia": ["Sabão em pó", "Amaciante", "Desinfetante", "Detergente", "Esponja", "Vassoura", "Rodo", "Sacos de lixo"]
};

const listas = document.getElementById("listas");

Object.entries(secoes).forEach(([titulo, itens]) => {
    const sec = document.createElement("div");
    sec.className = "section";

    const h2 = document.createElement("h2");
    h2.textContent = titulo;
    sec.appendChild(h2);

    itens.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
          <input type="checkbox" class="check" data-item="${item}" />
          <label>${item}</label>
          <input type="date" class="entrada" />
          <input type="date" class="termino" />
          <input type="date" class="reposicao" />
          <input type="number" class="valor" placeholder="Valor (R$)" step="0.01" />
          <input type="number" class="quantidade" placeholder="Qtd" />
        `;
        sec.appendChild(div);
    });

    const btnAdd = document.createElement("button");
    btnAdd.className = "btn";
    btnAdd.textContent = "Adicionar nas compras!";
    btnAdd.onclick = atualizarTotais;
    sec.appendChild(btnAdd);

    listas.appendChild(sec);
});

function atualizarTotais() {
    let totalItens = 0;
    let totalValor = 0;
    document.querySelectorAll(".check").forEach(c => {
        if (c.checked) {
            const parent = c.parentElement;
            const valor = parseFloat(parent.querySelector(".valor").value || 0);
            const qtd = parseInt(parent.querySelector(".quantidade").value || 0);
            totalItens += qtd;
            totalValor += valor * qtd;
        }
    });
    document.getElementById("totais").textContent = `Total de Itens: ${totalItens} | Valor Total: R$ ${totalValor.toFixed(2)}`;
}

function confirmarFinalizar() {
    if (confirm("Tem certeza que irá finalizar as compras?")) {
        document.querySelectorAll(".check").forEach(c => c.checked = false);
        document.querySelectorAll(".entrada, .termino, .reposicao, .valor, .quantidade").forEach(inp => inp.value = "");
        atualizarTotais();
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

Object.entries(secoes).forEach(([titulo, itens]) => {
    doc.setFontSize(14);
    doc.text(titulo, 10, y);
    y += 8;

    itens.forEach(item => {
        document.querySelectorAll(".check").forEach(c => {
            if (c.checked && c.dataset.item === item) {
                const parent = c.parentElement;
                const entrada = parent.querySelector(".entrada").value;
                const termino = parent.querySelector(".termino").value;
                const reposicao = parent.querySelector(".reposicao").value;
                const valor = parseFloat(parent.querySelector(".valor").value || 0).toFixed(2);
                const qtd = parseInt(parent.querySelector(".quantidade").value || 0);
                const linha = `- ${item} | Qtd: ${qtd} | Valor: R$${valor} | Entrada: ${entrada} | Término: ${termino} | Reposição: ${reposicao}`;
                doc.setFontSize(10);
                doc.text(linha, 10, y);
                y += 6;
            }
        });
    });
    y += 4;
});

doc.save("compras_diarias.pdf");
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".check").forEach(c => {
        c.addEventListener("change", atualizarTotais);
    });
});

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    let totalItens = 0;
    let totalValor = 0;

    Object.entries(secoes).forEach(([titulo, itens]) => {
        let grupoTemItens = false;
        doc.setFontSize(14);
        doc.text(titulo, 10, y);
        y += 8;

        itens.forEach(item => {
            document.querySelectorAll(".check").forEach(c => {
                if (c.checked && c.dataset.item === item) {
                    if (!grupoTemItens) {
                        doc.setFontSize(14);
                        doc.text(titulo, 10, y);
                        y += 8;
                        grupoTemItens = true;
                    }
                    const parent = c.parentElement;
                    const entrada = parent.querySelector(".entrada").value;
                    const termino = parent.querySelector(".termino").value;
                    const reposicao = parent.querySelector(".reposicao").value;
                    const valor = parseFloat(parent.querySelector(".valor").value || 0).toFixed(2);
                    const qtd = parseInt(parent.querySelector(".quantidade").value || 0);
                    const valorTotal = valor * qtd;

                    totalItens += qtd;
                    totalValor += valorTotal;

                    const linha = `- ${item} | Qtd: ${qtd} | Valor: R$${valor} | Entrada: ${entrada} | Término: ${termino} | Reposição: ${reposicao}`;
                    doc.setFontSize(10);
                    doc.text(linha, 10, y);
                    y += 6;
                }
            });
        });
        if (grupoTemItens) {
            y += 4;
        }
    });
    doc.setFontSize(12);
    y += 10;
    doc.text(`Total de Itens: ${totalItens}`, 10, y);
    y += 8;
    doc.text(`Valor Total: R$ ${totalValor.toFixed(2)}`, 10, y);

    doc.save("compras_diarias.pdf");
}
