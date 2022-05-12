from sanic import Sanic
from sanic_cors import CORS, cross_origin
from sanic.response import raw, text, json
from sanic_cors import cross_origin
from contract.lazlos_pizza import pizza
from pizza.image import pizza_image_bytes
from pizza.random import random_pizza_ingredient_ids


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
async def get_token_png(request):
    if 'address' not in request.args and len(request.args) != 1:
        return text('address is required', status=400)

    addr = request.args['address'][0]

    return json({
        'token_ids': random_pizza_ingredient_ids(),
        'addr': addr
    }, status=200)

@app.route('/healthcheck', methods=["GET"])
@cross_origin(app)
async def get_token_png(request):
    return text('chupapi munyanyo')


if __name__ == "__main__":
    print("starting up api...")
    app.run(host="0.0.0.0", port=8080)
