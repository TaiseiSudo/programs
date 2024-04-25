// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.open-meteo.com/v1/forecast?latitude=35.689&longitude=139.692&hourly=temperature_2m,precipitation_probability,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=14', true);
// xhr.onload = (e) => {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       console.log('success');
//       decoder(xhr.responseText);
//     } else {
//       console.log('fail');
//     }
//   }
// };
// xhr.onerror = (e) => {
//   console.log('error');
// };
// xhr.send(null);

const json = '{"latitude":35.7,"longitude":139.6875,"generationtime_ms":0.23293495178222656,"utc_offset_seconds":32400,"timezone":"Asia/Tokyo","timezone_abbreviation":"JST","elevation":43.0,"hourly_units":{"time":"iso8601","temperature_2m":"°C","precipitation_probability":"%","precipitation":"mm","weathercode":"wmo code"},"hourly":{"time":["2023-09-29T00:00","2023-09-29T01:00","2023-09-29T02:00","2023-09-29T03:00","2023-09-29T04:00","2023-09-29T05:00","2023-09-29T06:00","2023-09-29T07:00","2023-09-29T08:00","2023-09-29T09:00","2023-09-29T10:00","2023-09-29T11:00","2023-09-29T12:00","2023-09-29T13:00","2023-09-29T14:00","2023-09-29T15:00","2023-09-29T16:00","2023-09-29T17:00","2023-09-29T18:00","2023-09-29T19:00","2023-09-29T20:00","2023-09-29T21:00","2023-09-29T22:00","2023-09-29T23:00","2023-09-30T00:00","2023-09-30T01:00","2023-09-30T02:00","2023-09-30T03:00","2023-09-30T04:00","2023-09-30T05:00","2023-09-30T06:00","2023-09-30T07:00","2023-09-30T08:00","2023-09-30T09:00","2023-09-30T10:00","2023-09-30T11:00","2023-09-30T12:00","2023-09-30T13:00","2023-09-30T14:00","2023-09-30T15:00","2023-09-30T16:00","2023-09-30T17:00","2023-09-30T18:00","2023-09-30T19:00","2023-09-30T20:00","2023-09-30T21:00","2023-09-30T22:00","2023-09-30T23:00","2023-10-01T00:00","2023-10-01T01:00","2023-10-01T02:00","2023-10-01T03:00","2023-10-01T04:00","2023-10-01T05:00","2023-10-01T06:00","2023-10-01T07:00","2023-10-01T08:00","2023-10-01T09:00","2023-10-01T10:00","2023-10-01T11:00","2023-10-01T12:00","2023-10-01T13:00","2023-10-01T14:00","2023-10-01T15:00","2023-10-01T16:00","2023-10-01T17:00","2023-10-01T18:00","2023-10-01T19:00","2023-10-01T20:00","2023-10-01T21:00","2023-10-01T22:00","2023-10-01T23:00","2023-10-02T00:00","2023-10-02T01:00","2023-10-02T02:00","2023-10-02T03:00","2023-10-02T04:00","2023-10-02T05:00","2023-10-02T06:00","2023-10-02T07:00","2023-10-02T08:00","2023-10-02T09:00","2023-10-02T10:00","2023-10-02T11:00","2023-10-02T12:00","2023-10-02T13:00","2023-10-02T14:00","2023-10-02T15:00","2023-10-02T16:00","2023-10-02T17:00","2023-10-02T18:00","2023-10-02T19:00","2023-10-02T20:00","2023-10-02T21:00","2023-10-02T22:00","2023-10-02T23:00","2023-10-03T00:00","2023-10-03T01:00","2023-10-03T02:00","2023-10-03T03:00","2023-10-03T04:00","2023-10-03T05:00","2023-10-03T06:00","2023-10-03T07:00","2023-10-03T08:00","2023-10-03T09:00","2023-10-03T10:00","2023-10-03T11:00","2023-10-03T12:00","2023-10-03T13:00","2023-10-03T14:00","2023-10-03T15:00","2023-10-03T16:00","2023-10-03T17:00","2023-10-03T18:00","2023-10-03T19:00","2023-10-03T20:00","2023-10-03T21:00","2023-10-03T22:00","2023-10-03T23:00","2023-10-04T00:00","2023-10-04T01:00","2023-10-04T02:00","2023-10-04T03:00","2023-10-04T04:00","2023-10-04T05:00","2023-10-04T06:00","2023-10-04T07:00","2023-10-04T08:00","2023-10-04T09:00","2023-10-04T10:00","2023-10-04T11:00","2023-10-04T12:00","2023-10-04T13:00","2023-10-04T14:00","2023-10-04T15:00","2023-10-04T16:00","2023-10-04T17:00","2023-10-04T18:00","2023-10-04T19:00","2023-10-04T20:00","2023-10-04T21:00","2023-10-04T22:00","2023-10-04T23:00","2023-10-05T00:00","2023-10-05T01:00","2023-10-05T02:00","2023-10-05T03:00","2023-10-05T04:00","2023-10-05T05:00","2023-10-05T06:00","2023-10-05T07:00","2023-10-05T08:00","2023-10-05T09:00","2023-10-05T10:00","2023-10-05T11:00","2023-10-05T12:00","2023-10-05T13:00","2023-10-05T14:00","2023-10-05T15:00","2023-10-05T16:00","2023-10-05T17:00","2023-10-05T18:00","2023-10-05T19:00","2023-10-05T20:00","2023-10-05T21:00","2023-10-05T22:00","2023-10-05T23:00","2023-10-06T00:00","2023-10-06T01:00","2023-10-06T02:00","2023-10-06T03:00","2023-10-06T04:00","2023-10-06T05:00","2023-10-06T06:00","2023-10-06T07:00","2023-10-06T08:00","2023-10-06T09:00","2023-10-06T10:00","2023-10-06T11:00","2023-10-06T12:00","2023-10-06T13:00","2023-10-06T14:00","2023-10-06T15:00","2023-10-06T16:00","2023-10-06T17:00","2023-10-06T18:00","2023-10-06T19:00","2023-10-06T20:00","2023-10-06T21:00","2023-10-06T22:00","2023-10-06T23:00","2023-10-07T00:00","2023-10-07T01:00","2023-10-07T02:00","2023-10-07T03:00","2023-10-07T04:00","2023-10-07T05:00","2023-10-07T06:00","2023-10-07T07:00","2023-10-07T08:00","2023-10-07T09:00","2023-10-07T10:00","2023-10-07T11:00","2023-10-07T12:00","2023-10-07T13:00","2023-10-07T14:00","2023-10-07T15:00","2023-10-07T16:00","2023-10-07T17:00","2023-10-07T18:00","2023-10-07T19:00","2023-10-07T20:00","2023-10-07T21:00","2023-10-07T22:00","2023-10-07T23:00","2023-10-08T00:00","2023-10-08T01:00","2023-10-08T02:00","2023-10-08T03:00","2023-10-08T04:00","2023-10-08T05:00","2023-10-08T06:00","2023-10-08T07:00","2023-10-08T08:00","2023-10-08T09:00","2023-10-08T10:00","2023-10-08T11:00","2023-10-08T12:00","2023-10-08T13:00","2023-10-08T14:00","2023-10-08T15:00","2023-10-08T16:00","2023-10-08T17:00","2023-10-08T18:00","2023-10-08T19:00","2023-10-08T20:00","2023-10-08T21:00","2023-10-08T22:00","2023-10-08T23:00","2023-10-09T00:00","2023-10-09T01:00","2023-10-09T02:00","2023-10-09T03:00","2023-10-09T04:00","2023-10-09T05:00","2023-10-09T06:00","2023-10-09T07:00","2023-10-09T08:00","2023-10-09T09:00","2023-10-09T10:00","2023-10-09T11:00","2023-10-09T12:00","2023-10-09T13:00","2023-10-09T14:00","2023-10-09T15:00","2023-10-09T16:00","2023-10-09T17:00","2023-10-09T18:00","2023-10-09T19:00","2023-10-09T20:00","2023-10-09T21:00","2023-10-09T22:00","2023-10-09T23:00","2023-10-10T00:00","2023-10-10T01:00","2023-10-10T02:00","2023-10-10T03:00","2023-10-10T04:00","2023-10-10T05:00","2023-10-10T06:00","2023-10-10T07:00","2023-10-10T08:00","2023-10-10T09:00","2023-10-10T10:00","2023-10-10T11:00","2023-10-10T12:00","2023-10-10T13:00","2023-10-10T14:00","2023-10-10T15:00","2023-10-10T16:00","2023-10-10T17:00","2023-10-10T18:00","2023-10-10T19:00","2023-10-10T20:00","2023-10-10T21:00","2023-10-10T22:00","2023-10-10T23:00","2023-10-11T00:00","2023-10-11T01:00","2023-10-11T02:00","2023-10-11T03:00","2023-10-11T04:00","2023-10-11T05:00","2023-10-11T06:00","2023-10-11T07:00","2023-10-11T08:00","2023-10-11T09:00","2023-10-11T10:00","2023-10-11T11:00","2023-10-11T12:00","2023-10-11T13:00","2023-10-11T14:00","2023-10-11T15:00","2023-10-11T16:00","2023-10-11T17:00","2023-10-11T18:00","2023-10-11T19:00","2023-10-11T20:00","2023-10-11T21:00","2023-10-11T22:00","2023-10-11T23:00","2023-10-12T00:00","2023-10-12T01:00","2023-10-12T02:00","2023-10-12T03:00","2023-10-12T04:00","2023-10-12T05:00","2023-10-12T06:00","2023-10-12T07:00","2023-10-12T08:00","2023-10-12T09:00","2023-10-12T10:00","2023-10-12T11:00","2023-10-12T12:00","2023-10-12T13:00","2023-10-12T14:00","2023-10-12T15:00","2023-10-12T16:00","2023-10-12T17:00","2023-10-12T18:00","2023-10-12T19:00","2023-10-12T20:00","2023-10-12T21:00","2023-10-12T22:00","2023-10-12T23:00"],"temperature_2m":[24.9,24.4,24.1,24.0,23.6,23.1,23.2,23.5,24.5,25.7,26.8,27.4,27.8,28.1,28.2,28.2,27.7,26.7,25.7,24.9,24.4,24.1,23.7,23.5,23.2,22.9,22.6,22.4,22.3,22.0,21.8,22.2,23.0,24.3,25.9,27.4,28.1,28.2,28.3,28.2,27.9,26.8,26.0,25.5,25.4,25.2,23.7,23.2,22.8,22.7,22.5,21.9,21.7,21.8,21.6,21.8,22.7,24.1,25.8,27.5,29.0,30.1,30.6,30.2,29.3,27.9,26.6,25.9,25.0,24.2,23.3,22.4,21.7,21.1,20.6,20.4,21.5,21.5,21.4,21.8,22.8,23.6,24.3,25.0,25.4,25.7,25.8,25.6,24.9,23.9,23.1,22.5,22.0,21.6,21.3,21.0,20.7,20.5,20.3,20.1,19.8,19.5,19.4,19.6,20.1,20.7,21.5,22.5,23.2,23.6,23.8,23.8,23.5,23.1,22.6,22.1,21.6,21.2,20.9,20.6,20.3,19.9,19.3,19.0,19.8,19.4,19.0,18.7,18.4,18.3,18.5,18.9,19.1,19.2,19.2,19.3,19.3,19.4,19.4,19.4,19.3,19.3,19.2,19.1,19.0,18.7,18.3,18.2,18.2,18.4,19.0,20.2,21.7,23.1,24.4,25.5,26.0,25.7,24.9,24.0,23.0,21.9,21.0,20.5,20.1,19.8,19.5,19.3,19.1,18.9,18.8,18.7,18.4,18.1,18.2,19.2,20.6,21.6,22.4,23.2,23.9,24.6,25.3,25.5,24.9,23.9,23.0,22.5,22.2,21.9,21.6,21.3,21.1,20.8,20.6,20.5,20.3,20.1,20.2,20.7,21.4,22.2,22.9,23.7,24.3,24.6,24.8,24.8,24.3,23.7,23.1,22.6,22.3,22.0,21.8,21.7,21.7,21.6,21.5,21.4,21.1,20.7,20.7,21.1,21.9,22.7,23.5,24.3,25.0,25.5,25.9,25.9,25.3,24.3,23.5,23.1,22.9,22.8,22.6,22.4,22.2,21.8,21.3,21.0,20.7,20.5,20.6,21.0,21.6,22.2,22.7,23.3,23.7,23.8,23.7,23.5,23.1,22.6,22.2,22.2,22.4,22.6,22.6,22.5,22.3,21.9,21.4,21.1,20.9,20.9,20.9,20.8,20.7,20.6,20.6,20.7,20.8,21.1,21.4,21.9,22.7,23.7,24.4,24.8,25.0,24.5,22.8,20.4,18.8,18.6,19.1,19.6,19.7,19.9,20.1,20.3,20.6,21.1,21.9,23.0,23.9,24.5,25.0,25.1,24.7,23.9,23.2,22.6,22.1,21.5,20.7,19.9,19.3,18.9,18.7,18.5,18.1,17.6,17.6,18.1,19.1,20.1,21.0,22.1,22.9,23.5,24.0,24.0,23.4,22.4,21.4,20.7,20.1,19.6,19.1,18.7],"precipitation_probability":[6,22,39,55,60,66,71,49,28,6,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,11,21,32,41,49,58,49,41,32,32,32,32,31,30,29,30,31,32,31,30,29,28,27,26,23,19,16,12,7,3,4,5,6,6,6,6,14,21,29,31,33,35,42,48,55,50,44,39,29,20,10,7,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,7,10,10,10,10,7,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,6,10,13,13,13,13,15,17,19,17,15,13,12,11,10,9,7,6,6,6,6,7,9,10,12,14,16,16,16,16,13,9,6,6,6,6,7,9,10,10,10,10,8,5,3,6,10,13,23,32,42,39,35,32,29,26,23,19,14,10,9,7,6,6,6,6,5,4,3,5,8,10,12,14,16,13,9,6,4,2,0,2,4,6,5,4,3,3,3,3,3,3,3,4,5,6,6,6,6,7,9,10,11,12,13,14,15,16,16,16,16,19,23,26,29,32,35,36,38,39,36,32,29,30,31,32,32,32,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"precipitation":[0.00,0.00,0.30,2.30,3.60,0.20,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.50,0.50,0.50,0.80,0.80,0.80,2.50,2.50,2.50,3.30,3.30,3.30,3.60,3.60,3.60,0.40,0.40,0.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.10,0.10,0.10,0.00,0.00,0.00,0.30,0.30,0.30,0.90,0.90,0.90,0.20,0.20,0.20,0.90,0.90,0.90,0.70,0.70,0.70,4.00,4.00,4.00,2.20,2.20,2.20,0.60,0.60,0.60,0.20,0.20,0.20,1.20,1.20,1.20,18.90,18.90,18.90,1.10,1.10,1.10,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],"weathercode":[1,1,51,61,63,51,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,1,1,2,1,2,3,3,1,1,0,1,2,1,1,1,0,0,0,0,0,1,0,0,1,1,0,0,1,3,3,3,2,2,2,2,2,2,3,3,3,3,3,3,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,61,61,61,95,95,95,63,63,63,63,63,63,80,80,80,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2,1,1,0,0,0,1,2,3,3,3,3,3,2,1,1,1,2,1,1,1,1,0,0,1,1,2,2,3,3,2,2,1,1,0,0,0,0,0,1,1,2,1,1,1,1,1,1,1,2,2,2,1,0,1,1,1,2,2,3,51,51,51,3,3,3,51,51,51,53,53,53,51,51,51,53,53,53,53,53,53,63,63,63,80,80,80,53,53,53,51,51,51,55,55,55,81,81,81,55,55,55,3,3,3,3,3,3,3,3,3,3,2,1,2,3,3,2,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"daily_units":{"time":"iso8601","weathercode":"wmo code","temperature_2m_max":"°C","temperature_2m_min":"°C","sunrise":"iso8601","sunset":"iso8601","uv_index_max":"","precipitation_sum":"mm","precipitation_probability_max":"%"},"daily":{"time":["2023-09-29","2023-09-30","2023-10-01","2023-10-02","2023-10-03","2023-10-04","2023-10-05","2023-10-06","2023-10-07","2023-10-08","2023-10-09","2023-10-10","2023-10-11","2023-10-12"],"weathercode":[63,2,3,3,3,95,3,3,3,3,53,81,81,1],"temperature_2m_max":[28.2,28.3,30.6,25.8,23.8,20.3,26.0,25.5,24.8,25.9,23.8,25.0,25.1,24.0],"temperature_2m_min":[23.1,21.8,21.6,20.4,19.4,18.3,18.2,18.1,20.1,20.7,20.5,20.4,18.6,17.6],"sunrise":["2023-09-29T05:34","2023-09-30T05:34","2023-10-01T05:35","2023-10-02T05:36","2023-10-03T05:37","2023-10-04T05:38","2023-10-05T05:38","2023-10-06T05:39","2023-10-07T05:40","2023-10-08T05:41","2023-10-09T05:42","2023-10-10T05:43","2023-10-11T05:43","2023-10-12T05:44"],"sunset":["2023-09-29T17:29","2023-09-30T17:27","2023-10-01T17:26","2023-10-02T17:24","2023-10-03T17:23","2023-10-04T17:22","2023-10-05T17:20","2023-10-06T17:19","2023-10-07T17:17","2023-10-08T17:16","2023-10-09T17:15","2023-10-10T17:13","2023-10-11T17:12","2023-10-12T17:11"],"uv_index_max":[2.25,5.85,3.50,6.05,5.80,3.70,4.45,4.60,5.15,5.35,2.10,0.45,3.75,5.20],"precipitation_sum":[6.40,0.00,0.00,0.00,0.00,33.30,0.00,0.00,0.00,0.00,4.30,67.40,22.20,0.00],"precipitation_probability_max":[71,58,55,39,13,19,42,32,9,39,32,null,null,null]}}';

