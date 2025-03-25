const TestProgram = () => (
    <>
        <h3>TEST PROGRAM</h3>
        <p>
            0:A9 0 AA 20 EF FF E8 8A 4C 2 0<br />
            0<br />R
        </p>
    </>
);

const BasicProgram = () => (
    <>
        <h3>BASIC</h3>
        <p>
            E000R
            <br />
            10 PRINT &quot;HELLO WORLD!&quot;
            <br />
            20 GOTO 10
            <br />
            RUN
        </p>
    </>
);

const AnniversaryInfo = () => (
    <>
        <h3>APPLE 30th ANNIVERSARY</h3>
        <p>280R</p>
    </>
);

const MemoryAddresses = () => (
    <>
        <h3>LIST MEMORY ADDRESS</h3>
        <p>0.FF</p>
    </>
);

const ManualLink = () => (
    <>
        <h3>APPLE-1 OPERATION MANUAL</h3>
        <p>
            <a href={'http://apple1.chez.com/Apple1project/Docs/pdf/AppleI_Manual.pdf'}>
                http://apple1.chez.com/Apple1project/Docs/pdf/AppleI_Manual.pdf
            </a>
        </p>
    </>
);

const Credits = () => (
    <>
        <h3>CREDITS</h3>
        <p>
            <a href="https://github.com/Torlus/6502.js">6502.js</a> by Torlus
        </p>
        <p>
            <a href="https://github.com/stid/APPLE-1-ReplicaDue">Hybrid HW</a> by stid
        </p>
        <p>
            <a href="https://github.com/stid/Apple1JS">Original Version</a> by stid
        </p>
        <p>
            <a href="https://github.com/EthanHazel/AppleV1JS">Vector Version</a> by Ethan Hazel
        </p>
    </>
);

const Info = () => (
    <div className="info">
        <TestProgram />
        <BasicProgram />
        <AnniversaryInfo />
        <MemoryAddresses />
        <ManualLink />
        <Credits />
    </div>
);

export default Info;
