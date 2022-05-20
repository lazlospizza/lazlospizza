import os

ENV = os.getenv('ENVIRONMENT')

WEB3_PROVIDER_URI = None
CONTRACT_ADDRESS = None

if ENV == "production":
    WEB3_PROVIDER_URI = None # TODO
    CONTRACT_ADDRESS = None # TODO

else:
    WEB3_PROVIDER_URI = "https://rinkeby.infura.io/v3/c4dc9d48550647c79f71bc67360bcf68"
    CONTRACT_ADDRESS = "0xc868293dAc0b58603671bCcb3c13d67383b788A5"
