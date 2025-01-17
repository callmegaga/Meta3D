var gulp = require("gulp");
var path = require("path");
var fs = require("fs");
var publish = require("meta3d-tool-publish")

gulp.task("publish_local_env", function (done) {
    publish.publishContribute(
        "local",
        path.join(__dirname, "package.json"),
        path.join(__dirname, "dist/static/js", "main.js")
    ).then(() => {
        done()
    })
});

gulp.task("publish_production_env", function (done) {
    publish.publishContribute(
        "production",
        path.join(__dirname, "package.json"),
        path.join(__dirname, "dist/static/js", "main.js")
    ).then(() => {
        done()
    })
});


