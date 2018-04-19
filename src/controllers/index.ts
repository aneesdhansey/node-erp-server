import { Application } from 'express';
import _ from 'lodash'
import fs from 'fs'

const excluded : Array<string> = ['index'];

const appRoutes = (app: Application) => {
    fs.readdirSync(__dirname).forEach(file => {
        
        const basename = file.split('.')[0];

        // Only load files which are not directories and are not excluded
        if(!fs.lstatSync(`${__dirname}/${file}`).isDirectory() && !_.includes(excluded, basename))
          app.use(`/${basename}`, require(`./${basename}.controller`));
    });
}

module.exports = appRoutes;