// decoder(json);

function decoder(json) {
  console.log(json);
  const body = document.getElementById('body');
  info = JSON.parse(json);
  keys = Object.keys(info);
  for(let i = 0; i < keys.length; i++) {
    body.innerText += keys[i] + ": " + info[keys[i]] + "\n";
  }
  for(let i = 7; i < keys.length; i++) {
    _keys = Object.keys(info[keys[i]]);
    for(let j = 0; j < _keys.length; j++) {
      body.innerText += _keys[j]  + ": " + info[keys[i]][_keys[j]] + "\n";
    }
  }
}

//https://icons8.jp/icon/set/weather/offices

class Graph {
  constructor(svg,index) {
    this.svg = svg;
    this.elm = this.svg.children[index];
    this.adjustScreen();
    window.addEventListener('resize', (e) => {
      this.adjustScreen();
    })
  }
  adjustScreen() {
    this.width = this.svg.parentNode.clientWidth;
    this.height = this.svg.parentNode.clientHeight;
  }
  adjustY(y) {
    const cy = this.height - y;
    return cy;
  }
}

class Line extends Graph {
  constructor(svg,index) {
    super(svg,index)
    this.type = 'line';
  }
  adjustScreen() {
    super.adjustScreen();
    this.elm.setAttribute('points','');
    this.draw(this.values);
  }
  draw(values,smoothing=true) {
    if(values == undefined || smoothing == undefined) {
      return;
    }

    this.values = values;
    this.smoothing = smoothing;

    const max = Math.max(...values);
    const len = values.length - 1;
    const offset_rate = 0.05;
    const w_offset = this.width * offset_rate;
    const h_offset = this.height * offset_rate;
    const width = this.width * (1 - offset_rate * 2);
    const height = this.height * (1 - offset_rate * 2);
    if(this.elm.tagName === 'polygon') {
      const init = (this.width - w_offset) + ',' + this.height + ' ' + w_offset + ',' + this.height;
      this.elm.setAttribute('points',init);
      console.log(init);
    }

    for(let i = 0; i < values.length; i++) {
      let x =  (i / len) * width + w_offset;
      let y = (values[i] / max) * height + h_offset;
      y = this.adjustY(y);
      const points = this.elm.getAttribute("points");
      this.elm.setAttribute('points',points + " " + x + ',' + y);
    }
  }
}

const svg = document.getElementById("test");

line1 = new Line(svg,0);
line2 = new Line(svg,1);
info = JSON.parse(json);
const i = 0;
line1.draw(info['hourly']['temperature_2m'].slice(24*i,24*(i+1)));
line2.draw(info['hourly']['temperature_2m'].slice(24*i,24*(i+1)));