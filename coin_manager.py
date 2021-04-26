from logic.number_of_trades_based_v_1 import coin_logic
import asyncio
import websockets

class CoinManager:
    def __init__(self, name, server):
        self.name = name
        self.trades = []
        self.server = server
    
    def get_coin_name(self):
        return self.name
    
    async def add_trade(self, trade):
        #In order to avoid memory leak, a maximum of a 1000 trades are saved.
        if len(self.trades) == 1000:
            self.trades.pop(0)
        self.trades.append(trade)
        await self.coinLogic()
    
    async def convert_to_json_string(self): 
        x = [dict(trade.__dict__) for trade in self.trades]
        return x
        
    #Performing analysis on the trades to figure out if an alarm should be released.
    async def coinLogic(self):
        alarm = coin_logic(self.trades)
        if alarm:
            print(f'ALARM: {self.name}')
            await self.server.send_to_clients(await self.convert_to_json_string())
