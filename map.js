//Leaflet Documentation https://docs.eegeo.com/eegeo.js/v0.1.730/docs/leaflet/
//Graph Documentation https://developers.arcgis.com/esri-leaflet/samples/dynamic-chart/
import {getAllSites, latestOfSet, getSitesData} from './data.js';
import { createColorLegend, updateTime, updateAOD, getStartEndDateTime } from './components.js';
import { MarkerManager } from './marker.js'
import { initMap } from './init.js';
import { FieldInitializer } from './fields.js'

// const defaultDate = getStartEndDateTime('2023-07-13T00:34:56.789Z')
// const defaultDate = getStartEndDateTime('2023-07-13T12:34:56.789Z')
const defaultDate = getStartEndDateTime()
console.log(defaultDate)

// // create map obj
const map = initMap();

let args;
let year, month, day, previousYear, previousMonth, previousDay, previousHr, hour, bufferHr, minute;
if (defaultDate.length === 2)
{
    [year, month, day] = defaultDate[0];
    [previousHr, hour, bufferHr, minute] = defaultDate[1];
    args=`?year=${year}&month=${month}&day=${day}&year1=${year}&month1=${month}&day1=${day}&hour=${previousHr}&hour2=${bufferHr}&AOD15=1&AVG=10&if_no_html=1`

}
else if (defaultDate.length === 3)
{
    [previousYear, previousMonth, previousDay] = defaultDate[0];
    [year, month, day] = defaultDate[1];
    [previousHr, hour, bufferHr, minute] = defaultDate[2];
    args=`?year=${previousYear}&month=${previousMonth}&day=${previousDay}&year1=${year}&month1=${month}&day1=${day}&hour=${previousHr}&hour2=${bufferHr}&AOD15=1&AVG=10&if_no_html=1`
}


// initial pull of data
const site_data = await getSitesData(args, 10, defaultDate); // passing default args and (realtime = 10)
const all_site_data = await getAllSites(year);
//
// default optical depth
let optical_depth = 'AOD_500nm'; // to be set by drop menu

// legend
const colorLegend = createColorLegend(optical_depth);
colorLegend.addTo(map);
updateAOD(optical_depth);
updateTime(defaultDate);

// create marker obj
const markerLayer = new MarkerManager(map, args);
// adding layers
// markerLayer.addMarker(latestOfSet(site_data), optical_depth);
// markerLayer.addInactiveMarker(all_site_data, optical_depth);
const initFields = new FieldInitializer(site_data, all_site_data, optical_depth, map, markerLayer, defaultDate);
//
// set center and default zoom

map.setView([0,0],1);
// dynamically enlarge zoomed markers

// markerLayer.zoomedMarkers();
// create fields
console.log(site_data)
