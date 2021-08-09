<template>
  <section class="map" ref="map"></section>
</template>
<script>
import { EventBus } from "@/EventBus";
export default {
  name: "DirectionsMapView",
  props: {},

  data() {
    return {
      map: null,
      waypoints: [],
      marker: null,
    };
  },
  mounted() {
    const directionsService = new google.maps.DirectionsService();
    /**
     * Esta función, permita pintar en el mapa la información de la ruta
     * traida en la variable "routes" donde debería ser la ruta de un posible pasajero
     * que el conductor quiera ver.
     */
    EventBus.$on("passengerRoutes-data", (routes) => {
      if (this.$refs["map"] !== undefined) {
        this.map = new google.maps.Map(this.$refs["map"], {
          center: new google.maps.LatLng(4.636973, -74.079335),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
      }
      if (routes !== undefined) {
        routes.forEach(({ origin, destination }) => {
          directionsService.route(
            {
              origin: { lat: origin.lat, lng: origin.lng },
              destination: { lat: destination.lat, lng: destination.lng },
              travelMode: "DRIVING",
            },
            (response, status) => {
              if (status === "OK") {
                new google.maps.DirectionsRenderer({
                  suppressMarkers: true,
                  directions: response,
                  map: this.map,
                  polylineOptions: {
                    strokeColor: "#181B1F",
                    strokeWeight: 2,
                  },
                });
                /**
                 * Esta parte del código envia a la función "createInfoWindowWith" información para mostrar
                 * en el mapa.
                 */
                this.createInfoWindowWith(
                  "Partida",
                  origin.address,
                  origin.lat,
                  origin.lng
                );
                this.createInfoWindowWith(
                  "Destino",
                  destination.address,
                  destination.lat,
                  destination.lng
                );
                const overviewPath = response.routes[0].overview_path;
                const middleIndex = parseInt(overviewPath.length / 2);
                
                /**
                 * Se llama a "google.maps.Marker" para brindar al conductor una mayor claridad en cuanto a la ubicacion
                 * del pasajero tanto para su recogida como para su destino.
                 */
                new google.maps.Marker({
                  position: { lat: origin.lat, lng: origin.lng },
                  map: this.map,
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    strokeColor: "#181B1F",
                    scale: 3,
                  },
                });
                new google.maps.Marker({
                  position: { lat: destination.lat, lng: destination.lng },
                  map: this.map,
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    strokeColor: "#181B1F",
                    scale: 3,
                  },
                });
              }
            }
          );
        });
      }
    });

    EventBus.$on("newMarker", (coords) => {
      let myLatLng = new google.maps.LatLng(coords[0], coords[1]);

      this.marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: "Hello World!",
      });

      this.map.setCenter(myLatLng);
    });

    /**
     * Esta función recibe una posible ruta tentativa del conductor
     * con sus puntos de parada y la pinta en el mapa.
     */
    EventBus.$on("possibleRoute-data", (routes) => {
      this.waypoints = [];
      this.map = new google.maps.Map(this.$refs["map"], {
        center: new google.maps.LatLng(4.636973, -74.079335),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      /**
       * Esta parte del código recibe los "paradas" que el conductor va a realizar
       * y las guarda en la variable "waypoints", con el fin de pintarlas
       * en el mapa.
       */
      routes[2].forEach(({ address, lat, lng }) => {
        let waypoint = { location: { lat: parseFloat(lat), lng: parseFloat(lng) }, stopover: false };
        this.waypoints.push(waypoint);
        this.createInfoWindowWith("Parada", address, parseFloat(lat), parseFloat(lng));
      });
      /**
       * Se hace uso de "google.maps.DirectionsService", para pintar el mapa con el punto de salida,
       * punto de llegada y paradas por parte del conductor.
       */
      directionsService.route(
        {
          origin: { lat: routes[0].lat, lng: routes[0].lng },
          waypoints: this.waypoints,
          destination: { lat: routes[1].lat, lng: routes[1].lng },
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK") {
            new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              directions: response,
              map: this.map,
              polylineOptions: {
                strokeColor: "#181B1F",
                strokeWeight: 2,
              },
            });

            this.createInfoWindowWith(
              "Partida",
              routes[0].address,
              routes[0].lat,
              routes[0].lng
            );
            this.createInfoWindowWith(
              "Destino",
              routes[1].address,
              routes[1].lat,
              routes[1].lng
            );
          }
        }
      );
    });
    EventBus.$on("generateMarker", (point) => {
      this.map = new google.maps.Map(this.$refs["map"], {
        center: new google.maps.LatLng(
          parseFloat(point.favLatitude),
          parseFloat(point.favLongitude)
        ),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      if (point !== undefined) {
        new google.maps.Marker({
          position: {
            lat: parseFloat(point.favLatitude),
            lng: parseFloat(point.favLongitude),
          },
          map: this.map,
        });
      }
    });
  },
  methods: {
    /**
     * Esta función, permite pintar en el mapa una ventana informativa
     * con la información relacionada con el punto de parada.
     */
    createInfoWindowWith(message, address, lat, lng) {
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="background-color:#181B1F;padding:5px; color:white">${message} : ${address}</div>`,
        position: { lat: lat, lng: lng },
      });

      infoWindow.open(this.map, null);
    },
  },
};
</script>  
<style>
.map {
  width: 100%;
  height: 400px !important;
}

.gm-style-iw button {
  display: none !important;
}

.gm-style .gm-style-iw-c {
  padding: 0px !important;
}

.gm-style-iw-d {
  overflow: hidden !important;
}
</style>
