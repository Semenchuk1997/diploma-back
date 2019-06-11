const express = require('express');
const AWS = require('aws-sdk');
const awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAIQY5N7STY3CWFFZA",
    "secretAccesskey": "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"
};

const app = express();

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const fetchData = function () {
    const params = {
        TableName: "VideoOnDemand"
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.log('Error: ' + JSON.stringify(err, null, 2));
        } else {
            console.log('Success: ' + JSON.stringify(data, null, 2));
        }
    });
}

app.get('/', (req, res) => {
    const data = fetchData();
    res.send(data);
})

app.listen(3000, () => console.log('Server running on port 3000'))