import React from 'react'
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
const NotFound = () => {
    let history = useHistory();
    const onGoToHome = () => {
        history.push("/home");
    }
    return (
        <div>
            <div className={styles.about}>
                <a className={`${styles.bg_links} ${styles.social} ${styles.portfolio}`} href="https://www.rafaelalucas.com" >
                    <span className={styles.icon}></span>
                </a>
                <a className={`${styles.bg_links} ${styles.social} ${styles.dribbble}`} href="https://dribbble.com/rafaelalucas" >
                    <span className={styles.icon}></span>
                </a>
                <a className={`${styles.bg_links} ${styles.social} ${styles.linkedin}`} href="https://www.linkedin.com/in/rafaelalucas/" >
                    <span className={styles.icon}></span>
                </a>
                <a href="/home" className={`${styles.bg_links} ${styles.logo}`}> </a>
            </div>


            <nav>
                <div className={styles.menu}>
                    <p className={styles.website_name}>FilmTV</p>
                    <div className={styles.menu_links}>
                        <a href="/home" className={styles.link}>about</a>
                        <a href="/home" className={styles.link}>projects</a>
                        <a href="/home" className={styles.link}>contacts</a>
                    </div>
                    <div className={styles.menu_icon}>
                        <span className={styles.icon}></span>
                    </div>
                </div>
            </nav>

            <section className={styles.wrapper}>

                <div className={styles.container}>

                    <div id="scene" className={styles.scene} data-hover-only="false">


                        <div className={styles.circle} data-depth="1.2"></div>

                        <div className={styles.one} data-depth="0.9">
                            <div className={styles.content}>
                                <span className={styles.piece}></span>
                                <span className={styles.piece}></span>
                                <span className={styles.piece}></span>
                            </div>
                        </div>

                        <div className={styles.two} data-depth="0.60">
                            <div className={styles.content}>
                                <span className={styles.piece}></span>
                                <span className={styles.piece}></span>
                                <span className={styles.piece}></span>
                            </div>
                        </div>

                        <div className={styles.three} data-depth="0.40">
                            <div className={styles.content}>
                                <span className={styles.piece}></span>
                                <span className={styles.piece}></span>
                                <span className={styles.piece}></span>
                            </div>
                        </div>

                        <p className={styles.p404} data-depth="0.50">404</p>
                        <p className={styles.p404} data-depth="0.10">404</p>

                    </div>

                    <div className={styles.text}>
                        <article>
                            <p>Uh oh! Looks like you got lost. <br />Go back to the homepage if you dare!</p>
                            <button onClick={onGoToHome}>i dare!</button>
                        </article>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default NotFound
