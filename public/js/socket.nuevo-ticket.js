//comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor')
});

socket.on('disconnect', function() {
    console.log('desconectado del servidor')
});

socket.on('estadoActual', function(data) {
    console.log(data)
    label.text(data.actual);
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', {}, function(siguienteTicket) {
        console.log(siguienteTicket)
        label.text(siguienteTicket);
    })
})