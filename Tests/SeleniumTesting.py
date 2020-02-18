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

    def tearDown(self):
        self.browser.quit()

    def test_server_is_up_and_running(self):
        response = self.browser.get('http://localhost:5000')
        get_code = requests.get('http://localhost:5000')
        self.assertEqual(get_code.status_code, 200)
        self.assertIn('Welcome to ask Server', self.browser.title)

if __name__ == '__main__':
    unittest.main()