class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  submitBudgetForm() {
    // console.log(this.budgetInput.value);
    const value = this.budgetInput.value;
    if (value === "" || value < 0) {
      const self = this;
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML =
        "<p>Value cannot be empty or negative</p>";
      setTimeout(function () {
        self.budgetFeedback.innerHTML = "";
        self.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }
  submitExpenseForm() {
    const self = this;
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if (expenseValue === "" || amountValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML =
        "<p> Value or Amount cannnot empty or negative</p>";
      setTimeout(function () {
        self.expenseFeedback.classList.remove("showItem");
        self.expenseFeedback.innerHTML = "";
      }, 4000);
    } else {
      // let expenseValue = this.totalExpense();
      //this.expenseAmount.textContent = expenseValue;
      //this.showBalance();
      let amount = parseInt(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }
  // add expense
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
    `;

    this.expenseList.appendChild(div);
  }
  //show balance
  showBalance() {
    const expense = this.totalExpense();
    const totalBalance = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = totalBalance;
    if (totalBalance < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (totalBalance > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    } else if (totalBalance == 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  }
  editExpense(edit) {
    console.log(edit.parentElement.getAttribute("data-id"));
    const id = edit.parentElement.getAttribute("data-id");
    let expe = this.itemList.filter(function (item) {
      return item.id == id;
    });
    let tempList = this.itemList.filter(function (item) {
      return item.id != id;
    });
    console.log(tempList);
    this.expenseInput.value = expe[0].title;
    this.amountInput.value = expe[0].amount;
    this.itemList = tempList;
    edit.parentElement.parentElement.parentElement.parentElement.remove();
    this.showBalance();
  }
  deleteExpense(dlt) {
    console.log(dlt);
    const id = dlt.parentElement.getAttribute("data-id");
    let tempList = this.itemList.filter(function (item) {
      return item.id != id;
    });
    console.log(tempList);
    this.itemList = tempList;
    dlt.parentElement.parentElement.parentElement.parentElement.remove();
    this.showBalance();
  }
  //total balance
  totalExpense() {
    let total = 0;
    let len = this.itemList.length;
    for (var x = 0; x < len; x++) {
      total += this.itemList[x].amount;
    }
    return total;
  }
}
function eventListeners() {
  // alert("syed kazim welcome");
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  //new instance of UI class
  const ui = new UI();
  //budget form submit
  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // console.log("from budget");
    ui.submitBudgetForm();
  });
  //expense form submit
  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //console.log("from expense");
    ui.submitExpenseForm();
  });
  //expense list click
  expenseList.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.className === "fas fa-edit") {
      ui.editExpense(event.target);
    } else if (event.target.className === "fas fa-trash") {
      ui.deleteExpense(event.target);
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
