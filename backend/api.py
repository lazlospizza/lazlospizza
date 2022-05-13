from sanic import Sanic
from sanic_cors import CORS, cross_origin
from sanic.response import raw, text, json as json_response
from sanic_cors import cross_origin
from contract.lazlos_pizza import pizza
from pizza.image import pizza_image_bytes
from pizza.random import random_pizza_ingredient_ids
from web3.auto import w3
from eth_account.messages import encode_defunct
import time

privatekey = None
with open("privatekey.txt") as f:
    privatekey = f.read()

app = Sanic(name="Lazlos Pizza API")
CORS(app)

@app.route('/tokens/<token_id:number>/pizza_image.png', methods=["GET"])
@cross_origin(app)
async def get_token_png(request, token_id):
    pizza_obj = pizza(token_id)

    if len(pizza_obj) != 5:
        return text('invalid pizza', status=400)

    return raw(pizza_image_bytes(pizza_obj), status=200, headers={
        'content-type': 'image/png'
    })

@app.route('/random_pizza', methods=["GET"])
@cross_origin(app)
async def get_random_pizza(request):
    if 'address' not in request.args and len(request.args) != 1:
        return text('address is required', status=400)

    addr = request.args['address'][0]
    token_ids = random_pizza_ingredient_ids()
    timestamp = int(time.time())

    token_ids_str = ','.join(map(str, token_ids)) 
    message_body = f'{token_ids_str}:{addr}:{timestamp}'

    message = encode_defunct(text=message_body)

    signed_message = w3.eth.account.sign_message(message, private_key=privatekey)

    return json_response({
        'token_ids': token_ids,
        'address': addr,
        'timestamp': timestamp,
        'signature': signed_message.signature.hex(),
        'signed_message': message_body
    }, status=200)

@app.route('/healthcheck', methods=["GET"])
@cross_origin(app)
async def get_token_png(request):
    return text('chupapi munyanyo')


if __name__ == "__main__":
    print("starting up api...")
    app.run(host="0.0.0.0", port=8080)
