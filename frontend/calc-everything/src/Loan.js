import {useState} from 'react';
import {calculateLoanPmt, validateLoanInput} from './helpers';
import './Loan.css';
import { Link } from 'react-router-dom';

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

    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData(data => {
            return {...data, [name]:value}
        })
    }
        
    const calculate = (evt) => {
        evt.preventDefault();
        if (validateLoanInput(formData.principle, formData.intRate, formData.term)) {
            const loanCalculations = calculateLoanPmt(formData.principle, 
                formData.intRate, 
                formData.term,
                formData.timeDivs);
            setResults(
                {
                    pmt:loanCalculations.formattedPmt,
                    intTotal: loanCalculations.intTotal,
                    loanTotal: loanCalculations.loanTotal
                }
            )
        }
    }

    return (
        <div className='Loan'>
            <div className='h3 mb-lg-4'>Simple Loan Calculator</div>
            <div className='Loan-content-row row pe-4 pb-3'>

                {/* FORM COLUMN */}
                <div className='Loan-form col-7'>
                    <form>
                        <div className='row mb-2 ps-sm-3'>
                            <div className="col-sm-4 text-sm-end">
                                <label htmlFor="principle" className="form-label lh-sm">Loan amount:</label>
                            </div>
                            <div className='col-10 col-sm-5 col-lg-3 ps-4 ps-sm-0 justify-self-center align-self-center'>
                                <input type="number" step=".01" min="0"
                                    className="form-control text-end pe-0" 
                                    name="principle"
                                    value={formData.principle} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className='row mb-2 ps-sm-3'>
                            <div className='col-sm-4 text-sm-end'>
                                <label htmlFor="interest" className="form-label lh-sm">Interest rate:</label>
                            </div>
                            <div className='col-10 col-sm-3 col-lg-2 ps-4 ps-sm-0 justify-self-center align-self-center'>
                                <input type="number" step=".01" min="0" 
                                    className="form-control text-end pe-0" 
                                    name="intRate"
                                    value={formData.intRate} 
                                    onChange={handleChange}
                                />
                            </div>
                            %
                        </div>

                        <div className='row mb-3 ps-sm-3 mb-sm-4 mb-md-5'>
                            <div className='col-sm-4 text-sm-end'>
                                <label htmlFor="term" className="form-label">Term:</label>
                            </div>
                            <div className='col-10 col-sm-3 col-lg-2 ps-4 ps-sm-0 justify-self-center align-self-center'>
                                <input type="number" 
                                    className="form-control text-center pe-0" 
                                    name="term"
                                    value={formData.term} 
                                    onChange={handleChange}
                                />
                            </div>         
                            <div className="form-check col-auto col-sm-6 col-md-auto ps-md-0">
                                <input type="radio"
                                    id="months"
                                    name="timeDivs"
                                    checked={formData.timeDivs === "months"}
                                    value="months"
                                    onClick={handleChange} 
                                    onChange={handleChange}
                                />
                                <label className="Loan-radio form-check-label ps-2" htmlFor="months">months</label>
                            </div>
                            <div className="form-check col-auto ps-1">
                                <input type="radio" 
                                    id="years"
                                    name="timeDivs"
                                    checked={formData.timeDivs === "years"}
                                    value="years"
                                    onClick={handleChange} 
                                    onChange={handleChange}
                                />
                                <label className="Loan-radio form-check-label ps-2" htmlFor="years">years</label>
                            </div>
                            

                        </div>

                        <div className='row mb-sm-3'>
                            <button type="submit" 
                                    className="btn btn-success col-8 col-sm-auto ms-4 ms-sm-5 mx-md-auto py-2 px-sm-3"
                                    onClick={calculate}>Calculate Payment</button>
                        </div>
                    </form>
                </div>

                {/* RESULTS COLUMN */}
                <div className='Loan-results col-5'>
                    <div className='row justify-content-center mt-3 py-3 px-sm-5 px-md-0'>
                        MONTHLY PAYMENT:<br/><b> $ {results.pmt}</b>
                    </div>
                    <div className='row justify-content-center pt-4 pt-lg-2 fs-6'>
                        Total Interest:<br/> $ {results.intTotal}
                    </div>
                    <div className='row justify-content-center fs-6'>
                        Total amount you will pay:<br/> $ {results.loanTotal}
                    </div>
                </div>
            </div>
            <div className='row'>
                <Link className="btn btn-secondary mt-3 col-auto col-lg-1 mx-auto" to='/'>Home</Link>
            </div>

        </div>
    )
}

export default Loan;