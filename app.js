fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("videos");

    data.forEach(item => {
      const title = document.createElement("h3");
      title.textContent = item.title;

      const video = document.createElement("video");
      video.src = item.url;
      video.controls = true;
      video.width = 300;

      container.appendChild(title);
      container.appendChild(video);
    });
  });