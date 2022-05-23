import random

all_ingredients = [
    { 'name': 'Gluten Free Base',	'ingredientType': 0, 'id': 1 },
    { 'name': 'Plain Base',	'ingredientType': 0, 'id': 2 },
    { 'name': 'BBQ Sauce',	'ingredientType': 1, 'id': 3 },
    { 'name': 'Chilli Sauce',	'ingredientType': 1, 'id': 4 },
    { 'name': 'Tomato Sauce',	'ingredientType': 1, 'id': 5 },
    { 'name': 'Garlic Sauce',	'ingredientType': 1, 'id': 6 },
    { 'name': 'Cheddar Cheese',	'ingredientType': 2, 'id': 7 },
    { 'name': 'Goat Cheese',	'ingredientType': 2, 'id': 8 },
    { 'name': 'Mozzarella',	'ingredientType': 2, 'id': 9 },
    { 'name': 'Anchovies',	'ingredientType': 3, 'id': 10 },
    { 'name': 'Beef',	'ingredientType': 3, 'id': 11 },
    { 'name': 'Chicken',	'ingredientType': 3, 'id': 12 },
    { 'name': 'Chorizo',	'ingredientType': 3, 'id': 13 },
    { 'name': 'Ham',	'ingredientType': 3, 'id': 14 },
    { 'name': 'Pepperonis',	'ingredientType': 3, 'id': 15 },
    { 'name': 'Salami',	'ingredientType': 3, 'id': 16 },
    { 'name': 'Tuna',	'ingredientType': 3, 'id': 17 },
    { 'name': 'Corn',	'ingredientType': 4, 'id': 18 },
    { 'name': 'Chillies',	'ingredientType': 4, 'id': 19 },
    { 'name': 'Green Peppers',	'ingredientType': 4, 'id': 20 },
    { 'name': 'Jalapenos',	'ingredientType': 4, 'id': 21 },
    { 'name': 'Mushroom',	'ingredientType': 4, 'id': 22 },
    { 'name': 'Onion',	'ingredientType': 4, 'id': 23 },
    { 'name': 'Pineapple',	'ingredientType': 4, 'id': 24 },
    { 'name': 'Red Pepper',	'ingredientType': 4, 'id': 25 }
]

def random_pizza_ingredient_ids():
    base = random_ingredients_for_type(0)
    sauce = random_ingredients_for_type(1)
    
    num_cheeses = random.randint(1, 3)
    cheeses = []
    for i in range(num_cheeses):
        cheeses.append(random_ingredients_for_type(2))
    
    num_meats = random.randint(0, 4)
    meats = []
    for i in range(num_meats):
        meats.append(random_ingredients_for_type(3))

    num_toppings = random.randint(0, 4)
    toppings = []
    for i in range(num_toppings):
        toppings.append(random_ingredients_for_type(4))

    ids = [
        base['id'],
        sauce['id']
    ]

    ids = append_ingredient_ids(ids, cheeses)
    ids = append_ingredient_ids(ids, meats)
    ids = append_ingredient_ids(ids, toppings)

    return ids

def append_ingredient_ids(ids, ingredients):
    id_set = {}

    for ingredient in ingredients:
        if ingredient['id'] in id_set:
            continue

        id_set[ingredient['id']] = True

        ids.append(ingredient['id'])
    return ids

def random_ingredients_for_type(type):
    ingredients_for_type = []
    for ingredient in all_ingredients:
        if ingredient['ingredientType'] == type:
            ingredients_for_type.append(ingredient)
    
    random_index = random.randint(0, len(ingredients_for_type)-1)
    return ingredients_for_type[random_index]
