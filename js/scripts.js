var token;
var btc;
var cripto;


function login(){
  axios.post('http://localhost:1337/auth/local', {
          identifier: 'admin@example.com',
          password: '123456',
        })
        .then(response => {
          token = "Bearer "+response.data.jwt;
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
}

function consultarApiBitcoin(){
  axios.get('https://api.coindesk.com/v1/bpi/currentprice/ARS.json')
      .then(response => {
        btc = response;
      })
      .catch(error => {
        console.log("Error");
      });
  setTimeout(function(){
    var hoy = new Date(btc.data.time.updated);
    axios.post('http://localhost:1337/criptos', {
          usd: btc.data.bpi.USD.rate_float,
          ars: btc.data.bpi.ARS.rate_float,
          update: hoy,
          },{
          headers: {
            Authorization: token,
            },
          }).then(response => {
            console.log('Data: ', response);
          })
          .catch(error => {
            console.log('An error occurred:', error.response);
          });
  }, 1000);
}

function getCriptomoneda(){
  axios.get('http://localhost:1337/criptos', {
    headers: {
      Authorization: token,
    }
  }).then(response => {
    console.log('Data: ', response.data, response);
    longitud = response.data.length-1;
    cripto = response.data[longitud];
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });

  setTimeout(function(){
    $('#resultados').html(' ');

    $('#resultados').append('<table class="table">'+
                              '<thead>'+
                                '<tr>'+
                                  '<th scope="col">#</th>'+
                                  '<th scope="col">Fecha</th>'+
                                  '<th scope="col">Valor en ARS</th>'+
                                  '<th scope="col">Valor en USD</th>'+
                                  '<th scope="col">Eliminar</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody>'+
                                forEach((cripto, i) => {
                                  '<tr>'+

                                  '</tr>'
                                });+
                              '</tbody>'+
                              '</table>');

  }, 1000);
}
