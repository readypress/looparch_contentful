import React from 'react'
import { Helmet } from 'react-helmet'

class GoogleMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const LOOPARCH_MAPS_KEY = this.props.API_KEY

    return (
      <section className="">
        <Helmet>
          <script type="text/javascript">
            {`
            const looparch = {lat: 33.484319, lng: -112.047970};
            const looparchPlaceID = 'ChIJu8uonngSK4cRyrk911TEaok';
            let map
            let marker
            let infowindow
            let service

            function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
                center: looparch,
                zoom: 10
              });

              infowindow = new google.maps.InfoWindow()
              service = new google.maps.places.PlacesService(map)

              service.getDetails({
                placeId: looparchPlaceID
              }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP,
                  });
                  google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                      place.formatted_address + '</div>');
                    infowindow.open(map, this);
                  });
                }
              })
            }`}
          </script>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${LOOPARCH_MAPS_KEY}&libraries=places&callback=initMap`}
            async
            defer
          />
        </Helmet>
        <div className="">
          <div
            id="map"
            css={{
              display: 'block',
              height: '20rem',
            }}
          />
        </div>
      </section>
    )
  }
}

export default GoogleMap
