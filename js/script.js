

// populates the table
function populateTable(users) {
  for (let user of users) { //goes through the values of the of the array users
      delete user._id; //deletes index _id
      delete user.__v; // deletes index __v
      let row = document.createElement('tr'); // creates a row
      for (let key in user) { //goes through the properties of the object user?
          let column = document.createElement('td'); //creates a table cell
          column.innerHTML = user[key];
          row.append(column);
      }
      document.getElementById('tbody').append(row);
  }
}

function fetchData() {
  fetch('https://kupa-44-2-hellodb.herokuapp.com/api/users')
    .then(res => res.json())
    .then(users => {
      populateTable(users);
    })
}

function fetchUser() {
  let id = document.getElementById('userId').value; //get userId value
  if (isNaN(id)) return; // if userId is NaN, terminate
  if (id === '') { //if userId doest have any value, fetchData
    let oldTBody = document.getElementById('tbody');
    let newTBody = document.createElement('tbody');
    newTBody.id = 'tbody';
    oldTBody.replaceWith(newTBody);
    fetchData();
  }
  fetch(`https://kupa-44-2-hellodb.herokuapp.com/api/user/${id}`)
    .then(res => res.json())
    .then(user => {
      let users = [user];  //define users as the array user
      if (users[0] !== null) { //if users isnt null, load it into the table
        //replace old table with the new one
        let oldTBody = document.getElementById('tbody');
        let newTBody = document.createElement('tbody');
        newTBody.id = 'tbody';
        oldTBody.replaceWith(newTBody);
        // load the row
        populateTable(users);
        // update the UI
        document.getElementById('table').hidden = false;
        document.getElementById('nores').innerHTML = '';
      } else {
        // if the id doest exist, respond with:
        document.getElementById('table').hidden = true;
        document.getElementById('nores').innerHTML = 'No results';
      }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});




