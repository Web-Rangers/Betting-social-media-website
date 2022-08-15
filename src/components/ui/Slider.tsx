import React, { ReactNode } from 'react'
import styles from '@styles/components/ui/Slider.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

interface SliderProps {
    children?: React.ReactChild[];
}

const Slider: React.FC<SliderProps> = (props) => {
    const { children } = props;

    return (
        <Carousel
            className={styles.container}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            emulateTouch
            renderIndicator={(
                clickHandler,
                isSelected,
                index,
                label
            ) => <Dot
                    clickHandler={clickHandler}
                    isSelected={isSelected}
                    index={index}
                    label={label}
                />}
        >
            {children}
        </Carousel>
    )
}

interface DotProps {
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
}

const Dot: React.FC<DotProps> = (props) => {
    const { clickHandler, isSelected, index, label } = props;

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

export default Slider;