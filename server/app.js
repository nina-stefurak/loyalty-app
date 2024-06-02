import express from 'express';

const app = express();
// Use express.json() middleware to parse JSON bodies
app.use(express.json());

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

//10 random 4 digit codes to be generated
const codes = Array.from({length: 10},
    () => Math.floor(Math.random() * 9000) + 1000);
console.log(codes);

// PUT endpoint to verify submitted code by user, returns true if code is valid and removes it from the list. Returns false otherwise.
app.put('/verify', (req, res) => {
  const code = parseInt(req.body.code);
  const index = codes.indexOf(code);
  if (index !== -1) {
    codes.splice(index, 1);
    console.log(codes);
    res.end('true');
  } else {
    res.end('false');
  }
});

// run with node server.mjs