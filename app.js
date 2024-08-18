const result = document.getElementById("result");
let edit_user = -1;
let current_page = 1;
let items_per_page = 2;

document.addEventListener("DOMContentLoaded", function() {
    photosFn(current_page);
});

async function photosFn(page) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products?_page=${page}&_limit=${items_per_page}`);
        const photos = await response.json();
        displayPhotos(photos);
    } catch (error) {
        console.log(error);
    }
}

function displayPhotos(photos) {
    result.innerHTML = "";

    let cardContainer = document.createElement("div");
    cardContainer.className = "row row-cols-1 row-cols-md-3 g-4";

    photos.forEach((item) => {
        let card = document.createElement("div");
        card.className = "col card-container";
        card.innerHTML = `
            <div class="card photo-card">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Price: <span class="text-primary">$${item.price}</span></p>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">Category: <span class="text-secondary">${item.category}</span></p>
                    <p class="card-meta">Rating: <span class="text-warning">${item.rating.rate} (${item.rating.count} reviews)</span></p>
                    <button class="btn btn-success add-button">Add button</button>
                </div>
            </div>
        `;

        cardContainer.appendChild(card);
    });

    result.appendChild(cardContainer);

    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card-container');
            cardContainer.querySelectorAll('.card-container').forEach(c => {
                if (c !== card) {
                    c.style.display = 'none';
                }
            });
            if (!document.querySelector('.next-button')) {
                const nextButton = document.createElement('button');
                nextButton.textContent = 'Next button';
                nextButton.className = 'btn btn-primary next-button my-3 mx-5';
                result.appendChild(nextButton);

                nextButton.addEventListener('click', function() {
                    cardContainer.querySelectorAll('.card-container').forEach(c => {
                        c.style.display = '';
                    });
                    this.remove();
                });
            }
        });
    });
}



function paginationUsers(total_users) {
    let pagination_controls = document.getElementById("pagination-controls");
    let total_pages = Math.ceil(total_users / items_per_page);
    pagination_controls.innerHTML = "";

    for (let i = 1; i <= total_pages; i++) {
        let page_btn = document.createElement("button");
        page_btn.innerText = i;
        page_btn.className = i === current_page ? "btn btn-primary mx-1" : "btn btn-outline-primary mx-1";
        page_btn.addEventListener("click", function() {
            current_page = i;
            photosFn(current_page);
        });
        pagination_controls.appendChild(page_btn);
    }
}
