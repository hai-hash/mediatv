export const OnFilter = (name_attribute, valueToFilter, data) => {
    let dataAfterFilter = [];
    if (valueToFilter !== "") {
        dataAfterFilter = data.filter((item) => {
            const value = item?.[name_attribute];
            if (typeof value === 'number') {
                return value === parseInt(valueToFilter);
            }
            else if (typeof value === 'boolean') {
                if (parseFloat(valueToFilter) === 1) {
                    return value === true;
                }
                else if (parseFloat(valueToFilter) === 0) {
                    return value === false || value === null;
                }
                else {
                    return value === false || value === true || value === null;
                }
            }
            else {
                return item?.[name_attribute].toLowerCase().indexOf(valueToFilter) !== -1;
            }

        })
    }
    else {
        dataAfterFilter = data;
    }

    console.log(dataAfterFilter);
    return dataAfterFilter;
}

export const OnFilterByDate = (nameAttribute, start, end, data) => {
    let dataAfterFilter = [];
    if (start !== "" && end !== "") {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (startDate < endDate) {
            dataAfterFilter = data.filter((item) => {
                const expirationDate = item?.[nameAttribute];
                if (expirationDate !== null) {
                    const date = new Date(expirationDate);
                    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0);
                    return +newDate <= +endDate && +newDate >= +startDate
                }
                else return false;
            })
        }
        else if (+startDate === +endDate) {

            dataAfterFilter = data.filter((item) => {
                const expirationDate = item?.[nameAttribute];
                if (expirationDate !== null) {
                    console.log("đã vào đến đây 1")
                    const date = new Date(expirationDate);
                    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0);
                    return +newDate === +endDate;
                }
                else return false;

            })

        }
        else {
            dataAfterFilter = data;
        }
    }
    return dataAfterFilter
}
// YYYY/mm/dd:hh:mm:sss
export const formatDate = (date) => {
    let coverStringToDate = new Date(date);
    let year = coverStringToDate.getFullYear();
    let month = coverStringToDate.getMonth() + 1;
    let day = coverStringToDate.getDate();
    let hour = coverStringToDate.getHours();
    let minute = coverStringToDate.getMinutes();
    let second = coverStringToDate.getSeconds();

    let newDay = day < 10 ? `0${day}` : day;
    let newMonth = month < 10 ? `0${month}` : month;
    let newHour = hour < 10 ? `0${hour}` : hour;
    let newMinute = minute < 10 ? `0${minute}` : minute;
    let newSecond = second < 10 ? `0${second}` : second;

    return `${year}/${newMonth}/${newDay} ${newHour}:${newMinute}:${newSecond}`;

}

// chart data
export const getDataTotal = (yearSelected, data, nameAttribute, nameValue) => {
    let dataMap = new Map();
    let dataTotal = [];
    for (let i = 0; i < data.length; i++) {
        let year = new Date(data[i]?.[nameAttribute]).getFullYear();
        let month = new Date(data[i]?.[nameAttribute]).getMonth() + 1;
        if (year === yearSelected) {
            if (dataMap.get(month)) {
                let oldValue = dataMap.get(month);
                dataMap.set(month, oldValue + data[i]?.[nameValue]);
            }
            else {
                dataMap.set(month, data[i]?.[nameValue]);
            }
        }
    }

    for (let j = 1; j <= 12; j++) {
        if (dataMap.get(j)) {
            dataTotal.push(dataMap.get(j));
        }
        else {
            dataTotal.push(0);
        }
    }


    return dataTotal;
}

export const getYears = (data, nameAttribute) => {
    const years = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let year = new Date(data[i]?.[nameAttribute]).getFullYear();
            if (years.indexOf(year)) {
                years.push(year)
            }
        }
    }
    return years;
}