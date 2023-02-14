import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import ReactPlayer from 'react-player/vimeo';
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

import Header from './components/Header';
import LessonNav from './components/LessonNav';

import Prosperity from "../images/prosperity.png";

const initialState = {
    title: "Welcome Message",
    vimeoId: "753312536"
}

const Session1 = () => {
    const navigate = useNavigate();
    
    const [values, setValues] = useState(initialState);
    const [days, setDays] = useState(1);

    useEffect(() => {
        let userid = {};
        if (localStorage.getItem("user")) {
            userid = JSON.parse(localStorage.getItem("user"));

            let date_1 = new Date(userid.dateStart);
            let date_2 = new Date();
            let difference = date_2.getTime() - date_1.getTime();
            let totalDays = Math.ceil(difference / (1000 * 3600 * 24));

            setDays(totalDays);
        }
        if(!userid || !userid._id) navigate("/");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            style={{ backgroundImage: `url(${Prosperity})`, height: document.body.scrollHeight }}
        >
            <Header title="OGPA Workshop" />
            <div className="container mt-3 mb-5">
               <div className="row">
                    <div className="col-m-2 bg-white" style={{borderRadius: 4, margin: isMobile ? "0 0 15px 15px" : 0}}>
                        <LessonNav setValues={setValues} days={days} />
                    </div>

                    <div className="col-md-8 bg-white" style={{width: isMobile ? "100%" : 850, borderRadius: 4, marginLeft: isMobile ? 0 : 15}}>
                        <div align="center" style={{padding: "0 20px"}}>
                            <div style={{ padding: "20px", fontSize: 20 }}>
                                <b>{values.title}</b>
                                <div align="center" style={{ padding: 10 }}>
                                    <div style={{ width: isMobile ? "100%" : 650, height: 366, backgroundColor: "#666" }}>
                                        <ReactPlayer
                                            url={`https://vimeo.com/${values.vimeoId}`}
                                            width={isMobile ? "100%" : "650px"}
                                            height="366px"
                                            controls={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br /><br />
                            <Button
                                type="primary"
                                shape="round"
                                style={{ height: 70, fontSize: 24, padding: "0 30px" }}
                                onClick={() => window.open('https://www.facebook.com/groups/989418884508291', '_blank').focus()}
                            >
                                Join Our OGPA Community Group Page
                            </Button>
                            <br /><br />
                            <Button
                                type="danger"
                                shape="round"
                                style={{ height: 70, fontSize: 24, padding: "0 30px" }}
                                onClick={() => navigate("/pmb")}
                            >
                                Price Monitoring Board
                            </Button>
                            <br /><br />
                            <a href='/letterproposal.doc' download>Download Proposal Template</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Session1;