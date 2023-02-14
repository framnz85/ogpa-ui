import React from 'react';
import { isMobile } from 'react-device-detect';

const Header = ({ title, subtitle }) => {
    return ( 
        <div style={{backgroundColor: "#008000", padding: 20}}>
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
                        fontSize: isMobile ? 20 : 35,
                        color: "#fff",
                        fontWeight: "bold"
                    }}>
                        {title}
                    </span><br />
                    <span style={{
                        fontSize: isMobile ? 18 : 25,
                        color: "#FFFF8F",
                        fontWeight: "bold"
                    }}>
                        "{subtitle}"
                    </span>
                </>}
            </center>
        </div>
     );
}
 
export default Header;