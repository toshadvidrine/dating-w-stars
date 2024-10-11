from flask import Flask, request, jsonify
from sweph import ephemeris
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    birthdate = db.Column(db.String(50))
    birthtime = db.Column(db.String(50))
    city = db.Column(db.String(100))

@app.route('/natal_chart', methods=['POST'])
def natal_chart():
    data = request.json
    name = data.get('name')
    birthdate = data.get('birthdate')
    birthtime = data.get('birthtime')
    city = data.get('city')
    
    # Use sweph to calculate planetary positions
    positions = ephemeris.calculate_positions(birthdate, birthtime, city)
    
    return jsonify({'name': name, 'positions': positions})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
