document.getElementById('expForm').addEventListener('submit', addExpense);

    async function addExpense(e) {
      e.preventDefault();

      let type = document.getElementById('type').value;
      let name = document.getElementById('name').value;
      let date = document.getElementById('date').value;
      let amount = document.getElementById('amount').value;

      if(!type || type === 'chooseOne' || !name || !date || isNaN(amount) || parseFloat(amount) <= 0) {
         displayErrorMessage('Please check if all the fields are entered and valid');
         return;
      }

      function displayErrorMessage(message) {
         const errorElement = document.createElement('div');
         errorElement.className = 'error-message';
         errorElement.textContent = message;
         document.body.appendChild(errorElement);
       }

      if (type && name && date && amount > 0) {
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, name, date, amount }),
        });

        if (response.ok) {
          const newExpense = await response.json();
          showExpenses();
          console.log('New Expense has been added :', newExpense);
        } else {
          console.error('Failed to add a new expense');
        }
      } else {
        console.error('Expense data is invalid');
      }

      document.getElementById('expForm').reset();
    }

    document.getElementById('modifyForm').addEventListener('submit', async function (e) {
      e.preventDefault();
    
      const expenseId = document.getElementById('modifyExpenseId').value;
      const modifiedData = {
        type: document.getElementById('modifyType').value,
        name: document.getElementById('modifyName').value,
        date: document.getElementById('modifyDate').value,
        amount: document.getElementById('modifyAmount').value,
      };
    
      if (expenseId && modifiedData.type && modifiedData.name && modifiedData.date && modifiedData.amount > 0) {
        modifyExpense(expenseId, modifiedData);
      } else {
        console.error('Modified data is invalid');
      }
    });
    

    async function showExpenses() {
      const response = await fetch('/api/expenses');
      const expenses = await response.json();

      const expenseTable = document.getElementById('expenseTable');
      expenseTable.innerHTML = ``;

      

      expenses.forEach((expense) => {
        expenseTable.innerHTML += `
          <tr>
            <td>${expense.type}</td>
            <td>${expense.name}</td>
            <td>${expense.date}</td>
            <td>$${expense.amount}</td>
            <td><button class="deleteButton" onclick="deleteExpense('${String(expense._id)}')">Delete</button></td>
            <td><button class="modifyButton" onclick="openModifyPopup('${expense._id}', '${expense.type}', '${expense.name}', '${expense.date}', ${expense.amount})">Modify</button></td>

          </tr>
        `;
      });

      const highestExpense = findHighestExpense(expenses);
      displayHighestExpense(highestExpense);

      localStorage.setItem('highestExpense', JSON.stringify(highestExpense));
      try {
         localStorage.setItem('highestExpense', JSON.stringify(highestExpense));
        
       } catch (error) {
         console.error('Error handling local storage :', error);
       }

    }


    function findHighestExpense(expenses) {
      return expenses.reduce((maxExpense, currentExpense) => {
         const currentAmount = parseFloat(currentExpense.amount);
         const maxAmount = parseFloat(maxExpense.amount);
     
         return currentAmount > maxAmount ? currentExpense : maxExpense;
      }, { amount: 0 });
    }

    function displayHighestExpense(highestExpense) {
      const highestExpenseWindow = document.getElementById('highestExpenseWindow');
      highestExpenseWindow.innerHTML = `
        <h2>Highest Expense</h2>
        <p>Type: ${highestExpense.type}</p>
        <p>Name: ${highestExpense.name}</p>
        <p>Date: ${highestExpense.date}</p>
        <p>Amount: $${highestExpense.amount}</p>
      `;
    }

   async function deleteExpense(id) {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        showExpenses();
      } else {
        console.error('Failed to delete the expense');
      }
    }
    
   
    function openModifyPopup(expenseId, expenseType, expenseName, expenseDate, expenseAmount) {
      document.getElementById('modifyExpenseId').value = expenseId;
      document.getElementById('modifyType').value = expenseType;
      document.getElementById('modifyName').value = expenseName;
      document.getElementById('modifyDate').value = expenseDate;
      document.getElementById('modifyAmount').value = expenseAmount;
      document.getElementById('modifyPopup').style.display = 'block';
    }
    
    
    function closeModifyPopup() {
      document.getElementById('modifyPopup').style.display = 'none';
    }

    async function modifyExpense(id, modifiedData) {
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(modifiedData),
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
          showExpenses();
          closeModifyPopup();
        } else {
          console.error('Failed to modify the expense');
        }
      } catch (error) {
        console.error('Error is found when modifying the expense : ', error);
      }
    }

    showExpenses();