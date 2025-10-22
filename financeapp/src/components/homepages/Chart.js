import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function Chart(){
    const [rent, setRent] = useState(0);
    const [monthly_expenses, setMonthlyExpenses] = useState(0);
    const [food, setFood] = useState(0);
    const [fun, setFun] = useState(0);
    const [savings, setSavings] = useState(0);
    const [leftovers, setLeftover] = useState(0);

    useEffect(() => {
    const handleInfo = async () => {
        try {
            const username = localStorage.getItem("username");

            const response = await fetch('http://localhost:5000/user/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username }) // ✅ Send it in the request body
            });
                const data = await response.json()

                setRent(Number(data.rent));
                setMonthlyExpenses(Number(data.monthly_expenses));
                setFood(Number(data.food));
                setFun(Number(data.fun));
                setSavings(Number(data.savings));
                setLeftover(Number(data.leftover));
            }
            catch(ex) {
                alert("error:" + ex)
            }

        }
        handleInfo();
    },[])

    const data = [
        { name: "Rent", value: rent },
        { name: "Monthly Expenses", value: monthly_expenses },
        { name: "Food", value: food },
        { name: "fun", value: fun },
        { name: "Savings", value: savings },
        { name: "Leftovers", value: leftovers }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ff284cff", "#68ff42ff"];

    return(
        <div style={{ width: "100%", height: 350 , marginTop: -20}}>
            
            <ResponsiveContainer>
                <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}   
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                    ))}
                </Pie>
                <Tooltip/>
         
                </PieChart>
            </ResponsiveContainer>
    </div>
    );
}

export default Chart;