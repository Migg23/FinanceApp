import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function Chart(){


    const data = [
        { name: "Apples", value: 400 },
        { name: "Bananas", value: 300 },
        { name: "Cherries", value: 300 },
        { name: "Grapes", value: 200 }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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