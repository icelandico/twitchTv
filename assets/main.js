const apiKey = "mpoy70bghold1xdu9kkittipivqp2p";
const channelsApi = `https://cors-anywhere.herokuapp.com/wind-bow.glitch.me/twitch-api/channels/`;
const streamsApi = `https://cors-anywhere.herokuapp.com/wind-bow.glitch.me/twitch-api/streams/`;
const navItem = document.querySelectorAll(".nav-item");
let fetchedData = [];

navItem.forEach(item => {
  item.addEventListener("click", event => {
    clickMenuItem(event)
  })
})

function clickMenuItem(e) {
  const classList = e.target.classList
  switch (true) {
    case classList.contains("off"):
      clearSelected()
      classList.add("selected")
      showOffline();
      break;
    case classList.contains("active"):
      clearSelected()
      classList.add("selected")
      showOnline();
      break;
    case classList.contains("all"):
      clearSelected()
      showAll()
      classList.add("selected")
      break;
  }
}

function showOnline() {
  showAll()
  const offline = document.querySelectorAll(".offline")
  offline.forEach(container => container.classList.add("hide"))
}

function showOffline() {
  showAll()
  const online = document.querySelectorAll(".online")
  online.forEach(container => container.classList.add("hide"))
}

function showAll() {
  const hidden = document.querySelectorAll(".hide");
  hidden.forEach(container => container.classList.remove("hide"))
}

function clearSelected() {
  const selected = document.querySelectorAll(".selected");
  selected.forEach(item => item.classList.remove("selected"))
}

function fetchData(elem) {
  showAll()
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
    fetchedData.push(data)
    createNode(data)
  })
}

function getData(channelsList) {
  channelsList.map(channel => {
    fetchData(channel);
  });
}

function createNode(data) {
  const channelInfo = data.channel;
  const streamingInfo = data.stream;
  const channelStructure = `
  <li class="channel-container ${streamingInfo.stream ? "online" : "offline"}">
    <div class="channel-img">
      <img class="channel-logo"
           src="${channelInfo.logo}"
           alt="channel-logo"
      >
    </div>
    <div class="channel-text">
      <div class="channel-name">
        <a href="${channelInfo.url}"
           class="channel-link details"
           target="_blank"
        >
          ${channelInfo.display_name}
        </a>
      </div>
      <div class="stream">
        <p class="details">${streamingInfo.stream ? streamingInfo.stream.game : "Offline"}</p>
      </div>
    </div>
  </li>
`;
  insertNode(channelStructure)
}

function insertNode(node) {
  const channelsList = document.querySelector(".channels-list");
  channelsList.innerHTML += node;
}

getData(channels)