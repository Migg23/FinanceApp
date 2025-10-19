import './Dashboardcss.css'
import Chart from './Chart.js'
import FInfo from './FinanceInformation.js'

function DashBoard(){



    return(
        //main page
        <div className="full-page-component">
            <div className='chart-container'>
                <h3>Ideal Budget Chart</h3>
                <Chart/>
            </div>
            
            <div className='finance-container'>
                <FInfo/>
            </div>
            
        </div>
    );
}

export default DashBoard;