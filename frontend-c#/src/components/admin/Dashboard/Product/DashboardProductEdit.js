import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function DashboardProductEdit(props) {

    const createForm = useRef();
    const cateInput = useRef();
    const groupCateInput = useRef();
    const [isCheckedSmall, setIsCheckedSmall] = useState(false);
    const [isCheckedMedium, setIsCheckedMedium] = useState(false);
    const [isCheckedLarge, setIsCheckedLarge] = useState(false);
    const [inputValue, setInputValue] = useState([]) 
    const [file, setFile] = useState([])
    const product = props.product


    const [productImg, setProductImg] = useState([])
    const [productPreviewImg, setProductPreviewImg] = useState([])
    const [productName, setProductName] = useState("")
    const [productSale, setProductSale] = useState(0)
    const [productPrice, setProductPrice] = useState(0)
    const [productDes, setProductDes] = useState("")
    const [productCate, setProductCate] = useState("")
    const [productGroupCate, setProductGroupCate] = useState("")
    const [productGroupCateList, setProductGroupCateList] = useState([])
    const [productCateList, setProductCateList] = useState([])
    const [productSize, setProductSize] = useState([])
    const [productSex, setProductSex] = useState([])
    const [productDate, setProductDate] = useState("")
    const [productSold, setProductSold] = useState(0)
    const [productVote, setProductVote] = useState([])

    const checkedSize = (event) => {
        if (event.target.id === "1") {
            if (isCheckedSmall) {
                const size = productSize.filter((item)=> {
                    return item !== 'Small'
                })
                setProductSize(size)
                setIsCheckedSmall(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Small'])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id === "2") {
            if (isCheckedMedium) {
                const size = productSize.filter((item)=> {
                    return item !== 'Medium'
                })
                setProductSize(size)
                setIsCheckedMedium(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Medium'])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id === "3") {
            const size = productSize.filter((item)=> {
                return item !== 'Large'
            })
            setProductSize(size)
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Large'])
                setIsCheckedLarge(true)
            }
        }
    }

    const handleOnChange = (event) => {
        setInputValue({...inputValue, [event.target.name]: event.target.value})
    }
    
    useEffect(()=> { 
        if (product) {
            setProductDate(product.productDate)
            setProductSold(product.productSold)
            setProductVote(product.productVote)
            setProductName(product.productName)
            setProductImg(product.productImg)
            setProductPreviewImg(product.productImg)
            setProductSale(product.productSale)
            setProductPrice(product.productPrice)
            setProductDes(product.productDes)
            setProductCate(product.productCate)
            setProductSex(product.productSex)
            setProductSize(product.productSize)
            setProductGroupCate(product.productGroupCate) 
            axios.get(`https://localhost:4000/api/product`)
                .then(res => {
                    const test = Object.values(res.data.reduce((a, {productGroupCate}) => {
                        a[productGroupCate] = a[productGroupCate] || {productGroupCate};
                        return a;
                    }, Object.create(null)));
                    setProductGroupCateList(test)

                    const test2 = Object.values(res.data.reduce((a, {productCate}) => {
                        a[productCate] = a[productCate] || {productCate};
                        return a;
                    }, Object.create(null)));
                    setProductCateList(test2)
                }
            )
            if (product.productSize) {
                for (let i of product.productSize) {
                    if(i === "Small") setIsCheckedSmall(true)
                    if(i === "Medium") setIsCheckedMedium(true)
                    if(i === "Large") setIsCheckedLarge(true)
                }
            }
        }
    },[product])

    const onSubmit = (event) => {
        event.preventDefault()  
        const config = {
            headers: {
               'content-type': 'multipart/form-data',
            },
        };

        const formData = new FormData();

        const imageArr = Array.from(file); 
        imageArr.forEach(image => {
            formData.append('file', image);
        });  

        axios.post('https://localhost:4000/api/product/UploadFile', formData, config)
        .then((res)=>{  
            console.log([...res.data, ...productImg])
            axios.put(`https://localhost:4000/api/product/${product.id}`, {
                id: product.id,
                productImg: [...res.data, ...productImg],
                productSize: productSize,
                productName: productName,
                productSale: Number(productSale),
                productPrice: Number(productPrice),
                productCate: productCate,
                productGroupCate: productGroupCate,
                productFinalPrice: Math.floor(Number(productPrice) - (Number(productPrice) * (Number(productSale/100)))),
                productSex: productSex,
                productDate: productDate,  
                productDes: productDes,
                productSold: productSold,
                productVote: productVote, 
            }).then(()=>{  
                props.setToastFunc(true);
                props.setCloseEditFunc(false);
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((res)=>{
            console.log(res)
        }) 
    }

    const addNewCate = () => {
        setProductCate(inputValue.cate)
        setProductCateList(productCateList => [...productCateList, {productCate: inputValue.cate}])
        cateInput.current.value = ""
    }
 
    const addNewGroupCate = () => {
        setProductGroupCate(inputValue.groupCate)
        setProductGroupCateList(productGroupCateList => [...productGroupCateList, {productGroupCate: inputValue.groupCate}])
        groupCateInput.current.value = ""
    } 

    const deleteImg = (event) => {
        const id = event.target.id
        const virutalFile = [...file]
        virutalFile.splice(id, 1)
        setFile(virutalFile)
        const items = [...productImg]
        items.splice(id, 1)
        setProductImg(items) 
        setProductPreviewImg(items) 
    }  

    return (
        <div className="DashboardProductInfo">
            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Product infomation
                    </div>
                    <div 
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                { product && 
                    <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Name</div>
                            <div className="dashboard-right">
                                <input 
                                    type="text" name="name" 
                                    value={productName}
                                    onChange={(event)=>{
                                        setProductName(event.target.value)
                                    }} required
                                ></input>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Images </div>
                            <div className="dashboard-right">
                                <input 
                                    onChange={(event) => {
                                        const files = event.target.files;
                                        for (let i = 0; i< files.length; i++) {
                                            setProductPreviewImg(product=>[URL.createObjectURL(files[i]), ...product])
                                        }
                                        const fileArr = Array.prototype.slice.call(files)
                                        fileArr.forEach(item=>{
                                            setFile(file=>[...file, item])
                                        })
                                    }}
                                    type="file"
                                    name="productImg"
                                    className="noborder"
                                    multiple="multiple"
                                    style={{height: '50px'}}
                                ></input>
                                <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                    { productPreviewImg && 
                                        productPreviewImg.map((item, index) => {
                                            return (
                                                <div key={index} className="create-box-img">
                                                    <img src={item} alt=""></img>
                                                    <div 
                                                        className="create-box-img-overlay"
                                                    >
                                                        <p
                                                            id={index}
                                                            onClick={deleteImg}
                                                            className="icon">X
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Defaut price </div>
                            <div className="dashboard-right">
                                <input 
                                    type="number" name="price" 
                                    placeholder="USD" 
                                    value={productPrice}
                                    onChange={(event)=>{
                                        setProductPrice(event.target.value)
                                    }} required
                                ></input>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Sale off </div>
                            <div className="dashboard-right flex-center">
                                <input 
                                    type="number" placeholder="%" 
                                    style={{ width: "100px"}} 
                                    name="sale" 
                                    value={productSale}
                                    onChange={(event)=>{
                                        setProductSale(event.target.value)
                                    }}
                                    required></input>
                                <label>From: </label>
                                <input type="date"  name="fromdate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                                <label>To: </label>
                                <input type="date"  name="todate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Category group</div>
                            <div className="dashboard-right flex-center">
                                <select style={{ width: "350px"}} 
                                    onChange={(event) => {setProductGroupCate(event.target.value)}}
                                    value={productGroupCate || ""}
                                >
                                    <option></option>
                                    { productGroupCateList.length > 0 &&
                                        productGroupCateList.map((item, index) => {
                                            if (item.productGroupCate) {
                                                return(
                                                    <option key={index}>{item.productGroupCate}</option>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </select>
                                <input type="text" name="groupCate" placeholder="New category group?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={groupCateInput}></input>
                                <div className="btn" style={{
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '300',
                                    padding: '0 10px',
                                    cursor: 'pointer',
                                    width: '350px',
                                    height: '30px'
                                }}
                                onClick={addNewGroupCate}>
                                    Add
                                </div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Category</div>
                            <div className="dashboard-right flex-center">
                                <select style={{ width: "350px"}} 
                                    onChange={(event) => {setProductCate(event.target.value)}}
                                    value={productCate}
                                >
                                    <option></option>
                                    { productCateList.length > 0 &&
                                        productCateList.map((item, index) => {
                                            if (item.productCate) {
                                                return(
                                                    <option key={index}>{item.productCate}</option>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </select>
                                <input type="text" name="cate" placeholder="New category?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={cateInput}></input>
                                <div className="btn" style={{
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '300',
                                    padding: '0 10px',
                                    cursor: 'pointer',
                                    width: '350px',
                                    height: '30px'
                                }}
                                onClick={addNewCate}>
                                    Add
                                </div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Sex </div>
                            <div className="dashboard-right flex">
                                <select style={{ width: "200px"}} 
                                    onChange={(event) => {setProductSex(event.target.value)}}
                                    value={productSex}>
                                    <option></option>
                                    <option>Man</option>
                                    <option>Woman</option>
                                </select>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Size </div>
                            <div className="dashboard-right flex">
                                <div 
                                    className={isCheckedSmall ? "size-check isChecked" : "size-check"}
                                    id="1" 
                                    onClick={checkedSize}>Small</div>
                                <div 
                                    className={isCheckedMedium ? "size-check isChecked" : "size-check"}
                                    id="2" 
                                    onClick={checkedSize}>Medium</div>
                                <div 
                                    className={isCheckedLarge ? "size-check isChecked" : "size-check"}
                                    id="3" 
                                    onClick={checkedSize}>Large</div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Description </div>
                            <div className="dashboard-right">
                                <input 
                                    type="text" 
                                    name="des" 
                                    value={productDes || ""}
                                    onChange={(event)=>{
                                        setProductDes(event.target.value)
                                    }}required></input>
                            </div>
                        </div>
                        <div className="flex-center" style={{marginTop: '40px'}}>
                            <button className="create-box-btn btn">
                                Update product
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}