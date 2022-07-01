function done() {
    document.getElementById("myButton").addEventListener("click", makeRequest)
}

function getDate() {
    return document.getElementById('dateInput').value
}

function genRequest() {
    const apiKey = "api_key=8mxHDFw7oJvLlvhasDKy7fSHZRf467xxaTwFYNeN"
    let date = getDate()
    console.log(typeof(date))
    date = (date !== "")?`date=${date}`:""
    console.log(date)

    return "https://api.nasa.gov/planetary/apod?" + apiKey + "&" + date.toString();
}

function makeRequest() {
    const reqUrl = genRequest()
    let httpReq = new XMLHttpRequest()
    httpReq.onreadystatechange = handleRequest
    httpReq.open("GET", reqUrl)
    httpReq.send()

    function handleRequest() {
        if (httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
            let data = JSON.parse(httpReq.responseText)
            console.log(data)
            const {url, copyright, date, explanation, hdurl, media_type, service_version,
                title} = data
            console.log(url)
            document.getElementById('imgHolder').src = url
            document.getElementById('desc').textContent = explanation
        }
    }
}