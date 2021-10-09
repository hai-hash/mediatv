import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { AiOutlineEdit } from 'react-icons/ai';
import * as types from './../../handler/country/countryType';
import { PublicContext } from '../../publicContexts/contexts';

const CountryItem = ({ country, setStatus }) => {
    const { setCountrySelect } = useContext(PublicContext);
    const onEdit = () => {
        setCountrySelect(country);
        setStatus(types.EDIT);
    }
    return (
        <tr>
            <th scope="row">{country?.id}</th>
            <td>{country?.nameCountry}</td>
            <td>{country?.createDate}</td>
            <td>{country?.modifyDate}</td>
            <td>{country?.createBy}</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
            </td>
        </tr>
    )
}

export default CountryItem
