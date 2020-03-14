import React from "react";

export default class AddPicture extends React.Component {


    newPicture = (submit) => {

        submit.preventDefault();
        const title = submit.target.elements.title.value.trim();
        const price = submit.target.elements.price.value;
        const author = submit.target.elements.author.value.trim();
        const shop = this.props.activeShop;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({ title, author, price, shop });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:6060/api/shops/${shop}/pictures`, requestOptions)
            .then(response => response.text())
            .then(result => alert(result))
            .catch(error => alert(error))
        window.location.reload();
    }

    render() {

        return (
            <div className="addPicture">
                <div className="formWrapper">
                    <form onSubmit={this.newPicture}>
                    <div>
                        <label>Picture Title:</label>
                        <input type="text" name="title"></input>
                        <label>Price:</label>
                        <input type="number" name="price"></input>
                        <label>Author:</label>
                        <input type="text" name="author"></input>
                    </div>
                    <button href="#" className="button">Submit new Picture</button>  
                    </form>
                </div>
            </div>
        )
    }
}