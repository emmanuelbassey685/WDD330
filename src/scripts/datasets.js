// Select all list items
const items = document.querySelectorAll("#items li");

// Select the details container
const details = document.querySelector("#details");

// Loop through each item
items.forEach(item => {

    // Display dataset values in the console
    console.log("Name:", item.dataset.name);
    console.log("Category:", item.dataset.category);
    console.log("Color:", item.dataset.color);

    // Add click event
    item.addEventListener("click", () => {

        details.innerHTML = `
            <h2>Item Details</h2>

            <p><strong>Name:</strong> ${item.dataset.name}</p>

            <p><strong>Category:</strong> ${item.dataset.category}</p>

            <p><strong>Color:</strong> ${item.dataset.color}</p>
        `;
    });

});