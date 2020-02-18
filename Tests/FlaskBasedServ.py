import os
from flask import Flask, redirect, url_for, request, session, render_template

import unittest
from flask_testing import TestCase

app = Flask(__name__)
app.secret_key = 'generate_some_key'

@app.route('/')
def homepage():
    return render_template('homepage.html')


                ##############
################# Test Suite ######################
                ##############
'''
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
#'''


if __name__ == '__main__':
    app.run()
#    unittest.main()
