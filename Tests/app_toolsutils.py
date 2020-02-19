import pandas as pd

def save_cards(deck_cards, delimiter, deck_name):
    cards_to_save = deck_cards
    cards_to_save = cards_to_save.split(delimiter)
    df = pd.DataFrame(cards_to_save)
    df.to_csv(deck_name)