const express = require('express')
const moment = require('moment/moment');

const app = express()
const port = 3000

const fs = require('fs');
const path = require('path');

// create a write stream for the log file
const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

// write the current timestamp to the log file
function writeTimestamp() {
  const timestamp = moment();
  logStream.write(`${timestamp}\n`);
}

// call writeTimestamp() every minute
const intervalId = setInterval(writeTimestamp, 60000);

// log when the program is started
console.log('Logging started.');

// stop the interval and close the log file stream when the program is terminated
process.on('SIGINT', () => {
  clearInterval(intervalId);
  logStream.end();
  console.log('Logging stopped.');
});


app.get('/', (req, res) => {
  console.log(moment())
  res.send('<h1>Hello World!</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
