from flask import request, jsonify
from flask_login import login_user, logout_user, current_user, login_required

from app import app
from app.models import User


@app.route('/user')
def get_user():
    if not current_user.is_authenticated:
        return jsonify({
            'error': 'unauthorized'
        })
    return jsonify({
        'username': current_user.username
    })


@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    username_exists = User.query.filter_by(username=username).first()
    email_exists = User.query.filter_by(email=email).first()
    if username_exists or email_exists:
        error_message = 'Данное имя пользователя уже используется.' \
            if username_exists else 'Данная почта уже используется.'
        return jsonify({
            'success': False,
            'message': error_message
        })

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    new_user.save()

    return jsonify({
        'success': True,
    })


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']

        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            error_message = 'Пользователя с таким именем не существует.' \
                if not user else 'Неправильный пароль.'
            return jsonify({
                'success': False,
                'message': error_message
            })

        login_user(user)
        return jsonify({
            'success': True,
        })
    return """
        <script>
            window.location.href = 'http://localhost:3000/login';
        </script>
        """


@app.route('/logout', methods=['POST'])
def logout():
    if not current_user.is_authenticated:
        return jsonify({
            'success': False,
            'message': 'Вы не вошли в аккаунт.'
        })
    logout_user()
    return jsonify({
        'success': True,
        'message': 'Вы успешно вышли из аккаунта.'
    })


@login_required
@app.route('/current_user')
def get_current_user():
    if not current_user.is_authenticated:
        return jsonify({
            'success': False
        })
    return jsonify({
        'success': True,
        'id': current_user.id,
        'username': current_user.username,
        'email': current_user.email
    })
