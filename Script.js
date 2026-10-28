const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList =
    document.getElementById("transaction-list");

let transactions = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (
        title === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        alert("Please enter valid transaction details.");
        return;
    }

    transactions.push({
        title: title,
        amount: amount,
        type: type
    });

    updateDashboard();

    form.reset();
});

function updateDashboard() {
    let income = 0;
    let expenses = 0;

    transactionList.replaceChildren();

    transactions.forEach(function(transaction) {
        const item = document.createElement("li");

        item.textContent =
            transaction.title + " - ₹" +
            transaction.amount.toFixed(2) +
            " (" + transaction.type + ")";

        transactionList.appendChild(item);

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    document.getElementById("income").textContent =
        income.toFixed(2);

    document.getElementById("expenses").textContent =
        expenses.toFixed(2);

    document.getElementById("balance").textContent =
        (income - expenses).toFixed(2);
                            }
