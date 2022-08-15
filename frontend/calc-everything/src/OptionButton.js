import {Link} from 'react-router-dom';

function OptionButton({title, url}) {

    return (
        <>
            <Link className="btn btn-info m-2 col-6 col-lg-3 mx-auto" to={url}>{title}</Link>
        </>
    )
}

export default OptionButton;