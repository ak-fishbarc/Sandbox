import unittest
import os
import requests
from selenium.webdriver import Firefox
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from flask_testing import TestCase, LiveServerTestCase


firefox_path = os.environ['FIREFOX_PATH']
gecko_path = os.environ['GECKO_PATH']


class SeleniumTest(unittest.TestCase):
    def setUp(self):
        cap = DesiredCapabilities().FIREFOX
        self.browser = Firefox(firefox_binary=firefox_path, capabilities=cap, executable_path=gecko_path)
        self.browser.get('http://localhost:5000')

    def tearDown(self):
        self.browser.quit()

    def test_server_is_up_and_running(self):
        get_code = requests.get('http://localhost:5000')
        self.assertEqual(get_code.status_code, 200)
        self.assertIn('Welcome to Flask Server', self.browser.title)

    def test_memory_cards(self):
        get_code = requests.get('http://localhost:5000/memory_cards')
        self.assertEqual(get_code.status_code, 200)
        self.assertIn('Welcome to Flask Server', self.browser.title)
        self.browser.get('http://localhost:5000/memory_cards')
        find_front = self.browser.find_element_by_id('front')
        find_front.send_keys('Atom')
        find_back = self.browser.find_element_by_id('back')
        find_back.send_keys('Nucleus')
        find_button = self.browser.find_element_by_name('submit')
        find_button.click()
        if self.browser.find_element_by_tag_name('div'):
            print('Checked!')


if __name__ == '__main__':
    unittest.main()