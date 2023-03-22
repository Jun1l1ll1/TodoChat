import os

from flask import Flask, jsonify, request, send_from_directory
from werkzeug.utils import safe_join

from dbDao import DbDAO

static = safe_join(os.path.dirname(__file__), 'static')

app = Flask(__name__)

DAO = DbDAO()

# Legger til eksempel-innhold i databasen:
    # DAO.insert({'task': 'Steg 1: Last ned avhengigheter med pip', 'fav': False, 'name': 'Ingen'})
    # DAO.insert({'task': 'Steg 2: Start flask', 'fav': False, 'name': 'Ingen'})
    # DAO.insert({'task': 'Steg 3: Skriv kode!', 'fav': False, 'name': 'Ingen'})

@app.route('/', methods=['GET'])
def _home():
    """Serve index.html at the root url"""
    print('home')

    return send_from_directory(static, 'index.html'), 200


@app.route('/<path:path>', methods=['GET'])
def _static(path):
    """Serve content from the static directory"""
    print('static')
    return send_from_directory(static, path), 200


# OPPGAVE 1: hent alle todos
@app.route('/api/todos/', methods=['GET'])
def list_todos():
    json = jsonify(DAO.get_all())
    return json, 200


# OPPGAVE 2: opprett en ny todo
@app.route('/api/todos/', methods=['POST'])
def create_todo():
    json = request.json
    DAO.insert(json)
    return json, 201


# OPPGAVE 3: slett en todo
@app.route(f'/api/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    DAO.delete(id)
    return '', 204


# OPPGAVE 4: oppdatere en todo
@app.route(f'/api/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    json = request.json
    print(json)
    DAO.update(id, json)
    return json, 200


def get_todo(id):
    print('get_todo')


if __name__ == '__main__':
    app.run(debug=True)
