#!/usr/bin/env node

//Let's make a tool that takes a filename and tells us something about it.

import fs from 'fs';
import path from 'path';
import {program} from 'commander';

const info = async()=>{
    const fileName = process.argv[2];

    if(!fileName){
        console.error('Please provide a file name');
        return;
    }
    fs.stat(fileName, (err, stats)=>{
        if(err){
            console.error(err);
            return;
        }
        console.log(`File name: ${fileName}`);
        console.log(`Size: ${stats.size} bytes`);
        console.log(`Last modified: ${stats.mtime}`);
        console.log(`Is a directory: ${stats.isDirectory()}`);
        console.log(`Is a file: ${stats.isFile()}`);
        console.log(`Extension: ${path.extname(fileName)}`);
    });
}

//implement the Unix's wc command
const wc = async()=>{
    const fileName = process.argv[2];
    if(!fileName){
        console.error('Please provide a file name');
        return;
    }
    //returns no. of lines, words, and characters
    fs.readFile(fileName, 'utf8', (err, data)=>{
        if(err){
            console.error(err);
            return;
        }
        const lines = data.split('\n').length;
        const words = data.split(' ').length;
        const characters = data.length;
        console.log(`\nHello Guys, I'm a wc command`);
        console.log(`Lines: ${lines}`);
        console.log(`Words: ${words}`);
        console.log(`Characters: ${characters}`);
    });
}

const renamer = async()=>{
    const fileName = process.argv[2];
    const newName = process.argv[3];

    if(!fileName || !newName){
        console.error('Please provide a file name and a new name');
        return;
    }

    //check if file exists
    if(!fs.existsSync(fileName)){
        console.error(`File ${fileName} doesn't exists`);
        return;
    }

    //check if new file doesn't exists already
    if(fs.existsSync(newName)){
        console.error(`File ${newName} already exists`);
        return;
    }   

    // rename
    fs.rename(fileName, newName, (err) => {
        if (err) {
        console.error("Error renaming file:", err.message);
        return;
        }
        console.log(`Renamed "${fileName}" to "${newName}"`);
    });
}

const superRenamer = async()=>{
    program.
        name('super-renamer').
        description('Renames files and directories').
        version('1.0.0', '--version').
        argument('<old>', 'The old name').
        argument('<new>', 'The new name').
        option('-f, --force', 'Force overwrite', false).
        option('-v --verbose', 'Print additional information', false)

    program.parse()
    const options = program.opts()
    const [src, dest] = program.args

    if(options.verbose){
        console.log(`Old name: ${src}`)
        console.log(`New name: ${dest}`)
        console.log(`Force Flag: ${options.force}`)
    }

    if(!fs.existsSync(src)){
        console.error(`Source file ${src} doesn't exists`);
        return;
    }
    if(fs.existsSync(dest) && !options.force){
        console.error(`Destination file ${dest} already exists, use -f to overwrite`);
        return;
    }

    try {
        fs.renameSync(src, dest);
        console.log(`Renamed ${src} to ${dest}`);
    } catch(err) {
        console.error(err);
    }
}
// await info();
// await wc();
// await renamer();
await superRenamer();
const main = async()=>{
    //takes a file name and gets user selection of action
}
