const express = require('express');
const AWS = require('aws-sdk');
const awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAJOYJUEOFJUTQZN4Q",
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
        const responseData = Items.filter(item => item.workflowStatus === 'Complete').map(item => ({
            thumbnailUrl: item.thumbNailUrl ?
                item.thumbNailUrl[0] :
                'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fen.contentandeventstudio.com%2Fwp-content%2Fuploads%2F2016%2F08%2Fvideo-icon.jpg&f=1',
            mp4Url: item.mp4Urls[0]
        }));

        res.send(responseData);
    });
})

app.listen(3000, () => console.log('Server running on port 3000'))