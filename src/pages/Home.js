import React, { useState, useEffect } from 'react';
import { Input, Space, Button, Form } from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import axios from 'axios';
import md5 from 'md5';

import Header from './components/Header';

import OnlineGrocery from "../images/onlinegrocery1.png";
import Prosperity from "../images/prosperity.png";

const Session1 = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let userid = {};
        if (localStorage.getItem("user")) {
            userid = JSON.parse(localStorage.getItem("user"));
        }
        if(userid && userid._id) navigate("/workshop");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async () => {
        if (email.length > 0 && password.length > 0) {
            try {
                const user = await axios.get(process.env.REACT_APP_API + "/ogpa-password/" + email + "/" + md5(password));
                if (user.data.err) {
                    toast.error(user.data.err);
                } else {
                    localStorage.setItem("user", JSON.stringify(user.data));
                    navigate("/workshop");
                }
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("Need an email and password to login")
        }
    }

    return (
        <div
            style={{ backgroundImage: `url(${Prosperity})`, height: document.body.scrollHeight }}
        >
            <Header title="OGPA Workshop" />
            <div align="center" style={{padding: "40px 20px 20px 20px"}}>
                <img src={OnlineGrocery} alt="Online Grocery Training" style={ isMobile ? { width: "100%", borderRadius: 8 } : {borderRadius: 8} } />
            </div>
            <div align="center" style={{padding: "0 20px"}}>
                <div style={{ backgroundColor: "#fff", width: isMobile ? "100%" : 850, padding: "20px", fontSize: 20, borderRadius: 8 }}>
                    <b>Place Your OGPA Email & Password Below</b>
                    <br /><br />
                    <Form onFinish={() => handleSubmit()}>
                        <Space direction="vertical" style={{width: 300}}>
                            <Input
                                size="large"
                                placeholder="Email"
                                prefix={<MailOutlined />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input.Password
                                size="large"
                                placeholder="Password"
                                prefix={<KeyOutlined />}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: 300, height: 40, fontSize: 18 }}
                            >
                                Login
                            </Button>
                        </Space>
                    </Form>
                    <br />
                </div>
            </div>
        </div>
    );
}
 
export default Session1;