const queryConst = {
  GET_DETAILS_BY_NAME: "SELECT * FROM websites_details WHERE website_name= ?",
  SAVE_DETAILS:
    "INSERT INTO websites_details(website_id,website_url, website_name, website_upload_time, website_screenshot_path,website_upvote_count) VALUES(null,?, ?, ?, ?,0)",
  GET_ALL_DETAILS: "SELECT * FROM websites_details",
  GET_DETAILS_BY_ID: "SELECT * FROM websites_details WHERE website_id=?",
  UPDATE_UPVOTE:
    "UPDATE websites_details set website_upvote_count=? where website_id=?",
  GET_UPVOTE:
    "SELECT website_upvote_count FROM websites_details WHERE website_id=?"
};

module.exports = queryConst;
