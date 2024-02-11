from application import app, db
from flask import render_template, request, json, Response, redirect, flash, url_for, session
from application.models import User
from application.forms import LoginForm, RegisterForm


@app.route("/")
@app.route("/index")
@app.route("/home")
def index():
    return render_template("index.html", index=True )

@app.route("/login", methods=['get', 'post'])
def login():
    if session.get('username'):
        return redirect(url_for('index'))

    form = LoginForm()
    if form.validate_on_submit():
        email       = form.email.data
        password    = form.password.data

        user = User.objects(email=email).first() 
        if user and user.get_password(password): 
            flash(f"{user.first_name}, has iniciado sesión !", "success")
            session['user_id'] = user.user_id
            session['username'] = user.first_name
            return redirect("/index")
        else:
            flash("Su información de autenticación es incorrecta. Por favor, inténtelo de nuevo.","danger")
    return render_template("login.html", title="Login", form=form, login=True )


@app.route("/logout")
def logout():
    session['user_id']=False
    session.pop('username',None)
    return redirect(url_for('index'))


@app.route("/register", methods=['POST', 'GET'])
def register():
    if session.get('username'):
        return redirect(url_for('index'))
    form = RegisterForm()
    if form.validate_on_submit():
        user_id     = User.objects.count()
        user_id     += 1

        email       = form.email.data
        password    = form.password.data
        first_name  = form.first_name.data
        last_name   = form.last_name.data

        user = User(user_id=user_id, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        flash("Se ha registrado correctamente!","success")
        return redirect(url_for('index'))
    return render_template("register.html", title="Registro", form=form, register=True)


@app.route("/user")
def user():
     #User(user_id=1, first_name="Christian", last_name="Hur", email="christian@unir.com", password="abc1234").save()
     #User(user_id=2, first_name="Mary", last_name="Jane", email="mary.jane@unir.com", password="password123").save()
     users = User.objects.all()
     return render_template("user.html", users=users)

@app.route("/modelo")
def modelo():
    if not session.get('username'):
        return redirect(url_for('login'))

    return render_template("modelo.html")