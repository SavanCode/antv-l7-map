import { Scene, Marker, MarkerLayer, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

const scene = new Scene({
  id: 'map',
  map: new GaodeMap({
    center: [113, 29],
    pitch: 70,
    zoom: 8.5,
    rotation: 160,
    style: 'dark',
  }),
});

// scene.setBgColor('#000');
 
function addMarkers() {
  fetch(
    'https://gw.alipayobjects.com/os/basement_prod/67f47049-8787-45fc-acfe-e19924afe032.json'
  )
    .then((res) => res.json())
    .then((nodes) => {
      const markerLayer = new MarkerLayer();
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].g !== '1' || nodes[i].v === '') {
          continue;
        }
        const el = document.createElement('label');
        el.className = 'labelclass';
        el.textContent = nodes[i].v + '℃';
        el.style.background = getColor(nodes[i].v);
        el.style.borderColor = getColor(nodes[i].v);
        const marker = new Marker({
          element: el,
        }).setLnglat({ lng: nodes[i].x * 1, lat: nodes[i].y });
        markerLayer.addMarker(marker);
      }
      scene.addMarkerLayer(markerLayer);
    });
}

function getColor(v) {
  const colors = [
    '#ffffe5',
    '#f7fcb9',
    '#d9f0a3',
    '#addd8e',
    '#78c679',
    '#41ab5d',
    '#238443',
    '#005a32',
  ];
  return v > 50
    ? colors[7]
    : v > 40
    ? colors[6]
    : v > 30
    ? colors[5]
    : v > 20
    ? colors[4]
    : v > 10
    ? colors[3]
    : v > 5
    ? colors[2]
    : v > 0
    ? colors[1]
    : colors[0];
}
const waveLayer = new PointLayer({ zIndex: 2, blend: 'additive' })
  .source(
    [
      { lng: 113, lat: 29, size: 10000 },
      { lng: 113.5, lat: 29.5, size: 30000 },

      { lng: 110.23681640625, lat: 29.64509464986076, size: 74020.50373907911 },
      {
        lng: 115.01586914062499,
        lat: 26.88777988202911,
        size: 22908.885529976185,
      },
      { lng: 111.181640625, lat: 28.724313406473463, size: 73359.37302978932 },
      {
        lng: 112.686767578125,
        lat: 29.257648503615542,
        size: 18500.90838085843,
      },
      {
        lng: 114.664306640625,
        lat: 28.98892237190413,
        size: 20293.183968726793,
      },
      {
        lng: 113.90075683593749,
        lat: 28.17855984939698,
        size: 18051.412077639496,
      },
      { lng: 111.51123046875, lat: 27.45466493898314, size: 37645.94186119526 },
      {
        lng: 110.67626953125,
        lat: 28.004101830368654,
        size: 4214.588023703825,
      },
      { lng: 114.43359375, lat: 29.477861195816843, size: 61722.01580332115 },
      {
        lng: 110.445556640625,
        lat: 26.96124577052697,
        size: 70806.75519747598,
      },
      {
        lng: 113.75244140624999,
        lat: 27.88278388425912,
        size: 70930.24993464859,
      },
    ],
    {
      parser: {
        type: 'json',
        x: 'lng',
        y: 'lat',
      },
    }
  )
  .shape('circle')
  .color('rgb(22, 119, 255)')
  .size('size', (v) => v)
  .animate(true)
  .style({
    unit: 'meter',
  });

const barLayer = new PointLayer({ zIndex: 2, depth: false })
  .source(
    [
      { lng: 113, lat: 29, size: 4000 },
      { lng: 113.5, lat: 29.5, size: 4000 },

      { lng: 110.23681640625, lat: 29.64509464986076, size: 4000},
      {
        lng: 115.01586914062499,
        lat: 26.88777988202911,
        size: 4000,
      },
      { lng: 111.181640625, lat: 28.724313406473463, size: 4000 },
      {
        lng: 112.686767578125,
        lat: 29.257648503615542,
        size: 4000,
      },
      {
        lng: 114.664306640625,
        lat: 28.98892237190413,
        size: 4000,
      },
      {
        lng: 113.90075683593749,
        lat: 28.17855984939698,
        size: 4000,
      },
      { lng: 111.51123046875, lat: 27.45466493898314, size: 4000 },
      {
        lng: 110.67626953125,
        lat: 28.004101830368654,
        size: 4000,
      },
      { lng: 114.43359375, lat: 29.477861195816843, size: 4000 },
      {
        lng: 110.445556640625,
        lat: 26.96124577052697,
        size: 4000,
      },
      {
        lng: 113.75244140624999,
        lat: 27.88278388425912,
        size: 4000,
      },
    ],
    {
      parser: {
        type: 'json',
        x: 'lng',
        y: 'lat',
      },
    }
  )
  .shape('cylinder')
  .color('rgb(22, 119, 255)')
  .size('size', (v) => [5, 5, v / 350])
  .animate(true)
  .style({
    opacityLinear: {
      enable: true, // true - false
      dir: 'up', // up - down
    },
    lightEnable: false,
  });

scene.on('loaded', () => {
  scene.addLayer(waveLayer);
  scene.addLayer(barLayer);
  addMarkers();
  scene.render();
});
