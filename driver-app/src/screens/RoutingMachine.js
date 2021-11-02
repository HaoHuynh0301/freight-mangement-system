import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(props.delivered[0], props.delivered[1]),
            L.latLng(props.current[0], props.current[1])
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
        });
    
        return instance;
    };
  
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;