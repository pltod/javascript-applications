define(function () {

    appPlugin.consumes = ["math", "mvc"];
    return appPlugin;

    function appPlugin(options, imports, register) {
        console.log("math", imports.math);
        console.log("mvc", imports.mvc);
        console.log("Current mechanism: ", imports.mvc.handler);
        var p = document.createElement("p");
        p.textContent = "1 + 4 = " + imports.math.add(1, 4);
        document.body.appendChild(p);
        register();
    }

});