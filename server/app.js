import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, '0.0.0.0', () => {
  console.log('Listening on 0.0.0.0:3000');
});

//random  codes 
const codes = Array.from({length: 50},
    () => Math.floor(Math.random() * 9000) + 1000);
console.log(codes);

//  endpoint verify 
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