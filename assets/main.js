const apiKey = "mpoy70bghold1xdu9kkittipivqp2p";
const channelsApi = `https://cors-anywhere.herokuapp.com/wind-bow.glitch.me/twitch-api/channels/freecodecamp`;
const streamsApi = `https://cors-anywhere.herokuapp.com/wind-bow.glitch.me/twitch-api/streams/freecodecamp`;
const channels = ["qpHalcy0n","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "RocknightStudios", "lucaelin"];
const urlsAddress = [channelsApi, streamsApi];

function fetchData(address) {
  return fetch(address, {
    headers: {
      "Client-ID": apiKey,
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json())
    .then(data => console.log(data))
}

//fetchData(streamsApi)
getData(urlsAddress)

function getData(urls) {
  Promise.all(urls.map(url =>
    fetch(url).then(resp => resp.text())
  )).then(texts => {
    console.log(texts)
  })
}


