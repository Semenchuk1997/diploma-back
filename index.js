const express = require('express');
const AWS = require('aws-sdk');
const awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAIEUKV2FDQG6UES3A",
    "secretAccessKey": "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"
};
const cors = require('cors');
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
            console.log('Success: ' +  JSON.stringify(data, null, 2))
            callback(data);
        }
    });

    return response;
}


app.get('/', (req, res) => {
    fetchData(function(data) {
        const { Items } = data;
        res.send(Items);
    });
})

app.listen(3000, () => console.log('Server running on port 3000'))