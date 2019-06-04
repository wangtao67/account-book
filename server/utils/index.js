exports.handError = function (err, res) {
	res.json({
		state: 0,
		err: err
	});
}