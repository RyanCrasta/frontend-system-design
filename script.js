if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((res) => {
      console.log("service worker registered successfully");
    })
    .catch((e) => {
      console.log("ERROR while registering service worker", e);
    });
}
