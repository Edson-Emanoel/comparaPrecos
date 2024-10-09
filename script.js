/*
    Lógica de Programação

    [ x ] Pegar os dados do Input, quando o botão for clicado
    [ x ] Ir até o servidor, e trazer os produtos
    [ x ] Colocar os produtos na Tela
    [] Criar o gráfico de Preços

*/

const searchForm  = document.querySelector(".search-form")
const productList = document.querySelector(".product-list")
const priceChart  = document.querySelector("canvas")

let myChart = '';

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    const inputValue = e.target[0].value;

    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)
    const products = (await data.json()).results.slice(0, 10)

    displayItems(products);
    updatePriceChart(products);
})

function displayItems(products) {
    console.log(products);
    productList.innerHTML = products.map(
        product => `
            <div class="product-card">
                <img src="${product.thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p class="product-price">${product.price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: "BRL"
                })}</p>
                <p class="product-store">Loja ou Vendedor: ${product.seller.nickname}</p>
            </div>
        `,
    ).join('')
}
// REGEX -> Regular Expressions / Expressões Regulares |||||| "http://http2.mlstatic.com/D_990488-MLU75133463573_032024-IW.jpg"
function updatePriceChart(products) {
    const ctx = priceChart.getContext('2d')

    if (myChart) {
        myChart.destroy()
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products.map(p => p.title.substring(0, 20) + '...'),
            datasets: [{
                label: 'Preço',
                data: products.map(p => p.price),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            });
                        }
                    },
                    plugins: {
                        legend: {
                            displayItems: false,
                        },
                        title: {
                            display: true,
                            text: 'Preço dos Produtos',
                            font: { size: 18}
                        }
                    }
                }
            }
        }
    })
}