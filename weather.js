let resp = axios.get('https://api.weatherapi.com/v1/current.json?q=12.9716%2C77.5946&lang=english&key=aa1bfd843fba4c46a98181821232306').then(function(data){
        console.log(data.data);
});;