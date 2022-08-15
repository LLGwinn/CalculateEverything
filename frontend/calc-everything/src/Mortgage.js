import {useState} from 'react';
import {calculateLoanPmt, validateLoanInput} from './helpers';
import './Mortgage.css';
import { Link } from 'react-router-dom';

function Mortgage() {
    const [formData, setFormData] = useState(
        {price: '0.00',
         downPmt: '0.00',
         intRate: '0.00',
         term: 0,
         tax: '0.00',
         insurance: '0.00'
        }
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
        if (validateLoanInput(formData.price, formData.intRate, formData.term)) {
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
        <div className='Mortgage'>
            <div className='h3 mb-lg-4'>Mortgage Calculator</div>
            <div className='Mortgage-main row pe-3 pb-3 pe-lg-0 pb-lg-0'>
                {/* FORM SECTION */}
                <div className='Mortgage-form col-lg-8 ps-3 pe-0'>
                    <form>
                        <div className='row mb-lg-3'>
                            {/* LEFT FORM COLUMN */}
                            <div className='col-sm-6'>

                                <div className='row mb-2 mx-auto'>
                                    <div className="col-lg-6 text-lg-end">
                                        <label htmlFor="price" className="form-label lh-sm">Home price:</label>
                                    </div>
                                    <div className='col-9 col-md-6 mx-auto'>
                                        <input type="number" step=".01" min="0"
                                            className="form-control text-end pe-0" 
                                            name="price"
                                            value={formData.price} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className='row mb-2 mx-auto'>
                                    <div className="col-lg-6 mb-lg-4 text-lg-end">
                                        <label htmlFor="downPmt" className="form-label lh-sm">Down payment:</label>
                                    </div>
                                    <div className='col-9 col-md-6 mx-auto'>
                                        <input type="number" step=".01" min="0"
                                            className="form-control text-end pe-0" 
                                            name="downPmt"
                                            value={formData.downPmt} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className='row mb-2 justify-content-center'>
                                    LOAN AMOUNT: &nbsp; $&nbsp;{formData.price - formData.downPmt}
                                </div>

                            </div>
                            {/* RIGHT FORM COLUMN */}
                            <div className='Mortgage-form-right col-sm-6 ps-sm-0 pe-sm-1 '>

                                <div className='row mb-2 justify-content-center justify-content-md-start align-items-center'>
                                    <div className='col-sm-4 col-md-6 text-sm-end'>
                                        <label htmlFor="interest" className="form-label lh-sm">Interest rate:</label>
                                    </div>
                                    <div className='col-5 col-md-3'>
                                        <input type="number" step=".01" min="0" 
                                            className="form-control text-end px-0" 
                                            name="intRate"
                                            value={formData.intRate} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                    %
                                </div>

                                <div className='row mb-2 justify-content-center justify-content-md-start align-items-center'>
                                    <div className='col-sm-4 col-md-6 text-sm-end'>
                                        <label htmlFor="term" className="form-label">Term:</label>
                                    </div>
                                    <div className='col-4 col-md-3'>
                                        <input type="number" 
                                            className="form-control text-center pe-0" 
                                            name="term"
                                            value={formData.term} 
                                            onChange={handleChange}
                                        />
                                    </div> 
                                    years        
                                </div>

                                <div className='row mb-2 justify-content-center justify-content-md-start align-items-center'>
                                    <div className="col-sm-4 col-md-6 text-sm-end">
                                        <label htmlFor="tax" className="form-label lh-sm">Annual tax:</label>
                                    </div>
                                    <div className='col-6 col-md-4'>
                                        <input type="number" step=".01" min="0"
                                            className="form-control text-end pe-0" 
                                            name="tax"
                                            value={formData.tax} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className='row mb-2 justify-content-center justify-content-md-start'>
                                    <div className="col-sm-4 col-md-6 text-sm-end">
                                        <label htmlFor="insurance" className="form-label lh-sm">Annual insurance:</label>
                                    </div>
                                    <div className='col-6 col-md-4'>
                                        <input type="number" step=".01" min="0"
                                            className="form-control text-end pe-0" 
                                            name="insurance"
                                            value={formData.insurance} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </form>
                    <div className='row justify-content-center mb-2'>
                        <button type="submit" 
                                className="btn btn-success col-8 col-sm-auto "
                                onClick={calculate}>Calculate Payment</button>
                        </div>                     

                </div>
                
                {/* RESULTS COLUMN */}
                <div className='Mortgage-results mx-auto col-sm-8 col-md-6 col-lg-3 my-lg-auto pe-lg-0'>
                    <div className='row justify-content-center'>
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
            <div className='row mb-3 justify-content-center'>
                <Link className="btn btn-secondary mt-2 col-auto col-lg-1" to='/'>Home</Link>
            </div>

        </div>
    )
}

export default Mortgage;