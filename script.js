/*
    Lógica de Programação

    [ x ] Pegar os dados do Input, quando o botão for clicado
    [ x ] Ir até o servidor, e trazer os produtos
    [  ] Colocar os produtos na Tela
    [  ] Criar o gráfico de Preços

*/

const searchForm = document.querySelector(".search-form")
const productList = document.querySelector(".product-list")

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    const inputValue = e.target[0].value;

    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)
    const products = (await data.json()).results.slice(0, 10)

    displayItems(products);
})

function displayItems(products) {
    console.log(products);
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>${product.price.toLocaleString('pt-br', { style: 'currency', currency: "BRL" })}</p>
            <p>Loja ou Vendedor: ${product.seller.nickname}</p>
        </div>
    `)
}