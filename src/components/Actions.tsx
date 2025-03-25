export type ActionsProps = {
    onReset: React.MouseEventHandler<HTMLAnchorElement>;
    onBS: React.MouseEventHandler<HTMLAnchorElement>;
    onShowDebug: React.MouseEventHandler<HTMLAnchorElement>;
    supportBS: boolean;
    showDebug: boolean;
};

const Actions = ({ onReset, onBS, supportBS, showDebug, onShowDebug }: ActionsProps) => (
    <div className="actions">
        <p>---</p>
        <a onClick={onReset} href="#">
            RESET [TAB]
        </a>{' '}
        <a onClick={onBS} href="#">
            SUPOPRT BACKSPACE [{supportBS ? 'ON' : 'OFF'}]
        </a>{' '}
        <a onClick={onShowDebug} href="#">
            DEBUG [{showDebug ? 'ON' : 'OFF'}]
        </a>
        <p>---</p>
    </div>
);

export default Actions;
