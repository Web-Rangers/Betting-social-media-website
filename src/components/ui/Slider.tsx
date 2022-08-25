import React, { ReactElement, ReactNode, useMemo } from 'react'
import styles from '@styles/components/ui/Slider.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import * as portals from 'react-reverse-portal';

interface SliderProps {
    children?: ReactElement[]
    showArrows?: boolean,
    showPagination?: boolean,
    arrowOffset?: {
        top: number | string,
        side: number | string
    }
}

const Slider: React.FC<SliderProps> = (props) => {
    const {
        children,
        showArrows =
        false,
        showPagination = true,
        arrowOffset
    } = props;
    const portalNode = useMemo(() => portals.createHtmlPortalNode({
        attributes: { style: "position: absolute; width: 100%; z-index: 1;" }
    }), []);

    return (
        <>
            <portals.OutPortal node={portalNode} />
            <Carousel
                className={styles.container}
                showArrows={showArrows}
                showIndicators={showPagination}
                showStatus={false}
                showThumbs={false}
                emulateTouch
                renderIndicator={(clickHandler, isSelected, index) =>
                    <Dot clickHandler={clickHandler} isSelected={isSelected} index={index} />
                }
                renderArrowNext={(clickHandler, hasNext) =>
                    <portals.InPortal node={portalNode}>
                        <ArrowNext
                            clickHandler={clickHandler}
                            hasNext={hasNext}
                            offset={arrowOffset}
                        />
                    </portals.InPortal>
                }
                renderArrowPrev={(clickHandler, hasPrev) =>
                    <portals.InPortal node={portalNode}>
                        <ArrowPrev
                            clickHandler={clickHandler}
                            hasPrev={hasPrev}
                            offset={arrowOffset}
                        />
                    </portals.InPortal>
                }
            >
                {children}
            </Carousel>
        </>
    )
}

interface DotProps {
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
}

const Dot: React.FC<DotProps> = (props) => {
    const { clickHandler, isSelected, index } = props;

    return (
        <div
            className={`${styles.dot} ${isSelected ? styles.active : ''}`}
            onClick={clickHandler}
            onKeyDown={clickHandler}
            role="button"
            tabIndex={0}
            data-index={index}
        />
    )
}

interface ArrowProps {
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    hasNext?: boolean,
    hasPrev?: boolean,
    offset?: {
        top: number | string,
        side: number | string
    }
}

const ArrowNext: React.FC<ArrowProps> = (props) => {
    const { clickHandler, hasNext, offset } = props;
    return (
        hasNext
            ? <div
                className={`${styles.arrow} ${hasNext && styles.next}`}
                onClick={clickHandler}
                style={offset && {
                    top: offset?.top,
                    right: offset?.side
                }}
            >
                <Image
                    src='/icons/slider-next.svg'
                    height={12}
                    width={7}
                />
            </div>
            : <></>
    )
}

const ArrowPrev: React.FC<ArrowProps> = (props) => {
    const { clickHandler, hasPrev, offset } = props;
    return (
        hasPrev
            ? <div
                className={`${styles.arrow} ${hasPrev && styles.prev}`}
                onClick={clickHandler}
                style={offset && {
                    top: offset?.top,
                    left: offset?.side
                }}
            >
                <Image
                    src='/icons/slider-prev.svg'
                    height={12}
                    width={7}
                />
            </div>
            : <></>
    )
}

export default Slider;