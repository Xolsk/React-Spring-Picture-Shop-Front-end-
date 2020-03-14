import React from "react";

export default class AddShop extends React.Component {


    newShop = (submit) => {

        submit.preventDefault();
        const name = submit.target.elements.shopName.value;
        const maxCapacity = submit.target.elements.shopMaxCapacity.value;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ "name": name, "maxCapacity": maxCapacity });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:6060/api/shops", requestOptions)
            .then(response => response.text())
            .then(result => alert(result))
            .catch(error => console.log('error', error))
            window.location.reload();
    }

    render() {


        return (
            <div className="addShop">
                <div className="formWrapper">
                    <form onSubmit={this.newShop}>
                        <div>
                            <label>Shop Name: </label>
                            <input type="text" name="shopName"></input>
                            <label>Maximum Picture Capacity: </label>
                            <input type="number" name="shopMaxCapacity"></input>

                        </div>
                        <div>
                            <button className="button" >Submit new Shop</button>
                        </div>
                    </form>
                </div>
            </div>






        )
    }





}