// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("getUserByObjId", function(request, response) {
	var query = new AV.Query("WPUser");
	query.get(request.params.objectId, {
		success: function(result) {
			var point = new AV.GeoPoint({latitude: result.UserLatitude, longitude: result.UserLongitude});
			result.set("UserLocation", point);
			result.save();
			response.success(result);
		},
		error: function() {
			response.error("User not found");
		}
	});
});

//根据objectId来查找对应的用户
AV.Cloud.define("getWPUser", function(request, response) {
	var query = new AV.Query("WPUser");
	query.equalTo("objectId", request.params.objectId);
	query.find({
		success: function(results) {
			var point = new AV.GeoPoint({latitude: result[0].UserLatitude, longitude: result[0].UserLongitude});
			result[0].set("UserLocation", point);
			result[0].save();
			response.success(results[0]);
		},
		error: function() {
			response.error("User not found");
		}
	});
});

//计算两个GPS点之间的距离
AV.Cloud.define("getDistance" function(request, response) {
	var user;
	AV.Cloud.run('getUserByObjId', {}, {
		success: function(result) {
			user = result;
		},
		error: function(error) {
		}
	});//getUserByObjId(request, response);
	var point = user.UserLocation;
	var query = new AV.Query("WPUser");
	query.notEqualTo("objectId", user.objectId);
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


