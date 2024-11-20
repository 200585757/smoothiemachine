// Smoothie Class to handle order details
class Smoothie {
    constructor(size, ingredients, extras, totalPrice) {
        this.size = size;
        this.ingredients = ingredients;
        this.extras = extras;
        this.totalPrice = totalPrice;
    }

    // Method to display the order summary
    displaySummary() {
        let ingredientsList = this.ingredients.length > 0 ? this.ingredients.join(", ") : "None";
        let extrasList = this.extras ? this.extras : "None";
        return `
            <h2>Your Smoothie Order</h2>
            <p><strong>Size:</strong> ${this.size}</p>
            <p><strong>Ingredients:</strong> ${ingredientsList}</p>
            <p><strong>Extras:</strong> ${extrasList}</p>
            <p><strong>Total Price:</strong> $${this.totalPrice.toFixed(2)}</p>
        `;
    }
}

// Event listener for the Order Now button
document.getElementById("orderButton").addEventListener("click", () => {
    // Get the selected size and its price
    const sizeSelect = document.getElementById("size");
    const size = sizeSelect.options[sizeSelect.selectedIndex].text.split(" ")[0];
    const sizePrice = parseFloat(sizeSelect.options[sizeSelect.selectedIndex].text.match(/\$(\d+)/)[1]);

    // Get selected ingredients and their prices
    const ingredients = [];
    let ingredientsPrice = 0;
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        ingredients.push(checkbox.value);
        ingredientsPrice += parseFloat(checkbox.dataset.price);
    });

    // Get selected extras and their prices
    const extrasSelect = document.getElementById("extras");
    const extras = extrasSelect.options[extrasSelect.selectedIndex].text.split(" ")[0] || null;
    const extrasPrice = extras ? parseFloat(extrasSelect.options[extrasSelect.selectedIndex].text.match(/\$(\d+)/)[1]) : 0;

    // Calculate total price
    const totalPrice = sizePrice + ingredientsPrice + extrasPrice;

    // Validate that at least one ingredient is selected
    if (ingredients.length === 0) {
        alert("Please select at least one ingredient.");
        return;
    }

    // Create a Smoothie object to hold the order details
    const smoothie = new Smoothie(size, ingredients, extras, totalPrice);

    // Display the order summary
    const summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = smoothie.displaySummary();
    summaryDiv.style.display = "block";
});
