import { useState} from "react";
import './Dashboardcss.css'

function FinanceInformation(){
    const [index , setIndex] = useState(0);
    const questionTitles = ["Why should you create a budget?" , "Why should you invest?" , "Why is this the ideal budget?" , "Why is meal planning so important/hard?"]
    const questionAnswers = 
    [
        "Creating a budget allows someone to keep track of their spending. Overspending can occur when the person believes they are not spending that much money. ",
        "Investing are the steps taken to give stability to future you! It is important to invest, especially at a younger age, because your money grows more quickly. Your money is more likely to beat out inflation as well because the value increases at a better rate.",
        "As the programmers we do not know much about finance to be honest. This budget is based off our experiences and results may vary, but this has worked for us and is what we can recommend.",
        "Meal planning is important because people are likely to over spend on convience. Food is everyone's weakness and with apps that charge a premium for delivery it is incredibly easy to overspend on items. People are more likely to justify these purcahses as well because they see food as a neccesity."
    ]
    
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
                    {questionAnswers[index]}
                </p>

                <div className="finance-indicators">
                    {questionTitles.map((_, i) => (
                        <span
                            key={i}
                            className={`indicator-dot ${i === index ? 'active' : ''}`}
                            onClick={() => setIndex(i)} 
                        ></span>
                    ))}
                </div>

                <div className="finance-arrow right" onClick={rightIndex}>
                &#8594;
                </div>
            </div>
    </div>
    );
}


export default FinanceInformation;