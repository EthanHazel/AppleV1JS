import Debugger from './Debugger';
import Info from './Info';
import CRTWorker from './CRTWorker';
import { CONFIG } from '../config';
import { WORKER_MESSAGES } from '../apple1/TSTypes';
import Actions from './Actions';
import React, { useRef, useEffect, useState, JSX } from 'react';
import ErrorBoundary from './Error';

const Title = () => <span className="title">Apple 1 JS Vector Emulator</span>;

const LayoutRow = ({ children }: { children?: React.ReactNode }) => <div className="flex-1 p-6">{children}</div>;

type Props = {
    worker: Worker;
};
const App = ({ worker }: Props): JSX.Element => {
    const [supportBS, setSupportBS] = useState<boolean>(CONFIG.CRT_SUPPORT_BS);
    const [showDebug, setShowDebug] = useState<boolean>(false);

    const hiddenInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if modifier keys are pressed (except for Shift)
            if (e.metaKey || e.ctrlKey || e.altKey) {
                return;
            }
            worker.postMessage({ data: e.key, type: WORKER_MESSAGES.KEY_DOWN });
            e.preventDefault();
        };

        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            const pastedText = e.clipboardData?.getData('text') || '';
            console.log('Pasting:', pastedText); // Debug log

            // Send characters with a small delay between them
            pastedText.split('').forEach((char, index) => {
                setTimeout(() => {
                    const keyToSend = char === '\n' || char === '\r' ? 'Enter' : char;
                    worker.postMessage({ data: keyToSend, type: WORKER_MESSAGES.KEY_DOWN });
                }, index * 160); // 160ms delay between each character
            });
        };

        const hiddenInput = hiddenInputRef.current;
        if (hiddenInput) {
            hiddenInput.addEventListener('keydown', handleKeyDown);
            hiddenInput.addEventListener('paste', handlePaste);
        }

        return () => {
            if (hiddenInput) {
                hiddenInput.removeEventListener('keydown', handleKeyDown);
                hiddenInput.removeEventListener('paste', handlePaste);
            }
        };
    }, [worker]);

    useEffect(() => {
        focusHiddenInput();
    }, []);

    const focusHiddenInput = () => {
        const hiddenInput = hiddenInputRef.current;
        if (hiddenInput) {
            hiddenInput.style.opacity = '0';
            hiddenInput.focus();
        }
    };

    return (
        <ErrorBoundary>
            <div className="main-content">
                <Title />
                <LayoutRow>
                    <div onClick={focusHiddenInput}>
                        <CRTWorker worker={worker} />
                    </div>

                    <div className="actions">
                        <Actions
                            supportBS={supportBS}
                            onReset={(e) => {
                                e.preventDefault();
                                worker.postMessage({ data: 'Tab', type: WORKER_MESSAGES.KEY_DOWN });
                            }}
                            onBS={(e) => {
                                e.preventDefault();
                                worker.postMessage({
                                    data: !supportBS,
                                    type: WORKER_MESSAGES.SET_CRT_BS_SUPPORT_FLAG,
                                });
                                setSupportBS(!supportBS);
                            }}
                            showDebug={showDebug}
                            onShowDebug={(e) => {
                                e.preventDefault();
                                setShowDebug(!showDebug);
                            }}
                        />
                    </div>
                </LayoutRow>
            </div>
            <LayoutRow>
                <Info />
            </LayoutRow>
            {showDebug && (
                <div className="flex">
                    <Debugger worker={worker} />
                </div>
            )}

            <input
                type="text"
                ref={hiddenInputRef}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
            />
        </ErrorBoundary>
    );
};

export default App;
