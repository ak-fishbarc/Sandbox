from flask import Flask, redirect, url_for, request, session, render_template

app = Flask(__name__)
app.secret_key = 'generate_some_key'

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/signup_page', methods=['GET', 'POST'])
def signup():
    return render_template('create_account.html')

if __name__ == '__main__':
    app.run()
