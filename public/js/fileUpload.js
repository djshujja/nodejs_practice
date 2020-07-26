const rootStyles = window.getComputedStyle(document.documentElement);

if (
  rootStyles.getPropertyValue("--book-cover-width-large") != null &&
  rootStyles.getPropertyValue("--book-cover-width-large") != ""
) {
  readySync();
} else {
  document.getElementById("main-css").addEventListener("load", readySync());
}

function readySync() {
  const coverWidth = parseFloat(
    rootStyles.getPropertyValue("--book-cover-width-large")
  );
  const coverAspectRatio = parseFloat(
    rootStyles.getPropertyValue("--book-cover-aspect-ratio")
  );
  const coverHeight = coverWidth / coverAspectRatio;
  const fp = FilePond;
  fp.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );
  fp.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargeWidth: coverWidth,
    imageResizeTargetHeight: coverHeight,
  });

  fp.parse(document.body);
}

console.log("Connected");
