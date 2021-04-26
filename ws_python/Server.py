import asyncio
import websockets
from websockets import WebSocketServerProtocol
import json
import time

#Making it possible for the program to act as a websocket server.
class Server:
    def __init__(self):
        self.client: WebSocketServerProtocol = None

    async def register(self, ws_client: WebSocketServerProtocol):
        self.client = ws_client
    
    async def unregister(self, ws_client: WebSocketServerProtocol):
        self.client = None

    async def send_to_clients(self, message):
        if self.client != None:
            if self.client.open == True:
                await self.client.send(json.dumps(message))
              
    async def ws_handler(self, ws_client: WebSocketServerProtocol, uri: str):
        await self.register(ws_client)
        try:
            await ws_client.recv()
        except Exception:
            print('Client disconnected.')
        time.sleep(2)