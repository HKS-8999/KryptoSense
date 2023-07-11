import boto3
import uuid
from boto3.dynamodb.conditions import Key, Attr
import json
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('favorites')
uuid = str(uuid.uuid4())

def add_crypto_to_favorites(event):
    
    body = event['body']
    body_json = json.loads(body)
    
    crypto_id = body_json['crypto_symbol']
    user_id = body_json['userId']
 

    if not crypto_id or not user_id:
        raise ValueError('Missing required parameters')
    
    if crypto_already_in_favorites(user_id, crypto_id):
        raise ValueError('This cryptocurrency is already in your favorites list')
    
    table.put_item(Item={'watchlistId': uuid, 'userId': user_id, 'cryptoId': crypto_id})
    
def crypto_already_in_favorites(user_id, crypto_id):
    print(f"Checking if {crypto_id} is in {user_id}'s favorites")
    existing_item = table.scan(FilterExpression = Attr('userId').eq(user_id) & Attr('cryptoId').eq(crypto_id))
    if existing_item['Count'] == 0:
        return existing_item is None
    else:
        return existing_item is not None
    
def lambda_handler(event, context):
    try:
        add_crypto_to_favorites(event)
        return {'statusCode': 200, 'body': json.dumps({'message': "Success"})}
    except ValueError as e:
        print(e)
        return {'statusCode': 400, 'body': json.dumps({'message': "Error"})}
