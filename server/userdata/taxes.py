tax_brackets = {
    "bracket1": {"max_income": 12400,  "tax_rate": .10},
    "bracket2": {"max_income": 50400,  "tax_rate": .12},
    "bracket3": {"max_income": 105700, "tax_rate": .22},
    "bracket4": {"max_income": 201775, "tax_rate": .24},
    "bracket5": {"max_income": 256225, "tax_rate": .32},
    "bracket6": {"max_income": 640600, "tax_rate": .35},
    "bracket7": {"max_income": -1,     "tax_rate": .37} # max_income might need changed (if unsigned largest number)
}

# Based on yearly salary we return the amount to take out of yearl salary for federal taxes
def CalculateFederalTaxes(yearlySalary):
    if (yearlySalary > tax_brackets["bracket6"]["max_income"]):
        return (yearlySalary * (tax_brackets["bracket7"]["tax_rate"]))
    elif (yearlySalary > tax_brackets["bracket5"]["max_income"]):
        return (yearlySalary * (tax_brackets["bracket6"]["tax_rate"]))
    elif (yearlySalary > tax_brackets["bracket4"]["max_income"]):
        return (yearlySalary * (tax_brackets["bracket5"]["tax_rate"]))
    elif (yearlySalary > tax_brackets["bracket3"]["max_income"]):
        return (yearlySalary * (tax_brackets["bracket4"]["tax_rate"]))
    elif (yearlySalary > tax_brackets["bracket2"]["max_income"]):
        return (yearlySalary * (tax_brackets["bracket3"]["tax_rate"]))
    elif (yearlySalary > tax_brackets["bracket1"]["max_income"]):
        return (yearlySalary * (tax_brackets["bracket2"]["tax_rate"]))
    else:
        return (yearlySalary * (tax_brackets["bracket1"]["tax_rate"]))
    
