Lambda
-

[docs](https://docs.aws.amazon.com/lambda/?id=docs_gateway)
[limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html)

<img src="https://gist.github.com/cn007b/384d6938ebef985347b29c15476b55c5/raw/7071e67fad3938045037e7ce92db65b2c4dab3f9/aws.lambda.events.jpeg" width="70%" />

When you invoke a function synchronously, Lambda runs the function and waits for a response.
When you invoke a function asynchronously, Lambda sends the event to a queue.
A separate process reads events from the queue and runs your function.

Layer - a ZIP archive that contains libraries, a custom runtime, or other dependencies.
Serverless Application Model (SAM) - open-source framework that you can use to build serverless applications on AWS.
Runtime – runtime that executes your function.
Handler – method that runtime executes when your function is invoked.

You can use a Lambda function to process requests from an Application Load Balancer.

Lambda automatically scales to handle 1000 concurrent executions per Region.

Trigger DynamoDB:
* Batch size - largest number of records that will be read from your table’s update stream at once.
* Batch window - maximum amount of time to gather records before invoking the function, in seconds.

````sh
aws --profile=$p lambda list-functions
aws --profile=$p lambda update-function-code --function-name st-ddb-lambda --zip-file fileb:///tmp/awsLambdaOne.zip
````
