const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {


    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente)
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        let ultimos4 = ticketControl.getUltimos4();
        client.broadcast.emit('ultimos4', { ultimos4: ultimos4 });
    })

});


// io.on('connection', (client) => {

//     console.log('Usuario conectado');

//     client.emit('enviarMensaje', {
//         usuario: 'Administrador',
//         mensaje: 'Bienvenido a esta aplicación'
//     });



//     client.on('disconnect', () => {
//         console.log('Usuario desconectado');
//     });

//     // Escuchar el cliente
//     client.on('enviarMensaje', (data, callback) => {

//         console.log(data);

//         client.broadcast.emit('enviarMensaje', data);


//         // if (mensaje.usuario) {
//         //     callback({
//         //         resp: 'TODO SALIO BIEN!'
//         //     });

//         // } else {
//         //     callback({
//         //         resp: 'TODO SALIO MAL!!!!!!!!'
//         //     });
//         // }



//     });

// });