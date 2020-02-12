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

    def search_for(self, uris, word, _from=None, _to=None):
        if type(word) == str:
            if not _from:
                _from = '>'
            if not _to:
                _to = '<'
            if type(uris) == list:
                for _address in uris:
                    self.check(_address, word, _from, _to)
                return self.harvested_data
            elif type(uris) == str:
                self.check(uris, word, _from, _to)
                return self.harvested_data
            else:
                return 'uri must be of string type.'
        else:
            return 'word must be of string type'

    def search_in(self, uris, words, _from=None, _to=None):
        if type(uris) == list:
            for _address in uris:
                if not _from:
                    _from = '>'
                if not _to:
                    _to = '<'
                if type(words) == list:
                    for word in words:
                        self.check(_address, word, _from, _to)
                else:
                    return 'word must be of list class'
            return self.harvested_data
        else:
            return 'uris must be of list class or string type'

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