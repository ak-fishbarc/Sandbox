import unittest
import requests
import bs4
import time

class Miner:
    def __init__(self, name):
        self.name = name
        self.stamp = 0
        self.harvested_data = {}
        self.tunnels = []

    def select(self, _link_list, _select, _shave):
        if type(_select) == str:
            for link in _link_list:
                if _select in str(link):
                    if _shave:
                        self.tunnels.append(link.get('href'))
                    else:
                        self.tunnels.append(link)
        elif type(_select) == list:
            for link in _link_list:
                for selection in _select:
                    if selection in str(link):
                        if _shave:
                            self.tunnels.append(link.get('href'))
                        else:
                            self.tunnels.append(link)

    def dig(self, _dig, _tag, _data, _select, _shave):
        soup = bs4.BeautifulSoup(_data, 'html.parser')
        look_for = soup.find_all(_tag)
        if _dig:
            if _select:
                self.select(look_for, _select, _shave)
            else:
                self.tunnels.extend(look_for)

    def check_all(self, _address, word, _data, _deep, _middle, _from, _to):
        if type(_deep) == int:
            _end = _deep
        elif _deep:
            _end = -1
        else:
            return 'Invalid data type for _deep'
        _data_to_check = _data
        while _middle != _end:
            _middle = _data_to_check.find(word)
            _start_from = _data_to_check[:_middle].rfind(_from) + 1
            _limit_to = _middle + _data_to_check[_middle:].find(_to)
            result = _data_to_check[_start_from:_limit_to]
            self.harvested_data[self.stamp] = {'Address': _address, 'word': word, 'result': result}
            _data_to_check = _data_to_check[_middle + len(word):]
            self.stamp += 1

    def check(self, _address, word, _deep, _from, _to):
        _data = requests.get(_address)
        if _data.status_code == 200:
            if word in _data.text:
                _middle = _data.text.find(word)
                if type(_from) == str and type(_to) == str:
                    _start_from = _data.text[:_middle].rfind(_from) + 1
                    _limit_to = _middle + _data.text[_middle:].find(_to)
                elif type(_from) == int and type(_to) == int:
                    _start_from = _middle - _from
                    _limit_to = _middle + _to
                else:
                    _start_from = _limit_to = _middle
                if _deep:
                    self.check_all(_address, word, _data.text[_middle + len(word):], _deep, _middle, _from, _to)
                result = _data.text[_start_from:_limit_to]
                self.harvested_data[self.stamp] = {'Address':_address, 'word': word, 'result': result}
                self.stamp += 1
        else:
            return _data.status_code

    def search_for(self, uris, words, _deep=False, _from=None, _to=None):
        if not _from:
            _from = '>'
        if not _to:
            _to = '<'
        if type(uris) == list:
            for _address in uris:
                if type(words) == str:
                    self.check(_address, words, _deep, _from, _to)
                elif type(words) == list:
                    for word in words:
                        self.check(_address, word, _deep, _from, _to)
                else:
                    return 'word must be of string type or list class'
        elif type(uris) == str:
            if type(words) == str:
                self.check(uris, words, _deep, _from, _to)
            elif type(words) == list:
                for word in words:
                    self.check(uris, word, _deep, _from, _to)
            else:
                return 'words must be of string type or list class'
        else:
            return 'uri must be of string type or list class'

    def reset_miner(self, stamp, datum, links):
        if stamp:
            self.stamp = 0
        if datum:
            self.harvested_data = {}
        if links:
            self.tunnels = []
        return 'Done'


#class TestSearch(unittest.TestCase):
 #   def test(self):
  #      self.assertIsNotNone()
   #     self.assertIsNotNone()
#if __name__ == '__main__':
 #  unittest.main()