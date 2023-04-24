import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import df from './data/localization.json';
//import Popup from 'reactjs-popup';
import {BsBuildingFill} from "react-icons/bs";
//const canvasRef = useRef(null);
//const canvas = canvasRef.current;
const MAPBOX_TOKEN = 'pk.eyJ1IjoibHlhenphdCIsImEiOiJjbGYwcGN4dGUwMHEyM3Nuem95MmZqcmx5In0.mGHGRSLVR2Qwt0cLvnXSIw';
//const gl = canvas.getContext('webgl');
//const renderer = gl.getParameter(gl.RENDERER);
function Map() {
  const [viewState, setViewState] = useState({
    latitude: 51.1282205,
    longitude: 71.4306682,
    zoom: 11
  });

  const [selectedClient, setSelectedClient] = useState(false);

  return (
    // <ReactMapGL
    //   {...viewport}
    //   mapboxAccessToken={MAPBOX_TOKEN}
    //   mapStyle='mapbox://styles/mapbox/streets-v12'
    //   onViewportChange={(viewport) => {
    //     setViewport(viewport);
    //   }}></ReactMapGL>

    <div style={{width: '100vw', height:'100vh'}}>
    <ReactMapGL
    {...viewState}
    mapboxAccessToken = {MAPBOX_TOKEN} 
    mapStyle={'mapbox://styles/mapbox/outdoors-v12'}
    width='100%'
    height='100%'
    // onViewportChange={(viewport)=>{
    //   setViewport(viewport);
    // }}
    onViewportChange={nextViewState => setViewState(nextViewState)}
    onMove={evt => setViewState(evt.viewState)}
    >
       
      {df.BCs2.map(client => (
        <Marker 
          key={client.id} 
          latitude={client.Широта} 
          longitude={client.Долгота}
          >
          <button 
          className='bldbt' 
          onClick={e => {
             e.preventDefault();
             setSelectedClient(client);
             console.log(client.Наименование, client.Широта, client.Долгота);
          }}
          >
          <p><BsBuildingFill className='icnbld' /></p>

          </button>
        </Marker>
      ))}
   
       {selectedClient && (

       <Popup
          longitude={selectedClient
            ? Number(selectedClient.Долгота) : 0}
          latitude={selectedClient
            ? Number(selectedClient.Широта) : 0}
          anchor='left'
          onClose={()=> { setSelectedClient(false) }}
          debug={true}
          
        >
          <div className='cnt'>
            <h2>LLLL</h2>
            <p>{console.log(selectedClient.Наименование, selectedClient.Широта, selectedClient.Долгота)}</p>
          </div>
        </Popup>)}
      
      {/* {selectedClient && (
          <Popup
            anchor="top"
            longitude={Number(selectedClient.Долгота)}
            latitude={Number(selectedClient.Широта)}
            onClose={() => setSelectedClient(null)}
          >
            <div>
              <p>LLLLLL</p>
            </div>
          </Popup>
        )} */}
    </ReactMapGL>
    </div>
  );
}

export default Map;
