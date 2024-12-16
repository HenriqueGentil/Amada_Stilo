document.addEventListener('DOMContentLoaded', () => {
  const filtros = document.querySelectorAll('.filtro');
  const produtos = document.querySelectorAll('.produto');
  const limparFiltros = document.getElementById('limpar-filtros');

  filtros.forEach(filtro => {
    filtro.addEventListener('change', () => {
      const categoriasSelecionadas = Array.from(filtros)
        .filter(filtro => filtro.checked)
        .map(filtro => filtro.value);

      produtos.forEach(produto => {
        const categoriaProduto = produto.dataset.categoria;
        if (categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(categoriaProduto)) {
          produto.style.display = 'block';
        } else {
          produto.style.display = 'none';
        }
      });
    });
  });

  limparFiltros.addEventListener('click', () => {
    filtros.forEach(filtro => (filtro.checked = false));
    produtos.forEach(produto => (produto.style.display = 'block'));
  });
});
