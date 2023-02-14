import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AutoComplete,
  Input,
  Select,
  Button,
  Checkbox
} from 'antd';
import { toast } from 'react-toastify';
import NumberFormat from "react-number-format";
import { DeleteOutlined } from '@ant-design/icons';

const PricePerArea = ({ values}) => {
    const { Option } = Select;
    const couid = "60e865ce9333b731c74b232f";
    const coucode = "ph";

    const [province, setProvince] = useState([]);
    const [product, setProduct] = useState({});
    const [addValues, setAddValues] = useState({});
    const [user, setUser] = useState({});
    
    useEffect(() => {
        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser(user);
            setAddValues({
                ...addValues,
                prodid: values._id,
                userid: user._id
            });
        }
        loadProduct();
        loadProvince();
    }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

    const loadProduct = async () => {
        const result = await axios.get(process.env.REACT_APP_API + "/pmd-product/" + values._id);
        setProduct(result.data);
    }

    const loadProvince = async () => {
        const result = await axios.get(process.env.REACT_APP_API + "/address/addiv1/" + couid + "?coucode=" + coucode);
        setProvince(result.data);
    }

    const handleSubmit = async () => {
        if (addValues.adDivId1 && addValues.amount) {
            if (parseFloat(addValues.amount)) {
                const userExist = product.prices && product.prices.filter(price => price.userid === user._id);

                if (userExist.length === 0) {
                    const finalAddValue = { ...addValues };
                    delete finalAddValue.prodid;
                    const finalValues = { ...values, prices: [...product.prices, finalAddValue] };
                    const result = await axios.put(process.env.REACT_APP_API + "/pmd-product/" + values._id, finalValues);
                    if (result) {
                        setProduct(result.data);
                        loadProduct();
                    }
                } else {
                    toast.error("Sorry, you are only allowed to add one price per item")
                }
            } else {
                toast.error("Price should be a number")
            }
        } else {
            toast.error("Location and Price should not be empty")
        }
    }

    const onChange = async (priceid) => {
        const userVoted = product.votes && product.votes.filter(vote => vote.userid === user._id);
        if (userVoted.length > 0) {
            const newVotes = product.votes && product.votes.map(vote =>
                vote.userid === user._id ? { ...vote, priceid } : vote
            );
            const finalValues = { ...values, votes: newVotes };
            const result = await axios.put(process.env.REACT_APP_API + "/pmd-product/" + values._id, finalValues);
            if (result) {
                setProduct(result.data);
                loadProduct();
            }
        } else {
            const finalValues = { ...values, votes: [...product.votes, {userid: user._id, priceid}] };
            const result = await axios.put(process.env.REACT_APP_API + "/pmd-product/" + values._id, finalValues);
            if (result) {
                setProduct(result.data);
                loadProduct();
            }
        }
    };

    const deletePrice = async (priceid) => {
        const finalPrice = product.prices.filter(price => price._id !== priceid);
        console.log(finalPrice)
        const finalValues = { ...values, prices: finalPrice };
        const result = await axios.put(process.env.REACT_APP_API + "/pmd-product/" + values._id, finalValues);
        if (result) {
            setProduct(result.data);
            loadProduct();
        }
    }

    return ( 
        <>
            <Input.Group compact>
                <table>
                    <thead className="thead-light">
                        <tr>
                            <th>Location</th>
                            <th>Price</th>
                            <th style={{textAlign: "center"}}>Votes</th>
                            <th style={{textAlign: "center"}}>Vote</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.prices && product.prices.map(price => {
                            const voteCount = product.votes && product.votes.filter(vote => vote.priceid === price._id);
                            const userVoted = product.votes && product.votes.filter(vote => vote.userid === user._id && vote.priceid === price._id);
                            return <tr key={price._id}>
                                <td style={{width: "65%"}}>{price.adDivName1}</td>
                                <td style={{ width: "20%" }}>
                                    <NumberFormat
                                        value={Number(price.amount && price.amount).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={`₱`}
                                        style={{margin: 0}}
                                    />
                                </td>
                                <td style={{ width: "15%", textAlign: "center" }}>{voteCount.length}</td>
                                <td style={{ width: "10%", textAlign: "center" }}>
                                    <Checkbox onChange={() => onChange(price._id)} checked={userVoted.length > 0} />
                                </td>
                                {price.userid === user._id && <td style={{ color: "red", cursor: "pointer" }} onClick={() => deletePrice(price._id)}><DeleteOutlined /></td>}
                            </tr>
                        }
                        )}
                    </tbody>
                </table>
                <br /><br />
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
                <AutoComplete
                    style={{
                        width: '30%',
                    }}
                    onChange={(value) => {
                        setAddValues({
                            ...addValues,
                            amount: value
                        })
                    }}
                    placeholder="Price"
                />
            </Input.Group><br />
            <Button type="primary" style={{width: "100%"}} onClick={handleSubmit}>Add Price</Button>
        </>
     );
}
 
export default PricePerArea;