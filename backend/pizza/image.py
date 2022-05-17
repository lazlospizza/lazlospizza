from PIL import Image
import requests
from io import BytesIO

def table_cloth_img():
    response = requests.get(f'https://lazlos-pizza.s3.amazonaws.com/pizza_layers/table_cloth.png')
    return Image.open(BytesIO(response.content)).convert("RGBA")

def get_ingredient_layer_img(token_id):
    response = requests.get(f'https://lazlos-pizza.s3.amazonaws.com/pizza_layers/{token_id}.png')
    return Image.open(BytesIO(response.content)).convert("RGBA")

def combine_img_layers(layer_1, layer_2):
    layer_1.paste(layer_2, (100, 100), layer_2)

def pizza_image_bytes(pizza):
    base = pizza[0]
    sauce = pizza[1]
    cheeses = pizza[2]
    meats = pizza[3]
    toppings = pizza[4]

    img = table_cloth_img()
    base_img = get_ingredient_layer_img(base)
    combine_img_layers(img, base_img)

    sauce_img = get_ingredient_layer_img(sauce)
    combine_img_layers(img, sauce_img)

    for cheese in cheeses:
        if cheese == 0:
            break

        cheese_img = get_ingredient_layer_img(cheese)
        combine_img_layers(img, cheese_img)

    for meat in meats:
        if meat == 0:
            break

        meat_img = get_ingredient_layer_img(meat)
        combine_img_layers(img, meat_img)

    for topping in toppings:
        if topping == 0:
            break

        topping_img = get_ingredient_layer_img(topping)
        combine_img_layers(img, topping_img)

    img_io = BytesIO()
    img.save(img_io, format='PNG')
    img_io.seek(0)

    return img_io.getvalue()