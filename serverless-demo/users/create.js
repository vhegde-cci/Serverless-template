'use strict';

const uuid=require('uuid');

const AWS=require('aws-sdk');

const dynamoDB=new AWS.DynamoDB.DocumentClient();

module.exports.create=(event,context,callback)=>{
    const data=JSON.parse(event.body);
    if (typeof data.firstName!=='string' || typeof data.lastName!=='string'){
        console.error('Validation failed!!!');
        callback(new Error('Couldn\'t create the user item.'));
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuid.v1(),
          firstName: data.firstName,
          lastName: data.lastName,
        },
    };

    // put
    dynamoDB.put(params,(error)=>{
        if(error){
            console.error(error);
            callback(new Error('Could not create the user item....'));
            return;
        }

        //create a response
        const response={
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };

        callback(null,response);

    });


};

