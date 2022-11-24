document.querySelector('#button').addEventListener('click', apiRequest)

async function apiRequest(){
    const userChoice = document.querySelector('#choice').value

    const res = await fetch(`/api?selection=${userChoice}`)
    const data = await res.json()
  
    console.log(data);

    document.getElementById('message').innerText = data.message
    document.getElementById('result').innerText = data.result

}