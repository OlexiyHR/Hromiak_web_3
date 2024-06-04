const initialProducts = [
    'Помідори',
    'Сир',
    'Печиво'
];

const productNameInput = document.getElementById('NewProduct');
const addButton = document.getElementById('AddProduct');
const productsList = document.getElementById('productsList');

initialProducts.forEach(productName => addProduct(productName));


addButton.addEventListener('click', () => {
    const productName = productNameInput.value.trim();

    if (!productName) {
        alert('Введіть назву товару');
        return;
    }

    addProduct(productName);
    productNameInput.value = '';
    addButton.focus();
});

productNameInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const productName = productNameInput.value.trim();

    if (!productName) {
      alert('Введіть назву товару');
      return;
    }

    addProduct(productName);
    productNameInput.value = '';
    productNameInput.focus();
  }  
});

function addProduct(productName) {
    const productDiv = document.getElementById('New').cloneNode(true);
    const productNameSpan = productDiv.querySelector('.product-name1');
    productNameSpan.textContent = productName;
    productsList.appendChild(productDiv);
    productDiv.style.display = 'flex';


    const deleteButton = productDiv.querySelector('.Delete');
    deleteButton.addEventListener('click', (event) => {
        const productDiv = event.target.closest('.product2');
        productsList.removeChild(productDiv);
    });

    const BuyButton = productDiv.querySelector('.white-rectengular');
    BuyButton.addEventListener('click', (event) => {
            const oldDiv = event.target.closest('.product2');
            const counterSpan = oldDiv.querySelector('.counter').textContent;

            let newDiv = document.getElementById('Bought').cloneNode(true);
            newDiv.querySelector('.counter').textContent = counterSpan;

            productsList.replaceChild(oldDiv, newDiv);
            newDiv.style.display = 'flex';
        });

}



function decreaseProductCount(button) {
    const productDiv = button.parentNode.parentNode;
    const counterSpan = productDiv.querySelector('.counter');
    let count = parseInt(counterSpan.textContent);

    if (count > 1) {
        count--;
        counterSpan.textContent = count;
    }
}

function increaseProductCount(button) {
    const productDiv = button.parentNode.parentNode;
    const counterSpan = productDiv.querySelector('.counter');
    let count = parseInt(counterSpan.textContent);
    count++;
    counterSpan.textContent = count;
}