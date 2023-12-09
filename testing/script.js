fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const foodCardContainer = document.getElementById('foodCardContainer');
    const drinkCardContainer = document.getElementById('drinkCardContainer');

    data.food.forEach(product => {
      const card = createCard(product);
      foodCardContainer.appendChild(card);
    });

    data.drink.forEach(product => {
      const card = createCard(product);
      drinkCardContainer.appendChild(card);
    });
  });

function createCard(product) {
  const card = document.createElement('div');
  card.className = 'card';

  const image = document.createElement('img');
  image.src = product.image;
  card.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = product.title;
  card.appendChild(title);

  const price = document.createElement('p');
  price.textContent = '$' + product.price;
  card.appendChild(price);

  return card;
}