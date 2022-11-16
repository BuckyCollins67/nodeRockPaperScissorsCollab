document.querySelector('#button').addEventListener('click', choice)


async function choice(){  //async simplifies promises, makes it more readable

  const choice = document.querySelector("#choice").value; //variable grabbed from input
  const res = await fetch(`/api?student=${userName}`)  //fetch somethign, wait for it, use that data as "username"
  const data = await res.json()
  console.log(data);

//conditional based on data from server.js

  // document.querySelector("#personName").textContent = data.name  //on the dom, replace the person name with the data you got from the fetch
  // document.querySelector("#personStatus").textContent = data.status
  // document.querySelector("#personOccupation").textContent = data.currentOccupation
}