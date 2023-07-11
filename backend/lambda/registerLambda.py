import json
import os
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('users')
    kms_key_arn = os.environ['KmsKeyArn']
    print(kms_key_arn)
    kms_client = boto3.client('kms')

    body = event['body']
    body_json = json.loads(body)
    email = body_json["email"]
    print(email)
    existing_item = table.get_item(Key={'id': email})
    if 'Item' in existing_item:
        return json.dumps({
            'statusCode': 400,
            'message': 'User with this email already exists'
        })
    
    password = body_json['password']
    # encrypt password
    res = kms_client.encrypt(
        KeyId= kms_key_arn,
        Plaintext=password
    )
    
    hashed_password = res['CiphertextBlob']
    
    
    item = {
        'id': body_json['email'],
        'firstName': body_json['firstName'],
        'lastName': body_json['lastName'],
        'email': body_json['email'],
        'password': hashed_password
    }

    try:
        table.put_item(Item=item)
        return json.dumps({
            'statusCode': 200,
            'message': 'Item added successfully'
        })
    except Exception as e:
        return json.dumps({
            'statusCode': 500,
            'message': f'Error adding item to table: {str(e)}'
        })

    
