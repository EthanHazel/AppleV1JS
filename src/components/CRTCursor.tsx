import { memo, useEffect, useState } from 'react';
import * as CRTConstants from './CRTConstants';
import CRTRowChar from './CRTRowCharRom'; // Import the CRTRowChar component

type CursorProp = {
    row: number;
    column: number;
};

const CRTCursor = memo(({ row, column }: CursorProp) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const toggleVisibility = () => setVisible((prevVisible) => !prevVisible);
        const visibleTimeout = visible ? 300 : 200;
        const timerId = setTimeout(toggleVisibility, visibleTimeout);

        return () => clearTimeout(timerId);
    }, [visible]);

    const cursorStyle = {
        left: `${column * CRTConstants.FONT_RECT[0] + CRTConstants.LEFT_PADDING - 10}px`,
        top: `${row * CRTConstants.FONT_RECT[1]}px`,
        display: visible ? 'block' : 'none',
    };

    return (
        <div className="cursor" data-testid="cursor" style={cursorStyle}>
            <CRTRowChar x={0} char="@" />
        </div>
    );
});

CRTCursor.displayName = 'CRTCursor';

export default CRTCursor;
