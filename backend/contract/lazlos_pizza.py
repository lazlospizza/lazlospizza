from web3 import Web3
import json

from config.config import WEB3_PROVIDER_URI, PIZZA_CONTRACT_ADDRESS

w3 = Web3(Web3.HTTPProvider(WEB3_PROVIDER_URI))

lazlos_pizza = None

with open("./contract/LazlosPizza.json") as f:
    info_json = json.load(f)
    abi = info_json["abi"]

    adress = Web3.toChecksumAddress(PIZZA_CONTRACT_ADDRESS)
    lazlos_pizza = w3.eth.contract(address=adress, abi=abi)

def pizza(token_id):
    return lazlos_pizza.functions.pizza(int(token_id)).call()

