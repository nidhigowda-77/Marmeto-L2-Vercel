const mensData = document.getElementById('men')

async function fetchData() {

  try {

    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const activeLink = document.querySelector('.section .category.active');

    if (activeLink) { // Check if there's an active link
      const emojiDiv = activeLink.querySelector('.emoji');
      const h2Element = emojiDiv.querySelector('h2');
      h2Element.style.color = 'white'; 

    }
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
//this is the data fetched for the initial render
fetchData().then(data => {

  const defaultValue = data.categories[0];
  console.log(defaultValue);

  defaultValue.category_products.map(val => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
<img src="${val.image}">
<div class="product-info">
<h3>${val.title}</h3>
<span >.${val.vendor}</span>
</div>
<div class="prices">
<p>RS ${val.compare_at_price}.00</p>
<p>${val.price}.00</p>
<p>$50% Off</p>
</div>

<hr>

${val.badge_text ? `<p class="badge">${val.badge_text}</p>` : ''}    <button class="buttonCart">Add To Cart</button>
`;
    mensData.appendChild(productElement);
  })

});
// 
const sectionElement = document.querySelector('.section'); // Get the section element

const categoryLinks = sectionElement.querySelectorAll('a.no-underline'); // Select all anchor elements with class "no-underline"

const emojiDivs = document.querySelectorAll('.emoji');


//to change the color of the categories
categoryLinks.forEach(categoryLink => {
  categoryLink.addEventListener('click', (event) => {
    event.preventDefault();
    categoryLinks.forEach(link => link.classList.remove('active'));
    categoryLink.classList.add('active');
    const emojiDiv = categoryLink.querySelector('.emoji');
    const h2Element = emojiDiv.querySelector('h2');
    h2Element.style.color = 'white';
    const allEmojiDivs = document.querySelectorAll('.section .emoji');
    const emojiDivs = document.querySelectorAll('.emoji');

     allEmojiDivs.forEach(innerEmojiDiv => {
      if (innerEmojiDiv !== emojiDiv) {
        const innerH2 = innerEmojiDiv.querySelector('h2');
        innerH2.style.color = 'black';
      }
    });
  });
});

// to make the state active and render the data as per the title
categoryLinks.forEach(categoryLink => {

  categoryLink.addEventListener('click', (event) => {
    event.preventDefault();
    let categoryText = categoryLink.querySelector('h2').textContent.trim();
    document.querySelector('.active').classList.remove('active');
    categoryLink.classList.add('active')

    fetchData().then(data => {

      mensData.innerHTML = '';
      const menData = data.categories[0];
      const womenData = data.categories[1];
      const kidData = data.categories[2];

      if (categoryText == "Men") {

        menData.category_products.map(val => {
          const productElement = document.createElement('div');
          productElement.classList.add('product');

          productElement.innerHTML = `
    <img src="${val.image}">
    <div class="product-info">
    <h3>${val.title}</h3>
    <span >.${val.vendor}</span>
    </div>
    <div class="prices">
    <p>RS ${val.compare_at_price}.00</p>
    <p>${val.price}.00</p>
    <p>$50% Off</p>
</div>

<hr>
    
${val.badge_text ? `<p class="badge">${val.badge_text}</p>` : ''}    
<button class="buttonCart">Add To Cart</button>`;
          mensData.appendChild(productElement);
        })

      }
      // this is for the women section data 
      else if (categoryText == "Women") {

        womenData.category_products.map(val => {
          const productElement = document.createElement('div');
          productElement.classList.add('product');

          productElement.innerHTML = `
    <img src="${val.image}">
    <div class="product-info">
    <h3>${val.title}</h3>
    <span >.${val.vendor}</span>
    </div>
    <div class="prices">
    <p>RS ${val.compare_at_price}.00</p>
    <p>${val.price}.00</p>
    <p>$50% Off</p>
</div>
<hr>
    
${val.badge_text ? `<p class="badge">${val.badge_text}</p>` : ''}    
<button class="buttonCart">Add To Cart</button>`;
          mensData.appendChild(productElement);
        })
      } 
      // this is for the kids section data
      else if (categoryText == "Kids") {

        kidData.category_products.map(val => {
          const productElement = document.createElement('div');
          productElement.classList.add('product');

          productElement.innerHTML = `
    <img src="${val.image}">
    <div class="product-info">
    <h3>${val.title}</h3>
    <span >.${val.vendor}</span>
    </div>
    <div class="prices">
    <p>RS ${val.compare_at_price}.00</p>
    <p>${val.price}.00</p>
    <p>$50% Off</p>
</div>
<hr>

    
${val.badge_text ? `<p class="badge">${val.badge_text}</p>` : ''}    
<button class="buttonCart">Add To Cart</button>
    `;
          mensData.appendChild(productElement);
        })
      }
    }).catch(error => {
      console.error("Error fetching data:", error);
    });

  });
});

