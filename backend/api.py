from sanic import Sanic
from sanic_cors import CORS, cross_origin
from sanic.response import raw, text
from sanic_cors import cross_origin
from contract.lazlos_pizza import pizza
from pizza.image import pizza_image_bytes


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


@app.route('/healthcheck', methods=["GET"])
@cross_origin(app)
async def get_token_png(request):
    return text('chupapi munyanyo')


if __name__ == "__main__":
    print("starting up api...")
    app.run(host="0.0.0.0", port=8080)
