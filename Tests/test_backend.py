from flask import Flask
import unittest
from flask_testing import TestCase

from FlaskBasedServ import app

class BackendTest(TestCase):

    def create_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        return app

    def test_key(self):
        self.assertEqual(app.secret_key, 'generate_some_key')

    def test_server_index(self):
        response = app.test_client().get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_signup_page(self):
        response = app.test_client().get('/memory_cards', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()