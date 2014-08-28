// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("getWPUser", function(request, response) {
	var query = new AV.Query("WPUser");
	query.equalTo("objectId", request.params.ObjectId);
	query.find({
		success: function(results) {
			response.success(results[0]);
		},
		error: function() {
			response.error("User not found");
		}
	});
});