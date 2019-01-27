const apiKey = "mpoy70bghold1xdu9kkittipivqp2p";
const channelsApi = `https://cors-anywhere.herokuapp.com/wind-bow.glitch.me/twitch-api/channels/`;
const streamsApi = `https://cors-anywhere.herokuapp.com/wind-bow.glitch.me/twitch-api/streams/`;

// function fetchData(address) {
//   return fetch(address, {
//     headers: {
//       "Client-ID": apiKey,
//       'Access-Control-Allow-Origin': '*'
//     }
//   }).then(res => res.json())
//     .then(data => console.log(data))
// }

function fetchData(elem) {
  let data = {
    "details": {},
    "stream": {}
  };
  const channelsReq = fetch(channelsApi + elem).then(res => res.json());
  const streamsReq = fetch(streamsApi + elem).then(res => res.json());
  const urls = [channelsReq, streamsReq]
  Promise.all(urls).then(values => {
    data.channel = values[0]
    data.stream = values[1]
    createNode(data)
  })
}

function getData(channelsList) {
  channelsList.map(channel => {
    fetchData(channel);
  });
}

getData(channels)

function createNode(data) {
  const channelInfo = data.channel;
  const streamingInfo = data.stream;
//   const channelStructure = `
//   <li class="channel-container>
//     <div>
//       <p>
//         <a href="${channelInfo.url}">${channelInfo.display_name}</a>
//       </p>
//     </div>
//     <div>
//       <img src="${channelInfo.logo}" class="channel-logo"
//     </div>
//   </li>
// `;
  //insertNode(channelStructure)
}

function insertNode(node) {
  const channelsList = document.querySelector(".channels-list");
  channelsList.innerHTML += node;
}

