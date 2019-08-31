const BS = 0xdf; // Backspace key, arrow left key (B7 High)
const ESC = 0x9b; // ESC key (B7 High)
const CR = 13;
//const RESET_CODE = -255;

// KBD b7..b0 are inputs, b6..b0 is ASCII input, b7 is constant high
//     Programmed to respond to low to high KBD strobe
class Keyboard implements IoComponent {
    private logicWrite?: (value: number) => Promise<void>;

    constructor() {
        // eslint-disable-next-line no-undef
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this._onKeyPressed(e);
        });
    }

    wire(conf: { logicWrite?: (value: number) => Promise<void> }) {
        this.logicWrite = conf.logicWrite;
    }

    // eslint-disable-next-line no-unused-vars
    async read(_address: number) {
        // Not implemented
    }

    // eslint-disable-next-line no-unused-vars
    async write(_address: number) {
        // Not implemented
    }

    private _onKeyPressed(event: KeyboardEvent): void {
        const logicWrite = this.logicWrite;
        if (logicWrite) {
            // Standard Keys
            switch (event.key) {
                case 'Backspace':
                    logicWrite(BS);
                    break;
                case 'Escape':
                    logicWrite(ESC);
                    break;
                case 'Enter':
                    logicWrite(CR);
                    break;
                default: {
                    const key = event.key;
                    if (key.length === 1) {
                        logicWrite(key.toUpperCase().charCodeAt(0));
                    }
                }
            }
        }
    }
}

export default Keyboard;
