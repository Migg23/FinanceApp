tax_brackets = [
    {"max_income": 12400,  "tax_rate": 0.10},
    {"max_income": 50400,  "tax_rate": 0.12},
    {"max_income": 105700, "tax_rate": 0.22},
    {"max_income": 201775, "tax_rate": 0.24},
    {"max_income": 256225, "tax_rate": 0.32},
    {"max_income": 640600, "tax_rate": 0.35},
    {"max_income": float("inf"), "tax_rate": 0.37}
]

def calculate_federal_taxes(yearly_salary):
    tax_owed = 0
    previous_max = 0

    for bracket in tax_brackets:
        if yearly_salary > bracket["max_income"]:
            taxable_amount = bracket["max_income"] - previous_max
            tax_owed += taxable_amount * bracket["tax_rate"]
            previous_max = bracket["max_income"]
        else:
            taxable_amount = yearly_salary - previous_max
            tax_owed += taxable_amount * bracket["tax_rate"]
            break

    return tax_owed

def budget_percentages(monthly_salary):
    if monthly_salary < 2500:
        return {
            "savings": 0.02,
            "food": 0.15,
            "fun": 0.03
        }
    elif monthly_salary < 6000:
        return {
            "savings": 0.10,
            "food": 0.12,
            "fun": 0.05
        }
    else:
        return {
            "savings": 0.20,
            "food": 0.08,
            "fun": 0.07
        }