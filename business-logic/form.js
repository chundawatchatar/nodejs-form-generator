var fs = require('fs');
var path = require('path');

module.exports.getForms = async (req, res, next) => {
    fs.readdir('output/json/', (err, rawFiles) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        var files = [];
        rawFiles.forEach((file) => {
            files.push(path.parse(file).name);
        })
        res.status(200).json(files);
    });
}

module.exports.deleteForm = async (req, res, next) => {
    fs.unlink('output/json/' + req.body.formName, (err, rawFiles) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(200).json();
    });
}

module.exports.createForm = async (req, res, next) => {
    var reqData = req.body;
    if(!reqData.fileName){
        res.status(400).json({message: 'Filename not found'}); 
        return;
    }
    fs.open('output/json/' + reqData.fileName + '.json', 'r', function (err, file) {
        if (!err && file) {
            res.status(400).json("file Already exists");
            return;
        }

        fs.open('output/json/' + reqData.fileName + '.json', 'w', function (err, file) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json('Form created successfully');
        });
    });
}

module.exports.getForm = async (req, res, next) => {
    fs.readFile('output/json/' + req.params.fileName + '.json', (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(200).json(JSON.parse(data.length > 0 ? data : '{}'));
    });
}

module.exports.saveForm = async (req, res, next) => {
    fs.writeFile('output/json/' + req.params.fileName + '.json', JSON.stringify(req.body), (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(200).json(data);
    });
}