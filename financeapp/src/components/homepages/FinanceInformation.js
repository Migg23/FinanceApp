import { useState} from "react";
import './Dashboardcss.css'

function FinanceInformation(){
    const [index , setIndex] = useState(0);
    const questionTitles = ["Why should you create a budget?" , "Why should you invest?" , "Why is this the ideal budget?" , "Why is meal planning so important/hard?"]

    
    const rightIndex = () =>{
        let newIndex = index;
        
        if( index === questionTitles.length - 1){
            newIndex = 0;
        }
        else{
            newIndex++;
        }

        setIndex(newIndex);
        
    }

    const leftIndex = () =>{
        let newIndex = index;
        if(newIndex === 0){
            newIndex = questionTitles.length - 1;
        }
        else{
            newIndex--;
        }

        setIndex(newIndex);
    }

    return(
        //this is the Finance information
        <div className="finance-info-wrapper">
            <h3 className="finance-info-title">{questionTitles[index]}</h3>


            <div className="finance-info-content">
                <div className="finance-arrow left" onClick={leftIndex}>
                    &#8592;
                </div>

                <p>

                </p>

                <div className="finance-arrow right" onClick={rightIndex}>
                &#8594;
                </div>
            </div>
    </div>
    );
}


export default FinanceInformation;