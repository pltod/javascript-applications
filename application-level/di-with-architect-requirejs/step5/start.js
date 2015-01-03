require(["architect"], function (architect) {
    architect.resolveConfig([
        "math",
        "app",
        "mvc"
    ], function (err, config) {
        if (err) throw err;
        architect.createApp(config);
    });
});
