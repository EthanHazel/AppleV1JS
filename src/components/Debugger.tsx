import { useEffect, useState, memo } from 'react';
import { styled } from '@stitches/react';
import { WORKER_MESSAGES, DebugData } from 'apple1/TSTypes';

const DebuggerContainer = styled('div', {
    fontSize: '14px',
    display: 'flex',
});

const Debugger = ({ worker }: { worker: Worker }): JSX.Element => {
    const [debugInfo, setDebugInfo] = useState<DebugData>({});

    useEffect(() => {
        setTimeout(() => {
            worker.postMessage({ data: {}, type: WORKER_MESSAGES.DEBUG_INFO });
        }, 250);
    });

    useEffect(() => {
        worker.addEventListener('message', (e) => {
            const { data, type }: { data: DebugData; type: WORKER_MESSAGES } = e.data;
            switch (type) {
                case WORKER_MESSAGES.DEBUG_INFO:
                    setDebugInfo(data as DebugData);
                    break;
            }
        });
    }, [worker]);

    return (
        <DebuggerContainer>
            {Object.keys(debugInfo).map((key) => (
                <DebugDomain key={key} domainKey={key} domainData={debugInfo[key]} />
            ))}
        </DebuggerContainer>
    );
};

const DebugDomainTitle = styled('h4', {
    marginBottom: '5px',
    color: '#aaa',
});
const DebugDomainInfo = styled('div', {
    color: '#607d8b',
});
interface DebugDomainProps {
    domainKey: string;
    domainData: { [key: string]: string | number | boolean };
}

const DebugDomainContainer = styled('div', {
    width: '240px',
    padding: '20px',
});

const DebugDomain = ({ domainKey, domainData }: DebugDomainProps) => (
    <DebugDomainContainer>
        <DebugDomainTitle>{domainKey}</DebugDomainTitle>
        <DebugDomainInfo>
            {Object.keys(domainData).map((key) => (
                <DebugDomainItem key={key} label={key} value={domainData[key]} />
            ))}
        </DebugDomainInfo>
    </DebugDomainContainer>
);

const DebugDomainItem = memo(({ label, value }: { label: string; value: string | number | boolean }) => {
    return <div>{`${label}: ${value}`}</div>;
});

export default Debugger;
