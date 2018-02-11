function initMap() {
    var marker;
    //var infoWindow = new google.maps.infoWindow;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0.0, lng: 0.0},
        zoom: 15
    });

        //attempt to get browser's geolocation
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, navError);
        }

        map.addListener('click', function(e) {
            if(marker != null) {
                marker.setPosition(e.latLng);
                map.panTo(marker.position);
            }
            else {
                marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map
                });

                map.panTo(marker.position);
            }

            UpdateHistTable(e.latLng);
            
        });

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            map.setCenter(new google.maps.LatLng(latitude, longitude));
        }

        function navError(error) {
            var message = "";

            //check for known errors
            switch (erro.code) {
                case error.PERMISSION_DENIED:
                    message = 'This website does not have your permission to use the Geolocation API';
                    break;
                
                case error.POSITION_UNAVAILABLE:
                    message = 'Your current position could not be determined.';
                    break;
                
                case error.PERMISSION_DENIED_TIMEOUT:
                    message = 'Your current position could not be determined within the specified timeout';
                    break;
            }

            alert(message);
        }
}