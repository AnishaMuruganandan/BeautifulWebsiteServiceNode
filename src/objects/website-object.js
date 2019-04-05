var websiteObject = {
  websiteDetailsObj: function(websiteDetails) {
    this.websiteURL = websiteDetails.url || "";
    this.websiteName = websiteDetails.name || "";
    this.wesbiteScreenshotPath = websiteDetails.screenshotPath || "";
    this.websiteUploadTime = websiteDetails.time || null;
  }
};
module.exports = websiteObject;
