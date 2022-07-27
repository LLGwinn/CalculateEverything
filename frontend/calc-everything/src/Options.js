import './Options.css';
import OptionButton from './OptionButton';

function Options() {

    return (
        <div className='Options'>
            <div className='d-grid'>
                <OptionButton title="Plain Old Calculator" url="/plain" />
                <OptionButton title="Loan" url="/loan"/>
                <OptionButton title="Mortgage" url="/mortgage"/>
                <OptionButton title="Discount" url="/discount"/>   
            </div>
        </div>
    )
}

export default Options;