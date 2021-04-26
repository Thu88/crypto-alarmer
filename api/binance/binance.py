#This file contains info about the binance api.

import requests
import json

def get_coin_list():
    coin_list = []
    response = requests.get('https://api.binance.com/api/v3/exchangeInfo')
    response_as_json = json.loads(response.content)
    
    for x in response_as_json['symbols']:
        if x['symbol'][-3:] == 'BTC':
            coin_list.append(x['symbol'].lower())

    return coin_list


def get_ws_url():
    return 'wss://stream.binance.com:9443/ws/ethbtc@aggTrade'

def get_trade_object(json_trade):
    trade = Trade(json_trade)
    return trade 

class Trade:
    def __init__(self, json_trade):
        self.volume = float(json_trade['p']) * float(json_trade['q'])
        self.m =  json_trade['m']
        self.T = json_trade['T']
        self.s = json_trade['s'].lower()
        self.p = json_trade['p']
        self.q = json_trade['q']    
    def get_volume(self):
        return self.volume
    
    def get_buyer_maker(self):
        return self.m

    def get_time_stamp(self):
        return self.T
    
    def get_coin_name(self):
        return self.s