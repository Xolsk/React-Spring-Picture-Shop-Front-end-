import React from 'react';
import AddShop from "./AddShop";
import PictureDisplay from "./PictureDisplay";
import AddPicture from "./AddPicture";


export default class Selector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeShop: {},
            showAddPictureDisplay: false,
            showAddShopDisplay: false,
            shopList: [],
            pictureList: []
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.selectShop = this.selectShop.bind(this);
    }

    componentDidMount() {


        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:6060/api/shops/", requestOptions)
            .then(response => response.json())
            .then(result => this.setState({ shopList: result }))
            .catch(error => console.log('error', error));

    }

    toggleMenu = (menu) => {

        if (menu === "shop") {
            this.setState({ showAddShopDisplay: !this.state.showAddShopDisplay, showAddPictureDisplay: false });
        }
        else {
            this.setState({ showAddPictureDisplay: !this.state.showAddPictureDisplay, showAddShopDisplay: false });
        }
    }

    selectShop = (shop) => {


        const activeShopId = shop.target.value;
        const activeShop = this.state.shopList.find((shop) => shop.id == activeShopId);
        if (activeShopId != 0) {
            const myHeaders = new Headers();

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`http://localhost:6060/api/shops/${activeShopId}/pictures`, requestOptions)
                .then(response => response.json())
                .then(result => { this.setState({ pictureList: result, activeShop: activeShop }) })
                .catch(error => console.log('error', error));
        }
        else this.setState({pictureList:[],activeShop:{}})
    }

    render() {

        return (
            <div className="wrapper">
                <div className="visibleMenu">
                    <div className="shopMenu">
                        <select onChange={this.selectShop} className="shopSelect">
                            <option value="0" >Select your Shop</option>
                            {this.state.shopList.map((item) => <option value={item.id}
                                key={item.id}>{item.name}</option>)}
                        </select>
                        <div className="infoWrapper">
                            <div>
                                <div className="strongWrapper">
                                    <strong>
                                        Current Capacity:{this.state.activeShop.currentCapacity}
                                    </strong>
                                </div>
                                <div className="strongWrapper">
                                    <strong>
                                        Maximum Capacity:{this.state.activeShop.maxCapacity}
                                    </strong>
                                </div>
                            </div>
                        </div>
                        <button className="button" onClick={() => this.toggleMenu("shop")}>
                            Add new Shop
                    </button>
                    </div>
                    <PictureDisplay activeShop={this.state.activeShop.id} gallery={this.state.pictureList} toggleMenu={this.toggleMenu} />
                </div>
                <div>
                    {this.state.showAddShopDisplay === true ? <AddShop /> : null}
                    {this.state.showAddPictureDisplay === true ? <AddPicture activeShop={this.state.activeShop.id} /> : null}
                </div>
            </div>
        )
    }
}