

// TODO: Take user input from HTML document



// TODO: Generate a random Choice
let compChoice = Math.ceil(Math.random() * 3)//returns random number between 1 and 3
// TODO: put this code in a function and return rock, paper or scissors.
// TODO: Assign string of rock, paper, and scissors to value generated.




// TODO: Determine Winner -Bucky
// TODO: Return Winner -Bucky
function determineWinner(playerChoice, compChoice){
  if(playerChoice == 'scissors' && compChoice == 'rock'){
    console.log('You lose!')
    return 'playerLose'
  }else if(playerChoice == 'scissors' && compChoice == 'paper'){
    console.log('You win!')
    return 'playerWin'
  }else if(playerChoice == 'scissors' && compChoice == 'scissors'){
    console.log('It\'s a draw!')
    return 'playerDraw'
  }else if(playerChoice == 'rock' && compChoice == 'rock'){
    console.log('It\'s a draw!')
    return 'playerDraw'
  }else if(playerChoice == 'rock' && compChoice == 'paper'){
    console.log('You lose!')
    return 'playerLose'
  }else if(playerChoice == 'rock' && compChoice == 'scissors'){
    console.log('You win!')
    return 'playerWin'
  }else if(playerChoice == 'paper' && compChoice == 'rock'){
    console.log('You win!')
    return 'playerWin'
  }else if(playerChoice == 'paper' && compChoice == 'paper'){
    console.log('It\'s a draw!')
    return 'playerDraw'
  }else if(playerChoice == 'paper' && compChoice == 'scissors'){
    console.log('You lose!')
    return 'playerLose'
  }else{
    console.log('error')
  }
}




// TODO: Return results to DOM

const http = require('http');  //allows us access to the internet
const fs = require('fs')  //gives us access to the file system
const url = require('url');  //gives us access to url resolution
const querystring = require('querystring');  //allows us to ask for things in the url
const figlet = require('figlet')  //makes cool asci art

const server = http.createServer((req, res) => {  //server creation starts here!

  const readWrite = (file, contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);


  switch (page) {
    case '/':
      readWrite('index.html', 'text/html')
      break;
    case '/otherpage':
      readWrite('otherpage.html', 'text/html')
      break;
    case '/otherotherpage':
      readWrite('otherotherpage.html', 'text/html')
      break;
    case '/api':
      let flipResult = "type 'flip' in the input box"
      if (params['student']== 'flip') {
        flipResult = Math.random() <= .5 ? "heads" : "tails"
      }
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: flipResult,
          
        }
        res.end(JSON.stringify(objToJson));
      break;
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break;
    default:  
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });

  }


});

server.listen(8000);
