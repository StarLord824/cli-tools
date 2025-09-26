#!/usr/bin/env node

//Let's make a tool that takes a filename and tells us something about it.

import fs from 'fs';
import path from 'path';
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

await info();
await wc();
await renamer();

const main = async()=>{
    //takes a file name and gets user selection of action
}
