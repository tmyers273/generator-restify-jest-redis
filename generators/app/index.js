var Generator = require('yeoman-generator');


module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.responses = {};
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // Default to current folder name
        }, {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: 'A microservice'
        }, {
            type    : 'confirm',
            name    : 'use_redis',
            message : 'Would you like to enable redis?'
        }]).then((answers) => {
            this.responses = answers;
        });
    }

    copy_server_files() {
        this.fs.copyTpl(
            this.templatePath('server.js'),
            this.destinationPath('app/server.js')
        );

        this.fs.copyTpl(
            this.templatePath('routes.js'),
            this.destinationPath('app/routes.js')
        );
    }

    copy_config_files() {
        this.fs.copyTpl(
            this.templatePath('config/config.js'),
            this.destinationPath('config/config.js')
        );

        this.fs.copyTpl(
            this.templatePath('config/server.js'),
            this.destinationPath('config/server.js')
        );

        if (this.responses.use_redis) {
            this.fs.copyTpl(
                this.templatePath('config/redis.js'),
                this.destinationPath('config/redis.js')
            );

        }
    }

    copy_service_files() {
        if (this.responses.use_redis) {
            this.fs.copyTpl(
                this.templatePath('services/redis.js'),
                this.destinationPath('services/redis.js')
            );
        }
    }

    copy_package() {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { name: this.responses.name, description: this.responses.description }
        );
    }

    copy_others() {
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'),
        );

        this.fs.copyTpl(
            this.templatePath('.env'),
            this.destinationPath('.env'),
        );
    }

    install_dependencies() {
        this.npmInstall();
        // this.npmInstall(['restify'], { 'save': true });
        // this.npmInstall(['restify-plugins'], { 'save': true });
        // this.npmInstall(['jest'], { 'save-dev': true });
        // this.npmInstall(['node-larvael-style-config@git+https://git@github.com/EcommElite/node-laravel-style-config.git'], { 'save-dev': true });
        //
        // if (this.responses.use_redis) {
        //     this.npmInstall(['ioredis'], { 'save': true });
        // }
    }

};