import json
import asyncio
import websockets
import time
from coin_manager import CoinManager
from ws_python.Server import Server

#Using binance as api. The api can be changed by implementing a new api.
from api.binance import binance as api

#Getting a list of coin names from api. The list is used later when subscribing to the api.
coin_list = api.get_coin_list()

#There are limits on how many requests you can make to the api pr. second. 
#To make sure the limits arent broken, the program waits 5 second before continuing.
time.sleep(5)

#This function is responsible for recieving all the from the diferrent coins through the websocket connection. 
async def recieveTrades(ws): 
    async for trade in ws:
        #Convert the data to jason.
        json_trade = json.loads(trade)
        
        #When subscribing, binance sends a json obj with a result property indicating wether a not the request was a success.
        #The program ignores this response 
        if 'result' in json_trade:
            continue

        #The api contains a class responsible for the format of the recieved json from the api.
        trade_obj = api.get_trade_object(json_trade)

        #Sending the trade to the correct coin manager who holds the responsibility for that specific coin. 
        try:
            await coin_manager_list[trade_obj.get_coin_name()].add_trade(trade_obj)
        except websockets.exceptions.ConnectionClosedOK:
            print('Exception:')

#The function makes a websocket subscription to the api.
async def connect():
    uri = api.get_ws_url()
    async with websockets.connect(uri) as websocket:
        subscribtion = {
            'method': 'SUBSCRIBE',
            'params': [coin.lower()+ '@aggTrade' for coin in coin_list],
            'id': 1   
        }
        await websocket.send(json.dumps(subscribtion))
        print('Subscribtion sent.')
        await recieveTrades(websocket)

#Besides being a client, this program also act as a websocket server itself. This way, other applications can recieve the data.
print("Creating server.")
server = Server()
start_server = websockets.serve(server.ws_handler, 'localhost', 8000)
print("Server created")

#Creating a dictionary of coinmanagers to manage the individual coins.
coin_manager_list = {coin:CoinManager(coin, server) for coin in coin_list}

#Start websocket server and client.
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_until_complete(connect())
asyncio.get_event_loop().run_forever()



