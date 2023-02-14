import React, {useState} from 'react';
import { isMobile } from 'react-device-detect';

import Header from './components/Header';
import ArticleNav from './components/ArticleNav';

import Prosperity from "../images/prosperity.png";

const initialState = {
    lesson: "",
    article: ""
}

const Article = () => {
    const [values, setValues] = useState(initialState);

    return (
        <div
            style={{ backgroundImage: `url(${Prosperity})`, height: document.body.scrollHeight }}
        >
            <Header title="Clavstore Help" />
            <div className="container mt-3 mb-5">
               <div className="row">
                    <div className="col-m-2 bg-white" style={{borderRadius: 4, margin: isMobile ? "0 0 15px 15px" : 0}}>
                        <ArticleNav setValues={setValues} />
                    </div>

                    <div className="col-md-8 bg-white" style={{width: isMobile ? "100%" : 850, borderRadius: 4, marginLeft: isMobile ? 0 : 15}}>
                        <div align="center" style={{padding: "0 20px"}}>
                            <div style={{ padding: "20px 20px 50px 20px", fontSize: 16 }}>
                                <h2>{values.lesson}</h2><br />
                                {values.article}
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        </div>
    );
}
 
export default Article;