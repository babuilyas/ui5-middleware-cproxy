/**
 * Custom UI5 Server middleware example
 *
 * @param {object} parameters Parameters
 * @param {object} parameters.resources Resource collections
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.all Reader or Collection to read resources of the
 *                                        root project and its dependencies
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.rootProject Reader or Collection to read resources of
 *                                        the project the server is started in
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.dependencies Reader or Collection to read resources of
 *                                        the projects dependencies
 * @param {object} parameters.middlewareUtil Specification version dependent interface to a
 *                                        [MiddlewareUtil]{@link module:@ui5/server.middleware.MiddlewareUtil} instance
 * @param {object} parameters.options Options
 * @param {string} [parameters.options.configuration] Custom server middleware configuration if given in ui5.yaml
 * @returns {function} Middleware function to use
 */
module.exports = function ({ resources, middlewareUtil, options }) {
    const log = require("@ui5/logger").getLogger("server:custommiddleware:proxy");
    options.configuration && options.configuration.debug ? log.info(`Starting CProxy Midlleware`) : null;

    const http_proxy = process.env.http_proxy || (options.configuration && options.configuration.http_proxy);
    const https_proxy = process.env.https_proxy || (options.configuration && options.configuration.https_proxy);

    const proxy = require("node-global-proxy").default;

    if (!http_proxy)
        log.info("http_proxy not found under configuration in ui5.yaml");
    else {
        proxy.setConfig(http_proxy);
        proxy.start();
    }

    return function (req, res, next) {
        next();
    }
};