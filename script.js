const initialProducts = [
    'Помідори',
    'Сир',
    'Печиво'
];
const addedProducts = initialProducts.slice();

const productNameInput = document.getElementById('NewProduct');
const addButton = document.getElementById('AddProduct');
const productsList = document.getElementById('productsList');
const remainingItems = document.getElementById('remainingProducts');
const boughtItems = document.getElementById('boughtProducts');

initialProducts.forEach(productName => addProduct(productName));


addButton.addEventListener('click', () => {
    const productName = productNameInput.value.trim();

    if (!productName) {
        alert('Введіть назву товару');
        return;
    }
    if (addedProducts.includes(productName)) {
        alert("Don't input the same product");
    } else {
        addProduct(productName);
        addedProducts.push(productName);
        productNameInput.value = '';
        productNameInput.focus();
    }
});

productNameInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const productName = productNameInput.value.trim();

      if (!productName) {
          alert('Введіть назву товару');
          return;
      }
      if (addedProducts.includes(productName)) {
          alert("Don't input the same product");
      } else {
          addProduct(productName);
          addedProducts.push(productName);
          productNameInput.value = '';
          productNameInput.focus();
      }
  }  
});

function addProduct(productName) {
    const productDiv = document.getElementById('New').cloneNode(true);
    const productNameSpan = productDiv.querySelector('.product-name1');

    productNameSpan.textContent = productName;
    productDiv.style.display = 'flex';
    productsList.appendChild(productDiv);

    updateStatistics();

    const deleteButton = productDiv.querySelector('.Delete');
    deleteButton.addEventListener('click', (event) => {
        deleteProduct(event);
    });

    const BuyButton = productDiv.querySelector('.white-rectengular');
    BuyButton.addEventListener('click', (event) => {
        buyProduct(event);
    });

    const productNameInput = productDiv.querySelector('.product-name1');
    productNameInput.addEventListener('click', () => {
        changeName(productNameSpan, updateStatistics);
    });

    const counterSpan = productDiv.querySelector('.counter');
    const plusButton = productDiv.querySelector('.green-circle');
    plusButton.addEventListener('click', (event) => {
       increaseCounter(event, counterSpan);
    });
}

function deleteProduct(event) {
    const productDiv = event.target.closest('.product2');

    const productName = productDiv.querySelector('.product-name1').textContent;
    const index = addedProducts.indexOf(productName);
    if (index !== -1) {
        addedProducts.splice(index, 1);
    }
    productsList.removeChild(productDiv);

    updateStatistics();
}

function buyProduct(event){
        const oldDiv = event.target.closest('.product2');
        const counter = oldDiv.querySelector('.counter').textContent;
        const productName = oldDiv.querySelector('.product-name1').textContent;

        let newDiv = document.getElementById('Bought').cloneNode(true);
        newDiv.querySelector('.counter').textContent = counter;
        newDiv.querySelector('.product-name').textContent = productName;
        newDiv.style.display = 'flex';
        oldDiv.replaceWith(newDiv);

        updateStatistics();

        const CancelButton = newDiv.querySelector('.Cancel');
        CancelButton.addEventListener('click', (e) => {
            cancelPurchase(e);
        });
}

function cancelPurchase(event){
        const oldDiv = event.target.closest('.product1');
        const counterSpan = oldDiv.querySelector('.counter');
        const productNameSpan = oldDiv.querySelector('.product-name');
        const counter = parseInt(counterSpan.textContent);
        const productName = productNameSpan.textContent;

        let newDiv;
        if (counter == 1) {
            newDiv = document.getElementById('New').cloneNode(true);
        } else {
            newDiv = document.getElementById('Changed').cloneNode(true);
            newDiv.querySelector('.counter').textContent = counter;
        }
        const newProductNameSpan = newDiv.querySelector('.product-name1');
        newProductNameSpan.textContent = productName;
        newDiv.style.display = 'flex';
        oldDiv.replaceWith(newDiv);

        updateStatistics();

        const deleteButton = newDiv.querySelector('.Delete');
        deleteButton.addEventListener('click', (e) => {
            deleteProduct(e);
        });

        const BuyButton = newDiv.querySelector('.white-rectengular');
        BuyButton.addEventListener('click', (e) => {
            buyProduct(e);
        });

        const productNameInput = newDiv.querySelector('.product-name1');
        productNameInput.addEventListener('click', () => {
            changeName(newProductNameSpan, updateStatistics);
        });

        const newCounterSpan = newDiv.querySelector('.counter');

        const plusButton = newDiv.querySelector('.green-circle');
        plusButton.addEventListener('click', (e) => {
           increaseCounter(e, newCounterSpan);
        });

        if(counter>1){
            const minusButton = newDiv.querySelector('.red-circle');
            minusButton.addEventListener('click', (e) => {
                decreaseCounter(e, newCounterSpan);
            });
        }
}

