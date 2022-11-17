//--------------------SERVER CREATION STARTS HERE--------------------
const http = require('http');                //allows us access to the internet
const fs = require('fs')                     //gives us access to the file system
const url = require('url');                  //gives us access to url resolution
const querystring = require('querystring');  //allows us to ask for things in the url
const figlet = require('figlet')             //makes cool asci art

const server = http.createServer((req, res) => {  //server creation starts here!

  const readWrite = (file, contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }
  
  //Generate a random Choice for the comp
  const generateCompChoice = () => {
  choice = ['rock', 'paper', 'scissors']
  return choice[Math.ceil(Math.random() * 3)]
}

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);


// TODO: Take user input from HTML document
// TODO: put this code in a function and return rock, paper or scissors.
// TODO: Assign string of rock, paper, and scissors to value generated.
// TODO: Determine Winner -Bucky
// TODO: Return Winner -Bucky
// TODO: Return results to DOM
// index.html has 2 h2 tags.  one with ID of 'result', one with ID of 'winOrLose'

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
       if('selection' in params){
          const botChoice = generateCompChoice();
          const playerChoice = params['selection'];
          if((playerChoice == 'scissors' && botChoice == 'paper') || 
             (playerChoice == 'rock' && botChoice == 'scissors') || 
             (playerChoice == 'paper' && botChoice == 'rock')){
            res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = {
              message : `You chose ${playerChoice} and the comp chose ${botChoice}`, 
              result : "You defeated the comp!"
            }
            res.end(JSON.stringify(objToJson));
          }else if((playerChoice == 'scissors' && botChoice == 'rock') || 
                   (playerChoice == 'paper' && botChoice == 'scissors') || 
                   (botChoice == 'paper' && playerChoice == 'rock')){
            res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = {
              message : `You chose ${playerChoice} and the comp chose ${botChoice}`, 
              result : "You got beat by the comp!"
            }
            res.end(JSON.stringify(objToJson));
          }else if(playerChoice === botChoice){
            res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = {
              message : `You chose ${playerChoice} and the comp chose ${botChoice}`, 
              result : "Too bad you drawed, you couldn\'t beat a simple bot!"
            }
            res.end(JSON.stringify(objToJson)); 
          }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = {
              message : 'Invalid input, enter rock, paper or scissors'
            }
            res.end(JSON.stringify(objToJson));
          }
      }
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
