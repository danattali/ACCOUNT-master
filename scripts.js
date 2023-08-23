import Action from "./classes/Action.js";
import ActionsManager from "./classes/ActionsManager.js";

let manager = new ActionsManager();
// let food = new Action("expense", "fruits", 200);
// manager.addAction(food);
// manager.addAction(new Action("income", "salary", 10000));
console.log(manager.actions);
// manager.deleteAction(food.id);
// console.log(manager.actions);
// manager.updateAction(food.id, 350);
manager.calcBalance();
console.log(manager.balance);

// a function that shows all the actions according to manager.actions array

// function showActionsInTable() {
//   for (let action of manager.action) {
//     document.getElementById("actions").innerHTML += `<tr>
//         <td>>${action.description}</td>
//         <td>>${action.amount}</td>
//         <td><i class="fa-regular fa-pen-to-square"></i></td>
//         <td><i class="fa-regular fa-trash-can"></i> </td>
//                 </tr>`;
//   }
// }

// showActionsInTable();

// a function that shows all the actions according to manager.actions array
function showActionsInTable() {
  document.getElementById("actions").innerHTML = "";
  for (let action of manager.actions) {
    document.getElementById("actions").innerHTML += `<tr class=${
      action.type == "income" ? "text-success" : "text-danger"
    }> <td>${action.description} </td> <td>${
      action.amount
    } </td><td><i class="fa-regular fa-pen-to-square" onclick="updateAction(${
      action.id
    })"></i> </td> <td><i class="fa-regular fa-trash-can" onclick="deleteAction(${
      action.id
    })"></i> </td></tr>`;
  }
}
showActionsInTable();

window.addNewAction = () => {
  // take the form values
  let type = document.getElementById("type").value;
  let description = document.getElementById("description").value;
  let amount = +document.getElementById("amount").value;

  // create action object
  let newAction = new Action(type, description, amount);

  // add newAction to manager actions array
  manager.addAction(newAction);
  console.log(manager.actions);
  document.getElementById("type").value = "income";
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  // update localStorage
  localStorage.setItem("Actions", JSON.stringify(manager.actions));
  //call showActionsInTable();
  showActionsInTable();
};

window.updateAction = (id) => {
  //prompt
  let newAmount = prompt("Enter new amount:");
  if (newAmount == null || newAmount == "" || newAmount != +newAmount)
    alert("Sorry! something went wrong");
  else {
    //update action
    manager.updateAction(id, newAmount);
    // update localStorage
    localStorage.setItem("Actions", JSON.stringify(manager.actions));
    // call showActionInTable()
    showActionsInTable();
  }
};

window.deleteAction = (id) => {
  //prompt
  if (confirm("Please confirm\nEither OK or Cancel.")) {
    //delete action
    manager.deleteAction(id);
    // update localStorage
    localStorage.setItem("Actions", JSON.stringify(manager.actions));
    // call showActionInTable()
    showActionsInTable();
  }
};
