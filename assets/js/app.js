function initMap() {
    var map = new google.maps.Map(document.getElementById('mapa'), {
        center: {lat: -12.1199718, lng: -77.035641},
        zoom: 3
    });

    var marker = new google.maps.Marker({
        animation: google.maps.Animation.BOUNCE,
        map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos  = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker.setPosition(pos);
            map.setZoom(18);
            map.setCenter(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    /** input autocompletado google places **/
    var origen = document.getElementById("origen");
    var destino = document.getElementById("destino");
    new google.maps.places.Autocomplete(origen);
    new google.maps.places.Autocomplete(destino);

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var calculateAndDisplayRoute = function (directionsService, directionsDisplay){
        var costo = document.getElementById("costo");
        directionsService.route({
            origin: origen.value,
            destination: destino.value,
            travelMode: 'DRIVING'
        }, function(response, status){
            if(status === 'OK'){
                var distancia = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
                costo.innerHTML = "S/. " +  (distancia*1.75).toFixed(2);
                console.log(distancia);
                directionsDisplay.setDirections(response);
                marker.setMap(null);
            }
            else{
                window.alert("No encontramos una ruta.");
            }
        });
    }

    directionsDisplay.setMap(map);
    var trazarRuta = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay)
    };

    document.getElementById("ruta").addEventListener("click", trazarRuta);
}

$('#exampleModal').on('show.bs.modal', function (event) {
  var a = $(event.relatedTarget) // Button that triggered the modal
  var recipient = a.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})