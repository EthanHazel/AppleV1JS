import { memo } from 'react';

type CRTRowCharProps = {
    char: string;
    x: number;
};

const CRTRowChar = memo(({ char }: CRTRowCharProps) => {
    return <div className="char">{char}</div>;
});

CRTRowChar.displayName = 'CRTRowChar';

export default CRTRowChar;
