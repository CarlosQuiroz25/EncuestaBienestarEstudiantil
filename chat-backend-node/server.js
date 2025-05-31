const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRouter = require('./routes/chat');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/chat', chatRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});