function changeName (productNameSpan, updateStatisticsCallback){
        const productName = productNameSpan.textContent;
        const parentElement = productNameSpan.parentElement;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = productName;
        inputField.classList.add('edit-product-name');
        inputField.maxLength = 20;

        let change = true;

        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (change) {
                    change = false;
                    finishInput(productNameSpan, inputField, updateStatisticsCallback);
                }
            }
        });

        inputField.addEventListener('blur', () => {
            if (change) {
                change = false;
                finishInput(productNameSpan, inputField, updateStatisticsCallback);
            }
        });

        productNameSpan.replaceWith(inputField);
        inputField.focus();
}

function finishInput (productNameSpan, inputField, updateStatisticsCallback) {
        const updatedName = inputField.value.trim();
        if (updatedName.length === 0) {
            inputField.replaceWith(productNameSpan);
        } else {
            productNameSpan.textContent = updatedName;
            inputField.replaceWith(productNameSpan);
            updateStatisticsCallback();
        }
}

function increaseCounter(event, counterSpan) {
    let counter = parseInt(counterSpan.textContent);
    counter++;
    counterSpan.textContent = counter;

    updateStatistics();

    if(counter === 2){
        const oldDiv = event.target.closest('.product2');
        const productNameSpan = oldDiv.querySelector('.product-name1');
        const productName = productNameSpan.textContent;

        let newDiv = document.getElementById('Changed').cloneNode(true);
        newDiv.querySelector('.counter').textContent = counter;
        newProductNameSpan = newDiv.querySelector('.product-name1');
        newProductNameSpan.textContent = productName;
        newDiv.style.display = 'flex';
        oldDiv.replaceWith(newDiv);

        updateStatistics();

        const deleteButton = newDiv.querySelector('.Delete');
        deleteButton.addEventListener('click', (e) => {
            deleteProduct(e);
        });

        const BuyButton = newDiv.querySelector('.white-rectengular');
        BuyButton.addEventListener('click', (e) => {
            buyProduct(e);
        });

        const productNameInput = newDiv.querySelector('.product-name1');
        productNameInput.addEventListener('click', () => {
           changeName(newProductNameSpan, updateStatistics);
        });

        const newCounterSpan = newDiv.querySelector('.counter');

        const plusButton = newDiv.querySelector('.green-circle');
        plusButton.addEventListener('click', (e) => {
           increaseCounter(e, newCounterSpan);
        });

        const minusButton = newDiv.querySelector('.red-circle');
        minusButton.addEventListener('click', (e) => {
           decreaseCounter(e, newCounterSpan);
        });
    }
}

function decreaseCounter(event, counterSpan) {
        let counter = parseInt(counterSpan.textContent);
        counter--;
        counterSpan.textContent = counter;

        updateStatistics();

        if(counter === 1){
            const oldDiv = event.target.closest('.product2');
            const productNameSpan = oldDiv.querySelector('.product-name1');
            const productName = productNameSpan.textContent;

            let newDiv = document.getElementById('New').cloneNode(true);
            newProductNameSpan = newDiv.querySelector('.product-name1');
            newProductNameSpan.textContent = productName;
            newDiv.style.display = 'flex';
            oldDiv.replaceWith(newDiv);

            updateStatistics();

            const deleteButton = newDiv.querySelector('.Delete');
            deleteButton.addEventListener('click', (e) => {
                deleteProduct(e);
            });

            const BuyButton = newDiv.querySelector('.white-rectengular');
            BuyButton.addEventListener('click', (e) => {
                buyProduct(e);
            });

            const productNameInput = newDiv.querySelector('.product-name1');
            productNameInput.addEventListener('click', () => {
                changeName(newProductNameSpan, updateStatistics);
            });

            const newCounterSpan = newDiv.querySelector('.counter');
            const plusButton = newDiv.querySelector('.green-circle');
            plusButton.addEventListener('click', (e) => {
                increaseCounter(e, newCounterSpan);
            });
        }
}

function updateStatistics() {
        remainingItems.innerHTML = '';
        boughtItems.innerHTML = '';

        const allProducts = Array.from(productsList.querySelectorAll('.product2, .product1'));

        const remainingProducts = allProducts.filter(product =>
            product.classList.contains('product2') &&
            getComputedStyle(product).display !== 'none'
        );

        remainingProducts.forEach(product => {
            const productNameElement = product.querySelector('.product-name1');
            const productName = productNameElement.textContent;
            const counter = product.querySelector('.counter').textContent;
            const remainingItem = document.createElement('span');
            remainingItem.classList.add('product-item');
            remainingItem.innerHTML = `${productName} <span class="amount">${counter}</span>`;
            remainingItems.appendChild(remainingItem);
        });

        const boughtProducts = allProducts.filter(product =>
            product.classList.contains('product1') &&
            getComputedStyle(product).display !== 'none'
        );

        boughtProducts.forEach(product => {
            const productNameElement = product.querySelector('.product-name');
            const productName = productNameElement.textContent;
            const counter = product.querySelector('.counter').textContent;
            const boughtItem = document.createElement('span');
            boughtItem.classList.add('product-item');
            boughtItem.innerHTML = `${productName} <span class="amount1">${counter}</span>`;
            boughtItems.appendChild(boughtItem);
        });
}