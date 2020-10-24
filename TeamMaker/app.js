(function() {
    const cartBtn = document.querySelectorAll('.store-item-icon');
    const clearCart = document.getElementById('clear-cart');
    const checkOut = document.getElementById('checkout');
    const searchBtn = document.querySelector('.form-control');

    cartBtn.forEach(button => {
        button.addEventListener('click', e => {
            if (e.target.parentElement.classList.contains('store-item-icon')) {
                let fullPath = e.target.parentElement.parentElement.parentElement.previousElementSibling.children[0].src
                console.log(fullPath)
                let pos = fullPath.indexOf("img");
                let partialPath = 'img' + fullPath.slice(pos + 3);
                let item = {};
                item.img = partialPath;
                item.name = e.target.parentElement.nextElementSibling.textContent;
                item.price = e.target.parentElement.parentElement.children[2].textContent.replace('$ ', '');


                const cartItem = document.createElement('div');
                cartItem.id = 'cart-item';
                const players = document.querySelectorAll('#cart-item');

                if (players.length > 4)
                    alert('cant have more than 5')
                else {
                    cartItem.classList = 'class="cart-item d-flex justify-content-between text-capitalize my-3 mr-3 p-3 bg-dark rounded border border-light"';
                    cartItem.innerHTML = `
                <img class="rounded small" src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="cart-item-text">
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                </div>
                <a href="#">
                <i id='cart-item-remove' class="fas fa-trash cart-item-remove mt-3"></i>
                </a>
            `
                    document.getElementById('cart').insertBefore(cartItem, document.querySelector('.cart-total-container'));
                    alert(`${item.name} added to the cart!`);
                    const removeBtn = document.querySelectorAll('.cart-item-remove');
                    removeBtn.forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.target.parentElement.parentElement.remove();
                            showTotals();
                        });
                    });
                    showTotals();
                }
            };
        });
    });

    clearCart.addEventListener('click', () => {
        console.log('ok')
        const items = document.querySelectorAll('#cart-item');
        console.log(items);
        items.forEach(item => item.remove());
        showTotals();
    })

    checkOut.addEventListener('click', () => {
        if (parseInt(document.getElementById('cart-total').textContent) > 15)
            alert('It exceeds the limit of $15 !!!');
    });

    searchBtn.addEventListener('keyup', (e) => {
        const playerText = e.target.value;
        document.querySelectorAll('.col-md-3').forEach(card => card.hidden = true);
        if (playerText != '') {
            const playerNames = document.querySelectorAll('#store-item-name')
            playerNames.forEach(name => {
                let nameText = name.textContent.toLocaleLowerCase();
                if (nameText.includes(playerText)) {
                    name.parentElement.parentElement.parentElement.parentElement.hidden = false;
                }
            });
        } else
            document.querySelectorAll('.col-md-3').forEach(card => card.hidden = false);
    })

})();

function showTotals() {
    let total = 0;
    const items = document.querySelectorAll('.cart-item-price')
    items.forEach(item => total += parseFloat(item.textContent));
    document.querySelector('.item-total').textContent = total.toFixed(2);
    document.getElementById('player-count').textContent = items.length;
    document.getElementById('cart-total').textContent = total.toFixed(2);

};