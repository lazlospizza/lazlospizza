from sanic import Sanic
from sanic_cors import CORS, cross_origin
from sanic.response import raw, text, json as json_response
from sanic_cors import cross_origin
from contract.lazlos_pizza import pizza
from pizza.image import pizza_image_bytes
from pizza.random import random_pizza_ingredient_ids
from payout.calculate import calculate_payout
from web3.auto import w3
from eth_account.messages import encode_defunct
import time

privatekey = None
with open("privatekey.txt") as f:
    privatekey = f.read()

def to_32byte_hex(val):
   return w3.toHex(w3.toBytes(val).rjust(32, b'\0'))

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

    hashed_message = w3.soliditySha3(
        ['address', 'uint256', 'uint256[]'],
        [w3.toChecksumAddress(addr), timestamp, token_ids]
    )

    message = encode_defunct(hashed_message)
    signed_message = w3.eth.account.sign_message(message, private_key=privatekey)
    
    (v, r, s) = (
       signed_message.v,
       to_32byte_hex(signed_message.r),
       to_32byte_hex(signed_message.s),
    )

    return json_response({
        'token_ids': token_ids,
        'address': addr,
        'timestamp': timestamp,
        'v': v,
        'r': r,
        's': s
    }, status=200)

@app.route('/payout', methods=["GET"])
@cross_origin(app)
async def get_payout(request):
    if 'address' not in request.args or len(request.args['address']) != 1:
        return text('address is required', status=400)

    if 'block' not in request.args or len(request.args['block']) != 1:
        return text('block is required', status=400)

    addr = request.args['address'][0]
    block = int(request.args['block'][0])
    payout_amount = calculate_payout(addr, block)

    if payout_amount == None:
        return text('no payout for this block', status=404)

    hashed_message = w3.soliditySha3(
        ['uint256', 'address', 'uint256'],
        [block, w3.toChecksumAddress(addr), payout_amount]
    )

    message = encode_defunct(hashed_message)
    signed_message = w3.eth.account.sign_message(message, private_key=privatekey)
    
    (v, r, s) = (
       signed_message.v,
       to_32byte_hex(signed_message.r),
       to_32byte_hex(signed_message.s),
    )

    return json_response({
        'block': block,
        'address': addr,
        'payout_amount': payout_amount,
        'v': v,
        'r': r,
        's': s
    }, status=200)

@app.route('/healthcheck', methods=["GET"])
@cross_origin(app)
async def get_token_png(request):
    return text('chupapi munyanyo')


if __name__ == "__main__":
    print("starting up api...")
    app.run(host="0.0.0.0", port=8080)
