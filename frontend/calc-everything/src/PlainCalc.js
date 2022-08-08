import './PlainCalc.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function PlainCalc() {
    const [displayNum, setDisplayNum] = useState('0');
    const [operation, setOperation] = useState(null);
    const [firstNum, setFirstNum] = useState(null);
    const [result, setResult] = useState(null);
    const [startOver, setStartOver] = useState(true);

    useEffect(() => {
        if (result === null) setDisplayNum('0');
        else if (result === 'ERROR') {
            setDisplayNum('ERROR')
            setTimeout(() => setResult(null), 1500);
        }
        else {
            setDisplayNum(result.toString());
            if (operation !== '=') setFirstNum(result);
            else setFirstNum(null);
        }
    }, [result])

    const addNumToDisplay = (num) => {
        if (startOver) {
            setDisplayNum(() => num);
            setStartOver(false);
        }
        else {
            setDisplayNum((displayNum) => displayNum + num);
        }
    }

    const backspace = () => {
        if (displayNum.length === 1) {
            setDisplayNum(() => '0');
            setStartOver(true);
        }
        else if (displayNum !== '0') {
            setDisplayNum(() => displayNum.slice(0, -1));
            setStartOver(false)
        }
    }

    const startOperation = (operator) => {
        if (firstNum !== null) { 
            doMath(operation);
            setOperation(operator);
            setFirstNum(result);
        }
        else  {
            setOperation(operator);
            setFirstNum(parseFloat(displayNum));
            setResult(parseFloat(displayNum));
        }
        setStartOver(true);
    }

    const clear = () => {
        setResult(null);
        setDisplayNum('0');
        setFirstNum(null);
        setOperation(null);
        setStartOver(true);
    }

    const doMath = (oper) => {
        if (oper === '+') {
            setResult(() => firstNum + parseFloat(displayNum));
        }
        else if (oper === '-') {
            setResult(() => firstNum - parseFloat(displayNum));
        }
        else if (oper === '*') {
            setResult(() => firstNum * parseFloat(displayNum));
        }
        else if (oper === '/') {
            if (parseFloat(displayNum) === 0) {
                setResult('ERROR');
            }
            else {
                setResult(() => firstNum / parseFloat(displayNum));
            }
        }
        else if (oper === null) {
            setResult(() => parseFloat(displayNum));
        }
    }

    const getResult = () => {
        doMath(operation);
        setOperation(null);
        if (result !== null) setDisplayNum(result.toString());
        setStartOver(true);
    }

    return (
        <>

        <div className='PlainCalc mx-auto'>
            {/* calculator */}
            <div className='PlainCalc-calculator col col-auto mx-auto mt-1 mt-sm-3'>
                <div className="row p-2">
                    {/* display */}
                    <div className='PlainCalc-display col-12 px-3'>
                        {displayNum}
                    </div>
                </div>
                <div className='row align-items-center justify-content-center'>
                    
                    {/* keypad */}
                    <div className='col-6 ps-2'>
                        {/* numbers - first row */}
                        <div className='row pb-2 pb-sm-3 '>

                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg' 
                                    onClick={() => addNumToDisplay('7')}>7</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('8')}>8</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('9')}>9</div>
                            </div>
                            
                        </div>

                        {/* numbers - second row */}
                        <div className='row pb-2 pb-sm-3'>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('4')}>4</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('5')}>5</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('6')}>6</div>
                            </div>
                        </div>

                        {/* numbers - third row */}
                        <div className='row pb-2 pb-sm-3'>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('1')}>1</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('2')}>2</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('3')}>3</div>
                            </div>
                        </div>

                        {/* numbers - fourth row */}
                        <div className='row '>

                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('0')}>0</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-number btn btn-outline-info btn-lg'
                                    onClick={() => addNumToDisplay('.')}>.</div>
                            </div>
                            <div className='col-4'>
                                <div className='PlainCalc-backspace btn btn-outline-info btn-lg'
                                    onClick={backspace}>
                                    <FontAwesomeIcon icon={faDeleteLeft} />
                                </div>
                            </div>
                        </div>   
                    </div>


                    {/* operators and other keys */}
                    <div className='col-6 ps-4 pe-0'>
                        {/* add-subtract */}
                        <div className='row pb-2'>
                            <div className='col-6 pe-1 text-end'>
                                <div className='PlainCalc-operator btn btn-outline-danger m-0'
                                    onClick={() => startOperation('+')}>+</div>
                            </div>
                            <div className='col-6 ps-1 text-start'>
                                <div className='PlainCalc-operator btn btn-outline-danger m-0'
                                    onClick={() => startOperation('-')}>-</div>
                            </div>
                        </div>
                        {/* multiply-divide */}
                        <div className='row pb-2 pb-sm-4 mb-sm-2'>
                            <div className='col-6 pe-1 text-end'>
                                <div className='PlainCalc-operator btn btn-outline-danger m-0'
                                    onClick={() => startOperation('*')}>*</div>
                            </div>
                            <div className='col-6 ps-1 text-start'>
                                <div className='PlainCalc-operator btn btn-outline-danger m-0'
                                    onClick={() => startOperation('/')}>/</div>
                            </div>
                        </div>
                        {/* equals */}
                        <div className='row pb-2 pb-sm-4 mb-sm-2'>
                            <div className='mx-auto'>
                                <div className='PlainCalc-equals btn btn-outline-danger '
                                    onClick={getResult}>=</div>
                            </div>
                        </div>
                        {/* clear */}
                        <div className='row '>
                            <div className='mx-auto'>
                                <div className='PlainCalc-clear btn btn-outline-success btn-lg'
                                    onClick={clear}>Start Over</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Link className="btn btn-secondary mt-3" to='/'>Home</Link>
        </div>
        
        </>
    )
}

export default PlainCalc;