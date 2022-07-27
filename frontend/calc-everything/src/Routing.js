import {Route, Routes} from 'react-router-dom';
import Home from './Home';
import PlainCalc from './PlainCalc';
import Loan from './Loan';
import Mortgage from './Mortgage';
import Discount from './Discount';
import NotFound from './NotFound';

function Routing() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/plain' element={<PlainCalc />} />
                <Route path='/loan' element={<Loan />} />
                <Route path='/mortgage' element={<Mortgage />} />
                <Route path='/discount' element={<Discount />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )

}

export default Routing;