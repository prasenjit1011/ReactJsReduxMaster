import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

export default function Dashboard(){
    const navigate  = useNavigate();
    const server    = false;
    const apiHost   = server ? 'http://localhost:3000/' : 'https://gh4csx-3000.csb.app/';

    const [bookingList, setBookingList] = useState([]);
    useEffect(()=>{
        fetch(apiHost+'api/hotels/booking/list')
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setBookingList(data)
            })
            .catch((err)=>{
                console.log(err)
                alert('Something bad happened; Please check your API or Restart sandbox, https://codesandbox.io/p/github/prasenjit1011/bookingSystem/booking-master');
            });
    },[]);


    return (
        <>
        <Menu  pageType={"Logout"} />
        <div className="container" style={{ }}>
            
            <div>
                <h3>Booking List</h3>
                <table border="1" className="bookingTable">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Place</th>
                            <th>Date</th>
                            <th>Guest</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingList.map((value, key)=>{
                                return (
                                    <tr key={value._id}>
                                        <td>{key+1}</td>
                                        <td>{value.hotelName}</td>
                                        <td>{value.dtd}</td>
                                        <td>{value.guestNumber}</td>
                                        <td>{value.price}</td>
                                        <td>{value.guestNumber * value.price}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}