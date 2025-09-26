#!/usr/bin/env node

import {program} from 'commander';
import fs from 'fs';
import path from 'path';

const config_path = path.join('my-config.json');

const getConfig = async()=>{
    program.
        name('config-manager').
        description('Manages configurations').
        version('1.0.0', '--version')

    //set 
    program.
        command('set <key> <value>').
        description('Set a configuration value').
        action(async(key, value)=>{
            let config = {}
            if(fs.existsSync(config_path)){
                try {
                    config = JSON.parse(fs.readFileSync(config_path, 'utf8'));
                } catch(err){
                    console.error(err);
                    return;
                }
            }
            config[key] = value;

            try {
                fs.writeFileSync(config_path, JSON.stringify(config, null, 2));
                console.log(`Set ${key} to ${value}`);
            } catch(err){
                console.error(err);
            }
        });
    
    //get
    program.
        command('get <key>').
        description('Get a configuration value').
        action(async(key)=>{
            let config = {}
            if(fs.existsSync(config_path)){
                try {
                    config = JSON.parse(fs.readFileSync(config_path, 'utf8'));
                } catch(err){
                    console.error(err);
                    return;
                }
            }
            console.log(config[key]);
        });
    
    //list
    program.
        command('list').
        description('List all configurations').
        action(async()=>{
            let config = {}
            if(fs.existsSync(config_path)){
                try {
                    config = JSON.parse(fs.readFileSync(config_path, 'utf8'));
                } catch(err){
                    console.error(err);
                    return;
                }
            }
            for(const key in config){
                console.log(`${key}: ${config[key]}`);
            }
        });

    program.parse()
}

await getConfig();