import { UploadButton } from "@bytescale/upload-widget-react";
import { useEffect, useState } from "react";

export function Employee(){



    
    const [employee, setEmployee]   = useState([]);
    const [imgUrl, setImgUrl]       = useState();
    const [mobiles, setMobileData] = useState([]);
    
    const options = {
        apiKey: "public_kW15bsXD4S6TkSsELHYsfYnfRe1h", // This is your API key.
        maxFileCount: 1
    };





    useEffect(()=>{
        let URL = 'https://dummy.restapiexample.com/api/v1/employees';
        URL = 'https://reqres.in/api/users?page=2';

        fetch(URL,{
            mode:'cors'
        })
        .then(res=>res.json())
        .then(res=>{
            //console.log(res.data);
            setEmployee(res.data)
        })
        .catch();


        fetch("http://localhost:3000/graphql", {
                mode:'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  // Optional, depending on your GraphQL server
                },
                body: JSON.stringify({
                    query: '{mobiles{id,title,price}}',
                }),
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res.data);
                setMobileData(res.data.mobiles)
            })
            .catch();

    },[]);

    return (
        <div>
            <b>Employee List : </b>Fetch API<br />
            <div style={{height:"200px"}}>
            {
                employee.map((val, key)=>(
                    <div key={key} style={{float:'left', margin:'15px'}}>
                        <img src={val['avatar']} style={{width:'100px'}} />
                        <div>{val['first_name']}</div>
                    </div>
                ))
            }
            </div>
            <div>
                <div style={{height:"50px"}}>
                    <UploadButton options={options}
                        onComplete={files => {setImgUrl(files.map(x => x.fileUrl).join("\n"))}}>
                        {({onClick}) =>
                        <button onClick={onClick}>
                            Upload a file...
                        </button>
                        }
                    </UploadButton>
                </div>
                <div>
                    {
                        imgUrl ? <img src={imgUrl} style={{width:"100px"}} />:''
                    }
                </div>
                <div style={{clear:"both"}}>
                    <hr />
                    <b>API Data using GraphQL :</b><br />
                    {
                        mobiles.map((val, key)=>(
                            <div key={key} style={{float:'left', margin:'15px'}}>
                                <div style={{color:"black"}}>{val['id']}) {val['title']} : {val['price']}</div>
                            </div>
                        ))
                    }
                </div>           
            </div>
        </div>
    );
}