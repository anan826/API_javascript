const search = document.querySelector('#search')
const btn = document.querySelector('.btn')
const display = document.querySelector('.display')
const news = document.querySelector('.news')
const getApi = async ()=>{
    function getSymbol(){
        return parseInt(search.value)
    }
    const symbol = getSymbol();
    if (!symbol) {
        alert("請輸入股票代號!");
        return;
    }
    const url = `https://yahoo-finance127.p.rapidapi.com/price/${symbol}.TW`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'be6bdfe005mshfacb09df2165815p136709jsn98e82d3ed1d5',
            'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
        }
    };
    const news_url = `https://yahoo-finance127.p.rapidapi.com/news/${symbol}.TW`;
    
    const news_options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'be6bdfe005mshfacb09df2165815p136709jsn98e82d3ed1d5',
		    'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
	    }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        const news_response = await fetch(news_url, news_options);
        const news_result = await  news_response.json();
        console.log(news_result);
        // const responseURL = await fetch(NewsURL, options);
        // const newsResult = await responseURL.json();
        // console.log(newsResult);
        console.log(`
        交易所名稱:${result.exchangeName}
        股票名稱:${result.longName}
        股票代號:${result.symbol}
        開盤價格:${result.regularMarketOpen.fmt}
        收盤前價格:${result.regularMarketPreviousClose.fmt}
        收盤價格:${result.regularMarketPrice.fmt}
        最高價:${result.regularMarketDayHigh.fmt}
        最低價:${result.regularMarketDayLow.fmt}
        貨幣:${result.currency}
        `);
        const stockInfo = `
        <h1>STOCK</h1>
        <p>交易所名稱: ${result.exchangeName}</p>
        <p>股票名稱: ${result.longName}</p>
        <p>股票代號: ${result.symbol}</p>
        <p>開盤價格: ${result.regularMarketOpen.fmt}</p>
        <p>收盤前價格: ${result.regularMarketPreviousClose.fmt}</p>
        <p>收盤價格: ${result.regularMarketPrice.fmt}</p>
        <p>最高價: ${result.regularMarketDayHigh.fmt}</p>
        <p>最低價: ${result.regularMarketDayLow.fmt}</p>
        <p>貨幣: ${result.currency}<br>
        `;
        const newsInfo = `
            <h1>NEWS</h1>
            <p>1: ${news_result[0].title}</p>
            <p>2: ${news_result[1].title}</p>
            <p>3: ${news_result[2].title}</p>
            <p>4: ${news_result[3].title}</p>
            <p>5: ${news_result[4].title}</p>
            <p>6: ${news_result[5].title}</p>
            <p>7: ${news_result[6].title}</p>
            <p>8: ${news_result[7].title}</p>
        `
        console.log(newsInfo); 
        news.innerHTML =newsInfo;
        display.innerHTML = stockInfo;
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', getApi);
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});
