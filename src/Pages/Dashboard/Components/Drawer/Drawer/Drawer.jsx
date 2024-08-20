import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../Hooks/useDropDownHide';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../Shared/ScreenShadow/ScreenShadow';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import DrawerOptions from '../Components/DrawerOptions/DrawerOptions';
import styles from './Drawer.module.css';

function Drawer() {
    const [collapse, setCollapse] = useState(false),
     [transition, setTransition] = useState(false),

     collapseRef = useRef(collapse);
    collapseRef.current = collapse;

    const screenWidth = useScreenWidth(),

     scrollParentRef = useRef(null),
     scrollChildRef = useRef(null),

     elementRef = useRef(null),
     transitionId = useRef(null),

     handleTransition = () => {
        setTransition(true);
        if (transitionId.current) {
            clearTimeout(transitionId.current);
            transitionId.current = null;
        }
        transitionId.current = setTimeout(() => {
            setTransition(false);
            transitionId.current = null;
        }, 300);
    },

     { showMenu, setElement } = useDropDownHide(() => {
        setCollapse(false);
        handleTransition();
    });

    useEffect(() => {
        if (screenWidth < 1100 && collapseRef.current) {
            setCollapse(false);
        }
    }, [screenWidth]);

    useEffect(() => {
        setElement(elementRef.current);
    }, [setElement]);

    return (
        <>
            <div
                className={`${collapse ? `${styles.containerCollapse} ` : ''}${transition ? `${styles.containerTransition} ` : ''}${styles.drawerContainer}`}
                ref={elementRef}
            >
                <div className={styles.drawerImmediateContainer}>
                    <div className={styles.drawerScrollContainer}>
                        <div
                            className={styles.drawer}
                            ref={scrollParentRef}
                        >
                            <ul
                                className={styles.optionContainer}
                                ref={scrollChildRef}
                            >
                                {drawers.map(drawer => (
                                    <DrawerOptions
                                        {...(screenWidth > 1099 && { parentState: collapse })}
                                        key={drawer.id}
                                        option={drawer}
                                    />
                                ))}
                            </ul>

                            <footer
                                className={`${collapse && screenWidth > 1099 ? `${styles.footerHide} ` : ''}${styles.footer}`}
                            >
                                <ol className={styles.footerLinks}>
                                    {[
                                        { text: 'Privacy Policy', link: 'privacyPolicy' },
                                        { text: 'Cookie Policy', link: 'cookiePolicy' },
                                        { text: 'Terms of Service', link: 'termsOfService' },
                                        { text: 'IR Contacts', link: 'IRContacts' },
                                        { text: 'Information Security', link: 'informationSecurity' },
                                    ].map(link => (
                                        <li
                                            className={styles.footerLinkContainer}
                                            key={link.link}
                                        >
                                            <a
                                                className={styles.footerLink}
                                                href={link.link}
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ol>

                                <p className={styles.footerCopyWrite}>
                                    <small>
                                        &copy;2024 
                                        {' '}

                                        <span className={styles.gamologyText}>
                                            Gamology
                                        </span>
                                    </small>
                                </p>
                            </footer>
                        </div>

                        <ScrollBar
                            childRef={scrollChildRef}
                            parentRef={scrollParentRef}
                        />
                    </div>
                </div>

                <button
                    className={`${collapse ? styles.collapsePosition : styles.expandedPosition} ${styles.collapseButton}`}
                    onClick={() => {
                        setCollapse(prev => {
                            if (!prev && screenWidth < 1100) {
                                showMenu();
                            }
                            return !prev;
                        });
                        handleTransition();
                    }}
                    type="button"
                >
                    <span className={styles.arrowBtn} />
                </button>
            </div>

            {screenWidth < 1100 && <ScreenShadow
                show={collapse}
                zIndex={1}
                                   />}
        </>
    );
}
export default Drawer;
