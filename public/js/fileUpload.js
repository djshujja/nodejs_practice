const fp = FilePond;
fp.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);
fp.setOptions({
  stylePanelAspectRatio: 150 / 100,
  imageResizeTargeWidth: 100,
  imageResizeTargetHeight: 150,
});

fp.parse(document.body);

console.log("Connected");
