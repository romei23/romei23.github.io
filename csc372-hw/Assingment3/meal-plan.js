const dishes = [
    { name: 'Wings', price: 10.99 },
    { name: 'Burger', price: 8.99 },
    { name: 'Brisket Fries', price: 12.99 },
    { name: 'Icecream', price: 2.99 },
    { name: 'Hotdog', price: 4.99 },
    { name: 'Drinks', price: 1.99 },
    { name: 'Pizza', price: 12.99 },
    { name: 'Calzone', price: 9.99 },
    { name: 'Cheese Cake', price: 5.99 }
];

let mealPlan = [];
let totalCost = 0;

function updateMealPlan() {
    const mealPlanElement = document.getElementById('meal-plan');
    const totalCostElement = document.getElementById('total-cost');
    mealPlanElement.innerHTML = '';
    mealPlan.forEach((dish, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${dish.name} - $${dish.price.toFixed(2)} 
            <button onclick="removeDish(${index})">Remove</button>
            <button onclick="addDish('${dish.name}', ${dish.price})">Add More</button>`;
        mealPlanElement.appendChild(li);
    });
    totalCostElement.innerText = totalCost.toFixed(2);
}

function addDish(name, price) {
    mealPlan.push({ name, price });
    totalCost += price;
    updateMealPlan();
}

function removeDish(index) {
    totalCost -= mealPlan[index].price;
    mealPlan.splice(index, 1);
    updateMealPlan();
}

window.onload = function() {
    const dishListElement = document.getElementById('dish-list');
    dishes.forEach(dish => {
        const li = document.createElement('li');
        li.innerHTML = `${dish.name} - $${dish.price.toFixed(2)} 
            <button onclick="addDish('${dish.name}', ${dish.price})">Add to Meal Plan</button>`;
        dishListElement.appendChild(li);
    });
}