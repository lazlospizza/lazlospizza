import requests

def calculate_payout(addr, block):
    response = requests.get(f'https://lazlos-pizza.s3.amazonaws.com/payouts/rinkeby.json')
    payout_data = response.json()

    print(payout_data)
    
    eligible_payouts = payout_data[addr]
    for payout in eligible_payouts:
        print(payout)
        if payout['block'] == block:
            return payout['payout_amount']
    
    return None