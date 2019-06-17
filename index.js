const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const { awsConfig } = require('./config');

const app = express();

app.use(cors())

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

function fetchData(callback){
    let response;

    const scanningParams = {
        TableName: 'VideoOnDemand',
        Limit: 100
    };

    docClient.scan(scanningParams, function(err, data) {
        if (err) {
            console.log('Error: ' +  JSON.stringify(err, null, 2));
        } else {
            callback(data);
        }
    });

    return response;
}

app.get('/', (req, res) => {
    fetchData(function(data) {
        const { Items } = data;
        const responseData = Items.filter(item => item.workflowStatus === 'Complete').map(item => ({
            thumbnail: item.thumbNailUrl[0],
            original: item.mp4Urls[0]
        }));

        res.send(responseData);
    });
})

app.listen(3000, () => console.log('Server running on port 3000'))