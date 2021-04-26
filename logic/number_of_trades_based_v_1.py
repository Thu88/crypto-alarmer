#A function which checks if there's been a large burst of unique buy trades in the last 10 mins
#compared to sell trades. This could mean that the coin has become popular among traders.
def coin_logic(trade_list): 
    #There has to be at least 50 trades before coin logic is performed.
    if len(trade_list) < 50:
        return False
    
    """ In order to showcase the application the below has been commented out. This way alarms are sounded immediately instead waiting 10 minutes
    #There has to be trades from 10 minutes ago.
    if trade_list[-1].get_time_stamp() < (trade_list[0].get_time_stamp() + (1000 * 60 * 10)):
       return False
    """

    #print(f'name: {trade_list[0].get_coin_name()} first trade: {trade_list[0].get_time_stamp()+ 1000 * 10} , last trade {trade_list[-1].get_time_stamp()}')

    #Get trades from last 10 minutes from trade list parameter.
    last_time_stamp = trade_list[-1].get_time_stamp()
    trades_in_last_10_mins = [trade for trade in trade_list if trade.get_time_stamp() > last_time_stamp - (1000 * 10)]

    #Make a list containing the real number of trades corresponding to the trades from last 10 mins
    real_number_of_trades = 0
    real_number_of_trades_list = []

    for trade in trades_in_last_10_mins:
        if trade.get_buyer_maker() == False:
            real_number_of_trades += 1
        else:
            real_number_of_trades -= 1
        real_number_of_trades_list.append(real_number_of_trades)

    #Split the number of trades list in 2 halfs
    num_trades_half_len = int(len(real_number_of_trades_list)/2)

    number_of_trades_in_last_5_min = real_number_of_trades_list[num_trades_half_len:]
    number_of_trades_in_last_10_to_5_min = real_number_of_trades_list[:num_trades_half_len]

    #Check if real number of trades is bigger than 5 mins ago + 100 
    for i in range(0, len(number_of_trades_in_last_10_to_5_min)):
        if number_of_trades_in_last_5_min[i] > number_of_trades_in_last_10_to_5_min[i] + 20: #20 is used instead of 100 to showcase the program faster. 
            return True
    
