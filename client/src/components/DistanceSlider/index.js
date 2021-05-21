import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';


function DistanceSlider(distance) {
    const { createSliderWithTooltip } = Slider;
    const Range = createSliderWithTooltip(Slider.Range);
    const { Handle } = Slider;

    const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} Miles`}
        visible={dragging}
        placement="top"
        key={index}
        >
        <Handle value={value} {...restProps} />
        </SliderTooltip>
    );
    };

    const wrapperStyle = { width: 400, margin: 50 };

    return (  
    <div>
        <div style={wrapperStyle}>
        <p>Slider with custom handle</p>
        <Slider min={0} max={50} defaultValue={distance.distanceBoundary} handle={handle} onAfterChange={(e) => distance.setDistanceBoundary(e)}/>
        </div>
    </div>
    );
}

export default DistanceSlider