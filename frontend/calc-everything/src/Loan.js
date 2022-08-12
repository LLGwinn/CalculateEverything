import {useEffect, useState} from 'react';
import {calculateLoanPmt} from './helpers';
import './Loan.css';

function Loan() {
    const [formData, setFormData] = useState(
        {principle: '0.00',
         intRate: '0.00',
         term: 0,
         timeDivs: "months"}
    );

    const [results, setResults] = useState(
        {pmt: '0.00',
         intTotal: '0.00',
         loanTotal: '0.00'}
    );

    useEffect(() => {
        console.log('results in state', results)
    }, [results])


    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData(data => {
            return {...data, [name]:value}
        })
    }
        
    const calculate = (evt) => {
        evt.preventDefault();
        const loanCalculations = calculateLoanPmt(formData.principle, 
            parseFloat(formData.intRate), 
            parseFloat(formData.term));
        setResults(
            {
                pmt:loanCalculations.formattedPmt,
                intTotal: loanCalculations.intTotal,
                loanTotal: loanCalculations.loanTotal
            }
        )

    }

    return (
        <div className='Loan'>
            <div className='h3'>Simple Loan Calculator</div>
                <div className='row'>

                    <div className='Loan-form col-7'>
                        <form>
                            <div className='row mb-2'>
                                <div className="col-4 text-end">
                                    <label htmlFor="principle" className="form-label">Loan amount:</label>
                                </div>
                                <div className='col-5'>
                                    <input type="number" step=".01" min="0"
                                        className="form-control text-end" 
                                        name="principle"
                                        value={parseFloat(formData.principle)} 
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className='row mb-2'>
                                <div className='col-4 text-end'>
                                    <label htmlFor="interest" className="form-label">Interest rate:</label>
                                </div>
                                <div className='col-3'>
                                    <input type="text" 
                                        className="form-control text-end" 
                                        name="intRate"
                                        value={formData.intRate} 
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='row mb-5'>
                                <div className='col-4 text-end'>
                                    <label htmlFor="term" className="form-label">Term:</label>
                                </div>
                                <div className='col-3'>
                                    <input type="number" 
                                        className="form-control text-center " 
                                        name="term"
                                        value={formData.term} 
                                        onChange={handleChange}
                                    />
                                </div>         
                                <div className="form-check col-auto">
                                    <input type="radio" 
                                        className="months" 
                                        id="months"
                                        name="timeDivs"
                                        checked={true}
                                        value={formData.timeDivs}
                                        onChange={handleChange} 
                                    />
                                    <label className="Loan-radio form-check-label ps-2" htmlFor="months">months</label>
                                </div>
                                <div className="form-check col-auto ps-1">
                                    <input type="radio" 
                                        className="years" 
                                        id="years"
                                        name="timeDivs"
                                        value={formData.timeDivs}
                                        onChange={handleChange} 
                                    />
                                    <label className="Loan-radio form-check-label ps-2" htmlFor="years">years</label>
                                </div>
                                

                            </div>

                            <div className='row mb-3 '>
                                <button type="submit" 
                                        className="btn btn-success col-auto mx-auto"
                                        onClick={calculate}>Calculate Payment</button>
                            </div>
                        </form>
                    </div>
                    <div className='col-5'>
                        <div className='row justify-content-center py-3'>
                            MONTHLY PAYMENT:<br/><b> $ {results.pmt}</b>
                        </div>
                        <div className='row justify-content-center pt-4 fs-6'>
                            Total Interest:<br/> $ {results.intTotal}
                        </div>
                        <div className='row justify-content-center fs-6'>
                            Total amount you will pay:<br/> $ {results.loanTotal}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Loan;