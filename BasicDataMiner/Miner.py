import unittest
import requests


class Miner:
    def __init__(self, name):
        self.name = name
        self.stamp = 0
        self.harvested_data = {}

    def check(self,_address, word, _from, _to):
        _data = requests.get(_address)
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
            result = _data.text[_start_from:_limit_to]
            self.harvested_data[self.stamp] = {'Address':_address, 'word': word, 'result': result}
            self.stamp += 1

    def search_for(self, uris, words, _from=None, _to=None):
        if not _from:
            _from = '>'
        if not _to:
            _to = '<'
        if type(uris) == list:
            for _address in uris:
                if type(words) == str:
                    self.check(_address, words, _from, _to)
                elif type(words) == list:
                    for word in words:
                        self.check(_address, word, _from, _to)
                else:
                    return 'word must be of string type or list class'
            return self.harvested_data
        elif type(uris) == str:
            if type(words) == str:
                self.check(uris, words, _from, _to)
            elif type(words) == list:
                for word in words:
                    self.check(uris, word, _from, _to)
            else:
                return 'words must be of string type or list class'
            return self.harvested_data
        else:
            return 'uri must be of string type or list class'

    def reset_miner(self, stamp, data):
        if stamp:
            self.stamp = 0
        if data:
            self.harvested_data = {}
        return 'Done'


addr_list = []
word_list = []

billy = Miner('New')

#class TestSearch(unittest.TestCase):
 #   def test(self):
  #      self.assertIsNotNone()
   #     self.assertIsNotNone()
#if __name__ == '__main__':
 #  unittest.main()