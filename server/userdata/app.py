from flask import Flask, request, jsonify, redirect, url_for, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import requests
import creds, taxes


app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5000"]}}, methods=['GET','POST'] , supports_credentials=True, vary_header=False)

app.config.update(
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=False,
)

# --- MySQL connection setup ---
db_config_user = {
    "host": "localhost",
    "user": "root",          # your MySQL username (default is root)
    "password": "",          # your MySQL password (often empty in XAMPP)
    "database": "finance_user"
}

#region user login/register
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")


    try:
        conn = mysql.connector.connect(**db_config_user) # connects to mysql, ran through XAMPP
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT username, password FROM user_information WHERE username = %s", (username,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"status": "user not found"}), 404


        #if user["password"] == password:
        if check_password_hash(user["password"], password):
            session['username'] = username
            return jsonify({"status": "login successful", "user": {"username": username}}), 200
        else:
            return jsonify({"status": "invalid credentials"}), 401

    finally:
        cursor.close()
        conn.close()


@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    confirmpassword = data.get("passwordConf")

    if password != confirmpassword:
        return jsonify({"status": "Passwords do not match"})

    password = generate_password_hash(password)

    try:
        conn = mysql.connector.connect(**db_config_user)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM user_information WHERE username=%s", (username,))
        session['username'] = username
        if cursor.fetchone():
            return jsonify({"status": "Username already exists"}), 409

        # Insert new user
        cursor.execute(
            "INSERT INTO user_information (username, password) VALUES (%s, %s)",
            (username, password)
        )
        conn.commit()
        session['username'] = username
        return jsonify({"status": "User registered successfully", "user": {"username": username}}), 201

    except mysql.connector.Error as err:
        return jsonify({"status": "Database error", "error": str(err)}), 500

    finally:
            cursor.close()
            conn.close()
#endregion

#region Table info
@app.route("/user/data", methods=['GET','POST'])
def get_user_info():
    data = request.get_json()
    username = data.get("username")

    try:
        conn = mysql.connector.connect(**db_config_user)
        cursor = conn.cursor(dictionary=True)

        # Fix: Correct table name and WHERE clause
        query = """
            SELECT DISTINCT 
                monthly_salary,
                rent,
                monthly_expenses,
                food,
                fun,
                savings,
                leftover
            FROM finance_info
            WHERE username = %s
        """
        cursor.execute(query, (username,))
        user_data = cursor.fetchone()

        return jsonify(user_data), 200
    
    finally:
        cursor.close()
        conn.close()

#region calculations for graph
@app.route("/calculate", methods=['POST'])
def calculate():
    data = request.get_json()
    username = data.get("username")
    #username = 'mwbradley'

    salary = float(data["yearlySalary"])
    #fedTaxes = float(taxes.CalculateFederalTaxes(salary)) # need to add federal taxes table 
    #print(fedTaxes)
    rent = float(data["rent"])
    monthlyExpenses = float(data["monthlyExpenses"])
    

    monthlySalary = salary / 12.0
    savings = monthlySalary * .10
    food = monthlySalary * .12
    fun = monthlySalary * .05
    leftover = (monthlySalary - rent - monthlyExpenses - savings - food - fun)
    if (leftover < 0): # otherwise it messes with the graph on frontend
        leftover = 0.00

    try:
        conn = mysql.connector.connect(**db_config_user)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM finance_info WHERE username = %s", (username,))
        existing = cursor.fetchone()

        if existing:
            cursor.execute("""
                UPDATE finance_info
                SET monthly_salary = %s,
                    rent = %s,
                    monthly_expenses = %s,
                    savings = %s,
                    food = %s,
                    fun = %s,
                    leftover = %s
                WHERE username = %s
            """, (monthlySalary, rent, monthlyExpenses, savings, food, fun, leftover, username))
        else:
            cursor.execute("""
                INSERT INTO finance_info (
                    username, monthly_salary, rent, monthly_expenses, food, fun, savings, leftover
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (username, monthlySalary, rent, monthlyExpenses, food, fun, savings, leftover))
        conn.commit()

        return jsonify({"username": "table updated"})

    finally:
        cursor.close()
        conn.close()

#region API spoonacular
@app.route("/user/recipes", methods=['POST'])
def get_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients", "")

    recipes = search_recipes_by_ingredients(ingredients=ingredients)
    return jsonify(recipes)

def search_recipes_by_ingredients(ingredients):
    url = 'https://api.spoonacular.com/recipes/findByIngredients'
    
    # Ensure ingredients is a string, comma-separated
    if isinstance(ingredients, list):
        ingredients = ','.join(ingredients)

    params = {
        'apiKey': creds.api_key,
        'ingredients': ingredients,
        'number': 10,
        'ranking': 1,  # prioritize recipes that use more of the ingredients
        'ignorePantry': True
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json()  # This endpoint returns a list, not a dict
    else:
        print(f"API error: {response.status_code}, {response.text}")
        return {'error': f"API error: {response.status_code}", 'details': response.text}


if __name__ == "__main__":
    app.run(debug=True)
