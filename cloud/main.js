// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("getUserByObjId", function(request, response) {
	var query = new AV.Query("WPUser");
	query.get(request.params.objectId, {
		success: function(result) {
			var point = new AV.GeoPoint({latitude: result.get("UserLatitude"), longitude: result.get("UserLongitude")});
			result.set("UserLocation", point);
			result.save();
			response.success(result);
		},
		error: function() {
			response.error("User not found");
		}
	});
});


AV.Cloud.define("getUsersList", function(request, response) {
	var point = new AV.GeoPoint({latitude: request.params.UserLatitude, longitude: request.params.UserLongitude});
	var query = new AV.Query("WPUser");
	query.notEqualTo("objectId", request.params.objectId);
	query.withinKilometers("UserLocation", point, 0.5);
	query.find({
		success: function(results) {
			response.success(results);
		},
		error: function() {
			response.error("User not found");
		}
	});
});