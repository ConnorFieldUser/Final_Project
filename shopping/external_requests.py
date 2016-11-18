import requests


def get_response(year, author):
    r = requests.get("http://swapi.co/api/starships/9/")
    ships = r.json()
    results_list = {'starship': ships['length']}
    print(results_list)
