
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
const NotFound = () => {
    let history = useHistory();
    useEffect(() => {
        history.push('/notfound');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>

        </div>
    )
}
export default NotFound
