import React from 'react';
import { isMobile } from 'react-device-detect';

const Header = ({ title, subtitle }) => {
    return ( 
        <div style={{backgroundColor: "#013f28", padding: 20}}>
            <center>
                {!subtitle && <span style={{
                    fontSize: isMobile ? 30 : 40,
                    color: "#fff",
                    fontWeight: "bold"
                }}>
                    {title}
                </span>}
                {subtitle && <>
                    <span style={{
                        fontSize: isMobile ? 15 : 20,
                        color: "#fff",
                        fontWeight: "bold"
                    }}>
                        {title}
                    </span><br />
                    <span style={{
                        fontSize: isMobile ? 28 : 35,
                        color: "#f00",
                        fontWeight: "bold"
                    }}>
                        {subtitle}
                    </span>
                </>}
            </center>
        </div>
     );
}
 
export default Header;