import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Modal, Select, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import { read, utils, writeFile } from 'xlsx';
import NumberFormat from "react-number-format";

import Header from '../components/Header';
import PricePerArea from './PricePerArea';

import Prosperity from "../../images/prosperity1.png";
import { toast } from 'react-toastify';

const initialState = {
    _id: "",
    title: "",
    supplierPrice: ""
}

const PriceBoard = () => {
    const navigate = useNavigate();
    const { Option } = Select;
    const couid = "60e865ce9333b731c74b232f";
    const coucode = "ph";
    
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [values, setValues] = useState(initialState);
    const [selectValue, setSelectValue] = useState("A");
    const [user, setUser] = useState({});
    const [exportType, setExportType] = useState("min");
    const [province, setProvince] = useState([]);
    const [addValues, setAddValues] = useState({});
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(false);
    
    const showModal = (prod) => {
        setIsModalOpen(true);
        setValues(prod);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsExportOpen(false);
        setIsImportOpen(false);
    };

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/");
        } else {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
        loadProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadProducts = async () => {
        const result = await axios.get(process.env.REACT_APP_API + "/pmd-products");
        setProducts(result.data && result.data.map(prod => {
            const priceArray = prod.prices && prod.prices.map(p => parseFloat(p.amount));
            return {
                _id: prod._id,
                title: prod.title,
                min: priceArray.length ? Math.min.apply(null, priceArray) : 0,
                ave: priceArray.length ? priceArray.reduce((a, b) => a + b, 0) / priceArray.length : 0,
                max: priceArray.length ? Math.max.apply(null, priceArray) : 0,
                prices: prod.prices
            }
        }));
    }

    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    const firstLetter = (letter) => {
        const prodLeter = products.filter(product => product.title.startsWith(letter.toUpperCase()) || product.title.startsWith(letter));
        
        return <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Min</th>
                        <th scope="col">Ave</th>
                        <th scope="col">Max</th>
                    </tr>
                </thead>
                <tbody> 
                        {
                            prodLeter.sort(function(a, b) {
                                var textA = a.title.toUpperCase();
                                var textB = b.title.toUpperCase();
                                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                            })
                                .map((prod, index) =>
                                    <tr key={index} onClick={() => showModal(prod)} style={{cursor: "pointer"}}>
                                        <td>{index + 1}. {prod.title}</td>
                                        <td>
                                            <NumberFormat
                                                value={Number(prod.min && prod.min).toFixed(2)}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={`₱`}
                                                style={{margin: 0}}
                                            />
                                        </td>
                                        <td>
                                            <NumberFormat
                                                value={Number(prod.ave && prod.ave).toFixed(2)}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={`₱`}
                                                style={{margin: 0}}
                                            />
                                        </td>
                                        <td>
                                            <NumberFormat
                                                value={Number(prod.max && prod.max).toFixed(2)}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={`₱`}
                                                style={{margin: 0}}
                                            />
                                        </td>
                                    </tr> 
                            )
                        }
                </tbody>
            </table>
    }

    const handleExport = () => {
        const headings = [[
            'ID',
            'Product',
            'Supplier_Price',
            'Markup',
            'Markup_Type'
        ]];
        const body = products.map(prod => {
            const amount = exportType === "min"
                ? prod.min
                : exportType === "ave"
                ? prod.ave
                : exportType === "max" 
                ? prod.max
                : 0;
            return {
                _id: prod._id,
                title: prod.title,
                amount,
                markup: "10",
                markuptype: "%"
            }
        })
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, body, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Products-PMB.xlsx');
    }

    const handleImport = () => {
        if (!addValues.adDivId1 || !addValues.adDivName1) {
            toast.error("You need to select a location first");
            return;
        }
        setLoading(true);
        const files = event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = async (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    const newProducts = products.map(prod => {
                        let result = {};
                        const newProdPrice = rows.filter(row => row.ID === prod._id);
                        if (newProdPrice.length > 0) {
                            const existPrice = prod.prices.filter(price => price.userid === user._id);
                            if (existPrice.length > 0) {
                                result = {
                                    ...prod, prices: prod.prices.map(price => {
                                        return price.userid === user._id
                                            ? { ...price, amount: newProdPrice[0] ? newProdPrice[0].Supplier_Price : price.amount }
                                            : price
                                    })
                                }
                            } else {
                                result = {
                                    ...prod, prices: [...prod.prices, {
                                            userid: user._id,
                                            adDivId1: addValues.adDivId1,
                                            adDivName1: addValues.adDivName1,
                                            amount: newProdPrice[0] ? newProdPrice[0].Supplier_Price : 0
                                        }]
                                }
                            }
                        }
                        return result;
                    });
                    const result = await axios.put(process.env.REACT_APP_API + "/pmd-products/", newProducts);
                    if (result) {
                        loadProducts();
                        setLoading(false);
                        setIsImportOpen(false);
                    }
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const loadProvince = async () => {
        const result = await axios.get(process.env.REACT_APP_API + "/address/addiv1/" + couid + "?coucode=" + coucode);
        setProvince(result.data);
    }

    return (
        <div
            style={{ backgroundImage: `url(${Prosperity})`, height: document.body.scrollHeight }}
        >
            <Header title="Price Monitoring Board" />
            <div align="center" style={{ padding: "20px" }}>
                <div style={{ backgroundColor: "#fff", width: isMobile ? "100%" : 850, padding: "20px", fontSize: 16, borderRadius: 8 }}>
                    <div className="row">
                        <div align="left">
                            <button onClick={() => navigate("/workshop")} className="btn btn-primary float-right">
                                OGPA WORKSHOP
                            </button>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={(event) => {
                                        setEvent(event);
                                        setIsImportOpen(true);
                                        loadProvince();
                                    }}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Import</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button onClick={() => setIsExportOpen(true)} className="btn btn-primary float-right">
                                Export <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div style={{float: "left", width: isMobile ? "100%" : 800, textAlign: "left", marginBottom: 20 }}>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            value={selectValue}
                            onChange={(value) => setSelectValue(value)}
                            options={alphabet.map(letter => {return {value: letter, label: letter.toUpperCase()}})}
                        />
                        {firstLetter(selectValue)}
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>
            </div>
            <Modal title={values.title} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <PricePerArea
                    values={values}
                />
            </Modal>
            <Modal title="Export Products" open={isExportOpen} onCancel={handleCancel} onOk={handleExport} okText="Export">
                <div align="center">
                    <label>Select Price Type</label><br/><br/>
                    <Radio.Group defaultValue="min" buttonStyle="solid" onChange={(e) => setExportType(e.target.value)}>
                        <Radio.Button value="min">Minimum</Radio.Button>
                        <Radio.Button value="ave">Average</Radio.Button>
                        <Radio.Button value="max">Maximum</Radio.Button>
                    </Radio.Group>
                </div>
            </Modal>
            <Modal title="Import Products" open={isImportOpen} onCancel={handleCancel} onOk={handleImport} okText="Import">
                <div align="center">
                    <label>Select Location</label><br/><br/>
                    <Select
                        style={{
                        width: '70%',
                        }}
                        onChange={(value) => {
                            const provName = province.filter(prov => prov._id === value)
                            setAddValues({
                                ...addValues,
                                adDivId1: value,
                                adDivName1: provName[0].name
                            })
                        }}
                        defaultValue="- Select Location -"
                    >
                        {province.map(prov => <Option key={prov._id} value={prov._id}>{prov.name}</Option>)}
                    </Select>
                    {loading && <div style={{ color: "red" }}><br />Importing...</div>}
                </div>
            </Modal>
        </div>
    );
}
 
export default PriceBoard;