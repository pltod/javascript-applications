define(["backbone"], function (Backbone) {

    mvcPlugin.provides = ["mvc"];
    return mvcPlugin;

    function mvcPlugin(options, imports, register) {
        register(null, {mvc: {
        	handler: Backbone
        }});
    }

});