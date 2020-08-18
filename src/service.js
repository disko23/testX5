const http = require('http');
const appConfig = require('./app/modules/config');
const log = require('./app/modules/logger')(module);
const app = require('./app');

try {
    http.createServer(app)
        .listen(appConfig.port, (error, result) => {
            if (error) {
                log.error(`Server starting error:`, error);
                process.exit(1);
            }

            const serverLog = appConfig.devMode ? `on [http://0.0.0.0:${appConfig.port}]` : `on port [${appConfig.port}]`;
            const environment = process.env.NODE_ENV || 'production';
            log.info(`Server "${appConfig.name}" started ${serverLog} environment ['${environment}']`);
        });
} catch (error) {
    log.error(`Server starting error:`, error);
}

process.on('uncaughtException', error => {
    log.error(`Uncaught Exception! ${error.message}`);
    // Linter disabled because application logger has error on `Converting circular structure to JSON`
    console.log(error); // eslint-disable-line no-console
});
