import React, { useState } from 'react'
import * as types from './../../handler/category/typeCategory';
import CategoryDisplay from './categoryDisplay';
import CategoryEdit from './categoryEdit';
import CategoryAdd from './categoryAdd';
import CategoryDetail from './categoryDetail';
import styles from './styles.module.scss';
const CategoryAdmin = () => {
    const [status, setStatus] = useState(types.DISPLAY);
    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <CategoryDisplay setStatus={setStatus} />
            case types.ADD:
                return <CategoryAdd />
            case types.DETAIL:
                return <CategoryDetail />
            case types.EDIT:
                return <CategoryEdit />

            default:
                return <CategoryDisplay />
        }
    }
    const onAdd = () => {
        if (status === types.DISPLAY)
            setStatus(types.ADD)
        else if (status === types.DETAIL)
            setStatus(types.ADD)
        else setStatus(types.DISPLAY)
    }
    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>api / admin / category </span>
                    <h5>Category</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onAdd}>Category</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default CategoryAdmin
