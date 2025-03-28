import { WEB_VIDEO_BUFFER_ROW, VideoData } from '../apple1/TSTypes';
import CRTCursor from './CRTCursor';
import CRTRow from './CRTRow';
import { JSX } from 'react';

type Props = {
    videoData: VideoData;
};
const CRT = ({ videoData }: Props): JSX.Element => (
    <div className="crt">
        <div className={`text-[13px] relative text-green-400 tracking-normal]`}>
            <CRTCursor row={videoData.row} column={videoData.column} />
            {videoData.buffer.map((line, index) => (
                <CRTRow
                    rowIndex={index}
                    line={line[WEB_VIDEO_BUFFER_ROW.DATA].join('')}
                    key={line[WEB_VIDEO_BUFFER_ROW.KEY]}
                />
            ))}
        </div>
    </div>
);

export default CRT;
