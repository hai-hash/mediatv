import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';



const BasePagination = ({ page, total, onPageChange, limit }) => {
    const [listPages, setListPages] = useState([]);
    const [listPages2, setListPages2] = useState([]);
    const totalPage = Math.ceil(total / (limit ? limit : 10));


    useEffect(() => {
        if (totalPage > 0) {
            const pages = [];
            let i = 0;
            while (++i <= totalPage) pages.push(i);
            setListPages(pages)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total]);

    useEffect(() => {
        let pages = [];
        let pageCutLow = page - 1;
        let pageCutHigh = page + 1;
        if (page === 1) {
            pageCutHigh += 2;
        } else if (page === 2) {
            pageCutHigh += 1;
        }

        if (page === totalPage) {
            pageCutLow -= 2;
        } else if (page === totalPage - 1) {
            pageCutLow -= 1;
        }

        for (let p = pageCutLow; p <= pageCutHigh; p++) {
            if (p === 0) {
                p += 1;
            }
            if (p > totalPage) {
                continue
            }
            pages.push(p);
        }
        setListPages2(pages)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const changePage = (p) => () => {
        onPageChange(p);
    }

    const renderFistItem = () => {
        if (page > 1) {
            return (
                <PaginationItem className={styles.mr} onClick={changePage(page - 1)}>
                    <PaginationLink previous />
                </PaginationItem>
            )
        }

        return null;
    }
    const renderLastItem = () => {
        if (page < totalPage) {
            return (
                <PaginationItem onClick={changePage(page + 1)}>
                    <PaginationLink next />
                </PaginationItem>
            )
        }

        return null;
    }

    const renderItem = () => {
        if (totalPage < 6) {
            return (
                <>
                    {renderFistItem()}
                    {listPages.map(e => {
                        return (
                            <PaginationItem className={styles.mr} onClick={changePage(e)} key={e} active={page === e}>
                                <PaginationLink>{e}</PaginationLink>
                            </PaginationItem>
                        )
                    })}
                    {renderLastItem()}
                </>
            )
        }

        return (
            <>
                {renderFistItem()}
                {page > 2 && (
                    <PaginationItem className={styles.mr} onClick={changePage(1)} active={page === 1}>
                        <PaginationLink>{1}</PaginationLink>
                    </PaginationItem>
                )}
                {page > 3 && (
                    <PaginationItem className={styles.mr} onClick={changePage(page - 2)}>
                        <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                )}
                {listPages2.map(e => {
                    return (
                        <PaginationItem className={styles.mr} onClick={changePage(e)} key={e} active={page === e}>
                            <PaginationLink>{e}</PaginationLink>
                        </PaginationItem>
                    )
                })}

                {page < totalPage - 2 && (
                    <PaginationItem className={styles.mr} onClick={changePage(page + 2)}>
                        <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                )}
                {page < totalPage - 1 && (
                    <PaginationItem className={styles.mr} onClick={changePage(totalPage)}>
                        <PaginationLink>{totalPage}</PaginationLink>
                    </PaginationItem>
                )}

                {renderLastItem()}
            </>
        )

    }

    return (
        <Col className={styles.paginate}>
            <div className={`d-flex justify-content-center paging-custom ${styles.pagination}`}>
                <Pagination>
                    {renderItem()}
                </Pagination>
            </div>
        </Col>
    );

}
export default BasePagination;
