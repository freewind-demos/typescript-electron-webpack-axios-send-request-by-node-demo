import './index.css';

import axios from 'axios';

const button = document.getElementById('button')!;
const messages = document.getElementById('messages')!;

axios.defaults.adapter = require('axios/lib/adapters/http');

button.onclick = async () => {

  const response = await axios.get('http://httpbin.org/get', {
    headers: {
      'Cookie': 'aaa=111'
    }
  })
  messages.innerText = JSON.stringify(response.data, null, 4);
}

