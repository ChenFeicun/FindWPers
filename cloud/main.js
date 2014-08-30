// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("getUserByObjId", function(request, response) {
	var query = new AV.Query("WPUser");
	query.get(request.params.objectId, {
		success: function(result) {
			var lat = result.UserLatitude;
			//var point = new AV.GeoPoint({latitude: result.UserLatitude, longitude: result.UserLongitude});
			result.set("UserLocation", point);
			result.save();
			response.success(lat);
		},
		error: function() {
			response.error("User not found");
		}
	});
});


